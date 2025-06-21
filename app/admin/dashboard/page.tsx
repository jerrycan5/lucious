// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   DollarSign,
//   Activity,
//   Settings,
//   Bell,
//   Send,
//   Edit,
//   Eye,
//   EyeOff,
//   Plus,
//   Trash2,
//   CheckCircle,
//   Save,
//   User,
// } from "lucide-react"
// import { useBanking, type Transaction } from "@/lib/banking-context"

// export default function AdminDashboard() {
//   const { user, transactions, addTransaction, updateTransaction, deleteTransaction, updateUser } = useBanking()

//   const [sendAmount, setSendAmount] = useState("")
//   const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [showSuccessModal, setShowSuccessModal] = useState(false)
//   const [isEditingUser, setIsEditingUser] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [userForm, setUserForm] = useState({
//     name: user.name,
//     email: user.email,
//     phone: user.phone,
//     password: user.password,
//     accountNumber: user.accountNumber,
//   })
//   const [newTransaction, setNewTransaction] = useState({
//     time: "",
//     company: "",
//     amount: "",
//     bank: "",
//     date: "",
//     type: "debit" as "debit" | "credit",
//   })
//   const [notifications, setNotifications] = useState([
//     `User ${user.name} logged in at 2:30 PM`,
//     `New transaction: $500 sent to ${user.name}`,
//     `Account balance updated for ${user.name}`,
//   ])

//   const handleSendMoney = () => {
//     if (sendAmount) {
//       const amount = Number.parseFloat(sendAmount)
//       const transaction = {
//         time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         company: "P&G Employees Credit Union Admin",
//         amount: amount, // Positive amount for credit
//         bank: "P&G Employees Credit Union",
//         date: new Date().toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         }),
//         type: "credit" as const,
//       }

//       addTransaction(transaction)

//       const newNotification = `Admin sent $${sendAmount} to ${user.name}`
//       setNotifications([newNotification, ...notifications])
//       setSendAmount("")
//       setShowSuccessModal(true)

//       setTimeout(() => setShowSuccessModal(false), 3000)
//     }
//   }

//   const handleEditTransaction = (transaction: Transaction) => {
//     setEditingTransaction({
//       ...transaction,
//       amount: Math.abs(transaction.amount),
//     })
//   }

//   const handleSaveTransaction = () => {
//     if (editingTransaction) {
//       const amount =
//         editingTransaction.type === "debit" ? -Math.abs(editingTransaction.amount) : Math.abs(editingTransaction.amount)

//       updateTransaction(editingTransaction.id, {
//         ...editingTransaction,
//         amount,
//       })
//       setEditingTransaction(null)
//       setShowSuccessModal(true)
//       setTimeout(() => setShowSuccessModal(false), 3000)
//     }
//   }

//   const handleAddTransaction = () => {
//     if (newTransaction.company && newTransaction.amount) {
//       const amount =
//         newTransaction.type === "debit"
//           ? -Math.abs(Number.parseFloat(newTransaction.amount))
//           : Math.abs(Number.parseFloat(newTransaction.amount))

//       const transaction = {
//         ...newTransaction,
//         amount,
//         time: newTransaction.time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         date:
//           newTransaction.date ||
//           new Date().toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//       }

//       addTransaction(transaction)

//       setNewTransaction({
//         time: "",
//         company: "",
//         amount: "",
//         bank: "",
//         date: "",
//         type: "debit",
//       })
//       setIsAddDialogOpen(false)
//       setShowSuccessModal(true)
//       setTimeout(() => setShowSuccessModal(false), 3000)
//     }
//   }

//   const handleDeleteTransaction = (id: number) => {
//     deleteTransaction(id)
//     setShowSuccessModal(true)
//     setTimeout(() => setShowSuccessModal(false), 3000)
//   }

//   const handleUpdateUser = () => {
//     updateUser({
//       name: userForm.name,
//       email: userForm.email,
//       phone: userForm.phone,
//       password: userForm.password,
//       accountNumber: userForm.accountNumber,
//     })
//     setIsEditingUser(false)
//     setShowSuccessModal(true)
//     setTimeout(() => setShowSuccessModal(false), 3000)
//   }

//   // Update form when user changes
//   useState(() => {
//     setUserForm({
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       password: user.password,
//       accountNumber: user.accountNumber,
//     })
//   }, [user])

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Success Modal */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm mx-4">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-green-100 rounded-full p-2">
//                 <CheckCircle className="h-6 w-6 text-green-600" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">Success!</h3>
//                 <p className="text-sm text-gray-600">Changes saved successfully</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//               <p className="text-sm text-gray-500">
//                 Managing: {user.name} ({user.email})
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <Button variant="ghost" size="icon">
//                 <Bell className="h-5 w-5" />
//                 <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
//                   {notifications.length}
//                 </Badge>
//               </Button>
//               <Button variant="ghost" size="icon">
//                 <Settings className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
//               <DollarSign className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">${user.balance.toLocaleString()}</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
//               <Activity className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{transactions.length}</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Account Status</CardTitle>
//               <User className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-600">Active</div>
//             </CardContent>
//           </Card>
//         </div>

