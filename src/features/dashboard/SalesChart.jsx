import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading.jsx";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

// Defines styled-component for the SalesChart layout and custom styling of grid lines
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-gray-300);
  }
`;

// Component function to display sales chart, taking bookings and numDays as props
function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  // Generates an array of dates over the specified number of days (7, 30 or 90)
  // For example, if numDays is 7, it will generate dates from 6 days ago to today, totaling 7 dates.
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  // Maps each date in allDates to an object containing formatted label, total sales, and extras sales
  const data = allDates.map((date) => {
    return {
      // Formats the current date as "Month Day" to serve as a label for chart display
      label: format(date, "MMM dd"),

      // Calculates total sales by summing totalPrice from bookings filtered by current date
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),

      // Calculates extras sales by summing extrasPrice from bookings filtered by current date
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.reatedAt)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  // Defines colors for chart elements, adjusting for light/dark mode
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  // SalesChart component - renders an area chart displaying total and extras sales data over a given date range
  return (
    // Styled container for consistent component appearance
    <StyledSalesChart>
      {/* Heading - displays date range for the current chart data */}
      <Heading as="h2">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}{" "}
      </Heading>

      {/* AreaChart - renders a responsive area chart with specified dimensions */}
      <AreaChart width={700} height={300} data={data}>
        {/* X-Axis - displays dates as labels, formatted based on 'label' key in data array; 'dataKey' specifies 'label' as the data source for X-axis labels, with tick colors set for light/dark mode support and tick lines matching the chart text color for clarity */}
        <XAxis
          dataKey="label"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />

        {/* Y-Axis - represents dollar amounts, using '$' as unit for sales values; adds a dollar sign to axis values, with custom tick color matching text for visibility and tick line color matching overall text style */}
        <YAxis
          unit="$"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />

        {/* CartesianGrid - adds a background grid for readability, using dashed lines to enhance visual separation */}
        <CartesianGrid strokeDasharray="4" />

        {/* Tooltip - provides contextual data on hover; colors are adjusted for the current mode for optimal readability */}
        <Tooltip contentStyle={{ backgroundColor: colors.background }} />

        {/* Area for Total Sales - main dataset representing all sales over the period; features a smooth monotone curve for visual flow, with stroke and fill colors customized for clarity */}
        <Area
          dataKey="totalSales"
          type="monotone"
          stroke={colors.totalSales.stroke}
          fill={colors.totalSales.fill}
          strokeWidth={2}
          name="Total sales"
          unit="$"
        />

        {/* Area for Extras Sales - secondary dataset representing additional sales information; maintains style consistency with Total Sales, using a smooth curve and customized stroke and fill colors for clarity */}
        <Area
          dataKey="extrasSales"
          type="monotone"
          stroke={colors.extrasSales.stroke}
          fill={colors.extrasSales.fill}
          strokeWidth={2}
          name="Extras sales"
          unit="$"
        />
      </AreaChart>
    </StyledSalesChart>
  );
}

export default SalesChart;
