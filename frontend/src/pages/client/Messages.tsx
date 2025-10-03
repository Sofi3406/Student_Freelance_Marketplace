"use client"

import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Send } from "lucide-react"

export default function ClientMessages() {
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      const response = await api.get("/messages/conversations")
      setConversations(response.data)
      if (response.data.length > 0) {
        selectConversation(response.data[0])
      }
    } catch (error) {
      console.error("Error fetching conversations:", error)
    } finally {
      setLoading(false)
    }
  }

  const selectConversation = async (conversation: any) => {
    setSelectedConversation(conversation)
    try {
      const response = await api.get(`/messages/${conversation.userId}`)
      setMessages(response.data)
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    try {
      await api.post("/messages", {
        receiverId: selectedConversation.userId,
        content: newMessage,
      })
      setNewMessage("")
      selectConversation(selectedConversation)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-zinc-950 text-white p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="bg-zinc-900 border-zinc-800 p-4 overflow-y-auto">
            <h2 className="font-semibold mb-4">Conversations</h2>
            <div className="space-y-2">
              {conversations.map((conv) => (
                <button
                  key={conv.userId}
                  onClick={() => selectConversation(conv)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedConversation?.userId === conv.userId ? "bg-zinc-800" : "hover:bg-zinc-800/50"
                  }`}
                >
                  <p className="font-medium">{conv.userName}</p>
                  <p className="text-sm text-zinc-400 truncate">{conv.lastMessage}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-2 bg-zinc-900 border-zinc-800 p-4 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="border-b border-zinc-800 pb-4 mb-4">
                  <h2 className="font-semibold">{selectedConversation.userName}</h2>
                </div>

                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${msg.senderId === selectedConversation.userId ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.senderId === selectedConversation.userId ? "bg-zinc-800" : "bg-blue-600"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p className="text-xs text-zinc-400 mt-1">{new Date(msg.createdAt).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="bg-zinc-800 border-zinc-700"
                  />
                  <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-400">
                Select a conversation to start messaging
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