//         <Tabs defaultValue="user" className="space-y-6">
//           <TabsList>
//             <TabsTrigger value="user">User Management</TabsTrigger>
//             <TabsTrigger value="send-money">Send Money</TabsTrigger>
//             <TabsTrigger value="transactions">Transaction Management</TabsTrigger>
//             <TabsTrigger value="notifications">Notifications</TabsTrigger>
//           </TabsList>

//           <TabsContent value="user">
//             <Card>
//               <CardHeader>
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <CardTitle>User Details - {user.name}</CardTitle>
//                     <CardDescription>Edit ALL user credentials and account information</CardDescription>
//                   </div>
//                   <Button
//                     onClick={() => (isEditingUser ? handleUpdateUser() : setIsEditingUser(true))}
//                     variant={isEditingUser ? "default" : "outline"}
//                   >
//                     {isEditingUser ? (
//                       <>
//                         <Save className="h-4 w-4 mr-2" />
//                         Save All Changes
//                       </>
//                     ) : (
//                       <>
//                         <Edit className="h-4 w-4 mr-2" />
//                         Edit User
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="flex items-center gap-4 mb-6">
//                   <Avatar className="h-16 w-16">
//                     <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={user.name} />
//                     <AvatarFallback className="text-lg">
//                       {user.name
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h3 className="font-semibold text-lg">{user.name}</h3>
//                     <p className="text-sm text-gray-500">Account: {user.accountNumber}</p>
//                     <p className="text-sm text-gray-500">Balance: ${user.balance.toLocaleString()}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <Label>Full Name</Label>
//                     <Input
//                       value={userForm.name}
//                       onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
//                       disabled={!isEditingUser}
//                       placeholder="Enter full name"
//                     />
//                   </div>
//                   <div>
//                     <Label>Email Address</Label>
//                     <Input
//                       type="email"
//                       value={userForm.email}
//                       onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
//                       disabled={!isEditingUser}
//                       placeholder="Enter email address"
//                     />
//                   </div>
//                   <div>
//                     <Label>Phone Number</Label>
//                     <Input
//                       value={userForm.phone}
//                       onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
//                       disabled={!isEditingUser}
//                       placeholder="Enter phone number"
//                     />
//                   </div>
//                   <div>
//                     <Label>Account Number</Label>
//                     <Input
//                       value={userForm.accountNumber}
//                       onChange={(e) => setUserForm({ ...userForm, accountNumber: e.target.value })}
//                       disabled={!isEditingUser}
//                       placeholder="Enter account number"
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <Label>Password</Label>
//                     <div className="flex gap-2">
//                       <Input
//                         type={showPassword ? "text" : "password"}
//                         value={userForm.password}
//                         onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
//                         disabled={!isEditingUser}
//                         placeholder="Enter password"
//                         className="flex-1"
//                       />
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => setShowPassword(!showPassword)}
//                         type="button"
//                       >
//                         {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                       </Button>
//                     </div>
//                   </div>
//                 </div>

