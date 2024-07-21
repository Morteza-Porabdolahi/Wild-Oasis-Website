"use client";

import { User } from "next-auth";
import { Cabin } from "../_lib/types";
import { useReservation } from "./ReservationConetext";
import Image from "next/image";
import { differenceInDays } from "date-fns";
import { createReservations } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }: { cabin: Cabin; user: User }) {
  const { range, updateRange } = useReservation();
  // CHANGE
  const { id, maxCapacity, regularPrice, discount } = cabin;

  const startDate = range?.from;
  const endDate = range?.to;

  const numNights = differenceInDays(endDate ?? "", startDate ?? "");
  const cabinPrice = numNights * (regularPrice - discount);

  const actionWithData = createReservations.bind(null, {
    cabinId: id,
    numNights,
    cabinPrice,
    startDate,
    endDate,
  });

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 max-[355px]:px-0 px-16 py-2 flex max-[940px]:flex-col justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-2 items-center">
          <Image
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image!}
            alt="User Logo"
            width={30}
            height={8}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await actionWithData(formData);
          updateRange(undefined);
        }}
        className="bg-primary-900 py-10 px-16 max-[585px]:px-5 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity! }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="max-[475px]:flex-col flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          {!startDate || !endDate ? null : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
