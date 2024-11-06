import { Controller, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import DatePicker from "../../ui/DatePicker";
import FormRow from "../../ui/FormRow.jsx";

import { useCreateBooking } from "./useCreateBooking.js";
import { useEditBooking } from "./useEditBooking.js";
import useDatesValidation from "../check-in-out/useDatesValidation.js";

// Component for creating or editing booking details
function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { isCreating, createBooking } = useCreateBooking();
  const { isEditing, editBooking } = useEditBooking();

  // Extract booking edit details, if any
  const {
    id: editId,
    startDate,
    endDate,
    guests,
    numGuests,
    ...editValues
  } = bookingToEdit;
  const isEditSession = Boolean(editId); // Check if editing mode

  // Convert startDate and endDate to Date objects if editing
  const defaultValues = isEditSession
    ? {
        ...editValues,
        numGuests: numGuests || 1,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      }
    : {};

  // useForm hook for handling form state and validation
  const { register, handleSubmit, reset, formState, watch, setValue, control } =
    useForm({
      defaultValues, // Set the default values for the form fields
    });

  const { errors } = formState; // Retrieve form errors
  const { validateDates, error: dateError } = useDatesValidation();

  // Handles form submission for both create and edit operations
  function onSubmit(data) {
    // Validate dates using the custom hook
    const updatedNumNights = validateDates(data.startDate, data.endDate);
    if (updatedNumNights === null) {
      return; // If validation fails, exit early
    }

    const bookingData = {
      ...data,
      numNights: updatedNumNights,
      // Ensure to include startDate and endDate directly from the form data
      startDate: data.startDate, // Make sure this is in the correct format if necessary
      endDate: data.endDate, // Make sure this is in the correct format if necessary
    };

    console.log(bookingData);

    // Proceed with the edit or create operation
    if (isEditSession) {
      editBooking(
        { newBookingData: bookingData, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createBooking(bookingData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* Number of guests input */}
      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isCreating || isEditing}
          {...register("numGuests", {
            required: "This field is required",
            min: { value: 1, message: "At least 1 guest is required" },
          })}
        />
      </FormRow>

      {/* Check-in date input */}
      <FormRow
        label="Check-in date"
        error={errors?.startDate?.message || dateError}
      >
        <Controller
          name="startDate"
          control={control}
          rules={{ required: "This field is required" }} // Add validation rules
          render={({ field }) => (
            <DatePicker
              id="startDate"
              disabled={isCreating || isEditing}
              selected={field.value} // Bind the selected date
              onChange={(date) => field.onChange(date)} // Update the value in form state
            />
          )}
        />
      </FormRow>

      {/* Check-out date input */}
      <FormRow label="Check-out date" error={errors?.endDate?.message}>
        <Controller
          name="endDate"
          control={control}
          rules={{ required: "This field is required" }} // Add validation rules
          render={({ field }) => (
            <DatePicker
              id="endDate"
              disabled={isCreating || isEditing}
              selected={field.value} // Bind the selected date
              onChange={(date) => field.onChange(date)} // Update the value in form state
            />
          )}
        />
      </FormRow>

      {/* Form action buttons */}
      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>
          {isEditSession ? "Edit booking" : "Create new booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
