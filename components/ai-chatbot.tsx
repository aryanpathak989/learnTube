"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Sparkles, BookOpen, HelpCircle, Lightbulb } from "lucide-react"
import { useChat } from "ai/react"

interface AIChatbotProps {
  videoId: string
}

export function AIChatbot({ videoId }: AIChatbotProps) {
  console.log(videoId)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant" as const,
        content: `Hello! I'm your AI learning assistant. I'm here to help you understand this educational content better. Feel free to ask me questions about the video, request explanations of complex topics, or discuss related concepts. How can I help you learn today?`,
      },
    ],
  })

  const quickPrompts = [
    { text: "Explain the main concept", icon: BookOpen },
    { text: "Give me a summary", icon: HelpCircle },
    { text: "Key takeaways", icon: Lightbulb },
  ]

const handleQuickPrompt = (prompt: string) => {
  const syntheticEvent = {
    target: { value: prompt }
  } as React.ChangeEvent<HTMLInputElement>

  handleInputChange(syntheticEvent)
}

  return (
    <div className="flex flex-col h-full lg:h-[calc(100vh-64px)] bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 flex items-center">
              AI Learning Assistant
              <Sparkles className="w-4 h-4 ml-2 text-indigo-500" />
            </h3>
            <p className="text-sm text-slate-600">Ready to help you understand better</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 min-h-[300px] lg:min-h-0">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] ${message.role === "user" ? "order-2" : "order-1"}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white ml-auto"
                      : "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === "assistant" && <Bot className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />}
                    {message.role === "user" && <User className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />}
                    <div className="flex-1">
                      <p
                        className={`text-sm leading-relaxed ${message.role === "user" ? "text-white" : "text-slate-800"}`}
                      >
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-blue-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me about the video content..."
              className="flex-1 rounded-full border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => {
              const IconComponent = prompt.icon
              return (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-full border-slate-300 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                  onClick={() => handleQuickPrompt(prompt.text)}
                >
                  <IconComponent className="w-3 h-3 mr-1" />
                  {prompt.text}
                </Button>
              )
            })}
          </div>
        </form>
        <p className="text-xs text-slate-500 mt-2 text-center">AI responses are highlighted with blue styling</p>
      </div>
    </div>
  )
}
