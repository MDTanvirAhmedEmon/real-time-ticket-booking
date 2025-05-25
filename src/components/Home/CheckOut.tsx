/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"


const CheckOut = () => {
    const selectedSeats = ["A1", "A2", "B1"]; // Example selected seats, replace with actual state or props
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Passenger Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {selectedSeats.map((seat: any, index: number) => (
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
                                // onClick={() => setStep(1)}
                                className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                            >
                                Back
                            </Button>
                            <Button  className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                                Confirm Booking
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CheckOut;