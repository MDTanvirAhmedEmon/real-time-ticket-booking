/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

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
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [step, setStep] = useState(1)

  const totalRows = 10
  const seatsPerRow = 4
  const aisleAfter = 2 // Aisle after the 2nd seat

  // Generate seats (A1, A2, B1, B2, etc.)
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

  // Some random unavailable seats
  const unavailableSeats = ["1A", "1B", "3C", "3D", "5B", "6A", "7C", "8D", "9B", "10A"]

  const toggleSeatSelection = (seatId: string) => {
    if (unavailableSeats.includes(seatId)) return

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((s) => s !== seatId)
      } else {
        return [...prev, seatId]
      }
    })
  }

  const handleContinue = () => {
    setStep(2)
  }

  const handleConfirmBooking = () => {
    // In a real app, this would submit the booking
    alert("Booking confirmed! Thank you for your purchase.")
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        {step === 1 ? (
          <Card>
            <CardHeader>
              <CardTitle>Select Your Seats</CardTitle>
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
                <div className="mb-4 flex justify-center space-x-4">
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded border border-gray-300 bg-white"></div>
                    <span className="text-sm">Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded border border-gray-300 bg-gray-300"></div>
                    <span className="text-sm">Unavailable</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded border border-blue-500 bg-blue-500"></div>
                    <span className="text-sm">Selected</span>
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
                          // Add aisle after the 2nd seat
                          const hasAisleAfter = seatIndex === aisleAfter - 1 ? "mr-4" : ""
                          const seatLetter = String.fromCharCode(65 + seatIndex) // A, B, C, D
                          const seatId = `${rowIndex + 1}${seatLetter}`
                          const isUnavailable = unavailableSeats.includes(seatId)
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
                  onClick={handleContinue}
                  disabled={selectedSeats.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Passenger Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {selectedSeats.map((seat, index) => (
                  <div key={seat} className="space-y-4">
                    <h3 className="font-medium">
                      Passenger {index + 1} - Seat {seat}
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`firstName-${seat}`}>First Name</Label>
                        <Input id={`firstName-${seat}`} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`lastName-${seat}`}>Last Name</Label>
                        <Input id={`lastName-${seat}`} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`age-${seat}`}>Age</Label>
                        <Input id={`age-${seat}`} type="number" min="0" max="120" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`gender-${seat}`}>Gender</Label>
                        <Select>
                          <SelectTrigger id={`gender-${seat}`}>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {index < selectedSeats.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}

                <div className="space-y-2">
                  <Label htmlFor="email">Email (for e-ticket)</Label>
                  <Input id="email" type="email" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                  >
                    Back
                  </Button>
                  <Button onClick={handleConfirmBooking} className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
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
                    {selectedSeats.map((seat) => (
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

              <div className="rounded-md bg-gray-50 p-3 text-sm">
                <p className="flex items-start">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Free cancellation up to 24 hours before departure
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
