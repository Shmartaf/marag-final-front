/* eslint-disable no-unused-vars */
import React from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { ThemeProvider } from "./theme";

const DynamicForm = (board) => {
  // Extract board details from the JSON
  const { board: boardDetails, mapping } = board;

  // Check if incidents exists, provide an empty array if it doesn't
  const { incidents = [] } = boardDetails || {};

  // Extract schema and UI schema from the mapping
  const { schema, ui_schema: uiSchema } = mapping;

  // Initial data for the form
  const initialData = incidents.reduce((data, incident) => {
    data[incident.title] = incident;
    return data;
  }, {});

  return (
    <div>
      <ThemeProvider>
        <h1>Dynamic Form</h1>
        <JsonForms
          schema={schema}
          uischema={uiSchema}
          data={initialData}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data, errors }) => console.log(data)}
        />
      </ThemeProvider>
    </div>
  );
};

export default DynamicForm;
