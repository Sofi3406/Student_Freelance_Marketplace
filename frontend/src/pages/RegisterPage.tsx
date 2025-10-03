"use client"

import { useState, type FormEvent } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { GraduationCap, Briefcase } from "lucide-react"

export default function RegisterPage() {
  const [searchParams] = useSearchParams()
  const [role, setRole] = useState<"student" | "client">(
    (searchParams.get("role") as "student" | "client") || "student",
  )
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    university: "",
    major: "",
    graduationYear: new Date().getFullYear(),
    companyName: "",
    industry: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const data: any = {
        email: formData.email,
        password: formData.password,
        role,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      }

      if (role === "student") {
        data.university = formData.university
        data.major = formData.major
        data.graduationYear = formData.graduationYear
      } else {
        data.companyName = formData.companyName
        data.industry = formData.industry
      }

      await register(data)
      navigate(`/${role}/dashboard`)
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <GraduationCap className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold">StudentMarket</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">Join thousands of students and clients</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`p-6 rounded-lg border-2 transition-all ${
                  role === "student" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <GraduationCap className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-bold">I'm a Student</div>
                <div className="text-sm text-muted-foreground">Offer services</div>
              </button>

              <button
                type="button"
                onClick={() => setRole("client")}
                className={`p-6 rounded-lg border-2 transition-all ${
                  role === "client" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <Briefcase className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-bold">I'm a Client</div>
                <div className="text-sm text-muted-foreground">Hire students</div>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              {role === "student" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="major">Major</Label>
                      <Input
                        id="major"
                        value={formData.major}
                        onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Graduation Year</Label>
                      <Input
                        id="graduationYear"
                        type="number"
                        value={formData.graduationYear}
                        onChange={(e) => setFormData({ ...formData, graduationYear: Number.parseInt(e.target.value) })}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {role === "client" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name (optional)</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry (optional)</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
