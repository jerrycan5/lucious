"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BankLogo } from "@/components/ui/bank-logo"
import { Eye, EyeOff, Lock, User, Shield, CheckCircle, ArrowRight } from "lucide-react"

export default function UserLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    setIsLoading(true)

    console.log("Attempting login with:", username, password) // Debug log

    // Check credentials for James Dominguez
    if (username === "dominquez2525" && password === "PG2024Bank!") {
      // Set authentication in localStorage
      localStorage.setItem("user_authenticated", "true")

      setTimeout(() => {
        router.push("/user/dashboard")
      }, 1000)
    } else {
      console.log("Login failed - incorrect credentials") // Debug log
      alert(`Invalid credentials. Please try again.`)
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Left Side - Branding & Information */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          <div className="mb-8">
            <BankLogo className="text-white mb-8" size="xl" />
          </div>

          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Welcome to Your
            <br />
            Financial Future
          </h1>

          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Secure, trusted banking for P&G employees and their families since 1948.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-blue-100">Bank-level security & encryption</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="text-blue-100">NCUA insured up to $250,000</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <User className="h-5 w-5" />
              </div>
              <span className="text-blue-100">Member-owned & operated</span>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-blue-100 mb-3">Contact our member services team</p>
            <p className="font-semibold">📞 201-743-8042</p>
            <p className="text-sm text-blue-100">Mon-Fri: 9AM-5PM EST</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <BankLogo size="lg" />
          </div>

          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600 text-base">Sign in to access your account</CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleLogin()
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => router.push("/user/signup")}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Join P&G Credit Union
                  </button>
                </p>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">Secure Login</h4>
                    <p className="text-xs text-blue-700">
                      Your connection is encrypted and your information is protected with bank-level security.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-500">
              Need assistance? Call us at{" "}
              <a href="tel:201-743-8042" className="text-blue-600 font-semibold">
                201-743-8042
              </a>
            </p>
            <p className="text-xs text-gray-400">©  P&G Employees Credit Union. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
