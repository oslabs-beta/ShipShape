import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

export default function ClusterFilteringOptions({ chartDurationHours, setChartDurationHours }) {
  const [errorMessage, setErroMessage] = useState('');

  function submitHandler(e) {
    e.preventDefault();
    if (errorMessage) return;
    const { value } = e.target[1];
    setChartDurationHours(value);
  }

  function checkForError(event) {
    const { value } = event.target;

    const num = parseInt(value, 10);
    const isValidInput = (num > 0 && num <= 36) && (num === parseFloat(value));

    if (isValidInput && errorMessage) setErroMessage('');
    if (!isValidInput && !errorMessage) setErroMessage('Hours must be an positive integer between 0 and 36');
  }

  return (

    <form className="duration-select" noValidate autoComplete="off" onSubmit={(e) => submitHandler(e)}>
      <div>
        <Button variant="contained" type="submit">Reload</Button>
      </div>
      <div>
        <TextField
          // eslint-disable-next-line no-unneeded-ternary
          error={(errorMessage) ? true : false}
          id="duration-hours-int"
          label="Hours"
          defaultValue={chartDurationHours}
          onChange={(e) => checkForError(e)}
          helperText={errorMessage}
        />
      </div>
    </form>
  );
}
