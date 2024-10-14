// Helper types for select fields
export type AdmissionStatus = 'approved' | 'pending' | 'rejected';
export type ApplicationStatus = 'applied' | 'notapplied';
export type Currency = 'dollars' | 'euros' | 'rupees';
export type ModeOfStudy = 'online' | 'parttime' | 'fulltime';

// Requirements object structure
export interface Requirements {
  resume: string;
  sop: string;
  transcripts: string;
  languageTest: {
    testName: string;
    testScore: string;
  };
  lor: string;
  otherDocuments: string[];
  minimumCgpa: number;
}

// Financials object structure
export interface Financials {
  applicationFee: number;
  fees: number;
  currency: Currency;
  scholarshipStatus: string;
  scholarshipAmount: number;
}

// Main interface for course details
export interface CourseDetailsInterface {
  id: string;
  university: string;
  universityCountry: string;
  universityState: string;
  universityCity: string;
  course: string;
  admissionStatus: AdmissionStatus;
  applicationStatus: ApplicationStatus;
  applicationDescription: string;
  applicationStartDate: Date;
  applicationEndDate: Date;
  interest: number;
  programDuration: number;
  modeOfStudy: ModeOfStudy;
  courseStartDate: Date;
  requirements: Requirements;
  financials: Financials;
  description: string;
  resources: string;
  additionalNotes: string;
}

export interface CourseDetailsProps {
  course: CourseDetailsInterface;
  isEditing: boolean;
  onClose: () => void;
  onUpdate: (course: CourseDetailsInterface) => void;
}






