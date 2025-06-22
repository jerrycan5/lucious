"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function ZelleTransferPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    contactInfo: "",
    amount: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      // In a real app, you would make an API call here
      throw new Error("Zelle transfer failed")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transfer failed")
    } finally {
      setIsLoading(false)
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
          <CardTitle className="text-2xl text-blue-900 font-semibold">Zelle Transfer</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Send money instantly with Zelle
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contactInfo">Phone Number or Email</Label>
              <Input
                id="contactInfo"
                name="contactInfo"
                type="text"
                value={formData.contactInfo}
                onChange={handleInputChange}
                placeholder="Enter phone number or email"
                className="border-blue-300 focus:ring-blue-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="pl-7 border-blue-300 focus:ring-blue-400"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Send Money"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}