import supabase from "./supabase";

// Function to update the guest's full name
export async function updateGuestFullName(fullName, guestId) {
  const { error: updateError } = await supabase
    .from("guests")
    .update({ fullName })
    .eq("id", guestId);

  if (updateError) {
    console.error("Error updating guest full name:", updateError.message);
    return updateError;
  }

  return null;
}
