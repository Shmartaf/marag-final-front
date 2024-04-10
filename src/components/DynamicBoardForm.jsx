/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
} from "@mui/material";

const DynamicBoardForm = (onCreateBoard) => {
  const [board_name, setBoardName] = useState("");
  const [team, setTeam] = useState("");
  const [columnName, setColumnName] = useState("");
  const [columnType, setColumnType] = useState("string");
  const [columnOptions, setColumnOptions] = useState([]);

  const [boardFields, setBoardFields] = useState([]);

  const handleAddField = () => {
    if (columnName.trim() !== "") {
      setBoardFields([
        ...boardFields,
        { name: columnName, type: columnType, options: columnOptions },
      ]);
      setColumnName("");
      setColumnOptions([]);
    }
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...boardFields];
    updatedFields.splice(index, 1);
    setBoardFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const schema = {
      type: "object",
      properties: {},
    };
    boardFields.forEach((field) => {
      schema.properties[field.name] = { type: field.type };
      if (field.options.length > 0) {
        schema.properties[field.name].enum = field.options;
      }
    });

    const board = {
      username: "admin",
      board_id: "1",
      board_name: board_name,
      users: [],
      team: team,
      incidents: [],
    };
    const mapping = {
      ui_schema: {
        type: "VerticalLayout",
        elements: boardFields.map((field) => ({
          type: "Control",
          scope: `#/properties/${field.name}`,
        })),
      },
      schema: schema,
    };
    onCreateBoard({
      username: "admin",
      board_name: board_name,
      users: [],
      team: team,
      incidents: [],
      mapping,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Dynamic Board</h2>
      <div>
        <TextField
          label="Board Name"
          value={board_name}
          onChange={(e) => setBoardName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          style={{ marginRight: "10px" }}
        />
      </div>
      <div>
        <TextField
          label="Column Name"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <FormControl style={{ marginRight: "10px" }}>
          <InputLabel>Column Type</InputLabel>
          <Select
            value={columnType}
            onChange={(e) => setColumnType(e.target.value)}
          >
            <MenuItem value="string">String</MenuItem>
            <MenuItem value="number">Number</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="boolean">Boolean</MenuItem>
            <MenuItem value="radio">Radio</MenuItem>
            <MenuItem value="checkbox">Checkbox</MenuItem>
          </Select>
        </FormControl>
        {columnType === "radio" || columnType === "checkbox" ? (
          <TextField
            label="Options (comma-separated)"
            value={columnOptions.join(",")}
            onChange={(e) => setColumnOptions(e.target.value.split(","))}
            style={{ marginRight: "10px" }}
          />
        ) : null}
        <Button
          variant="contained"
          onClick={handleAddField}
          style={{ marginLeft: "10px" }}
        >
          Add Field
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {boardFields.map((field, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <span>
              {field.name} ({field.type})
            </span>
            <Button
              variant="outlined"
              onClick={() => handleRemoveField(index)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" type="submit">
          Create Board
        </Button>
      </div>
    </form>
  );
};

export default DynamicBoardForm;
