"use client"
import { CalendarIcon, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"
import SeatSelection from "@/components/Home/SeatSelection"

const Booking = () => {
    const [date, setDate] = useState<Date>()

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
    const selectedBus = 0
    return (
        <section className="mb-12 py-8">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-4xl">
                    Book Your Bus Tickets Online
                </h1>
                <p className="mb-8 text-center text-gray-600">
                    Search, compare, and book bus tickets for your next journey
                </p>
                <Card className="shadow-lg mb-10">
                    <CardContent className="p-6">
                        <form>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                <div className="space-y-2">
                                    <Label htmlFor="from">From</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input id="from" placeholder="Departure City" className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="to">To</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input id="to" placeholder="Arrival City" className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : "Select date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar className=" bg-white" mode="single" selected={date} onSelect={setDate} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex items-end">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">Search Buses</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <SeatSelection busId={selectedBus || 1} bus={busData.find((b) => b.id === selectedBus) || busData[0]} />
            </div>

        </section>
    );
};

export default Booking;