import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

import { FilterType } from "../_lib/types";

export default async function CabinList({ filter }: { filter: FilterType }) {
  // CHANGE
  const cabins = await getCabins();

  if (cabins.length === 0) return null;

  let filteredCabins =
    filter === 'small' ? cabins.filter(cabin => +cabin.maxCapacity! <= 3)
      : filter === "medium" ? cabins.filter(cabin => +cabin.maxCapacity! > 3 && +cabin.maxCapacity! < 8)
        : filter === "large" ? cabins.filter(cabin => +cabin.maxCapacity! >= 8)
          : cabins;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  )
}
