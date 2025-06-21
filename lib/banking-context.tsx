"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Transaction {
  id: number
  time: string
  company: string
  amount: number
  bank: string
  date: string
  type: "debit" | "credit"
  userId: number
}

export interface User {
  id: number
  name: string
  email: string
  accountNumber: string
  balance: number
  password: string
  phone: string
  profilePicture?: string
}

interface BankingContextType {
  user: User
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, "id" | "userId">) => Transaction
  updateTransaction: (id: number, updates: Partial<Transaction>) => void
  deleteTransaction: (id: number) => void
  updateUser: (updates: Partial<User>) => void
  updateUserBalance: (amount: number) => void
  refreshData: () => void
  isLoadingTransactions: boolean
}

const BankingContext = createContext<BankingContextType | undefined>(undefined)

// Single default user - James Dominguez
const defaultUser: User = {
  id: 1,
  name: "James Dominquez",
  email: "Godslovesthesfirsts@gmail.com",
  accountNumber: "7172594338",
  balance: 790400.65, // Final balance
  password: "PG2024Bank!",
  phone: "(813) 340-1568",
  memberSince:"2017",
  profilePicture: undefined,
}

// Generate transactions based on the bank statement
const generateBrokenDownTransactions = () => {
  const transactions = []
  let idCounter = 1

  const regularTransactions = [
    // September 2024
   // 1 Debit
    { id: idCounter++, time: "9:00 AM", company: " Downtown Loft", amount: -5600.18, bank: "Rent ", date: "September 02, 2024", type: "debit" as const, userId: 1 },
     { id: idCounter++, time: "9:00 AM", company: "NoKidHungry.org", amount: -10000.20, bank: "Donation", date: "September 03, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "10:00 AM", company: "Purchase - Electronics", amount: -642.27, bank: "Amazon", date: "September 05, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "11:00 AM", company: "Jenna L.", amount: -3850.22, bank: "Zelle Transfer", date: "September 07, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "2:00 PM", company: "Whole Foods Market", amount: -218.46, bank: "Main Bank", date: "September 08, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "3:30 PM", company: "Starbucks", amount: -14.65, bank: "Main Bank", date: "September 10, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "1:00 PM", company: "Malik T.", amount: -6200.15, bank: "Zelle Transfer", date: "September 12, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "11:00 AM", company: "Subscription", amount: -10.99, bank: "Spotify ", date: "September 13, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "2:00 PM", company: "Charles Schwab", amount: 110667.14, bank: "Investment Dividends ", date: "September 15, 2024", type: "credit" as const, userId: 1 },
    { id: idCounter++, time: "3:00 PM", company: "PNC Bank", amount: -21685.39, bank: "Transfer to Self", date: "September 16, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "10:00 AM", company: "iPad Pro", amount: -1197.15, bank: "Apple Store", date: "September 19, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "2:30 PM", company: "Business Ride", amount: -42.30, bank: "Uber", date: "September 21, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "9:00 AM", company: "Subscription", amount: -15.49, bank: "Netflix ", date: "September 25, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "4:00 PM", company: "Olivia D.", amount: -2970.25, bank: "Transfer ", date: "September 28, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "5:00 PM", company: "Luxury Watch Collection", amount: -23510.19, bank: "Cartier", date: "September 30, 2024", type: "debit" as const, userId: 1 },




     // October 2024
    { id: idCounter++, time: "9:00 AM", company: " Downtown Loft", amount: -5650.34, bank: "Rent", date: "October 01, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "10:00 AM", company: "NoKidHungry.org", amount: -1425.68, bank: "Donation", date: "October 03, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "11:00 AM", company: "Marcus E.", amount: -5250.45, bank: "Transfer", date: "October 05, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "2:00 PM", company: " Joe's", amount: -189.53, bank: "Trader", date: "October 06, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "3:00 PM", company: "Flight NYC", amount: -1040.24, bank: "Delta Airlines ", date: "October 09, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "1:00 PM", company: "Ashley T.", amount: -7200.24, bank: "Zelle Transfer", date: "October 11, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "2:30 PM", company: " Business Ride", amount: -36.92, bank: "Uber", date: "October 12, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "10:00 AM", company: "Consulting Income", amount: 6550.28, bank: "Freelance ", date: "October 15, 2024", type: "credit" as const, userId: 1 },
    { id: idCounter++, time: "11:00 AM", company: "Subscription", amount: -9.99, bank: "Apple Music", date: "October 17, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "3:00 PM", company: "Chevron", amount: -96.44, bank: "Gas", date: "October 19, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "4:00 PM", company: "Brian M.", amount: -3120.18, bank: "Transfer", date: "October 22, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "1:00 PM", company: " Online Purchase", amount: -380.19, bank: "Zara ", date: "October 25, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "2:00 PM", company: "Local Food Bank", amount: -505.29, bank: "Donation", date: "October 27, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "9:00 AM", company: "Subscription", amount: -14.99, bank: "Transfer ", date: "October 30, 2024", type: "debit" as const, userId: 1 },
 // December 2024
    { id: idCounter++, time: "9:00 AM", company: "Downtown Loft", amount: -5600.22, bank: "Rent ", date: "December 01, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "10:00 AM", company: "NoKidHungry.org", amount: -10000.32, bank: "Donation", date: "December 02, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "11:00 AM", company: "Maya S.", amount: -6115.52, bank: "Transfer ", date: "December 03, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "2:00 PM", company: "Starbucks", amount: -15.25, bank: "Main Bank", date: "December 04, 2024", type: "debit" as const, userId: 1 }
  ]












  transactions.push(...regularTransactions)

  
  const allTransactions = [
    
  

    // November 2024
    { id: idCounter++, time: "9:00 AM", company: " Downtown Loft", amount: -5610.63, bank: "rent", date: "November 01, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "10:00 AM", company: "NoKidHungry.org", amount: -10210.15, bank: "Donation ", date: "November 02, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "11:00 AM", company: "Melinda R.", amount: -3420.39, bank: "Transfer ", date: "November 04, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "2:00 PM", company: "Business Travel", amount: -31.42, bank: "Lyft ", date: "November 05, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "3:00 PM", company: " Daniel A.", amount: -6750.75, bank: "Zelle Transfer ", date: "November 08, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "1:00 PM", company: "Tech Accessories", amount: -624.19, bank: "Best Buy", date: "November 10, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "11:00 AM", company: "YouTube Premium", amount: -11.99, bank: "YouTube", date: "November 13, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "10:00 AM", company: "Reimbursement", amount: 2750.59, bank: "Business ", date: "November 15, 2024", type: "credit" as const, userId: 1 },
    { id: idCounter++, time: "2:00 PM", company: "Walgreens", amount: -43.89, bank: "Medication", date: "November 18, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "7:00 PM", company: " Nobu London", amount: -426.23, bank: "Dinner", date: "November 22, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "3:00 PM", company: " Joseph N.", amount: -4840.65, bank: "Transfer", date: "November 23, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "11:00 AM", company: "Subscription Bundle", amount: -19.95, bank: "Apple", date: "November 25, 2024", type: "debit" as const, userId: 1 },
    { id: idCounter++, time: "9:00 AM", company: "Black Friday Sale", amount: -1305.34, bank: "Amazon", date: "November 28, 2024", type: "debit" as const, userId: 1 },


  ]

  transactions.push(...allTransactions)
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date, newest first
}

export function BankingProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  // Load transactions with delay (simulate loading from server)
  useEffect(() => {
    const loadTransactions = async () => {
      setIsLoadingTransactions(true)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const allTransactions = generateBrokenDownTransactions()
      setTransactions(allTransactions)
      setIsLoadingTransactions(false)
    }

    loadTransactions()
  }, [])

  // Force refresh function
  const refreshData = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const addTransaction = (transaction: Omit<Transaction, "id" | "userId">): Transaction => {
    const newTransaction = {
      ...transaction,
      id: Date.now() + Math.random(),
      userId: 1,
    }

    // Add delay for new transactions too
    setTimeout(() => {
      setTransactions((prev) => [newTransaction, ...prev])
    }, 1000)

    // Update balance immediately
    setUser((prev) => {
      const newBalance = prev.balance + transaction.amount
      console.log(`Balance Update: ${prev.balance} + ${transaction.amount} = ${newBalance}`)
      return { ...prev, balance: Math.round(newBalance * 100) / 100 }
    })

    // Force refresh
    refreshData()

    return newTransaction
  }

  const updateTransaction = (id: number, updates: Partial<Transaction>): void => {
    setTransactions((prev) => {
      const index = prev.findIndex((t) => t.id === id)
      if (index === -1) return prev

      const oldTransaction = prev[index]
      const updatedTransaction = { ...oldTransaction, ...updates }

      // Update balance if amount changed
      if (updates.amount !== undefined && updates.amount !== oldTransaction.amount) {
        const difference = updates.amount - oldTransaction.amount
        setUser((prevUser) => ({
          ...prevUser,
          balance: Math.round((prevUser.balance + difference) * 100) / 100,
        }))
      }

      const newTransactions = [...prev]
      newTransactions[index] = updatedTransaction
      return newTransactions
    })

    refreshData()
  }

  const deleteTransaction = (id: number): void => {
    setTransactions((prev) => {
      const transaction = prev.find((t) => t.id === id)
      if (transaction) {
        // Reverse the transaction amount from balance
        setUser((prevUser) => ({
          ...prevUser,
          balance: Math.round((prevUser.balance - transaction.amount) * 100) / 100,
        }))
      }
      return prev.filter((t) => t.id !== id)
    })

    refreshData()
  }

  const updateUser = (updates: Partial<User>): void => {
    setUser((prev) => ({ ...prev, ...updates }))
    refreshData()
  }

  const updateUserBalance = (amount: number): void => {
    setUser((prev) => ({
      ...prev,
      balance: Math.round((prev.balance + amount) * 100) / 100,
    }))
    refreshData()
  }

  const value: BankingContextType = {
    user,
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateUser,
    updateUserBalance,
    refreshData,
    isLoadingTransactions,
  }

  return <BankingContext.Provider value={value}>{children}</BankingContext.Provider>
}

export function useBanking() {
  const context = useContext(BankingContext)
  if (context === undefined) {
    throw new Error("useBanking must be used within a BankingProvider")
  }
  return context
}
