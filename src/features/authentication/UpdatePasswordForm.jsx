import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";

// Component for updating the user's password
function UpdatePasswordForm() {
  // Setting up form management using useForm hook
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  // Using the custom hook to get updateUser function and isUpdating state
  const { updateUser, isUpdating } = useUpdateUser();

  // Function to handle form submission
  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Form row for password input with validation */}
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      {/* Form row for confirming the password input */}
      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" $variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
