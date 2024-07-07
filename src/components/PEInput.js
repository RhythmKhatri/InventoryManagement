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
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

const PEInput = () => {
  const [data, setData] = useState([]);
  const [newRow, setNewRow] = useState({
    device: '',
    version: '',
    qty: 0,
    qtyAvailable: 0,
    peComment: ''
  });
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({
    device: '',
    version: '',
    qty: 0,
    qtyAvailable: 0,
    peComment: ''
  });

  let baseURL = process.env.PRODUCTION_BACKEND_URL || process.env.REACT_APP_BACKEND_PORT;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = baseURL + 'getPEInputs';
      const response = await fetch(url);
      const jsonData = await response.json();
      if (jsonData.Success === true) {
        setData(jsonData.pe_inputs);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addRow = async () => {
    if(newRow.device== '' ||
    newRow.qty== '' ||
    newRow.qtyAvailable== 0 
    )
    {
      alert("Device, Quantity and Quantity Available fields can't be empty")
      return;
    }
    try {
      let modifiedBody = {
        device_opn: newRow.device,
        version: newRow.version,
        quantity: newRow.qty,
        quantity_available: newRow.qtyAvailable,
        pe_comment: newRow.peComment
      };
      const url = baseURL + 'addPEInput';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modifiedBody)
      });
      const jsonData = await response.json();
      fetchData();
      setNewRow({
        device: '',
        version: '',
        qty: 0,
        qtyAvailable: 0,
        peComment: ''
      });
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log('value', value)
    setNewRow({ ...newRow, [name]: value });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditRowData({ ...editRowData, [name]: value });
  };

  const deleteRow = async (id) => {
    try {
      const url = baseURL + 'deletePEInput';
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
      device: row.device_opn,
      version: row.version,
      qty: row.quantity,
      qtyAvailable: row.quantity_available,
      peComment: row.pe_comment
    });
  };

  const saveRow = async (id) => {
    try {
      const url = baseURL + 'updatePEInput';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          device_opn: editRowData.device,
          version: editRowData.version,
          quantity: editRowData.qty,
          quantity_available: editRowData.qtyAvailable,
          pe_comment: editRowData.peComment
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
                <TableCell>Device</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Qty available</TableCell>
                <TableCell>PE comment</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 && data.map((row) => (
                <TableRow key={row._id}>
                  {editRowId === row._id ? (
                    <>
                      <TableCell>
                        <TextField
                          name="device"
                          value={editRowData.device}
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
                          name="qty"
                          value={editRowData.qty}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          name="qtyAvailable"
                          value={editRowData.qtyAvailable}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="peComment"
                          value={editRowData.peComment}
                          onChange={handleEditChange}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => saveRow(row._id)}>
                          <CheckIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{row.device_opn}</TableCell>
                      <TableCell>{row.version}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.quantity_available}</TableCell>
                      <TableCell>{row.pe_comment}</TableCell>
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
                    name="device"
                    label="Device"
                    value={newRow.device}
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
                    name="qty"
                    label="Qty"
                    value={newRow.qty}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    name="qtyAvailable"
                    label="Qty available"
                    value={newRow.qtyAvailable}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="peComment"
                    label="PE comment"
                    value={newRow.peComment}
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

export default PEInput;
