import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Paper, Button, TextField, Checkbox, Modal, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MessageBlock from './MessageBlock';

const DynamicTable = ({ board }) => {
    const [newIncident, setNewIncident] = useState({});
    const [selectedIncident, setSelectedIncident] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (!board) {
        return <div>No board data available</div>;
    }

    const fieldColumns = board.mapping.schema.properties || {};
    const incidents = board.incidents || [];

    const renderInputComponent = (columnName, columnType) => {
        switch (columnType) {
            case 'string':
                return <TextField
                    type="text"
                    value={newIncident[columnName] || ''}
                    onChange={e => handleInputChange(e, columnName)}
                />;
            case 'number':
                return <TextField
                    type="number"
                    value={newIncident[columnName] || ''}
                    onChange={e => handleInputChange(e, columnName)}
                />;
            case 'date':
                return <TextField
                    type="date"
                    value={newIncident[columnName] || ''}
                    onChange={e => handleInputChange(e, columnName)}
                />;
            case 'boolean':
                return <Checkbox
                    checked={newIncident[columnName] || false}
                    onChange={e => handleInputChange(e, columnName)}
                />;
            default:
                return null;
        }
    };

    const handleInputChange = (e, columnName) => {
        let value = e.target.value;
        if (fieldColumns[columnName].type === 'boolean') {
            value = e.target.checked;
        }
        setNewIncident({ ...newIncident, [columnName]: value });
    };

    const handleAddIncident = () => {
        incidents.push(newIncident);
        setNewIncident({});
    };

    const handleViewIncident = (incident) => {
        setSelectedIncident(incident);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedIncident(null);
        setIsModalOpen(false);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {Object.keys(fieldColumns).map(columnName => (
                            <TableCell key={columnName}>{columnName}</TableCell>
                        ))}
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {incidents.map(incident => (
                        <TableRow key={incident._id}>
                            {Object.keys(fieldColumns).map(columnName => (
                                <TableCell key={columnName}>
                                    {incident[columnName]}
                                </TableCell>
                            ))}
                            <TableCell>
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                                <Button variant="outlined" onClick={() => handleViewIncident(incident)}>View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        {Object.keys(fieldColumns).map(columnName => (
                            <TableCell key={columnName}>
                                {renderInputComponent(columnName, fieldColumns[columnName].type)}
                            </TableCell>
                        ))}
                        <TableCell>
                            <Button variant="contained" onClick={handleAddIncident}>Add</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    outline: 'none',
                    borderRadius: '8px',
                    width: '60%',
                    maxWidth: '600px',
                }}>
                    <Typography variant="h6" id="modal-title">
                        Incident Details
                    </Typography>
                    <Typography variant="body1" id="modal-description">
                        {selectedIncident && (
                            <div>
                                {Object.keys(selectedIncident).map(key => (
                                    <div key={key}>
                                        <strong>{key}: </strong>{selectedIncident[key]}
                                    </div>
                                ))}
                                <MessageBlock />
                            </div>
                        )}
                    </Typography>
                </div>
            </Modal>
        </TableContainer >
    );
};

export default DynamicTable;
