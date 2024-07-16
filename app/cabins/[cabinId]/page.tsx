import { Suspense } from "react";

import IndividualCabin from "@/app/_components/IndividualCabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";

import { getCabin, getCabins } from "@/app/_lib/data-service";

type Params = {
  cabinId: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  const cabin = await getCabin(params.cabinId);

  return {
    title: `Cabin ${cabin!.name}`
  }
}

export async function generateStaticParams() {
  return (await getCabins()).map(cabin => ({ cabinId: String(cabin.id) }));
}

export default async function Page({ params }: { params: Params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <IndividualCabin cabin={cabin} />
      <div>
        <h2 className="mb-10 text-accent-400 text-5xl font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
