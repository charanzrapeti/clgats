"use client"

import { useState } from 'react'
import { LayoutDashboard, Heart, FileText, User, PieChart, MoreHorizontal, X } from 'lucide-react'

const tabs = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'WishList', icon: Heart },
  { name: 'MyDocuments', icon: FileText },
  { name: 'Profile', icon: User },
  { name: 'Analysis', icon: PieChart },
]

const applications = [
  { id: 1, university: 'Harvard University', course: 'Computer Science', status: 'Approved', country: 'USA', state: 'Massachusetts', city: 'Cambridge', description: 'Advanced CS program', startDate: '2023-09-01' },
  { id: 2, university: 'MIT', course: 'Electrical Engineering', status: 'Pending', country: 'USA', state: 'Massachusetts', city: 'Cambridge', description: 'Cutting-edge EE program', startDate: '2023-08-15' },
  { id: 3, university: 'Stanford University', course: 'Data Science', status: 'Rejected', country: 'USA', state: 'California', city: 'Stanford', description: 'Comprehensive DS curriculum', startDate: '2023-09-15' },
  { id: 4, university: 'Cambridge University', course: 'Mathematics', status: 'Approved', country: 'UK', state: 'Cambridgeshire', city: 'Cambridge', description: 'Pure and applied mathematics', startDate: '2023-10-01' },
  { id: 5, university: 'Oxford University', course: 'Physics', status: 'Pending', country: 'UK', state: 'Oxfordshire', city: 'Oxford', description: 'Theoretical and experimental physics', startDate: '2023-09-30' },
]

function ApplicationForm({ application, onClose, isEditing }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{isEditing ? 'Edit' : 'View'} Application</h3>
          <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4">
            <X className="h-6 w-6 text-gray-500" />
          </button>
          <div className="mt-2 px-7 py-3">
            <form>
              <h4 className="text-left font-medium mb-2">Course Details</h4>
              <input
                type="text"
                placeholder="University Name"
                value={application.university}
                readOnly={!isEditing}
                className="mb-2 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Course Name"
                value={application.course}
                readOnly={!isEditing}
                className="mb-2 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
              <textarea
                placeholder="Description"
                value={application.description}
                readOnly={!isEditing}
                className="mb-2 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
              <h5 className="text-left font-medium mb-2">Place</h5>
              <input
                type="text"
                placeholder="Country"
                value={application.country}
                readOnly={!isEditing}
                className="mb-2 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="State"
                value={application.state}
                readOnly={!isEditing}
                className="mb-2 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="City"
                value={application.city}
                readOnly={!isEditing}
                className="mb-2 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
              <h4 className="text-left font-medium mb-2">Application Details</h4>
              <input
                type="date"
                placeholder="Start Date"
                value={application.startDate}
                readOnly={!isEditing}
                className="mb-2 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardContent() {
  const [filter, setFilter] = useState('All')
  const [selectedApp, setSelectedApp] = useState(null)
  const [showActions, setShowActions] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const filteredApplications = applications.filter(app => 
    filter === 'All' || app.status === filter
  )

  const counts = {
    total: applications.length,
    approved: applications.filter(app => app.status === 'Approved').length,
    pending: applications.filter(app => app.status === 'Pending').length,
    rejected: applications.filter(app => app.status === 'Rejected').length,
  }

  const handleMoreDetails = (appId) => {
    setShowActions(showActions === appId ? null : appId)
  }

  const handleAction = (action, app) => {
    setSelectedApp(app)
    if (action === 'View') {
      setIsEditing(false)
      setShowForm(true)
    } else if (action === 'Edit') {
      setIsEditing(true)
      setShowForm(true)
    } else if (action === 'Delete') {
      // Implement delete functionality here
      console.log('Delete', app)
    }
    setShowActions(null)
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-600 rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-white">
          <span className="text-3xl font-bold">{counts.total}</span>
          <span className="mt-2 text-lg">Applications</span>
        </div>
        <div className="bg-green-100 rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-green-600">{counts.approved}</span>
          <span className="mt-2 text-sm text-green-600">Approved</span>
        </div>
        <div className="bg-yellow-100 rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-yellow-600">{counts.pending}</span>
          <span className="mt-2 text-sm text-yellow-600">Pending</span>
        </div>
        <div className="bg-red-100 rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-red-600">{counts.rejected}</span>
          <span className="mt-2 text-sm text-red-600">Rejected</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {['All', 'Approved', 'Pending', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app, index) => (
                <tr key={app.id}>
                  <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{app.university}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{app.course}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="relative">
                      <button 
                        onClick={() => handleMoreDetails(app.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                      {showActions === app.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                          {['View', 'Edit', 'Delete'].map((action) => (
                            <button
                              key={action}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleAction(action, app)}
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <ApplicationForm
          application={selectedApp}
          onClose={() => setShowForm(false)}
          isEditing={isEditing}
        />
      )}
    </div>
  )
}

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
      </div>
    </div>
  )
}