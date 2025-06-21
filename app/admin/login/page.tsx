// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// export default function AdminLogin() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()

//   const handleLogin = () => {
//     setIsLoading(true)

//     // Check credentials
//     if (email === "admin@pgemployees.com" && password === "AdminPG202423232@#$!") {
//       setTimeout(() => {
//         router.push("/admin/dashboard")
//       }, 1000)
//     } else {
//       alert("Invalid admin credentials. Please use: admin@pgemployees.com / AdminPG2024!")
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
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="adminEmail">Admin Email</Label>
//             <Input
//               id="adminEmail"
//               type="email"
//               placeholder="admin@pgemployees.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="adminPassword">Password</Label>
//             <Input
//               id="adminPassword"
//               type="password"
//               placeholder="Enter admin password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <Button onClick={handleLogin} className="w-full bg-red-900 hover:bg-red-800" disabled={isLoading}>
//             {isLoading ? "Signing in..." : "Admin Sign In"}
//           </Button>
//           <div className="text-center text-sm text-gray-600 mt-4 p-4 bg-gray-50 rounded-lg">
//             <p className="font-semibold mb-2">Default Admin Credentials:</p>
//             <p className="font-mono text-xs">admin@pgemployees.com</p>
//             <p className="font-mono text-xs">AdminPG2024!</p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
