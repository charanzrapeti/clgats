import {CourseDetailsInterface, Currency} from './interfaces/courseInterface'

// Mock data for document selection
export const mockDocuments = ['Document1.pdf', 'Document2.pdf', 'Document3.pdf', 'Document4.pdf'];

// Mock initial course data
export const initialCourses: CourseDetailsInterface[] = [
  {
    id: '1',
    university: 'Harvard University',
    universityCountry: 'USA',
    universityState: 'Massachusetts',
    universityCity: 'Cambridge',
    course: 'Computer Science',
    admissionStatus: 'pending',
    applicationStatus: 'applied',
    applicationDescription: 'Application in progress',
    applicationStartDate: new Date('2023-01-01'),
    applicationEndDate: new Date('2023-12-31'),
    interest: 5,
    programDuration: 4,
    modeOfStudy: 'fulltime',
    courseStartDate: new Date('2024-09-01'),
    requirements: {
      resume: 'Resume1.pdf',
      sop: 'SOP1.pdf',
      transcripts: 'Transcript1.pdf',
      languageTest: {
        testName: 'TOEFL',
        testScore: '100',
      },
      lor: 'LOR1.pdf',
      otherDocuments: ['OtherDoc1.pdf'],
      minimumCgpa: 3.5,
    },
    financials: {
      applicationFee: 100,
      fees: 50000,
      currency: 'dollars',
      scholarshipStatus: 'Pending',
      scholarshipAmount: 0,
    },
    description: 'A comprehensive computer science program',
    resources: 'https://cs.harvard.edu',
    additionalNotes: 'Highly competitive program',
  },
  // Add more mock courses as needed
];

export const currencySymbols: Record<Currency, string> = {
  dollars: '$',
  euros: '€',
  rupees: '₹'
};