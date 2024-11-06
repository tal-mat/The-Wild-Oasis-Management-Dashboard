import supabase from "./supabase";

import { getToday } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/constants.js";

// Fetches all bookings from the database.
export async function getBookings({ filter, sortBy, page }) {
  let query = supabase.from("bookings").select(
    "id, createdAt, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
    { count: "exact" }, // Returns the total number of records.
  );

  // FILTER: Applies the specified filter to the query if provided.
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT: Sorts the bookings by the specified field and direction (ascending or descending) if provided.
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // Pagination: Calculate the range of results to fetch based on the current page.
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

// Retrieves a specific booking by its ID.
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISOString
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("createdAt, totalPrice, extrasPrice")
    .gte("createdAt", date)
    .lte("createdAt", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order("createdAt");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

// Updates a specific booking with the provided data.
export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

// Deletes a booking identified by its ID.
export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

// Creates or edits a booking based on its id
export async function createEditBooking(newBooking, id) {
  console.log("newBooking before changes: ", newBooking);

  // Remove unnecessary properties from newBooking
  delete newBooking.cabins;

  console.log("newBooking after changes: ", newBooking);

  // Prepare to create or update booking
  let query = supabase.from("bookings");

  // A) CREATE
  if (!id) {
    query = query.insert([
      {
        ...newBooking,
        createdAt: new Date().toISOString(),
      },
    ]);
  } else {
    // B) EDIT
    query = query.update(newBooking).eq("id", id);
  }

  // Execute the query and handle errors
  const { data, error } = await query.select().single();

  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error("Booking could not be created or updated");
  }

  return data;
}
