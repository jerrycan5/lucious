"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function PayBillsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    provider: "",
    accountNumber: "",
    amount: "",
    description: ""
  })

  const billProviders = [
    // Utilities
    // { id: "pg-e", name: "PG&E", category: "Utilities", logo: "/logos/bills/pge.svg", color: "bg-yellow-100" },
    { id: "socal-edison", name: "Southern California Edison", category: "Utilities", logo: "/logos/bills/sce.svg", color: "bg-blue-100" },
    { id: "ladwp", name: "LADWP", category: "Utilities", logo: "/logos/bills/ladwp.svg", color: "bg-blue-100" },
    
    // Internet/Cable
    { id: "comcast", name: "Xfinity/Comcast", category: "Internet/TV", logo: "/logos/bills/comcast.svg", color: "bg-red-100" },
    // { id: "att", name: "AT&T", category: "Internet/TV", logo: "/logos/bills/att.svg", color: "bg-blue-100" },
    { id: "verizon", name: "Verizon", category: "Internet/TV", logo: "/logos/bills/verizon.svg", color: "bg-red-100" },
    
    // Insurance
    { id: "state-farm", name: "State Farm", category: "Insurance", logo: "/logos/bills/statefarm.svg", color: "bg-red-100" },
    { id: "geico", name: "GEICO", category: "Insurance", logo: "/logos/bills/geico.svg", color: "bg-green-100" },
    { id: "progressive", name: "Progressive", category: "Insurance", logo: "/logos/bills/progressive.svg", color: "bg-blue-100" },
    
    // Credit Cards
    { id: "amex", name: "American Express", category: "Credit Cards", logo: "/logos/bills/amex.svg", color: "bg-blue-100" },
    { id: "discover", name: "Discover", category: "Credit Cards", logo: "/logos/bills/discover.svg", color: "bg-orange-100" },
    { id: "capital-one", name: "Capital One", category: "Credit Cards", logo: "/logos/bills/capitalone.svg", color: "bg-red-100" },
  ]

  const categories = Array.from(new Set(billProviders.map(provider => provider.category)))

  const handleProviderSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      provider: prev.provider === value ? "" : value
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    await new Promise(resolve => setTimeout(resolve, 2000))
    setError("Payment processing failed. Please contact support.")
    setIsLoading(false)
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
          <CardTitle className="text-2xl text-blue-900 font-semibold">Pay Bills</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Pay your bills securely to registered service providers
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {categories.map(category => (
              <div key={category} className="space-y-2">
                <Label className="text-blue-900 font-medium">{category}</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {billProviders
                    .filter(provider => provider.category === category)
                    .map(provider => (
                      <Button
                        key={provider.id}
                        type="button"
                        variant={formData.provider === provider.id ? "default" : "outline"}
                        className={`flex items-center gap-2 p-2 h-12 w-full ${formData.provider === provider.id ? 'bg-blue-800 text-white' : `${provider.color} hover:bg-opacity-75`}`}
                        onClick={() => handleProviderSelect(provider.id)}
                      >
                        <Image
                          src={provider.logo}
                          alt={provider.name}
                          width={24}
                          height={24}
                          className="rounded-sm flex-shrink-0 object-contain"
                          priority
                        />
                        <span className="text-xs truncate">{provider.name}</span>
                      </Button>
                    ))}
                </div>
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="customProvider">Other Provider</Label>
              <Input
                id="customProvider"
                name="provider"
                type="text"
                placeholder="Enter provider name"
                value={formData.provider ? (billProviders.find(p => p.id === formData.provider)?.name || formData.provider) : ''}
                onChange={(e) => handleProviderSelect(e.target.value)}
                className="border-blue-300 focus:ring-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                type="text"
                value={formData.accountNumber}
                onChange={handleInputChange}
                placeholder="Enter account number"
                className="border-blue-300 focus:ring-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description </Label>
              <Input
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add a note"
                className="border-blue-300 focus:ring-blue-400"
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
              {isLoading ? "Processing..." : "Pay Bill"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}