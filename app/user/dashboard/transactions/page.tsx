"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Filter } from "lucide-react"
import { useBanking, type Transaction } from "@/lib/banking-context"

export default function TransactionsPage() {
  const { user, transactions } = useBanking()

  // Group transactions by date
  const groupedTransactions = transactions.reduce(
    (groups, transaction) => {
      const date = transaction.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(transaction)
      return groups
    },
    {} as Record<string, Transaction[]>,
  )

  const transactionHistory = Object.entries(groupedTransactions).map(([date, transactions]) => ({
    date,
    transactions,
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/user/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-1xl font-bold text-gray-900">Transaction History</h1>
                {/* <p className="text-sm text-gray-500">Account: **** {user?.accountNumber.slice(-4)} • December 2024</p> */}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>Complete transaction history for your account</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No transactions found</p>
              </div>
            ) : (
              <div className="space-y-6">
                {transactionHistory.map((day, dayIndex) => (
                  <div key={dayIndex}>
                    <h3 className="font-semibold text-lg mb-4">{day.date}</h3>
                    <div className="space-y-3">
                      {day.transactions.map((transaction, transIndex) => (
                        <div key={transIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm text-gray-500">{transaction.time}</span>
                              <Badge variant="outline" className="text-xs">
                                {transaction.bank}
                              </Badge>
                              <Badge variant={transaction.amount > 0 ? "default" : "secondary"} className="text-xs">
                                {transaction.amount > 0 ? "Money Received" : "Money Sent"}
                              </Badge>
                            </div>
                            <p className="font-medium">
                              {transaction.amount > 0
                                ? `Received from: ${transaction.company}`
                                : `Sent to: ${transaction.company}`}
                            </p>
                          </div>
                          <div
                            className={`text-right font-semibold ${
                              transaction.amount > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                    {dayIndex < transactionHistory.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
