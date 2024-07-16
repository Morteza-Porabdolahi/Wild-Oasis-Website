import Logo from "@/app/_components/Logo"
import Navigation from "@/app/_components/Navigation"

import '@/app/_styles/globals.css'
import { Josefin_Sans } from 'next/font/google'
import Header from "./_components/Header"
import { ReservationProvider } from "./_components/ReservationConetext"

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  // title: 'The Wild Oasis'
  title: {
    template: "The Wild Oasis | %s",
    default: "The Wild Oasis"
  },
  description: "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-primary-950 antialiased text-primary-100 min-h-screen relative flex flex-col ${josefin.className}`}>
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>
              {children}
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
