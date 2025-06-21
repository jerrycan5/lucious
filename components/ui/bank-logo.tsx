interface BankLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function BankLogo({ className = "", size = "md" }: BankLogoProps) {
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto",
    xl: "h-20 w-auto",
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg className={sizeClasses[size]} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Circle */}
        <circle cx="30" cy="30" r="28" fill="url(#gradient1)" stroke="#1e3a8a" strokeWidth="2" />

        {/* Inner Shield */}
        <path
          d="M30 8L45 16V28C45 38 30 48 30 48C30 48 15 38 15 28V16L30 8Z"
          fill="url(#gradient2)"
          stroke="#ffffff"
          strokeWidth="1"
        />

        {/* P&G Letters */}
        <text x="22" y="26" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="serif">
          P&G
        </text>

        {/* Building/Pillars */}
        <rect x="20" y="32" width="3" height="8" fill="#ffffff" opacity="0.9" />
        <rect x="25" y="30" width="3" height="10" fill="#ffffff" opacity="0.9" />
        <rect x="30" y="32" width="3" height="8" fill="#ffffff" opacity="0.9" />
        <rect x="35" y="30" width="3" height="10" fill="#ffffff" opacity="0.9" />

        {/* Base */}
        <rect x="18" y="40" width="22" height="2" fill="#ffffff" opacity="0.9" />

        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex flex-col">
        <div
          className={`font-bold text-blue-900 leading-tight ${
            size === "sm" ? "text-sm" : size === "md" ? "text-lg" : size === "lg" ? "text-xl" : "text-2xl"
          }`}
        >
          P&G Employees
        </div>
        <div
          className={`font-medium text-blue-700 leading-tight ${
            size === "sm" ? "text-xs" : size === "md" ? "text-sm" : size === "lg" ? "text-base" : "text-lg"
          }`}
        >
          Credit Union
        </div>
      </div>
    </div>
  )
}
