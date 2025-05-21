"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Clock, Coffee, Wifi, Tv, BatteryCharging, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import busImage from '../../../public/bus.png'
import Image from "next/image"
import { useRouter } from "next/navigation"

const busData = [
  {
    id: 1,
    company: "Express Lines",
    logo: "/placeholder.svg?height=40&width=40",
    departure: "08:00 AM",
    arrival: "11:30 AM",
    duration: "3h 30m",
    price: 45,
    rating: 4.5,
    amenities: ["wifi", "power", "entertainment", "refreshments"],
    available: 23,
  },
  {
    id: 2,
    company: "Luxury Coaches",
    logo: "/placeholder.svg?height=40&width=40",
    departure: "09:15 AM",
    arrival: "12:45 PM",
    duration: "3h 30m",
    price: 65,
    rating: 4.8,
    amenities: ["wifi", "power", "entertainment", "refreshments"],
    available: 15,
  },
  {
    id: 3,
    company: "Budget Travel",
    logo: "/placeholder.svg?height=40&width=40",
    departure: "10:30 AM",
    arrival: "02:00 PM",
    duration: "3h 30m",
    price: 35,
    rating: 4.0,
    amenities: ["wifi", "power"],
    available: 30,
  },
]

export default function BusResults() {
  const [selectedBus, setSelectedBus] = useState<number | null>(null)
  console.log(selectedBus);
  const router = useRouter();
  const [showSeats, setShowSeats] = useState(false)

  const handleSelectBus = (busId: number) => {
    setSelectedBus(busId)
    router.push(`/booking?selectedBus=${busId}`);
    setShowSeats(true)
  }

  const handleBackToResults = () => {
    setShowSeats(false)
  }

  return (
    <section className="mb-12">
      <div className="mx-auto max-w-4xl">
        {!showSeats ? (
          <>
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Available Buses</h2>
            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger className=" cursor-pointer" value="all">All</TabsTrigger>
                <TabsTrigger className=" cursor-pointer" value="morning">Morning</TabsTrigger>
                <TabsTrigger className=" cursor-pointer" value="afternoon">Afternoon</TabsTrigger>
                <TabsTrigger className=" cursor-pointer" value="evening">Evening</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              {busData.map((bus) => (
                <Card key={bus.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-4">
                      <div className="border-b border-r-0 p-4 md:border-b-0 md:border-r">
                        <div className="flex flex-col justify-center items-center space-x-3">
                          <Image src={busImage} alt={bus.company} className=" w-14 rounded object-cover" />
                          <div className=" text-center mt-3">
                            <h3 className="font-semibold">{bus.company}</h3>
                            <div className="flex items-center justify-center text-sm text-yellow-500">
                              <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                              <span>{bus.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-b border-r-0 p-4 md:border-b-0 md:border-r">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-semibold">{bus.departure}</p>
                            <p className="text-sm text-gray-500">New York</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-lg font-semibold">{bus.arrival}</p>
                            <p className="text-sm text-gray-500">Boston</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{bus.duration}</span>
                        </div>
                      </div>

                      <div className="border-b border-r-0 p-4 md:border-b-0 md:border-r">
                        <div className="flex flex-wrap gap-2">
                          {bus.amenities.includes("wifi") && (
                            <Badge variant="outline" className="flex gap-1">
                              <Wifi className="h-3 w-3" /> WiFi
                            </Badge>
                          )}
                          {bus.amenities.includes("power") && (
                            <Badge variant="outline" className="flex gap-1">
                              <BatteryCharging className="h-3 w-3" /> Power
                            </Badge>
                          )}
                          {bus.amenities.includes("entertainment") && (
                            <Badge variant="outline" className="flex gap-1">
                              <Tv className="h-3 w-3" /> TV
                            </Badge>
                          )}
                          {bus.amenities.includes("refreshments") && (
                            <Badge variant="outline" className="flex gap-1">
                              <Coffee className="h-3 w-3" /> Snacks
                            </Badge>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-gray-500">{bus.available} seats available</p>
                      </div>

                      <div className="p-4">
                        <p className="mb-2 text-center text-2xl font-bold text-blue-600">${bus.price}</p>
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                          onClick={() => handleSelectBus(bus.id)}
                        >
                          Select Seats
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div>
            <Button variant="outline" onClick={handleBackToResults} className="mb-4">
              Back to results
            </Button>

          </div>
        )}
      </div>
    </section>
  )
}
