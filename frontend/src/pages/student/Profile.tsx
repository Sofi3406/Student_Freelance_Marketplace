"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../lib/api"

export default function StudentProfile() {
  const [profile, setProfile] = useState<any>({
    university: "",
    major: "",
    yearOfStudy: "",
    skills: [],
    bio: "",
    hourlyRate: "",
  })
  const [newSkill, setNewSkill] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const response = await api.get("/auth/profile")
      if (response.data.studentProfile) {
        setProfile(response.data.studentProfile)
      }
    } catch (error) {
      console.error("Failed to load profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.put("/auth/profile", { studentProfile: profile })
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Failed to update profile:", error)
      alert("Failed to update profile")
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] })
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s: string) => s !== skill),
    })
  }

  if (loading) {
    return <div className="min-h-screen bg-zinc-950 p-8 text-center text-zinc-400">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/student/dashboard" className="text-xl font-bold text-white">
                FreelanceHub
              </Link>
              <div className="flex gap-4">
                <Link to="/student/dashboard" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Dashboard
                </Link>
                <Link to="/student/services" className="text-sm font-medium text-zinc-400 hover:text-white">
                  My Services
                </Link>
                <Link to="/student/jobs" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Browse Jobs
                </Link>
                <Link to="/student/applications" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Applications
                </Link>
                <Link to="/student/orders" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Orders
                </Link>
                <Link to="/student/messages" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Messages
                </Link>
                <Link to="/student/profile" className="text-sm font-medium text-blue-400">
                  Profile
                </Link>
              </div>
            </div>
            <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-white">Student Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Academic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400">University</label>
                <input
                  type="text"
                  value={profile.university}
                  onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400">Major</label>
                <input
                  type="text"
                  value={profile.major}
                  onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400">Year of Study</label>
                <select
                  value={profile.yearOfStudy}
                  onChange={(e) => setProfile({ ...profile, yearOfStudy: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="graduate">Graduate</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Professional Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400">Hourly Rate ($)</label>
                <input
                  type="number"
                  value={profile.hourlyRate}
                  onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400">Skills</label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    placeholder="Add a skill"
                    className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Save Profile
          </button>
        </form>
      </main>
    </div>
  )
}
