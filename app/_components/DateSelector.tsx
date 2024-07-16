'use client'

import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";

import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Cabin, Settings } from "../_lib/types";
import { useReservation } from "./ReservationConetext";

function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from ?? "", end: range.to ?? "" })
    )
  );
}

type Props = {
  settings: Settings;
  cabin: Cabin;
  bookedDates: Date[];
}

function DateSelector({ settings, cabin, bookedDates }: Props) {
  const { updateRange, range } = useReservation()

  const { regularPrice, discount } = cabin;

  const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range;

  const numNights = differenceInDays(displayRange?.to ?? "", displayRange?.from ?? "");
  const cabinPrice = numNights * (regularPrice - discount);


  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength! + 1}
        selected={displayRange}
        max={maxBookingLength!}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        onSelect={(range) => updateRange(range)}
        disabled={(curDate) => isPast(curDate) || bookedDates.some(date => isSameDay(date, curDate))}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range && (range.from || range.to) ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => updateRange({ from: undefined, to: undefined })}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;