import Image from "next/image";
import Link from "next/link";

import bg from "@/public/bg.png";

export default function Home() {
  return (
    <main className="mt-24">
      <Image src={bg} fill className="object-cover object-top" placeholder="blur" quality={80} alt="Mountains and forests with two cabins" />

      <div className="relative z-10 text-center">
        <h1 className="max-[400px]:text-[1.6rem] max-[949px]:text-6xl max-[614px]:text-4xl text-8xl text-primary-50 mb-12 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="max-[400px]:text-sm max-[614px]:text-base max-[614px]:px-6 max-[614px]:py-5 bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
