# The Wild Oasis (Management Dashboard) | 🌴

**The Wild Oasis** is a resort management tool for employees, featuring a dashboard designed to streamline the management of bookings, cabins, and guest interactions. It offers secure authentication, customizable settings, and insightful visualizations to enhance operational efficiency.

---

## Project Description

The Wild Oasis dashboard is a sophisticated platform for managing a resort’s operational data. The platform enables real-time tracking of reservations, occupancy, and guest check-ins/outs, helping managers keep a pulse on key performance metrics. It’s designed with a modern and accessible UI that empowers staff to make informed decisions.

---

## Features

1. **Cabin Management**
    - View and manage cabin availability and details.
    - Check occupancy status in real time.

2. **Booking Management**
    - Filter, sort update, and cancel bookings easily.
    - Access detailed reservation information.

3. **Authentication**
    - Secure user authentication using Supabase.
    - Role-based access control for staff.

4. **Check-In/Check-Out**
    - Quick check-in and check-out processes.
    - Track guest check-in/out times.

5. **Dashboard Overview**
    - At-a-glance view of occupancy and booking statistics.
    - Visualizations of key metrics and trends.

6. **Settings Management**
    - Customize user preferences and manage user roles.
    - Configure API integrations and environment settings.

---

## Technologies Used

- **Frontend:**
    - **React**: Main framework for a responsive and dynamic UI.
    - **React Router**: Handles app navigation and routing.
    - **React Query**: Manages server state, data fetching, caching, and synchronization across components.
    - **Styled-components**: Provides theme-based, reusable styling.
    - **Recharts**: For interactive and customizable charts displaying occupancy and sales trends.
    - **React DatePicker**: Allows smooth date selection for booking and filtering.
    - **React Icons**: Enhances the UI with easily interpretable icons.
    - **React Hot Toast**: Provides responsive notifications to keep users informed.
    - **React Hook Form**: Manages forms and input validation.

- **Backend and Database:**
    - **Supabase**: Acts as the backend for real-time data, authentication, and database management.
    - **dotenv**: Secures environment variables for authentication and API access.

- **Utilities and Dev Tools:**
    - **Date-fns**: Library for date formatting and calculations.
    - **React Error Boundary**: Ensures resilient error handling and smooth recovery.
    - **ESLint**: Linting tool for code quality.
    - **Vite**: Fast build tool for local development.
    - **Globals**: Helps manage global variables for a consistent environment.

---

## Installation

### Prerequisites

- Ensure Node.js and npm are installed.
- Set up a Supabase account to enable real-time data updates and user authentication.

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tal-mat/the-wild-oasis.git
   cd the-wild-oasis

2. **Install dependencies:**
   ```bash
   npm install

3. **Set up environment variables:**
   In the root directory, create a .env file and add your Supabase credentials:
   ```bash
   VITE_SUPABASE_KEY={your key}

4. **Start the development server:**
   ```bash
   npm run dev

5. **Mock User Details:**
   ```
   mockUser@test.com, 123456
