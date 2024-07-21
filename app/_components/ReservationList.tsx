"use client";

import { useOptimistic } from "react";

import ReservationCard from "./ReservationCard";

import { deleteReservation } from "../_lib/actions";
import { Booking } from "../_lib/types";

export const ReservationList = ({
  bookings,
}: {
  bookings: Booking["Row"][];
}) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          handleDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
};
