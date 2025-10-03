"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../lib/api"

export default function StudentMessages() {
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    try {
      const response = await api.get("/messages/conversations")
      setConversations(response.data)
      if (response.data.length > 0) {
        selectConversation(response.data[0])
      }
    } catch (error) {
      console.error("Failed to load conversations:", error)
    } finally {
      setLoading(false)
    }
  }

  const selectConversation = async (conversation: any) => {
    setSelectedConversation(conversation)
    try {
      const response = await api.get(`/messages/conversation/${conversation.otherUser._id}`)
      setMessages(response.data)
    } catch (error) {
      console.error("Failed to load messages:", error)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    try {
      const response = await api.post("/messages", {
        receiverId: selectedConversation.otherUser._id,
        content: newMessage,
      })
      setMessages([...messages, response.data])
      setNewMessage("")
    } catch (error) {
      console.error("Failed to send message:", error)
    }
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
                <Link to="/student/messages" className="text-sm font-medium text-blue-400">
                  Messages
                </Link>
                <Link to="/student/profile" className="text-sm font-medium text-zinc-400 hover:text-white">
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

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-white">Messages</h1>

        <div className="grid h-[600px] grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900">
            {loading ? (
              <div className="p-4 text-center text-zinc-400">Loading...</div>
            ) : conversations.length === 0 ? (
              <div className="p-4 text-center text-zinc-400">No conversations yet</div>
            ) : (
              conversations.map((conv) => (
                <button
                  key={conv.otherUser._id}
                  onClick={() => selectConversation(conv)}
                  className={`w-full border-b border-zinc-800 p-4 text-left hover:bg-zinc-800 ${
                    selectedConversation?.otherUser._id === conv.otherUser._id ? "bg-zinc-800" : ""
                  }`}
                >
                  <div className="font-medium text-white">{conv.otherUser.name}</div>
                  <div className="mt-1 text-sm text-zinc-400">{conv.lastMessage?.content || "No messages yet"}</div>
                </button>
              ))
            )}
          </div>

          {/* Chat Area */}
          <div className="col-span-2 flex flex-col rounded-lg border border-zinc-800 bg-zinc-900">
            {selectedConversation ? (
              <>
                <div className="border-b border-zinc-800 p-4">
                  <h2 className="font-semibold text-white">{selectedConversation.otherUser.name}</h2>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`flex ${
                        message.sender._id === selectedConversation.otherUser._id ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender._id === selectedConversation.otherUser._id
                            ? "bg-zinc-800 text-white"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="border-t border-zinc-800 p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-400">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
