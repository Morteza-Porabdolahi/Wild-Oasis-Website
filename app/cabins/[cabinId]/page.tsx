import { Suspense } from "react";

import IndividualCabin from "@/app/_components/IndividualCabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";

import { getCabin, getCabins } from "@/app/_lib/data-service";
import Title from "@/app/_components/Title";

type Params = {
  cabinId: string;
};

export async function generateMetadata({ params }: { params: Params }) {
  const cabin = await getCabin(params.cabinId);

  return {
    title: `Cabin ${cabin!.name}`,
  };
}

export async function generateStaticParams() {
  return (await getCabins()).map((cabin) => ({ cabinId: String(cabin.id) }));
}

export default async function Page({ params }: { params: Params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <IndividualCabin cabin={cabin} />
      <div>
        <Title>Reserve {cabin.name} today. Pay on arrival.</Title>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
