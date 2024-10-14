'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Plus, Pencil, GraduationCap, Calendar } from 'lucide-react'

interface AcademicInfo {
  id: number;
  universityName: string;
  collegeName: string;
  courseName: string;
  cgpa: string;
  achievements: string;
  jobExperience: string;
  jobDescription: string;
  fromDate: string;
  toDate: string;
}

interface ProfileData {
  name: string;
  email: string;
  contactNumber: string;
  academicInfo: AcademicInfo[];
  desiredDegree: string;
  programYears: string;
  desiredCourse: string;
  intake: string;
  interestedCountries: string[];
  expectedYearToStart: string;
}

export default function ProfileComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const [newDegree, setNewDegree] = useState<AcademicInfo | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    email: "john.doe@example.com",
    contactNumber: "+1 (555) 123-4567",
    academicInfo: [
      {
        id: 1,
        universityName: "Harvard University",
        collegeName: "Harvard College",
        courseName: "Computer Science",
        cgpa: "3.8",
        achievements: "Dean's List, Hackathon Winner",
        jobExperience: "2",
        jobDescription: "Software Engineer Intern at Tech Corp",
        fromDate: "2018-09-01",
        toDate: "2022-05-31"
      }
    ],
    desiredDegree: "masters",
    programYears: "2",
    desiredCourse: "Artificial Intelligence",
    intake: "fall",
    interestedCountries: ["USA", "Canada", "UK"],
    expectedYearToStart: "2024"
  });

  const [editableData, setEditableData] = useState<ProfileData>(profileData);
  const [tempAcademicInfo, setTempAcademicInfo] = useState<AcademicInfo[]>([]);
  const newDegreeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (newDegree && newDegreeRef.current) {
      newDegreeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [newDegree]);

  useEffect(() => {
    setTempAcademicInfo(editableData.academicInfo);
  }, [editableData.academicInfo]);

  const addNewDegree = () => {
    setNewDegree({
      id: Date.now(),
      universityName: "",
      collegeName: "",
      courseName: "",
      cgpa: "",
      achievements: "",
      jobExperience: "",
      jobDescription: "",
      fromDate: "",
      toDate: ""
    });
  };

  const handleNewDegreeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    if (newDegree) {
      setNewDegree({ ...newDegree, [field]: e.target.value });
    }
  };

  const addDegreeToList = () => {
    if (newDegree) {
      setTempAcademicInfo(prev => [...prev, newDegree]);
      setNewDegree(null);
    }
  };

  const updateProfileData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileData({...editableData, academicInfo: tempAcademicInfo});
    setIsEditing(false);
    // In a real application, you would send this data to a server here
    console.log("Updated Profile Data:", {...editableData, academicInfo: tempAcademicInfo});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: string, index?: number) => {
    if (index !== undefined && field.includes('.')) {
      const [parentField, childField] = field.split('.');
      setTempAcademicInfo(prev => 
        prev.map((item, i) => i === index ? { ...item, [childField]: e.target.value } : item)
      );
    } else {
      setEditableData(prev => ({ ...prev, [field]: e.target.value }));
    }
  };

  const startEditing = () => {
    setEditableData(profileData);
    setTempAcademicInfo(profileData.academicInfo);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditableData(profileData);
    setTempAcademicInfo(profileData.academicInfo);
    setIsEditing(false);
    setNewDegree(null);
  };

  const ReadOnlyView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">General Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="text-lg font-medium">{profileData.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-lg font-medium flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                {profileData.email}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Contact Number</span>
              <span className="text-lg font-medium flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                {profileData.contactNumber}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Academic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {profileData.academicInfo.map((info, index) => (
              <AccordionItem key={info.id} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  {info.universityName} - {info.courseName}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">University</p>
                      <p className="font-medium">{info.universityName}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">College</p>
                      <p className="font-medium">{info.collegeName}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Course</p>
                      <p className="font-medium">{info.courseName}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">CGPA</p>
                      <p className="font-bold text-green-600">{info.cgpa}</p>
                    </div>
                    <div className="space-y-2 col-span-2">
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium text-blue-600">
                        <Calendar className="inline mr-2 h-4 w-4" />
                        {new Date(info.fromDate).getFullYear()} - {new Date(info.toDate).getFullYear()}
                      </p>
                    </div>
                    <div className="space-y-2 col-span-2">
                      <p className="text-sm text-muted-foreground">Achievements</p>
                      <p className="font-medium">{info.achievements}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Job Experience</p>
                      <p className="font-medium">{info.jobExperience} years</p>
                    </div>
                    <div className="space-y-2 col-span-2">
                      <p className="text-sm text-muted-foreground">Job Description</p>
                      <p className="font-medium">{info.jobDescription}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Application Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Desired Degree</p>
              <p className="text-lg font-medium capitalize">{profileData.desiredDegree}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Program Duration</p>
              <p className="text-lg font-medium">{profileData.programYears} years</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Desired Course</p>
              <p className="text-lg font-medium">{profileData.desiredCourse}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Intake</p>
              <Badge variant="secondary" className="text-lg font-medium capitalize">{profileData.intake}</Badge>
            </div>
            <div className="space-y-2 col-span-2">
              <p className="text-sm text-muted-foreground">Interested Countries</p>
              <div className="flex flex-wrap gap-2">
                {profileData.interestedCountries.map((country, index) => (
                  <Badge key={index} variant="outline" className="text-lg font-medium bg-primary text-primary-foreground">
                    {country}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Expected Year to Start</p>
              <p className="text-lg font-medium">{profileData.expectedYearToStart}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const EditableForm = () => (
    <form onSubmit={updateProfileData} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">General Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={editableData.name} 
                onChange={(e) => handleInputChange(e, 'name')}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <Input 
                  id="email" 
                  type="email" 
                  value={editableData.email} 
                  onChange={(e) => handleInputChange(e, 'email')}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="contact">Contact Number</Label>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <Input 
                  id="contact" 
                  value={editableData.contactNumber} 
                  onChange={(e) => handleInputChange(e, 'contactNumber')}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Academic Information</CardTitle>
          <Button type="button" onClick={addNewDegree} size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Degree
          </Button>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {tempAcademicInfo.map((info, index) => (
              <AccordionItem key={info.id} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  {info.universityName || 'New Degree'} - {info.courseName}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`university-${index}`}>University Name</Label>
                      <Input 
                        id={`university-${index}`} 
                        value={info.universityName} 
                        onChange={(e) => handleInputChange(e, 'academicInfo.universityName',   index)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`college-${index}`}>College Name (if affiliated)</Label>
                      <Input 
                        id={`college-${index}`} 
                        value={info.collegeName} 
                        onChange={(e) => handleInputChange(e, 'academicInfo.collegeName', index)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`course-${index}`}>Course Name</Label>
                      <Input 
                        id={`course-${index}`} 
                        value={info.courseName} 
                        onChange={(e) => handleInputChange(e, 'academicInfo.courseName', index)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`cgpa-${index}`}>CGPA</Label>
                      <Input 
                        id={`cgpa-${index}`} 
                        value={info.cgpa} 
                        onChange={(e) => handleInputChange(e, 'academicInfo.cgpa', index)}
                        className="font-bold text-green-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`fromDate-${index}`}>From Date</Label>
                        <Input 
                          id={`fromDate-${index}`} 
                          type="date" 
                          value={info.fromDate} 
                          onChange={(e) => handleInputChange(e, 'academicInfo.fromDate', index)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`toDate-${index}`}>To Date</Label>
                        <Input 
                          id={`toDate-${index}`} 
                          type="date" 
                          value={info.toDate} 
                          onChange={(e) => handleInputChange(e, 'academicInfo.toDate', index)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`achievements-${index}`}>Achievements</Label>
                      <Textarea 
                        id={`achievements-${index}`} 
                        value={info.achievements} 
                        onChange={(e) => handleInputChange(e, 'academicInfo.achievements', index)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`jobExperience-${index}`}>Job Experience (years)</Label>
                      <Input 
                        id={`jobExperience-${index}`} 
                        type="number" 
                        value={info.jobExperience} 
                        onChange={(e) => handleInputChange(e, 'academicInfo.jobExperience', index)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`jobDescription-${index}`}>Job Description</Label>
                      <Textarea 
                        id={`jobDescription-${index}`} 
                        value={info.jobDescription} 
                        onChange={(e) => handleInputChange(e, 'academicInfo.jobDescription', index)}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {newDegree && (
            <div ref={newDegreeRef} className="mt-4 p-4 border rounded-md">
              <h3 className="text-lg font-semibold mb-4">New Degree Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-university">University Name</Label>
                  <Input 
                    id="new-university" 
                    value={newDegree.universityName} 
                    onChange={(e) => handleNewDegreeChange(e, 'universityName')}
                  />
                </div>
                <div>
                  <Label htmlFor="new-college">College Name (if affiliated)</Label>
                  <Input 
                    id="new-college" 
                    value={newDegree.collegeName} 
                    onChange={(e) => handleNewDegreeChange(e, 'collegeName')}
                  />
                </div>
                <div>
                  <Label htmlFor="new-course">Course Name</Label>
                  <Input 
                    id="new-course" 
                    value={newDegree.courseName} 
                    onChange={(e) => handleNewDegreeChange(e, 'courseName')}
                  />
                </div>
                <div>
                  <Label htmlFor="new-cgpa">CGPA</Label>
                  <Input 
                    id="new-cgpa" 
                    value={newDegree.cgpa} 
                    onChange={(e) => handleNewDegreeChange(e, 'cgpa')}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new-fromDate">From Date</Label>
                    <Input 
                      id="new-fromDate" 
                      type="date" 
                      value={newDegree.fromDate} 
                      onChange={(e) => handleNewDegreeChange(e, 'fromDate')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-toDate">To Date</Label>
                    <Input 
                      id="new-toDate" 
                      type="date" 
                      value={newDegree.toDate} 
                      onChange={(e) => handleNewDegreeChange(e, 'toDate')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="new-achievements">Achievements</Label>
                  <Textarea 
                    id="new-achievements" 
                    value={newDegree.achievements} 
                    onChange={(e) => handleNewDegreeChange(e, 'achievements')}
                  />
                </div>
                <div>
                  <Label htmlFor="new-jobExperience">Job Experience (years)</Label>
                  <Input 
                    id="new-jobExperience" 
                    type="number" 
                    value={newDegree.jobExperience} 
                    onChange={(e) => handleNewDegreeChange(e, 'jobExperience')}
                  />
                </div>
                <div>
                  <Label htmlFor="new-jobDescription">Job Description</Label>
                  <Textarea 
                    id="new-jobDescription" 
                    value={newDegree.jobDescription} 
                    onChange={(e) => handleNewDegreeChange(e, 'jobDescription')}
                  />
                </div>
                <Button type="button" onClick={addDegreeToList}>Done</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Application Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="desiredDegree">Degree trying to achieve</Label>
              <Select 
                value={editableData.desiredDegree} 
                onValueChange={(value) => handleInputChange({ target: { value } } as any, 'desiredDegree')}
              >
                <SelectTrigger id="desiredDegree">
                  <SelectValue placeholder="Select desired degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelors">Bachelor</SelectItem>
                  <SelectItem value="masters">Master</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="programYears">Number of years</Label>
              <Input 
                id="programYears" 
                type="number" 
                value={editableData.programYears} 
                onChange={(e) => handleInputChange(e, 'programYears')}
              />
            </div>
            <div>
              <Label htmlFor="desiredCourse">Course wanted to get into</Label>
              <Input 
                id="desiredCourse" 
                value={editableData.desiredCourse} 
                onChange={(e) => handleInputChange(e, 'desiredCourse')}
              />
            </div>
            <div>
              <Label htmlFor="intake">Intake</Label>
              <Select 
                value={editableData.intake} 
                onValueChange={(value) => handleInputChange({ target: { value } } as any, 'intake')}
              >
                <SelectTrigger id="intake">
                  <SelectValue placeholder="Select intake" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fall">Fall</SelectItem>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="interestedCountries">Country or Countries interested in (comma-separated)</Label>
              <Input 
                id="interestedCountries" 
                value={editableData.interestedCountries.join(', ')} 
                onChange={(e) => handleInputChange({ target: { value: e.target.value.split(', ') } } as any, 'interestedCountries')}
              />
            </div>
            <div>
              <Label htmlFor="expectedYearToStart">Expected Year to Start Study</Label>
              <Input 
                id="expectedYearToStart" 
                type="number" 
                value={editableData.expectedYearToStart} 
                onChange={(e) => handleInputChange(e, 'expectedYearToStart')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={cancelEditing}>Cancel</Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile Details</h1>
      
      {isEditing ? <EditableForm /> : <ReadOnlyView />}

      {!isEditing && (
        <div className="flex justify-end mt-6">
          <Button type="button" onClick={startEditing}>
            <Pencil className="h-4 w-4 mr-2" /> Update Profile
          </Button>
        </div>
      )}
    </div>
  );
}