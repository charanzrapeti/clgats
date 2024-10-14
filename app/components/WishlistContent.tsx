'use client'

import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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




export default function UniversityCoursesList() {
  const [courses, setCourses] = useState(initialCourses)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDelete = (id: string) => {
    setCourses(courses.filter(course => course.id !== id))
  }

  const handleView = (id: string) => {
    setSelectedCourse(id)
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const handleEdit = (id: string) => {
    setSelectedCourse(id)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">University Courses</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>University</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Admission Status</TableHead>
            <TableHead>Application Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.university}</TableCell>
              <TableCell>{course.course}</TableCell>
              <TableCell>{course.admissionStatus}</TableCell>
              <TableCell>{course.applicationStatus}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => handleView(course.id)}>
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleEdit(course.id)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleDelete(course.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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