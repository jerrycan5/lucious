// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// export default function AdminLogin() {
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsLoading(true)

//     const formData = new FormData(e.currentTarget)
//     const email = formData.get("adminEmail") as string
//     const password = formData.get("adminPassword") as string

//     // Default admin credentials
//     if (email === "admin@pgemployees.com" && password === "AdminPG2024!") {
//       setTimeout(() => {
//         router.push("/admin/dashboard")
//         setIsLoading(false)
//       }, 1000)
//     } else {
//       alert("Invalid admin credentials.")
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold text-red-900">Admin Portal</CardTitle>
//           <CardDescription>P&G Employees Credit Union Administration</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="adminEmail">Admin Email</Label>
//               <Input id="adminEmail" name="adminEmail" type="email" placeholder="admin@pgemployees.com" required />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="adminPassword">Password</Label>
//               <Input
//                 id="adminPassword"
//                 name="adminPassword"
//                 type="password"
//                 placeholder="Enter admin password"
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full bg-red-900 hover:bg-red-800" disabled={isLoading}>
//               {isLoading ? "Signing in..." : "Admin Sign In"}
//             </Button>
//             <div className="text-center text-sm text-gray-600 mt-4">
//               <p>Default Admin Credentials:</p>
//               <p className="font-mono">admin@pgemployees.com</p>
//               <p className="font-mono">AdminPG2024!</p>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