//                 {isEditingUser && (
//                   <div className="flex gap-2 pt-4 border-t">
//                     <Button onClick={handleUpdateUser} className="flex-1">
//                       <Save className="h-4 w-4 mr-2" />
//                       Save All Changes
//                     </Button>
//                     <Button
//                       variant="outline"
//                       onClick={() => {
//                         setIsEditingUser(false)
//                         // Reset form to original values
//                         setUserForm({
//                           name: user.name,
//                           email: user.email,
//                           phone: user.phone,
//                           password: user.password,
//                           accountNumber: user.accountNumber,
//                         })
//                       }}
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="send-money">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Send Money to {user.name}</CardTitle>
//                 <CardDescription>Transfer funds to the user account</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label>Amount</Label>
//                     <Input
//                       type="number"
//                       placeholder="Enter amount"
//                       value={sendAmount}
//                       onChange={(e) => setSendAmount(e.target.value)}
//                     />
//                   </div>
//                   <div className="flex items-end">
//                     <Button onClick={handleSendMoney} className="w-full">
//                       <Send className="h-4 w-4 mr-2" />
//                       Send Money to {user.name.split(" ")[0]}
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="transactions">
//             <Card>
//               <CardHeader>
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <CardTitle>Transaction Management</CardTitle>
//                     <CardDescription>Edit, create, and delete transactions for {user.name}</CardDescription>
//                   </div>
//                   <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//                     <DialogTrigger asChild>
//                       <Button>
//                         <Plus className="h-4 w-4 mr-2" />
//                         Add Transaction
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogHeader>
//                         <DialogTitle>Add New Transaction</DialogTitle>
//                         <DialogDescription>Create a new transaction for {user.name}</DialogDescription>
//                       </DialogHeader>
//                       <div className="space-y-4">
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <Label>Date</Label>
//                             <Input
//                               value={newTransaction.date}
//                               onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
//                               placeholder="December 20, 2024"
//                             />
//                           </div>
//                           <div>
//                             <Label>Time</Label>
//                             <Input
//                               value={newTransaction.time}
//                               onChange={(e) => setNewTransaction({ ...newTransaction, time: e.target.value })}
//                               placeholder="4:15 PM"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <Label>Company</Label>
//                           <Input
//                             value={newTransaction.company}
//                             onChange={(e) => setNewTransaction({ ...newTransaction, company: e.target.value })}
//                             placeholder="Company Name"
//                           />
//                         </div>
//                         <div className="grid grid-cols-3 gap-4">
//                           <div>
//                             <Label>Type</Label>
//                             <Select
//                               value={newTransaction.type}
//                               onValueChange={(value: "debit" | "credit") =>
//                                 setNewTransaction({ ...newTransaction, type: value })
//                               }
//                             >
//                               <SelectTrigger>
//                                 <SelectValue />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="debit">Debit (-)</SelectItem>
//                                 <SelectItem value="credit">Credit (+)</SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <div>
//                             <Label>Amount</Label>
//                             <Input
//                               type="number"
//                               value={newTransaction.amount}
//                               onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
//                               placeholder="100000.00"
//                             />
//                           </div>
//                           <div>
//                             <Label>Bank</Label>
//                             <Input
//                               value={newTransaction.bank}
//                               onChange={(e) => setNewTransaction({ ...newTransaction, bank: e.target.value })}
//                               placeholder="Bank Name"
//                             />
//                           </div>
//                         </div>
//                         <Button onClick={handleAddTransaction} className="w-full">
//                           Add Transaction
//                         </Button>
//                       </div>
//                     </DialogContent>
//                   </Dialog>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3 max-h-96 overflow-y-auto">
//                   {transactions.map((transaction) => (
//                     <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-1">
//                           <span className="text-sm text-gray-500">{transaction.time}</span>
//                           <Badge variant="outline" className="text-xs">
//                             {transaction.bank}
//                           </Badge>
//                           <Badge variant={transaction.type === "credit" ? "default" : "secondary"} className="text-xs">
//                             {transaction.type === "credit" ? "Credit" : "Debit"}
//                           </Badge>
//                         </div>
//                         <p className="font-medium">{transaction.company}</p>
//                         <p className="text-xs text-gray-500">{transaction.date}</p>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div
//                           className={`text-right font-semibold ${
//                             transaction.amount > 0 ? "text-green-600" : "text-red-600"
//                           }`}
//                         >
//                           {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
//                         </div>
//                         <Button variant="outline" size="icon" onClick={() => handleEditTransaction(transaction)}>
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                         <Button variant="outline" size="icon" onClick={() => handleDeleteTransaction(transaction.id)}>
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Edit Transaction Dialog */}
//             {editingTransaction && (
//               <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Edit Transaction</DialogTitle>
//                     <DialogDescription>Modify transaction details</DialogDescription>
//                   </DialogHeader>
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label>Date</Label>
//                         <Input
//                           value={editingTransaction.date}
//                           onChange={(e) => setEditingTransaction({ ...editingTransaction, date: e.target.value })}
//                         />
//                       </div>
//                       <div>
//                         <Label>Time</Label>
//                         <Input
//                           value={editingTransaction.time}
//                           onChange={(e) => setEditingTransaction({ ...editingTransaction, time: e.target.value })}
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <Label>Company</Label>
//                       <Input
//                         value={editingTransaction.company}
//                         onChange={(e) => setEditingTransaction({ ...editingTransaction, company: e.target.value })}
//                       />
//                     </div>
//                     <div className="grid grid-cols-3 gap-4">
//                       <div>
//                         <Label>Type</Label>
//                         <Select
//                           value={editingTransaction.type}
//                           onValueChange={(value: "debit" | "credit") =>
//                             setEditingTransaction({ ...editingTransaction, type: value })
//                           }
//                         >
//                           <SelectTrigger>
//                             <SelectValue />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="debit">Debit (-)</SelectItem>
//                             <SelectItem value="credit">Credit (+)</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div>
//                         <Label>Amount</Label>
//                         <Input
//                           type="number"
//                           value={Math.abs(editingTransaction.amount)}
//                           onChange={(e) =>
//                             setEditingTransaction({
//                               ...editingTransaction,
//                               amount: Number.parseFloat(e.target.value) || 0,
//                             })
//                           }
//                         />
//                       </div>
//                       <div>
//                         <Label>Bank</Label>
//                         <Input
//                           value={editingTransaction.bank}
//                           onChange={(e) => setEditingTransaction({ ...editingTransaction, bank: e.target.value })}
//                         />
//                       </div>
//                     </div>
//                     <Button onClick={handleSaveTransaction} className="w-full">
//                       Save Changes
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             )}
//           </TabsContent>

//           <TabsContent value="notifications">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Recent Notifications</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   {notifications.map((notification, index) => (
//                     <div key={index} className="p-3 bg-gray-50 rounded-lg">
//                       <p className="text-sm">{notification}</p>
//                       <p className="text-xs text-gray-500 mt-1">Just now</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }
