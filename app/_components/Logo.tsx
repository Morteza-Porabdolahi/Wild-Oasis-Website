import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <div className="w-16 h-16 relative max-[400px]:w-12 max-[400px]:h-12">
        <Image src="/logo.png" fill className="object-cover" alt="The Wild Oasis logo" />
      </div>
      <span className="text-xl max-[400px]:text-lg font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}
