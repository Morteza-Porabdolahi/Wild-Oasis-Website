"use client";

import { updateProfile } from "../_lib/actions";

import { ReactNode } from "react";
import { Guest } from "../_lib/types";
import SubmitButton from "./SubmitButton";

export default function UpdateProfileForm({
  children,
  guest,
}: {
  children: ReactNode;
  guest: Guest;
}) {
  const { fullName, email, nationalID, countryFlag } = guest;

  return (
    <form
      action={updateProfile}
      className=" py-8 px-12 max-[330px]:px-0 max-[500px]:px-5 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          className="max-[330px]:px-2 px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          name="fullName"
          defaultValue={fullName!}
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          className="max-[330px]:px-2 px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          name="email"
          defaultValue={email!}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag ?? undefined}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID ?? undefined}
          className="max-[330px]:px-2 px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}
