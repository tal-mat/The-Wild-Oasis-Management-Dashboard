import React, { forwardRef } from "react";
import DatePickerComponent from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { format, startOfDay } from "date-fns";

// Styled container for the DatePicker
const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid var(--color-gray-300);
    border-radius: 4px;
    &:focus {
      outline: none;
      border-color: var(--color-blue-500);
    }
  }
`;

// Use forwardRef to correctly pass the ref to DatePickerComponent
const DatePicker = forwardRef(
  ({ id, disabled, onChange, value, ...props }, ref) => {
    // Convert the selected date to ISO string format before passing it to onChange
    const handleDateChange = (date) => {
      if (date) {
        // Start of day in local time
        const localDate = startOfDay(date);
        onChange(format(localDate, "yyyy-MM-dd")); // Format as YYYY-MM-DD
      } else {
        onChange(""); // Handle null selection
      }
    };

    return (
      <DatePickerContainer>
        <DatePickerComponent
          id={id}
          selected={value ? new Date(value) : null} // Convert string to Date object for DatePicker
          onChange={handleDateChange} // Update to the new handleDateChange function
          dateFormat="MMMM d, yyyy" // Display format for the date
          disabled={disabled} // Handle disabled state
          ref={ref} // Forward ref to DatePickerComponent
          {...props} // Spread any additional props
        />
      </DatePickerContainer>
    );
  },
);

export default DatePicker;
