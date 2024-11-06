import { add } from "date-fns";

// Utility function to get a date from today by a certain number of days, with an optional time setting to UTC midnight.
function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

// Sample booking data for different cabins.
export const bookings = [
  // Booking details for CABIN 001: created 20 days ago, starts today, ends in 7 days, guest ID 2, breakfast included, unpaid, 1 guest.
  {
    createdAt: fromToday(-20, true),
    startDate: fromToday(0),
    endDate: fromToday(7),
    cabinId: 1,
    guestId: 2,
    hasBreakfast: true,
    observations:
      "I have a gluten allergy and would like to request a gluten-free breakfast.",
    isPaid: false,
    numGuests: 1,
  },
  // Booking details for CABIN 001: created 33 days ago, started 23 days ago, ended 13 days ago, guest ID 3, breakfast included, paid, 2 guests.
  {
    createdAt: fromToday(-33, true),
    startDate: fromToday(-23),
    endDate: fromToday(-13),
    cabinId: 1,
    guestId: 3,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 2,
  },
  // Booking details for CABIN 001: created 27 days ago, starting in 12 days, ending in 18 days, guest ID 4, no breakfast, unpaid, 2 guests.
  {
    createdAt: fromToday(-27, true),
    startDate: fromToday(12),
    endDate: fromToday(18),
    cabinId: 1,
    guestId: 4,
    hasBreakfast: false,
    observations: "",
    isPaid: false,
    numGuests: 2,
  },

  // Booking details for CABIN 002: created 45 days ago, started 45 days ago, ended 29 days ago, guest ID 5, no breakfast, paid, 2 guests.
  {
    createdAt: fromToday(-45, true),
    startDate: fromToday(-45),
    endDate: fromToday(-29),
    cabinId: 2,
    guestId: 5,
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 2,
  },
  // Booking details for CABIN 002: created 2 days ago, starting in 15 days, ending in 18 days, guest ID 6, breakfast included, paid, 2 guests.
  {
    createdAt: fromToday(-2, true),
    startDate: fromToday(15),
    endDate: fromToday(18),
    cabinId: 2,
    guestId: 6,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 2,
  },
  // Booking details for CABIN 002: created 5 days ago, starting in 33 days, ending in 48 days, guest ID 7, breakfast included, unpaid, 2 guests.
  {
    createdAt: fromToday(-5, true),
    startDate: fromToday(33),
    endDate: fromToday(48),
    cabinId: 2,
    guestId: 7,
    hasBreakfast: true,
    observations: "",
    isPaid: false,
    numGuests: 2,
  },

  // Booking details for CABIN 003: created 65 days ago, started 25 days ago, ended 20 days ago, guest ID 8, breakfast included, paid, 4 guests.
  {
    createdAt: fromToday(-65, true),
    startDate: fromToday(-25),
    endDate: fromToday(-20),
    cabinId: 3,
    guestId: 8,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4,
  },
  // Booking details for CABIN 003: created 2 days ago, starting 2 days ago, ending today, guest ID 9, no breakfast, paid, 3 guests.
  {
    createdAt: fromToday(-2, true),
    startDate: fromToday(-2),
    endDate: fromToday(0),
    cabinId: 3,
    guestId: 9,
    hasBreakfast: false,
    observations: "We will be bringing our small dog with us",
    isPaid: true,
    numGuests: 3,
  },
  // Booking details for CABIN 003: created 14 days ago, started 14 days ago, ended 11 days ago, guest ID 10, breakfast included, paid, 4 guests.
  {
    createdAt: fromToday(-14, true),
    startDate: fromToday(-14),
    endDate: fromToday(-11),
    cabinId: 3,
    guestId: 10,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4,
  },

  // Booking details for CABIN 004: created 30 days ago, started 4 days ago, ends in 8 days, guest ID 11, breakfast included, paid, 4 guests.
  {
    createdAt: fromToday(-30, true),
    startDate: fromToday(-4),
    endDate: fromToday(8),
    cabinId: 4,
    guestId: 11,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4,
  },
  // Booking details for CABIN 004: created 1 day ago, starting in 12 days, ending in 17 days, guest ID 12, breakfast included, unpaid, 4 guests.
  {
    createdAt: fromToday(-1, true),
    startDate: fromToday(12),
    endDate: fromToday(17),
    cabinId: 4,
    guestId: 12,
    hasBreakfast: true,
    observations: "",
    isPaid: false,
    numGuests: 4,
  },
  // Booking details for CABIN 004: created 3 days ago, starting in 18 days, ending in 19 days, guest ID 13, no breakfast, paid, 1 guest.
  {
    createdAt: fromToday(-3, true),
    startDate: fromToday(18),
    endDate: fromToday(19),
    cabinId: 4,
    guestId: 13,
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 1,
  },

  // Booking details for CABIN 005: created today, starting in 14 days, ending in 21 days, guest ID 14, breakfast included, unpaid, 5 guests.
  {
    createdAt: fromToday(0, true),
    startDate: fromToday(14),
    endDate: fromToday(21),
    cabinId: 5,
    guestId: 14,
    hasBreakfast: true,
    observations: "",
    isPaid: false,
    numGuests: 5,
  },
  // Booking details for CABIN 005: created 6 days ago, started 6 days ago, ended 4 days ago, guest ID 15, breakfast included, paid, 4 guests.
  {
    createdAt: fromToday(-6, true),
    startDate: fromToday(-6),
    endDate: fromToday(-4),
    cabinId: 5,
    guestId: 15,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4,
  },
  // Booking details for CABIN 005: created 4 days ago, started 4 days ago, ended 1 day ago, guest ID 16, no breakfast, paid, 6 guests.
  {
    createdAt: fromToday(-4, true),
    startDate: fromToday(-4),
    endDate: fromToday(-1),
    cabinId: 5,
    guestId: 16,
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 6,
  },

  // Booking details for CABIN 006: created 3 days ago, starting today, ending in 11 days, guest ID 17, no breakfast, paid, 6 guests.
  {
    createdAt: fromToday(-3, true),
    startDate: fromToday(0),
    endDate: fromToday(11),
    cabinId: 6,
    guestId: 17,
    hasBreakfast: false,
    observations:
      "We will be checking in late, around midnight. Hope that's okay :)",
    isPaid: true,
    numGuests: 6,
  },
  // Booking details for CABIN 006: created 16 days ago, started 16 days ago, ended 9 days ago, guest ID 18, breakfast included, paid, 4 guests.
  {
    createdAt: fromToday(-16, true),
    startDate: fromToday(-16),
    endDate: fromToday(-9),
    cabinId: 6,
    guestId: 18,
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4,
  },
  // Booking details for CABIN 006: created 7 days ago, starting in 5 days, ending in 9 days, guest ID 19, breakfast included, unpaid, 2 guests.
  {
    createdAt: fromToday(-7, true),
    startDate: fromToday(5),
    endDate: fromToday(9),
    cabinId: 6,
    guestId: 19,
    hasBreakfast: true,
    observations: "",
    isPaid: false,
    numGuests: 2,
  },
];
