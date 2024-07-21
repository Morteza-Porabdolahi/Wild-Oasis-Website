import { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-center max-[420px]:text-2xl text-4xl mb-10 text-accent-400 font-medium">
      {children}
    </h1>
  );
}
