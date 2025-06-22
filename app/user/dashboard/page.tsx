"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowDownLeft,
  CreditCard,
  Settings,
  Bell,
  Eye,
  EyeOff,
  Send,
  Download,
  Menu,
  X,
  User,
  History,
  ArrowRight,
  LayoutDashboard,
  RefreshCw,
  LogOut,
  DollarSign,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { useBanking } from "@/lib/banking-context"
import { SlidersHorizontal } from "lucide-react"
  import { Receipt } from "lucide-react"

export default function UserDashboard() {
  const { user, transactions, refreshData, isLoadingTransactions } = useBanking()
  const [showBalance, setShowBalance] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lastBalance, setLastBalance] = useState(user.balance)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("user_authenticated")
      if (authStatus === "true") {
        setIsAuthenticated(true)
      } else {
        router.push("/user/login")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  // Force re-render when balance changes
  useEffect(() => {
    if (user.balance !== lastBalance) {
      setLastBalance(user.balance)
      console.log("Balance changed from", lastBalance, "to", user.balance)
    }
  }, [user.balance, lastBalance])

  // Auto-refresh every 5 seconds to catch admin changes
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        refreshData()
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [refreshData, isAuthenticated])

  const handleLogout = () => {
    localStorage.removeItem("user_authenticated")
    router.push("/user/login")
  }

  const recentTransactions = transactions.slice(0, 8) // Show more recent transactions

  const getGreeting = () => {
  const options: Intl.DateTimeFormatOptions = { hour: "numeric", hour12: false, timeZone: "America/New_York" }
  const hourStr = new Intl.DateTimeFormat("en-US", options).format(new Date())
  const hour = parseInt(hourStr)

  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}


  const handleRefresh = () => {
    refreshData()
    console.log("Manual refresh triggered")
  }

  // Calculate stats for December 2024
  const totalIncome = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = Math.abs(transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0))

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Fully Responsive Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Left Section */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-blue-50 transition-colors flex-shrink-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                )}
              </button>

              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 ring-2 ring-blue-200 flex-shrink-0">
                  <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-xs sm:text-sm">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block min-w-0">
                  <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 truncate">
                    {getGreeting()}, {user.name.split(" ")[0]}!
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Welcome back to your dashboard</p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                className="hover:bg-blue-50 h-8 w-8 sm:h-10 sm:w-10"
                title="Refresh"
              >
                <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-blue-50 relative h-8 w-8 sm:h-10 sm:w-10">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 bg-red-500 rounded-full"></span>
              </Button>
              <Link href="/user/dashboard/settings" className="hidden sm:inline-block">
                <Button variant="ghost" size="icon" className="hover:bg-blue-50 h-8 w-8 sm:h-10 sm:w-10">
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="hover:bg-red-50 h-8 w-8 sm:h-10 sm:w-10"
                title="Logout"
              >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Navigation Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl">
            <div className="p-4 sm:p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-white/30 flex-shrink-0">
                    <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-white/20 text-white font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-semibold text-white truncate">{user.name}</h2>
                    <p className="text-sm text-blue-100">**** {user.accountNumber.slice(-4)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg flex-shrink-0"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <nav className="p-4 sm:p-6">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/user/dashboard"
                    className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-blue-50 text-blue-700 font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
                    <span>Dashboard</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/user/dashboard/profile"
                    className="flex items-center gap-3 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    <span>Profile</span>
                  </Link>
                </li>
  

    <li>
    <Link
    href="/user/dashboard/transactions"
    className="flex items-center gap-3 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors"
    onClick={() => setIsMobileMenuOpen(false)}
  >
    <Receipt className="h-5 w-5 text-gray-600 flex-shrink-0" />
    <span>Transaction History</span>
  </Link>
</li>

                  
<li>
  <Link
    href="/user/dashboard/preferences"
    className="flex items-center gap-3 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors"
    onClick={() => setIsMobileMenuOpen(false)}
  >
    <SlidersHorizontal className="h-5 w-5 text-gray-600 flex-shrink-0" />
    <span>Preferences</span>
  </Link>
</li>

                
                <li>
                  <Link
                    href="/user/dashboard/settings"
                    className="flex items-center gap-3 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li className="pt-4 border-t">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 sm:p-4 rounded-xl hover:bg-red-50 transition-colors w-full text-left text-red-600"
                  >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content - Fully Responsive */}
      <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile Welcome Section */}
        <div className="sm:hidden mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {getGreeting()}, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-gray-600 text-sm">Welcome back to your dashboard</p>
        </div>

        {/* Responsive Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {/* Main Balance Card - Spans 2 columns on larger screens */}
          <Card className="sm:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0 shadow-xl">
            <CardHeader className="pb-2 sm:pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm sm:text-base lg:text-lg font-medium text-blue-100">
                  Account Balance
                </CardTitle>
                <div className="flex gap-1 sm:gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRefresh}
                    className="hover:bg-white/20 text-white h-7 w-7 sm:h-8 sm:w-8"
                    title="Refresh Balance"
                  >
                    <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowBalance(!showBalance)}
                    className="hover:bg-white/20 text-white h-7 w-7 sm:h-8 sm:w-8"
                  >
                    {showBalance ? (
                      <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold" key={user.balance}>
                  {showBalance ? `$${user.balance.toLocaleString()}` : "••••••"}
                </div>
                <p className="text-blue-200 text-xs sm:text-sm">Account: **** {user.accountNumber.slice(-4)}</p>
                <p className="text-blue-200 text-xs">Last updated: {new Date().toLocaleTimeString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Income Card */}
          <Card className="bg-white/90 backdrop-blur-sm border border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2 sm:pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Total Income</CardTitle>
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                +${totalIncome.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">December 2024</p>
            </CardContent>
          </Card>

          {/* Expenses Card */}
          <Card className="bg-white/90 backdrop-blur-sm border border-red-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2 sm:pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Total Expenses</CardTitle>
                <Wallet className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600">
                -${totalExpenses.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">December 2024</p>
            </CardContent>
          </Card>
        </div>

        {/* Responsive Quick Actions */}
        <Card className="mb-6 sm:mb-8 bg-white/90 backdrop-blur-sm shadow-lg border-0">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-gray-900 text-base sm:text-lg">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              <Button
                onClick={() => router.push('/user/dashboard/send-money')}
                className="h-14 sm:h-16 lg:h-20 flex-col gap-1 sm:gap-2 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-xs sm:text-sm"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                <span>Send Money</span>
              </Button>
              <Button
                variant="outline"
                className="h-14 sm:h-16 lg:h-20 flex-col gap-1 sm:gap-2 border-2 hover:bg-blue-50 shadow-md text-xs sm:text-sm"
              >
                <ArrowDownLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
                <span>Receive</span>
              </Button>
              <Button
                variant="outline"
                className="h-14 sm:h-16 lg:h-20 flex-col gap-1 sm:gap-2 border-2 hover:bg-blue-50 shadow-md text-xs sm:text-sm"
              >
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
                <span>Pay Bills</span>
              </Button>


              <Button
                variant="outline"
                className="h-14 sm:h-16 lg:h-20 flex-col gap-1 sm:gap-2 border-2 hover:bg-blue-50 shadow-md text-xs sm:text-sm"
              >
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
                <span>zelle transfer</span>
              </Button>


              <Button
                variant="outline"
                className="h-14 sm:h-16 lg:h-20 flex-col gap-1 sm:gap-2 border-2 hover:bg-blue-50 shadow-md text-xs sm:text-sm"
              >
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
                <span>member transfer</span>
              </Button>


              <Button
                variant="outline"
                className="h-14 sm:h-16 lg:h-20 flex-col gap-1 sm:gap-2 border-2 hover:bg-blue-50 shadow-md text-xs sm:text-sm"
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
                <span>Statements</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Responsive Recent Transactions */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <CardTitle className="text-gray-900 text-base sm:text-lg lg:text-xl">Recent Transactions</CardTitle>
                <CardDescription className="text-gray-600 text-xs sm:text-sm">
                  {transactions.length} total • Account **** {user.accountNumber.slice(-4)}
                </CardDescription>
              </div>
              <Link href="/user/dashboard/transactions" className="flex-shrink-0">
                <Button variant="outline" size="sm" className="border-2 hover:bg-blue-50 text-xs sm:text-sm">
                  View All
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingTransactions ? (
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-3 w-12 sm:h-4 sm:w-16" />
                        <Skeleton className="h-3 w-16 sm:h-4 sm:w-20" />
                        <Skeleton className="h-3 w-20 sm:h-4 sm:w-24" />
                      </div>
                      <Skeleton className="h-3 w-32 sm:h-4 sm:w-48" />
                    </div>
                    <Skeleton className="h-5 w-16 sm:h-6 sm:w-20" />
                  </div>
                ))}
              </div>
            ) : recentTransactions.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="bg-gray-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                  <History className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-base sm:text-lg">No transactions yet</p>
                <p className="text-gray-400 text-xs sm:text-sm">Your transaction history will appear here</p>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {recentTransactions.map((transaction, index) => (
                  <div
                    key={`${transaction.id}-${index}`}
                    className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm text-gray-500 font-medium">{transaction.time}</span>
                        <Badge variant="outline" className="text-xs bg-white px-1 sm:px-2">
                          {transaction.bank}
                        </Badge>
                        <Badge
                          variant={transaction.amount > 0 ? "default" : "secondary"}
                          className={`text-xs px-1 sm:px-2 ${
                            transaction.amount > 0
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          }`}
                        >
                          {transaction.amount > 0 ? "Received" : "Sent"}
                        </Badge>
                      </div>
                      <p className="font-medium text-gray-900 truncate text-sm sm:text-base">
                        {transaction.amount > 0 ? `From: ${transaction.company}` : `To: ${transaction.company}`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{transaction.date}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div
                        className={`text-sm sm:text-base lg:text-lg font-bold ${
                          transaction.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                      </div>
                    </div>
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
