"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ReactNode } from "react";
import { FilterType } from "../_lib/types";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const pathname = usePathname()

  const activeFilter = (searchParams.get("capacity") ?? "all") as FilterType;

  function handleFilter(filter: FilterType) {
    const params = new URLSearchParams(searchParams)

    params.set("capacity", filter)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="border rounded border-primary-800 flex">
      <Button filter="all" activeFilter={activeFilter} handleFilter={handleFilter}>
        All cabins
      </Button>
      <Button filter="small" activeFilter={activeFilter} handleFilter={handleFilter}>
        1&mdash;3 guests
      </Button>
      <Button filter="medium" activeFilter={activeFilter} handleFilter={handleFilter}>4&mdash;7 guests
      </Button>
      <Button filter="large" activeFilter={activeFilter} handleFilter={handleFilter}>8&mdash;12 guests
      </Button>
    </div>
  )
}

type ButtonProps = {
  handleFilter: (filter: FilterType) => void;
  activeFilter: FilterType;
  filter: FilterType;
  children: ReactNode
}

function Button({ filter, handleFilter, activeFilter, children }: ButtonProps) {
  return (
    <button onClick={() => handleFilter(filter)} className={`${filter === activeFilter ? "bg-primary-700 text-primary-50" : ""} px-5 py-2 transition-colors hover:bg-primary-700`}>{children}</button>
  )
}


