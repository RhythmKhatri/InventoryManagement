import React, { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Paper,
  Button,
  TextField,
  Grid,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FieldInput = () => {
  const [data, setData] = useState([]);
  const [newRow, setNewRow] = useState({
    customer: '',
    device_opn: '',
    version: '',
    quantity_demand: 0,
    shipment_date: '',
    paid_samples: '',
    shipping_status: '',
    priority: 0
  });
  let baseURL = process.env.PRODUCTION_BACKEND_URL || process.env.REACT_APP_BACKEND_PORT;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Replace with your API endpoint to fetch data
    try {
      const url = baseURL + 'getFieldInputs';
      console.log('url', url)
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log('jsonData', jsonData);
      if (jsonData.Success == true) {
        setData(jsonData.field_inputs);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addRow = async () => {
    // Replace with your API endpoint to add data
    try {
      console.log('newRow', newRow);
      const url = baseURL + 'addFieldInput';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRow)
      });
      const jsonData = await response.json();
      console.log('Added row:', jsonData);

      // Update state to refresh table
      fetchData();
      setNewRow({
        customer: '',
        device_opn: '',
        version: '',
        quantity_demand: 0,
        shipment_date: '',
        paid_samples: '',
        shipping_status: '',
        priority: 0
      });
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const deleteRow = async (id) => {
    // Replace with your API endpoint to delete data
    let modifiedBody = {
        id : id,
      }
    try {
      const url = baseURL + 'deleteFieldInput';
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modifiedBody)
      });
      console.log('Deleted row:', id);

      // Update state to refresh table
      fetchData();
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Device OPN</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Qty demanded</TableCell>
                <TableCell>Shipment date</TableCell>
                <TableCell>Paid/Samples</TableCell> {/* Add this column for the delete button */}
                <TableCell>Shipping Status</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 && data.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.device_opn}</TableCell>
                  <TableCell>{row.version}</TableCell>
                  <TableCell>{row.quantity_demand}</TableCell>
                  <TableCell>{row.shipment_date}</TableCell>
                  <TableCell>{row.paid_samples}</TableCell>
                  <TableCell>{row.shipping_status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteRow(row._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <TextField
                    name="customer"
                    label="Customer"
                    value={newRow.customer}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="device_opn"
                    label="Device OPN"
                    value={newRow.device_opn}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    name="version"
                    label="Version"
                    value={newRow.version}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    name="quantity_demand"
                    label="Qty Demand"
                    value={newRow.quantity_demand}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="shipment_date"
                    label="Shipment Date"
                    value={newRow.shipment_date}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="paid_samples"
                    label="Paid/Samples"
                    value={newRow.paid_samples}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="shipping_status"
                    label="Shipping Status"
                    value={newRow.shipping_status}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={addRow}>
                    Add Row
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default FieldInput;
