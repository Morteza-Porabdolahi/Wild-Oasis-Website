"use server"

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth"
import { createBooking, deleteBooking, getBooking, updateBooking, updateGuest } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}

async function authorizeUser() {
  const session = await auth();
  if (!session) throw new Error('You must be logged in!')

  return session
}

export async function updateProfile(formData: FormData) {
  const session = await authorizeUser();

  const nationalID = formData.get('nationalID') as string;
  const [nationality, countryFlag] = (formData.get('nationality') as string).split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error('Please provide a valid national ID')

  const updatedGuest = {
    nationalID,
    nationality,
    countryFlag
  };

  await updateGuest(session.user!.guestId, updatedGuest)

  revalidatePath('/account/profile', 'page')
}

export async function deleteReservation(bookingId: number) {
  const session = await authorizeUser();

  const { guestId } = await getBooking(bookingId);

  if (guestId !== session.user!.guestId) throw new Error('You can only delete your own bookings :)')

  await deleteBooking(bookingId)

  revalidatePath('/account/reservations', 'page')
}

export async function updateReservation(guestId: number, bookingId: string, formData: FormData) {
  const session = await authorizeUser();

  if (guestId !== session.user!.guestId) throw new Error('You can only edit your own bookings :)')

  const updatedBooking = {
    observations: formData.get('observations')?.slice(0, 1000),
    numGuests: formData.get('numGuests')
  }

  await updateBooking(bookingId, updatedBooking)

  revalidatePath(`/account/reservations/edit/${bookingId}`)
  redirect('/account/reservations')
}

export async function createReservations(data: { cabinId: number; numNights: number; cabinPrice: number; startDate: Date | undefined; endDate: Date | undefined }, formData: FormData) {
  const session = await authorizeUser()

  const bookingData = {
    ...data,
    guestId: session.user!.guestId,
    numGuests: formData.get('numGuests'),
    observations: String(formData.get('observations')).slice(0,1000),
    extrasPrice: 0,
    totalPrice: data.cabinPrice,
    hasBreakfast: false,
    isPaid: false,
    status: 'unconfirmed'
  }

  await createBooking(bookingData)
  revalidatePath(`/cabins/${data.cabinId}`)
  redirect('/thankyou')
}
