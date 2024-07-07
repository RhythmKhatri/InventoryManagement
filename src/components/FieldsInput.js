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
  IconButton,
  Select,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

const FieldInput = () => {
  const [data, setData] = useState([]);
  const [newRow, setNewRow] = useState({
    customer: '',
    device_opn: '',
    version: '',
    quantity_demand: 0,
    shipment_date: '',
    paid_samples: '',
    shipping_status: 'No', // Default value set to 'No'
    field_comment: '',
    priority: 0
  });
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({
    customer: '',
    device_opn: '',
    version: '',
    quantity_demand: 0,
    shipment_date: '',
    paid_samples: '',
    shipping_status: 'No', // Default value set to 'No'
    field_comment:'',
    priority: 0
  });

  let baseURL = process.env.PRODUCTION_BACKEND_URL || process.env.REACT_APP_BACKEND_PORT;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = baseURL + 'getFieldInputs';
      const response = await fetch(url);
      const jsonData = await response.json();
      if (jsonData.Success === true) {
        setData(jsonData.field_inputs);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addRow = async () => {
    if(newRow.customer === '' || newRow.device_opn === '' || newRow.quantity_demand === 0) {
      alert("Customer Name, Device OPN and Quantity Demanded fields can't be empty");
      return;
    }
    try {
      const url = baseURL + 'addFieldInput';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRow)
      });
      const jsonData = await response.json();
      fetchData();
      setNewRow({
        customer: '',
        device_opn: '',
        version: '',
        quantity_demand: 0,
        shipment_date: '',
        paid_samples: '',
        shipping_status: 'No',
        field_comment:'',
        priority: 0
      });
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Hello ",name, value);
    setNewRow({ ...newRow, [name]: value });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditRowData({ ...editRowData, [name]: value });
  };

  const deleteRow = async (id) => {
    try {
      const url = baseURL + 'deleteFieldInput';
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const editRow = (row) => {
    setEditRowId(row._id);
    setEditRowData({
      customer: row.customer,
      device_opn: row.device_opn,
      version: row.version,
      quantity_demand: row.quantity_demand,
      shipment_date: row.shipment_date,
      paid_samples: row.paid_samples,
      shipping_status: row.shipping_status,
      priority: row.priority
    });
  };

  const saveRow = async (id) => {
    try {
      const url = baseURL + 'updateFieldInput';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          customer: editRowData.customer,
          device_opn: editRowData.device_opn,
          version: editRowData.version,
          quantity_demand: editRowData.quantity_demand,
          shipment_date: editRowData.shipment_date,
          paid_samples: editRowData.paid_samples,
          field_comment: editRowData.field_comment,
          shipping_status: editRowData.shipping_status,
          priority: editRowData.priority
        })
      });
      const jsonData = await response.json();
      fetchData();
      setEditRowId(null);
    } catch (error) {
      console.error('Error saving row:', error);
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
                <TableCell>Paid/Samples</TableCell>
                <TableCell>Field Comment</TableCell>
                <TableCell>isShipped</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 && data.map((row) => (
                <TableRow key={row._id}>
                  {editRowId === row._id ? (
                    <>
                      <TableCell>
                        <TextField
                          name="customer"
                          value={editRowData.customer}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="device_opn"
                          value={editRowData.device_opn}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="version"
                          value={editRowData.version}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          name="quantity_demand"
                          value={editRowData.quantity_demand}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="shipment_date"
                          value={editRowData.shipment_date}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="paid_samples"
                          value={editRowData.paid_samples}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="field_comment"
                          value={editRowData.field_comment}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          name="shipping_status"
                          value={editRowData.shipping_status}
                          onChange={handleEditChange}
                        >
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => saveRow(row._id)}>
                          <CheckIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{row.customer}</TableCell>
                      <TableCell>{row.device_opn}</TableCell>
                      <TableCell>{row.version}</TableCell>
                      <TableCell>{row.quantity_demand}</TableCell>
                      <TableCell>{row.shipment_date}</TableCell>
                      <TableCell>{row.paid_samples}</TableCell>
                      <TableCell>{row.field_comment}</TableCell>
                      <TableCell>{row.shipping_status}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => editRow(row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteRow(row._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  )}
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
                    name="field_comment"
                    label="Field comment"
                    value={newRow.field_comment}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    name="shipping_status"
                    value={newRow.shipping_status}
                    onChange={handleChange}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
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
