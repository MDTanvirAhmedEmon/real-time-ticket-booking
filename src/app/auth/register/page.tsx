"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useRegisterUserMutation } from "@/redux/baseApi"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        userInfo: {
            email: "",
            password: "",
        },
        customerData: {
            firstName: "",
            lastName: "",
            address: "",
            gender: "",
            contactNo: "",
        },
    })

    const handleInputChange = (section: "userInfo" | "customerData", field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }))
    }

    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Registration data:", formData)
        registerUser(formData).unwrap()
            .then(() => {
                toast('Register Successfull')
                router.push('/auth/login')
            })
            .catch((error) => {
                toast(error?.data?.message)
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster></Toaster>
            <Card className="w-full max-w-md border-2 border-gray-300 bg-white shadow-lg">
                <CardHeader className="space-y-1 pb-6">
                    <CardTitle className="text-2xl font-bold text-center text-gray-900">Create an account</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Enter your information to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Personal Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                    First Name
                                </Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="Tanvir"
                                    value={formData.customerData.firstName}
                                    onChange={(e) => handleInputChange("customerData", "firstName", e.target.value)}
                                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                    Last Name
                                </Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Emon"
                                    value={formData.customerData.lastName}
                                    onChange={(e) => handleInputChange("customerData", "lastName", e.target.value)}
                                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="emon1@gmail.com"
                                value={formData.userInfo.email}
                                onChange={(e) => handleInputChange("userInfo", "email", e.target.value)}
                                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.userInfo.password}
                                onChange={(e) => handleInputChange("userInfo", "password", e.target.value)}
                                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                                required
                            />
                        </div>

                        {/* Contact Number */}
                        <div className="space-y-2">
                            <Label htmlFor="contactNo" className="text-sm font-medium text-gray-700">
                                Contact Number
                            </Label>
                            <Input
                                id="contactNo"
                                type="tel"
                                placeholder="+1234567890"
                                value={formData.customerData.contactNo}
                                onChange={(e) => handleInputChange("customerData", "contactNo", e.target.value)}
                                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                                required
                            />
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                            <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                                Gender
                            </Label>
                            <Select
                                value={formData.customerData.gender}
                                onValueChange={(value) => handleInputChange("customerData", "gender", value)}
                            >
                                <SelectTrigger className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500 bg-white">
                                    <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                                    <SelectItem value="male" className="hover:bg-gray-100 focus:bg-gray-100 bg-white">
                                        Male
                                    </SelectItem>
                                    <SelectItem value="female" className="hover:bg-gray-100 focus:bg-gray-100 bg-white">
                                        Female
                                    </SelectItem>
                                    <SelectItem value="other" className="hover:bg-gray-100 focus:bg-gray-100 bg-white">
                                        Other
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                                Address
                            </Label>
                            <Textarea
                                id="address"
                                placeholder="123 Main St, Springfield"
                                value={formData.customerData.address}
                                onChange={(e) => handleInputChange("customerData", "address", e.target.value)}
                                className="min-h-[80px] border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <Button disabled={isLoading} type="submit" className="w-full bg-blue-600 text-white py-2.5 cursor-pointer">
                            Create Account {isLoading && 'Loading...'}
                        </Button>

                        {/* Sign In Link */}
                        <div className="text-center text-sm pt-2">
                            <span className="text-gray-600">Already have an account? </span>
                            <Link href="/auth/login" className="text-gray-900 hover:underline font-medium">
                                Log In
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
