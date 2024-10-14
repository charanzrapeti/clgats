"use client"

import { useState } from 'react'

import { MoreHorizontal } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

  import {  CourseDetailsInterface } from '../interfaces/courseInterface'

  import { initialCourses} from '../MockData'
  
  import { CourseDetails } from './CourseDetails'
  




export default function DashboardContent() {
  const [courses, setCourses] = useState(initialCourses)
    const [filter, setFilter] = useState('All')
  
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  
    const [showForm, setShowForm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
  
    const filteredApplications = initialCourses.filter(app => 
      filter === 'All' || app.admissionStatus === filter
    )
  
    const counts = {
      total: initialCourses.length,
      approved: initialCourses.filter(app => app.admissionStatus === 'approved').length,
      pending: initialCourses.filter(app => app.admissionStatus === 'pending').length,
      rejected: initialCourses.filter(app => app.admissionStatus === 'rejected').length,
    }
  
 
    const handleAction = (action, app) => {
    
      if (action === 'View') {
        setIsEditing(false)
        setSelectedCourse(app.id)
        setShowForm(true)
      } else if (action === 'Edit') {
        setIsEditing(true)
        setSelectedCourse(app.id)
        setShowForm(true)
      } else if (action === 'Delete') {
        // Implement delete functionality here
        console.log('Delete', app)
      }
      
    }

    const handleCloseDialog = () => {
      setShowForm(false)
      setSelectedCourse(null)
      setIsEditing(false)
    }

    const handleUpdateCourse = (updatedCourse: CourseDetailsInterface) => {
      setCourses(courses.map(course => 
        course.id === updatedCourse.id ? updatedCourse : course
      ))
      handleCloseDialog()
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
            {['All', 'approved', 'pending', 'rejected'].map((admissionStatus) => (
              <button
                key={admissionStatus}
                onClick={() => setFilter(admissionStatus)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  filter === admissionStatus
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {admissionStatus}
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
                        app.admissionStatus === 'approved' ? 'bg-green-100 text-green-800' :
                        app.admissionStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {app.admissionStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                    
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            
                                <Button variant="ghost" className="h-8 w-8 p-0 text-blue-600 hover:text-blue-900">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => handleAction('View',app)}>
                                View
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleAction('Edit', app)}>
                                Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleAction('Delete',app)}>
                                Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                </DropdownMenu>
                        

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        {/* {showForm && (
          <ApplicationForm
            application={selectedApp}
            onClose={() => setShowForm(false)}
            isEditing={isEditing}
          />
        )} */}

        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="w-11/12 max-w-4xl h-5/6 max-h-screen">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Course Details' : 'View Course Details'}</DialogTitle>
            </DialogHeader>
            {selectedCourse && (
              <CourseDetails
                course={courses.find(c => c.id === selectedCourse)!}
                isEditing={isEditing}
                onClose={handleCloseDialog}
                onUpdate={handleUpdateCourse}
              />
            )}
          </DialogContent>
      </Dialog>
        
      </div>
    )
  }