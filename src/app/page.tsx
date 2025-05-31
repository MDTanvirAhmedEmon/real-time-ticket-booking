"use client"
import { Clock, MapPin, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import BusResults from "../components/Home/BusResults"
// import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"
// import { cn } from "@/lib/utils"
// import { format } from "date-fns"
// import { useState } from "react"

export default function Home() {
  // const [date, setDate] = useState<Date>()
  return (
    <div className="min-h-screen bg-gray-50">

      <main className=" max-w-4xl mx-auto px-4 py-8">
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
                  {/* <Label htmlFor="date">Date</Label>
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
                  </Popover> */}
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">Search Buses</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        
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
    </div>
  )
}


