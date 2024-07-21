"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationConetext";

function ReservationReminder() {
  const { range, updateRange } = useReservation();
  // CHANGE

  if (!range || !range.from || !range.to) return null;

  return (
    <div className="max-[850px]:translate-x-0 max-[850px]:left-4 max-[850px]:right-4 fixed bottom-6 left-1/2 -translate-x-1/2 py-4 px-6 rounded-full bg-accent-500 text-primary-800 font-semibold shadow-xl shadow-slate-900 flex max-[385px]:gap-2 gap-8 items-center">
      <p className="max-[850px]:flex-1 max-[850px]:text-sm max-[385px]:text-xs">
        <span>👋</span> Don&apos;f forget to reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        onClick={() => updateRange(undefined)}
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
      >
        <XMarkIcon className="size-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
