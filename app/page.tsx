"use client"

import { useState } from 'react'
import { LayoutDashboard, Heart, FileText, User, PieChart } from 'lucide-react'

import DashboardContent from './components/DashboardContent'
import WishlistContent from './components/WishlistContent'
import ProfileComponent from './components/ProfileContent'

const tabs = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'WishList', icon: Heart },
  { name: 'MyDocuments', icon: FileText },
  { name: 'Profile', icon: User },
  { name: 'Analysis', icon: PieChart },
]






export default function Component() {
  const [activeTab, setActiveTab] = useState('Dashboard')

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">My App</h1>
        </div>
        <nav className="flex flex-wrap md:flex-col mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`flex items-center w-full px-4 py-2 text-left ${
                activeTab === tab.name
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <tab.icon className="w-5 h-5 mr-3" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-10 overflow-auto">
        <h2 className="text-3xl font-bold text-gray-800">{activeTab}</h2>
        <p className="mt-4 text-gray-600">This is the {activeTab} page content.</p>
        {activeTab === 'Dashboard' && <DashboardContent />}
        {activeTab === 'WishList' && <WishlistContent />}
        {activeTab === 'Profile' && <ProfileComponent/>}

      </div>
    </div>
  )
}