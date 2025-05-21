import { Clock, MapPin, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import BusResults from "../components/Home/BusResults"


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      <main className="container mx-auto px-4 py-8">
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


