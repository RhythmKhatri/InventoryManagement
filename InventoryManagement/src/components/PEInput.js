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

const PEInput = () => {
  const [data, setData] = useState([]);
  const [newRow, setNewRow] = useState({
    device: '',
    opn: '',
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
    // Replace with your API endpoint to fetch data
    try {
      const url = baseURL + 'getPEInputs';
      console.log('url', url)
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log('jsonData', jsonData);
      if (jsonData.Success == true) {
        setData(jsonData.pe_inputs);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addRow = async () => {
    // Replace with your API endpoint to add data
    try {
      console.log('newRow', newRow);
      let modifiedBody = {
        device_opn: newRow.device,
        version: newRow.version,
        quantity: newRow.qty,
        quantity_available: newRow.qtyAvailable,
        pe_comment: newRow.peComment
      }
      const url = baseURL + 'addPEInput';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modifiedBody)
      });
      const jsonData = await response.json();
      console.log('Added row:', jsonData);

      // Update state to refresh table
      fetchData();
      setNewRow({
        device: '',
        opn: '',
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
    setNewRow({ ...newRow, [name]: value });
  };

  const deleteRow = async (id) => {
    // Replace with your API endpoint to delete data
    let modifiedBody = {
        id : id,
      }
    try {
      const url = baseURL + 'deletePEInput';
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
                <TableCell>Device</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Qty available</TableCell>
                <TableCell>PE comment</TableCell>
                <TableCell>Action</TableCell> {/* Add this column for the delete button */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 && data.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.device_opn}</TableCell>
                  <TableCell>{row.version}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.quantity_available}</TableCell>
                  <TableCell>{row.pe_comment}</TableCell>
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
