import { Suspense } from "react";

import Spinner from "../_components/Spinner";
import CabinList from "../_components/CabinList";
import Filter from "../_components/Filter";

import { FilterType } from "../_lib/types";
import ReservationReminder from "../_components/ReservationReminder";
import Title from "../_components/Title";

export const metadata = {
  title: "Cabins",
};

export const revalidate = 3600;

export default function Page({
  searchParams,
}: {
  searchParams: { capacity?: FilterType };
}) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <Title>Our Luxury Cabins</Title>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense key={filter} fallback={<Spinner />}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
