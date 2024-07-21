import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import { Booking } from "../_lib/types";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({
  booking,
  handleDelete,
}: {
  booking: Booking["Row"];
  handleDelete: (bookingId: number) => void;
}) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabins,
  } = booking;

  const { name, image } = cabins!;

  return (
    <div className="min-[1053px]:flex border border-primary-800">
      <div className="relative max-[1053px]:w-full h-32 aspect-square">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover border-r border-primary-800"
          fill
        />
      </div>

      <div className="flex-grow max-[300px]:px-3 px-6 py-3 flex flex-col">
        <div className="min-[437px]:flex flex-row-reverse items-center justify-between mb-4">
          {isPast(new Date(startDate)) ? (
            <span className="max-[437px]:w-fit max-[437px]:mb-4 bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="max-[437px]:w-fit max-[437px]:mb-4 bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
          <h3 className="min-[437px]:text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
        </div>

        <p className="min-[437px]:text-lg text-primary-300 ">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex max-[520px]:gap-2 max-[520px]:flex-col gap-5 mt-5 items-baseline">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-primary-300 max-[520px]:hidden">&bull;</p>
          <p className="text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400 max-[437px]:text-xs">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {!isPast(new Date(startDate)) ? (
        <div className="flex flex-col max-[1053px]:border-t min-[1053px]:border-l border-primary-800 min-[1053px]:w-[100px] divide-y divide-primary-800">
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="max-[1053px]:p-3 group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} handleDelete={handleDelete} />
          </>
        </div>
      ) : null}
    </div>
  );
}

export default ReservationCard;
