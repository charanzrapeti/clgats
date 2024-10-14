'use client'

import { useState } from 'react'
import { MoreHorizontal, Plus, Star, ChevronRight, ChevronLeft } from 'lucide-react'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {   Currency, Requirements, Financials, CourseDetailsInterface, CourseDetailsProps } from '../interfaces/courseInterface'

import {mockDocuments, initialCourses, currencySymbols} from '../MockData'




function CourseDetails({ course: initialCourse, isEditing, onClose, onUpdate }: CourseDetailsProps) {
  const [course, setCourse] = useState<CourseDetailsInterface>(initialCourse);
  const [currentSection, setCurrentSection] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setCourse({ ...course, [name]: value });
  };

  const handleInterestChange = (value: string) => {
    setCourse({ ...course, ['interest']:parseInt(value)})
  }

  const handleRequirementsChange = (field: keyof Requirements, value: string | number | string[]) => {
    setCourse({
      ...course,
      requirements: { ...course.requirements, [field]: value },
    });
  };

  const handleLanguageTestChange = (field: 'testName' | 'testScore', value: string) => {
    setCourse({
      ...course,
      requirements: {
        ...course.requirements,
        languageTest: { ...course.requirements.languageTest, [field]: value },
      },
    });
  };

  const handleFinancialsChange = (field: keyof Financials, value: number | string | Currency) => {
    setCourse({
      ...course,
      financials: { ...course.financials, [field]: value },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(course);
  };

  const handleAddOtherDocument = () => {
    const newDocument = prompt('Enter the name of the new document:');
    if (newDocument) {
      setCourse({
        ...course,
        requirements: {
          ...course.requirements,
          otherDocuments: [...course.requirements.otherDocuments, newDocument],
        },
      });
    }
  };

  const sections = [
    { title: "General Details", content: (
      <div className="space-y-4">
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
          <Label htmlFor="universityCountry">University Country</Label>
          <Input
            id="universityCountry"
            name="universityCountry"
            value={course.universityCountry}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="universityState">University State</Label>
          <Input
            id="universityState"
            name="universityState"
            value={course.universityState}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="universityCity">University City</Label>
          <Input
            id="universityCity"
            name="universityCity"
            value={course.universityCity}
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
          <Label htmlFor="admissionStatus">Admission Status</Label>
          <Select
            onValueChange={(value) => handleSelectChange('admissionStatus', value)}
            defaultValue={course.admissionStatus}
            disabled={!isEditing}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select admission status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="applicationStatus">Application Status</Label>
          <Select
            onValueChange={(value) => handleSelectChange('applicationStatus', value)}
            defaultValue={course.applicationStatus}
            disabled={!isEditing}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select application status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="notapplied">Not Applied</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="applicationDescription">Application Description</Label>
          <Textarea
            id="applicationDescription"
            name="applicationDescription"
            value={course.applicationDescription}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
        <Label htmlFor="applicationStartDate">Application Start Date</Label>
        <Input
            id="applicationStartDate"
            name="applicationStartDate"
            type="date"
            // Ensure course.applicationStartDate is a Date object
            value={course.applicationStartDate instanceof Date 
            ? course.applicationStartDate.toISOString().split('T')[0] 
            : new Date(course.applicationStartDate).toISOString().split('T')[0]} 
            onChange={(e) => {
            console.log(e.target.value);
            handleSelectChange('applicationStartDate', new Date(e.target.value).toISOString());
            }}
            disabled={!isEditing}
        />
        </div>

        <div>
          <Label htmlFor="applicationEndDate">Application End Date</Label>
          <Input
            id="applicationEndDate"
            name="applicationEndDate"
            type="date"
            value={course.applicationEndDate instanceof Date ? course.applicationEndDate.toISOString().split('T')[0]: new Date(course.applicationEndDate).toISOString().split('T')[0]}
            onChange={(e) => handleSelectChange('applicationEndDate', new Date(e.target.value).toISOString())}
            disabled={!isEditing}
          />
        </div>
        <div>
  <Label htmlFor="interest">Interest Level</Label>
  {isEditing ? (
    <Select
      onValueChange={handleInterestChange}
      defaultValue={course.interest.toString()}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select interest level" />
      </SelectTrigger>
      <SelectContent>
        {[1, 2, 3, 4, 5].map((level) => (
          <SelectItem key={level} value={level.toString()}>
            {level}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 ${star <= course.interest ? 'text-yellow-400' : 'text-gray-300'}`}
          fill={star <= course.interest ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  )}
</div>
        <div>
          <Label htmlFor="programDuration">Program Duration (years)</Label>
          <Input
            id="programDuration"
            name="programDuration"
            type="number"
            value={course.programDuration}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="modeOfStudy">Mode of Study</Label>
          <Select
            onValueChange={(value) => handleSelectChange('modeOfStudy', value)}
            defaultValue={course.modeOfStudy}
            disabled={!isEditing}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select mode of study" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="parttime">Part-time</SelectItem>
              <SelectItem value="fulltime">Full-time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="courseStartDate">Course Start Date</Label>
          <Input
            id="courseStartDate"
            name="courseStartDate"
            type="date"
            // Ensure course.applicationStartDate is a Date object
            value={course.applicationStartDate instanceof Date ? course.courseStartDate.toISOString().split('T')[0]: new Date(course.courseStartDate).toISOString().split('T')[0]}
            onChange={(e) => handleSelectChange('courseStartDate', new Date(e.target.value).toISOString())}
            disabled={!isEditing}
          />
        </div>
      </div>
    )},
    { title: "Required Documents", content: (
      <div className="space-y-4">
        {['resume', 'sop', 'transcripts', 'lor'].map((docType) => (
          <div key={docType}>
            <Label htmlFor={docType}>{docType.toUpperCase()}</Label>
            <div className="flex items-center space-x-2">
              <Select
                onValueChange={(value) => handleRequirementsChange(docType as keyof Requirements, value)}
                defaultValue={course.requirements[docType as keyof Requirements] as string}
                disabled={!isEditing}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={isEditing ? "Select file" : "No file selected"} />
                </SelectTrigger>
                <SelectContent>
                  {mockDocuments.map((doc) => (
                    <SelectItem key={doc} value={doc}>{doc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isEditing && (
                <Button type="button" variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
            {!isEditing && course.requirements[docType as keyof Requirements] && (
              <a href="#" className="text-blue-600 hover:underline">View File</a>
            )}
          </div>
        ))}
        <div>
          <Label htmlFor="languageTest">Language Test</Label>
          <div className="flex space-x-2">
            <Select
              onValueChange={(value) => handleLanguageTestChange('testName', value)}
              defaultValue={course.requirements.languageTest.testName}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select test" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TOEFL">TOEFL</SelectItem>
                <SelectItem value="IELTS">IELTS</SelectItem>
                <SelectItem value="PTE">PTE</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Score"
              value={course.requirements.languageTest.testScore}
              onChange={(e) => handleLanguageTestChange('testScore', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div>
          <Label>Other Documents</Label>
          <div className="space-y-2">
            {course.requirements.otherDocuments.map((doc, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input value={doc} disabled />
                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      
                      const newDocs = [...course.requirements.otherDocuments];
                      newDocs.splice(index, 1);
                      handleRequirementsChange('otherDocuments', newDocs);
                    }}
                  >
                    X
                  </Button>
                )}
              </div>
            ))}
            {isEditing && (
              <Button type="button" onClick={handleAddOtherDocument} variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="minimumCgpa">Minimum CGPA</Label>
          <Input
            id="minimumCgpa"
            name="minimumCgpa"
            type="number"
            step="0.1"
            value={course.requirements.minimumCgpa}
            onChange={(e) => handleRequirementsChange('minimumCgpa', parseFloat(e.target.value))}
            disabled={!isEditing}
          />
        </div>
      </div>
    )},
    { title: "Financials", content: (
      <div className="space-y-4">
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Select
            onValueChange={(value) => handleFinancialsChange('currency', value as Currency)}
            defaultValue={course.financials.currency}
            disabled={!isEditing}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(currencySymbols).map(([currency, symbol]) => (
                <SelectItem key={currency} value={currency}>{symbol}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="applicationFee">Application Fee ({currencySymbols[course.financials.currency]})</Label>
          <Input
            id="applicationFee"
            name="applicationFee"
            type="number"
            value={course.financials.applicationFee}
            onChange={(e) => handleFinancialsChange('applicationFee', parseFloat(e.target.value))}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="fees">Fees ({currencySymbols[course.financials.currency]})</Label>
          <Input
            id="fees"
            name="fees"
            type="number"
            value={course.financials.fees}
            onChange={(e) => handleFinancialsChange('fees', parseFloat(e.target.value))}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="scholarshipStatus">Scholarship Status</Label>
          <Input
            id="scholarshipStatus"
            name="scholarshipStatus"
            value={course.financials.scholarshipStatus}
            onChange={(e) => handleFinancialsChange('scholarshipStatus', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="scholarshipAmount">Scholarship Amount ({currencySymbols[course.financials.currency]})</Label>
          <Input
            id="scholarshipAmount"
            name="scholarshipAmount"
            type="number"
            value={course.financials.scholarshipAmount}
            onChange={(e) => handleFinancialsChange('scholarshipAmount', parseFloat(e.target.value))}
            disabled={!isEditing}
          />
        </div>
      </div>
    )},
    { title: "Other Details", content: (
      <div className="space-y-4">
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={course.description}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="resources">Resources</Label>
          <Input
            id="resources"
            name="resources"
            value={course.resources}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="additionalNotes">Additional Notes</Label>
          <Textarea
            id="additionalNotes"
            name="additionalNotes"
            value={course.additionalNotes}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
      </div>
    )}
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto h-full px-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{sections[currentSection].title}</h2>
      </div>
      {sections[currentSection].content}
      <div className="flex justify-between items-center mt-6">
        <Button
          type="button"
          onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
          disabled={currentSection === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        {currentSection < sections.length - 1 ? (
          <Button
            type="button"
            onClick={() => setCurrentSection(prev => Math.min(sections.length - 1, prev + 1))}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <div className="space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
            {isEditing && (
              <Button type="submit">Update</Button>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSection ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </form>
  )
}

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