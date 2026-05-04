'use client'

import React, { useState } from 'react'
import { Menu, MessageCircle, Brain, Zap, Settings, LogOut, Plus, ChevronDown } from 'lucide-react'

export default function AppPreview() {
  const [currentPage, setCurrentPage] = useState<'chat' | 'agents' | 'skills' | 'settings'>('chat')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [conversations, setConversations] = useState([
    { id: '1', title: 'Willkommen bei Gerki', updated_at: 'Heute' },
    { id: '2', title: 'Meine erste Frage', updated_at: 'Gestern' },
  ])

  const menuItems = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'agents', label: 'Agenten', icon: Brain },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'settings', label: 'Einstellungen', icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-[#05080f] text-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#0d1424] border-r border-[#1e2d47] transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-[#1e2d47] flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold bg-gradient-to-r from-[#1d6bf3] to-[#00d4aa] bg-clip-text text-transparent">Gerki</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-[#131d30] rounded-lg transition-colors">
            <Menu size={20} />
          </button>
        </div>

        {/* New Chat Button */}
        <button className="m-4 p-3 bg-[#1d6bf3] hover:bg-[#4d91ff] rounded-lg flex items-center justify-center gap-2 transition-colors">
          <Plus size={20} />
          {sidebarOpen && <span>Neuer Chat</span>}
        </button>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id as any)}
                className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                  currentPage === item.id
                    ? 'bg-[#1d6bf3] text-white'
                    : 'text-[#7a8ba8] hover:bg-[#131d30]'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Conversations */}
        {sidebarOpen && currentPage === 'chat' && (
          <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-2 border-t border-[#1e2d47] pt-4">
            <p className="text-xs text-[#7a8ba8] px-2 mb-3">Verlauf</p>
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className="w-full text-left p-2 rounded-lg hover:bg-[#131d30] transition-colors text-sm truncate"
              >
                {conv.title}
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-[#1e2d47] space-y-2">
          <button className="w-full p-3 text-[#7a8ba8] hover:bg-[#131d30] rounded-lg flex items-center gap-3 transition-colors">
            <LogOut size={20} />
            {sidebarOpen && <span>Abmelden</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 border-b border-[#1e2d47] flex items-center px-6 bg-[#0d1424]">
          <h2 className="text-xl font-semibold">
            {currentPage === 'chat' && 'Chat'}
            {currentPage === 'agents' && 'Agenten'}
            {currentPage === 'skills' && 'Skills'}
            {currentPage === 'settings' && 'Einstellungen'}
          </h2>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentPage === 'chat' && (
            <div className="space-y-4">
              <div className="bg-[#131d30] rounded-lg p-4 border border-[#1e2d47]">
                <p className="text-[#7a8ba8] mb-2">Assistent</p>
                <p className="text-white">Hallo! Ich bin Gerki, dein persönlicher KI-Assistent. Wie kann ich dir heute helfen?</p>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#1d6bf3] rounded-lg p-4 max-w-xs">
                  <p className="text-white">Das ist eine Demo-Vorschau der Gerki-App!</p>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'agents' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#131d30] rounded-lg p-4 border border-[#1e2d47] hover:border-[#1d6bf3] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <Brain size={24} className="text-[#1d6bf3]" />
                    <h3 className="font-semibold">Agent {i}</h3>
                  </div>
                  <p className="text-[#7a8ba8] text-sm">Ein intelligenter Agent für spezifische Aufgaben</p>
                </div>
              ))}
            </div>
          )}

          {currentPage === 'skills' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#131d30] rounded-lg p-4 border border-[#1e2d47] hover:border-[#00d4aa] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap size={24} className="text-[#00d4aa]" />
                    <h3 className="font-semibold">Skill {i}</h3>
                  </div>
                  <p className="text-[#7a8ba8] text-sm">Eine spezialisierte Fähigkeit für Gerki</p>
                </div>
              ))}
            </div>
          )}

          {currentPage === 'settings' && (
            <div className="max-w-2xl space-y-4">
              <div className="bg-[#131d30] rounded-lg p-4 border border-[#1e2d47]">
                <h3 className="font-semibold mb-3">Allgemeine Einstellungen</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                    <span className="text-[#7a8ba8]">Benachrichtigungen aktivieren</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                    <span className="text-[#7a8ba8]">Dunkles Design</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input (nur bei Chat-Seite) */}
        {currentPage === 'chat' && (
          <div className="border-t border-[#1e2d47] p-4 bg-[#0d1424]">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Schreib deine Nachricht..."
                className="flex-1 bg-[#131d30] border border-[#1e2d47] rounded-lg px-4 py-3 text-white placeholder-[#7a8ba8] focus:outline-none focus:border-[#1d6bf3]"
              />
              <button className="bg-[#1d6bf3] hover:bg-[#4d91ff] px-6 py-3 rounded-lg font-semibold transition-colors">
                Senden
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
