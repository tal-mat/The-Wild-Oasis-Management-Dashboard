import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow.jsx";

import { useCreateCabin } from "./useCreateCabin.js";
import { useEditCabin } from "./useEditCabin.js";

// Component for creating or editing cabin details
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // Hooks for managing create and edit cabin functionality
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  // Extract cabin edit details, if any
  const { id: editId, ...editValues } = cabinToEdit;
  const idEditSession = Boolean(editId);

  // useForm hook for handling form state and validation
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: idEditSession ? editValues : {},
  });
  const { errors } = formState;

  // Handles form submission for both create and edit operations
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // Edit cabin if in edit mode, otherwise create new cabin
    if (idEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* Cabin name input */}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* Maximum capacity input */}
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      {/* Regular price input */}
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      {/* Discount input with validation */}
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value, { regularPrice }) =>
              value <= regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      {/* Description input */}
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* Cabin photo input */}
      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: idEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      {/* Form action buttons */}
      <FormRow>
        {/* Reset button to cancel form */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        {/* Submit button, disabled if working */}
        <Button disabled={isWorking}>
          {idEditSession ? "Edit cabin" : "Create new cabin"}{" "}
          {/* Button label */}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
