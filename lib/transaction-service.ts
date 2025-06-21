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
}

const TRANSACTIONS_KEY = "banking_transactions"
const USERS_KEY = "banking_users"

export const TransactionService = {
  // Get all transactions
  getTransactions(): Transaction[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(TRANSACTIONS_KEY)
    return stored ? JSON.parse(stored) : []
  },

  // Save transactions
  saveTransactions(transactions: Transaction[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions))
    // Trigger storage event for real-time updates
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: TRANSACTIONS_KEY,
        newValue: JSON.stringify(transactions),
      }),
    )
  },

  // Add new transaction
  addTransaction(transaction: Omit<Transaction, "id">): Transaction {
    const transactions = this.getTransactions()
    const newTransaction = {
      ...transaction,
      id: Date.now(),
    }
    transactions.unshift(newTransaction)
    this.saveTransactions(transactions)

    // Update user balance
    this.updateUserBalance(transaction.userId, transaction.amount)

    return newTransaction
  },

  // Update transaction
  updateTransaction(id: number, updates: Partial<Transaction>): void {
    const transactions = this.getTransactions()
    const index = transactions.findIndex((t) => t.id === id)
    if (index !== -1) {
      const oldAmount = transactions[index].amount
      transactions[index] = { ...transactions[index], ...updates }
      this.saveTransactions(transactions)

      // Update balance if amount changed
      if (updates.amount !== undefined && updates.amount !== oldAmount) {
        const difference = updates.amount - oldAmount
        this.updateUserBalance(transactions[index].userId, difference)
      }
    }
  },

  // Delete transaction
  deleteTransaction(id: number): void {
    const transactions = this.getTransactions()
    const transaction = transactions.find((t) => t.id === id)
    if (transaction) {
      // Reverse the transaction amount from balance
      this.updateUserBalance(transaction.userId, -transaction.amount)
      const filtered = transactions.filter((t) => t.id !== id)
      this.saveTransactions(filtered)
    }
  },

  // Get transactions for specific user
  getUserTransactions(userId: number): Transaction[] {
    return this.getTransactions().filter((t) => t.userId === userId)
  },

  // User management
  getUsers(): User[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(USERS_KEY)
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@pgemployees.com",
            accountNumber: Math.floor(Math.random() * 9000000000) + 1000000000 + "",
            balance: 450600,
            password: "PG2024Bank!",
            phone: "(201) 743-8042",
          },
        ]
  },

  saveUsers(users: User[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: USERS_KEY,
        newValue: JSON.stringify(users),
      }),
    )
  },

  updateUserBalance(userId: number, amount: number): void {
    const users = this.getUsers()
    const userIndex = users.findIndex((u) => u.id === userId)
    if (userIndex !== -1) {
      users[userIndex].balance += amount
      this.saveUsers(users)
    }
  },

  getUser(userId: number): User | undefined {
    return this.getUsers().find((u) => u.id === userId)
  },
}

// Initialize with default data if empty
if (typeof window !== "undefined") {
  const transactions = TransactionService.getTransactions()
  if (transactions.length === 0) {
    const defaultTransactions: Omit<Transaction, "id">[] = [
      {
        time: "4:15 PM",
        company: "Harman International Industries",
        amount: -28475.0,
        bank: "PNC Bank DC",
        date: "December 20, 2024",
        type: "debit",
        userId: 1,
      },
      {
        time: "3:30 PM",
        company: "Delphi Technologies",
        amount: -12500.0,
        bank: "Capital One Bank",
        date: "December 20, 2024",
        type: "debit",
        userId: 1,
      },
      {
        time: "2:30 PM",
        company: "Continental Automotive Systems",
        amount: -34500.0,
        bank: "Bank of America DC",
        date: "December 20, 2024",
        type: "debit",
        userId: 1,
      },
    ]

    defaultTransactions.forEach((t) => TransactionService.addTransaction(t))
  }
}
