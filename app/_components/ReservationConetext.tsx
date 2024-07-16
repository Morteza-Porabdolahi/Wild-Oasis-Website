'use client'

import { createContext, ReactNode, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

const ReservationContext = createContext<{ range: DateRange | undefined, updateRange: (range: DateRange | undefined) => void }>({
  range: undefined,
  updateRange: () => { },
})

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>()

  function updateRange(range: DateRange | undefined) {
    setRange(range)
  }

  return (
    <ReservationContext.Provider value={{
      range,
      updateRange
    }}>{children}</ReservationContext.Provider>
  )
}

export function useReservation() {
  const value = useContext(ReservationContext)

  if (!value) throw Error('Context is used outside of its provider')

  return value;
}
