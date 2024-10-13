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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Mock data with expanded course details
const initialCourses = [
  { 
    id: 1, 
    university: 'Harvard University', 
    course: 'Computer Science', 
    status: 'Open',
    applied: Math.random() < 0.5 ? 0 : 1,
    description: 'A comprehensive course covering various aspects of computer science including algorithms, data structures, and software engineering.'
  },
  { 
    id: 2, 
    university: 'MIT', 
    course: 'Electrical Engineering', 
    status: 'Closed',
    applied: Math.random() < 0.5 ? 0 : 1,
    description: 'An in-depth study of electrical engineering principles, circuit design, and signal processing.'
  },
  { 
    id: 3, 
    university: 'Stanford University', 
    course: 'Data Science', 
    status: 'Open',
    applied: Math.random() < 0.5 ? 0 : 1,
    description: 'Explore the world of data analysis, machine learning, and statistical modeling in this comprehensive data science course.'
  },
  { 
    id: 4, 
    university: 'Caltech', 
    course: 'Physics', 
    status: 'Open',
    applied: Math.random() < 0.5 ? 0 : 1,
    description: 'Delve into the fundamental laws of the universe, from quantum mechanics to astrophysics.'
  },
  { 
    id: 5, 
    university: 'UC Berkeley', 
    course: 'Business Administration', 
    status: 'Closed',
    applied: Math.random() < 0.5 ? 0 : 1,
    description: 'Gain a strong foundation in business principles, management strategies, and entrepreneurship.'
  }
]

interface CourseDetails {
  id: number
  university: string
  course: string
  status: string
  applied: number
  description: string
}

interface CourseDetailsProps {
  course: CourseDetails
  isEditing: boolean
  onClose: () => void
  onUpdate: (course: CourseDetails) => void
}

function CourseDetails({ course: initialCourse, isEditing, onClose, onUpdate }: CourseDetailsProps) {
  const [course, setCourse] = useState<CourseDetails>(initialCourse)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value })
  }

  const handleSwitchChange = (checked: boolean) => {
    setCourse({ ...course, applied: checked ? 1 : 0 })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(course)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto h-full">
      <div>
        <Label htmlFor="university">University Name</Label>
        <Input
          id="university"
          name="university"
          value={course.university}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="course">Course Name</Label>
        <Input
          id="course"
          name="course"
          value={course.course}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Input
          id="status"
          name="status"
          value={course.status}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="applied"
          checked={course.applied === 1}
          onCheckedChange={handleSwitchChange}
          disabled={!isEditing}
        />
        <Label htmlFor="applied">Applied</Label>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={course.description}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="h-32"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Close
        </Button>
        {isEditing && (
          <Button type="submit">Update</Button>
        )}
      </div>
    </form>
  )
}

export default function WishlistContent() {
  const [courses, setCourses] = useState(initialCourses)
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDelete = (id: number) => {
    setCourses(courses.filter(course => course.id !== id))
  }

  const handleView = (id: number) => {
    setSelectedCourse(id)
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const handleEdit = (id: number) => {
    setSelectedCourse(id)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedCourse(null)
    setIsEditing(false)
  }

  const handleUpdateCourse = (updatedCourse: CourseDetails) => {
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
            <TableHead>S.No</TableHead>
            <TableHead>University</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={course.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{course.university}</TableCell>
              <TableCell>{course.course}</TableCell>
              <TableCell>{course.status}</TableCell>
              <TableCell>{course.applied ? 'Yes' : 'No'}</TableCell>
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
        <DialogContent className="w-4/5 h-4/5 max-w-none">
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