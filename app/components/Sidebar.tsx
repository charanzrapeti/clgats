'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Heart, FileText, User, PieChart } from 'lucide-react'

const tabs = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'WishList', href: '/wishlist', icon: Heart },
  { name: 'MyDocuments', href: '/mydocuments', icon: FileText },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Analysis', href: '/analysis', icon: PieChart },
]

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('Dashboard')

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">My App</h1>
      </div>
      <nav className="flex flex-col mt-4">
        {tabs.map((tab) => (
          <Link key={tab.name} href={tab.href} legacyBehavior>
            {/* Remove <a> and put className, onClick, and content inside <Link> */}
            <a
              className={`flex items-center w-full px-4 py-2 text-left ${
                activeTab === tab.name
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <tab.icon className="w-5 h-5 mr-3" />
              {tab.name}
            </a>
          </Link>
        ))}
      </nav>
    </div>
  )
}
