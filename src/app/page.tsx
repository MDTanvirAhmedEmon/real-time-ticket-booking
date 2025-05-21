"use client"

import Link from "next/link"
import { CalendarIcon, Clock, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"
import BusResults from "./components/BusResults"
import Header from "@/components/Shared/Header"


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header></Header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-4xl">
              Book Your Bus Tickets Online
            </h1>
            <p className="mb-8 text-center text-gray-600">
              Search, compare, and book bus tickets for your next journey
            </p>

            <SearchForm />
          </div>
        </section>

        <BusResults />

        <section className="mb-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Why Choose BusBooker?</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <div className="mb-4 rounded-full bg-blue-100 p-3">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Easy Booking</h3>
                  <p className="text-center text-gray-600">
                    Book your tickets in just a few clicks with our simple booking process.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <div className="mb-4 rounded-full bg-blue-100 p-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">24/7 Support</h3>
                  <p className="text-center text-gray-600">
                    Our customer support team is available round the clock to assist you.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <div className="mb-4 rounded-full bg-blue-100 p-3">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Nationwide Coverage</h3>
                  <p className="text-center text-gray-600">
                    Access bus routes across the country with our extensive network.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">BusBooker</h3>
              <p className="text-gray-300">The easiest way to book bus tickets online.</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Popular Routes</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    New York to Boston
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Los Angeles to San Francisco
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Chicago to Detroit
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Miami to Orlando
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
              <p className="mb-2 text-gray-300">1234 Bus Terminal, Transport Avenue</p>
              <p className="mb-2 text-gray-300">support@busbooker.com</p>
              <p className="text-gray-300">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300">&copy; {new Date().getFullYear()} BusBooker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SearchForm() {
  const [date, setDate] = useState<Date>()

  return (
    <Card className="shadow-lg">
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
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Search Buses</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
