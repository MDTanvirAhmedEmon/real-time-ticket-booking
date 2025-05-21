"use client"
import SeatSelection from "@/components/Home/SeatSelection"
import { useSearchParams } from "next/navigation"

const Booking = () => {

    const searchParams = useSearchParams()
    const selectedBus = searchParams.get('selectedBus')

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

    return (
        <section className="mb-12 py-8">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-4xl">
                    Book Your Bus Tickets Online
                </h1>
                <p className="mb-8 text-center text-gray-600">
                    Search, compare, and book bus tickets for your next journey
                </p>

                <SeatSelection
                    busId={selectedBus ? Number(selectedBus) : 1}
                    bus={busData.find((b) => b.id === (selectedBus ? Number(selectedBus) : 1)) || busData[0]}
                />
            </div>

        </section>
    );
};

export default Booking;