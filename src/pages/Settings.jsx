import UpdateSettingsForm from "../features/settings/UpdateSettingsForm.jsx";
import Heading from "../ui/Heading";
import Row from "../ui/Row.jsx";

// Main component for the Settings page
function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
