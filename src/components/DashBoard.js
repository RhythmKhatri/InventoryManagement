import React, { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
  TextField,
  IconButton,
  Select,
  MenuItem,
  styled
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

const PositiveRow = styled(TableRow)({
  backgroundColor: '#d3f7d2',
});

const NegativeRow = styled(TableRow)({
  backgroundColor: '#f7d2d2',
});

const Dashboard = () => {
  const [data, setData] = useState([]);
  let baseURL = process.env.PRODUCTION_BACKEND_URL || process.env.REACT_APP_BACKEND_PORT;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = baseURL + 'getDashboard';
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log('jsonData', jsonData);
      if (jsonData.Success === true) {
        const processedData = addSmartComments(jsonData.dashboard);
        const sortedData = processedData.sort((a, b) => a.device_opn.localeCompare(b.device_opn));
        setData(sortedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addSmartComments = (data) => {
    const groupedData = data.reduce((acc, row) => {
      const key = `${row.device_opn}-${row.version}`;
      if (!acc[key]) {
        acc[key] = {
          ...row,
          total_quantity_demand: 0
        };
      }
      if(row.shipping_status=== 'Yes')acc[key].total_quantity_demand += row.quantity_demand;
      return acc;
    }, {});

    return data.map(row => {
      const key = `${row.device_opn}-${row.version}`;
      const totalQuantityDemand = groupedData[key].total_quantity_demand;
      const quantityAvailable = row.quantity_available;

      let smartComment;
      if (row.shipping_status === 'Yes') {
        smartComment = quantityAvailable - totalQuantityDemand;
      } else {
        smartComment = 'Not Shipped';
      }

      return {
        ...row,
        smart_comment: smartComment
      };
    });
  };

  const handlePriorityChange = async (id, priority) => {
    console.log('id', id)
    try {
      const url = baseURL + 'setPriority';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, priority })
      });
      const jsonData = await response.json();
      if (jsonData.Success) {
        // Update local data with new priority
        const updatedData = data.map(row => {
          if (row.id === id) {
            return { ...row, priority };
          }
          return row;
        });
        setData(updatedData);
      } else {
        console.error('Failed to update priority:', jsonData.error);
      }
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  const getRowComponent = (row) => {
    if (row.shipping_status === 'Yes') {
      if (row.smart_comment > 0) {
        return <PositiveRow key={row.id}>{getRowCells(row)}</PositiveRow>;
      } else if (row.smart_comment < 0) {
        return <NegativeRow key={row.id}>{getRowCells(row)}</NegativeRow>;
      }
    }
    return <TableRow key={row.id}>{getRowCells(row)}</TableRow>;
  };

  const getRowCells = (row) => (
    <>
      <TableCell>
          <Select
            value={row.priority}
            onChange={(e) => handlePriorityChange(row.id, e.target.value)}
            // sx={{width : '122px'}}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
      </TableCell>
      <TableCell>{row.customer}</TableCell>
      <TableCell>{row.device_opn}</TableCell>
      <TableCell>{row.version}</TableCell>
      <TableCell>{row.quantity_demand}</TableCell>
      <TableCell>{row.quantity_available}</TableCell>
      <TableCell>{row.pe_comment}</TableCell>
      <TableCell>{row.field_comment}</TableCell>
      <TableCell>{row.shipment_date}</TableCell>
      <TableCell>{row.paid_samples}</TableCell>
      <TableCell>{row.shipping_status}</TableCell>
      <TableCell>{row.smart_comment}</TableCell>
    </>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Priority</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Device OPN</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Qty demanded</TableCell>
                <TableCell>Qty available</TableCell>
                <TableCell>PE comment</TableCell>
                <TableCell>Field comment</TableCell>
                <TableCell>Shipment date</TableCell>
                <TableCell>Paid/Samples</TableCell>
                <TableCell>Shipping status</TableCell>
                <TableCell>Smart comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 && data.map((row) => getRowComponent(row))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
