/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { io, Socket } from 'socket.io-client';
import { useGetAllUnavailableSeatsQuery } from "@/redux/baseApi"
import { useDispatch, useSelector } from "react-redux"
import { removeSeats, selectedSeatsRedux } from "@/redux/selectedSeats/selectedSeatsSlice"
import CheckOut from "./CheckOut"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

interface SeatSelectionProps {
  busId: number
  bus: {
    id: number
    company: string
    departure: string
    arrival: string
    price: number
  }
}

export default function SeatSelection({ busId, bus }: SeatSelectionProps) {
  const seatsFromRedux = useSelector((state: any) => state.selectedSeats)
  const dispatch = useDispatch()

  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)
  const [seats, setSeats] = useState<any>()
  const [step, setStep] = useState<boolean>(false)
  const [unavailableSeats, setUnavailableSeats] = useState<string[]>([])
  const [selectedSeatsByOthers, setSelectedSeatsByOthers] = useState<string[]>([])

  const { data } = useGetAllUnavailableSeatsQuery("642c8f4a9b1e8b0012345678", {
    refetchOnMountOrArgChange: true,
  })

  // Generate seat IDs (1A, 1B, 1C, 1D, 2A, etc.)
  const totalRows = 10
  const seatsPerRow = 4
  const aisleAfter = 2

  const generateSeats = () => {
    const seats = []
    for (let row = 1; row <= totalRows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatLetter = String.fromCharCode(64 + seat) // A, B, C, D
        seats.push(`${row}${seatLetter}`)
      }
    }
    return seats
  }

  const allSeats = generateSeats()

  // Update unavailable and locked seats from API data
  useEffect(() => {
    if (data?.data) {
      setUnavailableSeats(data.data.unavailable || [])
      setSelectedSeatsByOthers(data.data.locked || [])
    }
  }, [data])

  // Remove expired seats and update active seats state safely after render
  useEffect(() => {
    const currentTime = new Date()
    const activeSeats: string[] = []

    seatsFromRedux?.seats?.forEach((seat: any) => {
      const seatTime = new Date(seat.date)
      const timeDifference = currentTime.getTime() - seatTime.getTime()

      // Example: seats expire after 11 minutes (660000 ms) 1 minute = 60000 ms
      if (timeDifference < 660000) {
        activeSeats.push(seat.seat)
      } else {
        dispatch(removeSeats(seat))
      }
    })

    setSelectedSeats(activeSeats)
  }, [seatsFromRedux, dispatch])

  // Setup socket connection
  useEffect(() => {
    const newSocket = io(`http://localhost:5000/booking`)
    setSocket(newSocket)

    newSocket.on('connect', () => {
      newSocket.emit('joinBusRoom', JSON.stringify({ bus: "642c8f4a9b1e8b0012345678" }))
    })

    newSocket.on('busSeatsUpdated', (updatedSeats) => {
      setUnavailableSeats(updatedSeats?.unavailable || [])
      setSelectedSeatsByOthers(updatedSeats?.locked || [])
      setSeats(updatedSeats)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  // Handle seat select/deselect toggle
  const toggleSeatSelection = (seatId: string) => {
    if (unavailableSeats.includes(seatId)) return
    if (selectedSeatsByOthers.includes(seatId) && !selectedSeats.includes(seatId)) return

    // Prevent selecting more than 5 seats
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      toast("You can select a maximum of 5 seats.")
      return;
    }
    if (!socket) return

    const bookingData = {
      bus: "642c8f4a9b1e8b0012345678",
      user: "642c8f4a9b1e8b0098765432",
      seat: seatId,
    }

    socket.emit('createBooking', JSON.stringify(bookingData))
    dispatch(selectedSeatsRedux(seatId))
  }

  const handleConfirmBooking = () => {
    setStep(true)
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        {
          !step ?

            <Card>
              <CardHeader>
                <CardTitle>Select Your Seats</CardTitle>
                <Toaster />
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex justify-between rounded bg-gray-100 p-3">
                  <div>
                    <p className="font-semibold">{bus.company}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <span>{bus.departure}</span>
                      <ArrowRight className="mx-2 h-3 w-3" />
                      <span>{bus.arrival}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${bus.price} per seat</p>
                    <p className="text-sm text-gray-600">{selectedSeats.length} seats selected</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="mb-4 flex flex-col sm:flex-row items-center justify-center space-x-4">
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded border border-gray-300 bg-white"></div>
                        <span className="text-sm">Available</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded border border-gray-300 bg-red-200"></div>
                        <span className="text-sm">Locked Someone</span>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded border border-gray-300 bg-gray-300"></div>
                        <span className="text-sm">Unavailable</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded border border-blue-500 bg-blue-500"></div>
                        <span className="text-sm">Selected</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-64 rounded-t-xl bg-gray-200 p-2 text-center font-semibold">Driver</div>
                  </div>

                  <div className="mt-6 grid grid-cols-4 gap-2">
                    {Array.from({ length: totalRows }).map((_, rowIndex) => (
                      <div key={rowIndex} className="col-span-4 flex items-center justify-between">
                        <div className="mr-2 w-6 text-center font-medium">{rowIndex + 1}</div>
                        <div className="grid flex-1 grid-cols-4 gap-2">
                          {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                            const hasAisleAfter = seatIndex === aisleAfter - 1 ? "mr-4" : ""
                            const seatLetter = String.fromCharCode(65 + seatIndex)
                            const seatId = `${rowIndex + 1}${seatLetter}`
                            const isUnavailable = unavailableSeats.includes(seatId)
                            const isSelectedByOthers = selectedSeatsByOthers.includes(seatId)
                            const isSelected = selectedSeats.includes(seatId)

                            return (
                              <button
                                key={seatIndex}
                                className={cn(
                                  "flex h-10 items-center justify-center rounded border text-sm font-medium cursor-pointer",
                                  hasAisleAfter,
                                  isUnavailable
                                    ? "cursor-not-allowed border-gray-300 bg-gray-300 text-gray-500"
                                    : isSelected
                                      ? "border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
                                      : isSelectedByOthers
                                        ? "border-red-200 bg-red-200 text-white cursor-not-allowed"
                                        : "border-gray-300 bg-white hover:border-blue-500",
                                )}
                                onClick={() => toggleSeatSelection(seatId)}
                                disabled={isUnavailable}
                              >
                                {seatId}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    disabled={selectedSeats.length === 0}
                    className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    onClick={handleConfirmBooking}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>

            :

            <CheckOut selectedSeats={selectedSeats} setStep={setStep}></CheckOut>
        }


      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Journey Details</h3>
                <p className="text-sm text-gray-600">
                  New York to Boston
                  <br />
                  {bus.departure} - {bus.arrival}
                  <br />
                  {new Date().toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="font-medium">Bus Operator</h3>
                <p className="text-sm text-gray-600">{bus.company}</p>
              </div>

              <div>
                <h3 className="font-medium">Selected Seats</h3>
                {selectedSeats.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {selectedSeats.map((seat: string) => (
                      <span
                        key={seat}
                        className="inline-flex items-center rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
                      >
                        {seat}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No seats selected</p>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Ticket Price</span>
                  <span>
                    ${bus.price} x {selectedSeats.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>${selectedSeats.length * 2}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${selectedSeats.length * (bus.price + 2)}</span>
                </div>
              </div>

              <div className="rounded-md bg-gray-50 py-2 text-sm">
                <p className="flex items-start">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Remember your selected seats will be locked for 10 minutes. If you do not complete the payment, they will be released for others.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
