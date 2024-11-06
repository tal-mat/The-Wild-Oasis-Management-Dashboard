import { useState } from "react";

// Hook to validate booking dates and calculate the number of nights
function useDatesValidation() {
  const [error, setError] = useState(null);

  const validateDates = (checkInDate, checkOutDate) => {
    setError(null);

    if (!checkInDate || !checkOutDate) {
      setError("Both dates must be provided.");
      return null; // No valid calculation if any date is missing
    }

    const checkInTime = new Date(checkInDate).getTime();
    const checkOutTime = new Date(checkOutDate).getTime();

    if (checkInTime >= checkOutTime) {
      setError("Check-in date must be before check-out date.");
      return null;
    }

    // Calculate number of nights
    const numNights = Math.ceil(
      (checkOutTime - checkInTime) / (1000 * 60 * 60 * 24),
    );
    return numNights; // Return the calculated number of nights
  };

  return { validateDates, error };
}

export default useDatesValidation;
