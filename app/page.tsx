"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BankLogo } from "@/components/ui/bank-logo"
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Shield,
  Users,
  CreditCard,
  PiggyBank,
  Home,
  Car,
  Calculator,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react"

const carouselImages = [
  {
    url: "/images/banking-hero-1.png",
    title: "Your Financial Future Starts Here",
    subtitle: "Experience banking that puts your needs first with competitive rates and personalized service",
    cta: "Open Account Today",
  },
  {
    url: "/images/banking-hero-2.png",
    title: "Make Your Dream Home a Reality",
    subtitle: "Low-rate mortgages and home equity loans with flexible terms designed for you",
    cta: "Apply for Home Loan",
  },
  {
    url: "/images/banking-hero-3.png",
    title: "Drive Away with Confidence",
    subtitle: "Get pre-approved for auto loans with rates as low as 2.99% APR",
    cta: "Get Pre-Approved",
  },
  {
    url: "/images/banking-hero-4.png",
    title: "Banking at Your Fingertips",
    subtitle: "Manage your finances 24/7 with our award-winning mobile and online banking",
    cta: "Try Mobile Banking",
  },
]

const services = [
  {
    icon: PiggyBank,
    title: "Savings & Checking",
    description: "Earn more with our high-yield savings accounts and fee-free checking options",
    features: ["No monthly fees", "High interest rates", "Mobile deposits"],
  },
  {
    icon: Home,
    title: "Home Loans",
    description: "Competitive mortgage rates and personalized service for your home buying journey",
    features: ["Low down payments", "Fast approvals", "Local expertise"],
  },
  {
    icon: Car,
    title: "Auto Loans",
    description: "Finance your next vehicle with rates as low as 2.99% APR for qualified members",
    features: ["New & used cars", "Quick decisions", "No prepayment penalty"],
  },
  {
    icon: CreditCard,
    title: "Credit Cards",
    description: "Enjoy low rates, no annual fees, and rewards that matter to you",
    features: ["No annual fee", "Rewards program", "Fraud protection"],
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Federally Insured",
    description: "Your deposits are insured up to $250,000 by NCUA",
  },
  {
    icon: Users,
    title: "Member-Owned",
    description: "As a credit union, we're owned by our members, not shareholders",
  },
  {
    icon: Award,
    title: "Award-Winning Service",
    description: "Recognized for excellence in member service and satisfaction",
  },
  {
    icon: Clock,
    title: "24/7 Access",
    description: "Bank anytime, anywhere with our mobile and online platforms",
  },
]

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <BankLogo size="md" />

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-900 font-medium flex items-center gap-1">
                  Banking
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </button>
              </div>
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-900 font-medium flex items-center gap-1">
                  Loans
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </button>
              </div>
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-900 font-medium flex items-center gap-1">
                  Services
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </button>
              </div>
              <a href="#about" className="text-gray-700 hover:text-blue-900 font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-900 font-medium">
                Contact
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/user/signup">
                <Button variant="outline" className="hidden md:flex border-blue-900 text-blue-900 hover:bg-blue-50">
                  join now
                </Button>
              </Link>
              <Link href="/user/login">
                <Button className="bg-blue-900 hover:bg-blue-800 text-white">Login</Button>
              </Link>

              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t bg-white py-4">
              <div className="flex flex-col space-y-4">
                <a href="#banking" className="text-gray-700 hover:text-blue-900 font-medium">
                  Banking
                </a>
                <a href="#loans" className="text-gray-700 hover:text-blue-900 font-medium">
                  Loans
                </a>
                <a href="#services" className="text-gray-700 hover:text-blue-900 font-medium">
                  Services
                </a>
                <a href="#about" className="text-gray-700 hover:text-blue-900 font-medium">
                  About
                </a>
                <a href="#contact" className="text-gray-700 hover:text-blue-900 font-medium">
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Carousel */}
      <section className="relative h-[500px] md:h-[700px] overflow-hidden">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            {/* Background with image or gradient fallback */}
            <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
              {!imageErrors[index] && (
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(index)}
                />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-blue-900/80">
                <div className="container mx-auto px-4 h-full flex items-center">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">{image.title}</h1>
                    <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95 drop-shadow-md">
                      {image.subtitle}
                    </p>
                    <Link href="/user/signup">
                      <Button
                        size="lg"
                        className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        {image.cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 shadow-lg z-10"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 shadow-lg z-10"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? "bg-white shadow-lg" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/user/login" className="group">
              <Card className="hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Calculator className="h-8 w-8 text-blue-900 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">Loan Calculator</h3>
                  <p className="text-sm text-gray-600 mt-1">Calculate payments</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/user/login" className="group">
              <Card className="hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-8 w-8 text-blue-900 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">Apply Online</h3>
                  <p className="text-sm text-gray-600 mt-1">Quick applications</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/user/signup" className="group">
              <Card className="hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-blue-900 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">Become a Member</h3>
                  <p className="text-sm text-gray-600 mt-1">Join today</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="#contact" className="group">
              <Card className="hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Phone className="h-8 w-8 text-blue-900 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">Contact Us</h3>
                  <p className="text-sm text-gray-600 mt-1">Get help now</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Banking Solutions for Every Need</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From everyday banking to major life purchases, we offer comprehensive financial services designed to help
              you achieve your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <service.icon className="h-12 w-12 text-blue-900 group-hover:scale-110 transition-transform duration-200" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/user/login" className="inline-block mt-6">
                    <Button
                      variant="outline"
                      className="group-hover:bg-blue-900 group-hover:text-white transition-colors"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose P&G Employees Credit Union?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the credit union difference with member-focused service, competitive rates, and a commitment to
              your financial success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                  <benefit.icon className="h-10 w-10 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Serving P&G Employees Since 1948</h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  For over 75 years, P&G Employees Credit Union has been the trusted financial partner for Procter &
                  Gamble employees and their families. As a member-owned cooperative, we exist solely to serve our
                  members' financial needs.
                </p>
                <p>
                  Our commitment goes beyond traditional banking. We offer personalized service, competitive rates, and
                  innovative financial solutions that help our members achieve their dreams and secure their financial
                  future.
                </p>
                <p>
                  When you bank with us, you're not just a customer – you're an owner. Every decision we make is
                  designed to benefit our members, not outside shareholders.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/user/signup">
                  <Button size="lg" className="bg-blue-900 hover:bg-blue-800">
                    Become a Member
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Learn Our Story
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/credit-union-building.png"
                alt="P&G Employees Credit Union Building"
                className="rounded-2xl shadow-2xl w-full"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-900 text-white p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold">75+</div>
                <div className="text-sm opacity-90">Years of Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help you with all your banking needs. Contact us today to learn more about our services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak with our friendly team</p>
                <p className="text-2xl font-bold text-blue-900">201-743-8042</p>
                <p className="text-sm text-gray-500 mt-2">Mon-Fri: 9AM-5PM EST</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us a message anytime</p>
                <p className="text-lg font-semibold text-blue-900">info@p&gemployeescu</p>
                <p className="text-sm text-gray-500 mt-2">We'll respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Us</h3>
                <p className="text-gray-600 mb-4">Come see us in person</p>
                <p className="text-lg font-semibold text-blue-900">1220 Bank St NW</p>
                <p className="text-lg font-semibold text-blue-900">Washington DC, 20007</p>
                <p className="text-sm text-gray-500 mt-2">Mon-Fri: 9AM-5PM EST</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of P&G employees who trust us with their financial future. Membership is easy and the
            benefits last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/user/signup">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-4">
                Join Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-4"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <BankLogo className="mb-6" size="md" />
              <p className="text-gray-300 mb-6">
                Your trusted financial partner since 1948, serving P&G employees and their families with pride.
              </p>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>201-743-8042</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@p&gemployeescu</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>1220 Bank St NW, Washington DC 20007</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Banking Services</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Checking Accounts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Savings Accounts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Money Market
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Certificates of Deposit
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    IRAs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Lending Services</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home Mortgages
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Auto Loans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Personal Loans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Credit Cards
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home Equity
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Resources</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Online Banking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mobile App
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Financial Education
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Calculators
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security Center
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 P&G Employees Credit Union. All rights reserved.</p>
              <div className="flex gap-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Accessibility
                </a>
              </div>
            </div>
            <div className="mt-4 text-center text-gray-400 text-sm">
              <p>Federally insured by NCUA. Equal Housing Opportunity.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
