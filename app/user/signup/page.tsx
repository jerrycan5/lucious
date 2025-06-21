"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BankLogo } from "@/components/ui/bank-logo"
import { CheckCircle } from "lucide-react"

export default function UserSignup() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSignup = () => {
    setIsLoading(true)

    // Basic validation
    if (!formData.fullName || !formData.username || !formData.email || !formData.phone || !formData.password) {
      alert("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)

      // Redirect to landing page after 3 seconds
      setTimeout(() => {
        router.push("/")
      }, 3000)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSignup()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <BankLogo className="justify-center mb-4" size="md" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h3>
            <p className="text-gray-600 mb-6">
              Welcome to P&G Employees Credit Union! Your account has been created successfully.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Username:</strong> {formData.username}
              </p>
              <p className="text-sm text-blue-800 mt-1">You can now use this username to login to your account.</p>
            </div>
            <p className="text-sm text-gray-500">Redirecting to homepage in 3 seconds...</p>
          </div>
        </div>
      )}

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BankLogo size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-900">Join Our Credit Union</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password (min 8 characters)"
              value={formData.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              required
            />
          </div>

          <Button onClick={handleSignup} className="w-full bg-blue-900 hover:bg-blue-800" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="text-center text-sm text-gray-600 mt-4">
            <p>Already have an account?</p>
            <Button
              variant="link"
              className="text-blue-900 hover:text-blue-800 p-0 h-auto font-semibold"
              onClick={() => router.push("/user/login")}
            >
              Sign in here
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-lg">
            <p>By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
