import { Database } from "./database.types";

declare  module 'next-auth' {
  interface User {
    guestId: number;
  }
}

export type Cabin = Database["public"]["Tables"]["cabins"]["Row"]
export type FilterType = "small" | "medium" | "large" | "all";
export type Country = {
  name: string;
  flag: string;
  independent: boolean;
}
export type Settings = Database["public"]["Tables"]["settings"]["Row"]
export type Guest = Database["public"]["Tables"]["guests"]["Row"]
export type Booking = Database["public"]["Tables"]["bookings"]
