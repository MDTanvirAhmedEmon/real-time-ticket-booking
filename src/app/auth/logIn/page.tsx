"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useLogInMutation } from "@/redux/baseApi"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { jwtDecoder } from "@/lib/decodedToken"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const [logIn, { isLoading }] = useLogInMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Login data:", formData)
        logIn(formData).unwrap()
            .then((data) => {
                console.log(data);
                const userInfo = jwtDecoder(data?.data?.accessToken)
                localStorage.setItem('loginUser', JSON.stringify(userInfo))
                router.push('/')
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
                    <CardTitle className="text-2xl font-bold text-center text-gray-900">Log in to your account</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Enter your email and password to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="emon1@gmail.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
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
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                                required
                            />
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <Link href="/forgot-password" className="text-sm text-gray-900 hover:underline">
                                Forgot your password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <Button disabled={isLoading} type="submit" className="w-full bg-blue-600 text-white py-2.5 cursor-pointer">
                            Log In {isLoading && 'Loading...'}
                        </Button>

                        {/* Sign Up Link */}
                        <div className="text-center text-sm pt-2">
                            <span className="text-gray-600">{"Don't have an account? "}</span>
                            <Link href="/auth/register" className="text-gray-900 hover:underline font-medium">
                                Register
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
