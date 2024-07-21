import TextExpander from "@/app/_components/TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

import { Cabin } from "../_lib/types";

export default function IndividualCabin({ cabin }: { cabin: Cabin }) {
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="min-[795px]:grid grid-cols-[3fr_4fr] max-[940px]:gap-8 gap-20 border border-primary-800 py-3 max-[1200px]:p-0 px-10 mb-20">
      <div className="max-[795px]:h-52 relative max-[1200px]:scale-100 max-[1200px]:translate-x-0 scale-[1.15] -translate-x-3">
        <Image
          fill
          className="object-cover h-full w-full"
          src={image}
          alt={`Cabin ${name}`}
        />
      </div>

      <div className="max-[1200px]:px-5 max-[1200px]:py-2">
        <h3 className="max-[1200px]:w-full max-[441px]:text-2xl max-[1200px]:translate-x-0 max-[1200px]:text-4xl text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
