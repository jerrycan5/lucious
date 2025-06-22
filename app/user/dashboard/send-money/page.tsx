"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { BankLogo } from "@/components/ui/bank-logo"

export default function SendMoneyPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    bank: "",
    accountNumber: "",
    amount: ""
  })

  const banks = [
    { id: "zelle", name: "Zelle", logo: "/logos/zelle.png" },
    { id: "paypal", name: "PayPal", logo: "/logos/paypal.png" },
    { id: "chase", name: "Chase Bank", logo: "/logos/chase.jpg" },
    { id: "bofa", name: "Bank of America", logo: "/logos/BOA.jpg" },
    { id: "wells", name: "Wells Fargo", logo: "/logos/wellsfargo.png" },
    { id: "citi", name: "Citibank", logo: "/logos/citi.jpg" },
  ]

  const selectedBank = banks.find(b => b.id === formData.bank)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleBankSelect = (value: string) => {
    setFormData(prev => ({ ...prev, bank: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    await new Promise(resolve => setTimeout(resolve, 2000))
    setError("Transaction failed. Please contact support.")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border border-blue-200 rounded-2xl bg-white relative">
        
        {/* Back button (Top-Left) */}
        <button
          onClick={() => router.push("/user/dashboard")}
          className="absolute top-4 left-4 text-blue-800 hover:text-blue-900"
        >
          <ArrowLeft size={20} />
        </button>

        <CardHeader className="text-center pt-12">
          <div className="mb-4 flex justify-center">
            <BankLogo size="lg" />
          </div>

          <CardTitle className="text-2xl text-blue-900 font-semibold">Send Money</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Transfer funds securely to other bank accounts
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bank">Select Bank</Label>
              <Select onValueChange={handleBankSelect} value={formData.bank}>
                <SelectTrigger className="border-blue-300 focus:ring-blue-400">
                  <SelectValue placeholder="Choose a bank">
                    {selectedBank ? (
                      <div className="flex items-center gap-2">
                        <Image
                          src={selectedBank.logo}
                          alt={selectedBank.name}
                          width={20}
                          height={20}
                          className="rounded-sm"
                        />
                        <span>{selectedBank.name}</span>
                      </div>
                    ) : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {banks.map(bank => (
                    <SelectItem key={bank.id} value={bank.id}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={bank.logo}
                          alt={bank.name}
                          width={20}
                          height={20}
                          className="rounded-sm"
                        />
                        {bank.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              {isLoading ? "Processing..." : "Send Money"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
