"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send } from "lucide-react"

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export function MedicBotChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm MedicBot. I'm here to answer health-related questions and provide guidance. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "Thank you for your question. Based on your symptoms, I recommend monitoring them closely and staying hydrated.",
        "That's a common concern. I suggest consulting with a healthcare professional if symptoms persist.",
        "Good question! Remember to practice good hygiene and maintain adequate rest for recovery.",
        "I understand your concern. If symptoms worsen, please visit the campus clinic immediately.",
        "That sounds like you may benefit from OTC medication. Please follow package directions or consult the pharmacy.",
      ]

      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "bot",
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setLoading(false)
    }, 1000)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg flex items-center justify-center transition-all hover:scale-110"
        aria-label="Open MedicBot chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-96 max-h-96 flex flex-col bg-white dark:bg-slate-950 rounded-lg shadow-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <p className="font-semibold text-sm">MedicBot</p>
          <p className="text-xs text-muted-foreground">AI Health Assistant</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="h-8 w-8 p-0">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground px-3 py-2 rounded-lg text-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask MedicBot..."
          className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <Button size="sm" onClick={handleSendMessage} disabled={loading} className="px-3">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
