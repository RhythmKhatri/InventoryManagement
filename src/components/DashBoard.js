import React, { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid
} from '@mui/material';

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
      if (jsonData.Success == true) {
        setData(jsonData.dashboard);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
                <TableCell>Shipment date</TableCell>
                <TableCell>Paid/Samples</TableCell>
                <TableCell>Shipping status</TableCell>
                <TableCell>Smart comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 && data.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.priority}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.device_opn}</TableCell>
                  <TableCell>{row.version}</TableCell>
                  <TableCell>{row.quantity_demand}</TableCell>
                  <TableCell>{row.quantity_available}</TableCell>
                  <TableCell>{row.pe_comment}</TableCell>
                  <TableCell>{row.shipment_date}</TableCell>
                  <TableCell>{row.paid_samples}</TableCell>
                  <TableCell>{row.shipping_status}</TableCell>
                  <TableCell>{row.smart_comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
