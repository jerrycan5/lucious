"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, Copy } from "lucide-react"

export default function ReceivePage() {
  const router = useRouter()
  
  // Simulated user data - In a real app, this would come from your auth context
  const userData = {
    fullName: "James Dominquez",
    bankName: "P&G Employees Credit Union",
    accountNumber: "7172594338"
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // In a real app, you would show a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border border-blue-200 rounded-2xl bg-white relative">
        <button
          onClick={() => router.push("/user/dashboard")}
          className="absolute top-4 left-4 text-blue-800 hover:text-blue-900"
        >
          <ArrowLeft size={20} />
        </button>

        <CardHeader className="text-center pt-12">
          <CardTitle className="text-2xl text-blue-900 font-semibold">Receive Money</CardTitle>
          <CardDescription className="text-lg text-gray-600 font-medium mt-2">
            Share your details to receive money
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Full Name</Label>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">{userData.fullName}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(userData.fullName)}
                  className="h-8 w-8"
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Bank Name</Label>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">{userData.bankName}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(userData.bankName)}
                  className="h-8 w-8"
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Account Number</Label>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">{userData.accountNumber}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(userData.accountNumber)}
                  className="h-8 w-8"
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-800" />
              <AlertDescription className="text-blue-800">
                Share these details with the sender to receive money directly to your account.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}