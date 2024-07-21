"use client";

import {
  HomeModernIcon,
  InformationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function HamburgerMenu({
  session,
}: {
  session: Session | null;
}) {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="min-[734px]:hidden z-[11] fixed right-5">
      <div
        onClick={() => setOpen((o) => !o)}
        className={`transition-all bg-accent-500 px-2 py-2.5 rounded-full relative hover:gap-1.5 cursor-pointer flex flex-col gap-1 z-[11]`}
      >
        <span className="bg-primary-100 block w-6 h-[3px] rounded"></span>
        <span className="bg-primary-100 block w-6 h-[3px] rounded"></span>
        <span className="bg-primary-100 block w-6 h-[3px] rounded"></span>
      </div>
      <ul
        className={`${
          isOpen ? "scale-1 rounded-bl-none" : "rounded-bl-full scale-0"
        } flex flex-col pt-20 divide-y divide-primary-800 origin-[right_top] [transition:transform_500ms,border-radius_550ms] fixed top-0 bottom-0 right-0 left-0 bg-primary-900 min-[400px]:pt-24`}
      >
        <li
          className={`${
            isOpen ? "opacity-1" : "opacity-0"
          } transition-all delay-[300ms] p-6 border-t border-primary-800`}
        >
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-accent-400 transition-colors"
          >
            <HomeIcon className="size-6" />
            Home
          </Link>
        </li>
        <li
          className={`${
            isOpen ? "opacity-1" : "opacity-0"
          } transition-all delay-[340ms] p-6`}
        >
          <Link
            href="/cabins"
            className="flex items-center gap-2 hover:text-accent-400 transition-colors"
          >
            <HomeModernIcon className="size-6" />
            Cabins
          </Link>
        </li>
        <li
          className={`${
            isOpen ? "opacity-1" : "opacity-0"
          } transition-all delay-[370ms] p-6`}
        >
          <Link
            href="/about"
            className="flex items-center gap-2 hover:text-accent-400 transition-colors"
          >
            <InformationCircleIcon className="size-6" />
            About
          </Link>
        </li>
        <li
          className={`${
            isOpen ? "opacity-1" : "opacity-0"
          } transition-all delay-[400ms] p-6`}
        >
          {session?.user?.image ? (
            <Link
              href="/account"
              className="flex items-center gap-2 hover:text-accent-400 transition-colors"
            >
              <Image
                referrerPolicy="no-referrer"
                src={session.user.image}
                width={30}
                height={8}
                className="rounded-full"
                alt="User Logo"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <>
              <Link
                href="/account"
                className="flex gap-2 items-center hover:text-accent-400 transition-colors"
              >
                <UserCircleIcon className="size-6" />
                Guest area
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}
