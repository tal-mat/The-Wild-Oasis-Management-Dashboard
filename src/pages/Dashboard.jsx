import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from "../features/dashboard/DashboardLayout.jsx";
import DashboardFilter from "../features/dashboard/DashboardFilter.jsx";

// Main component for the dashboard
function Dashboard() {
  return (
    <>
      {/* Header row with the main title and dashboard filter */}
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      {/* Layout for displaying the dashboard content */}
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
