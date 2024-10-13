import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export const applications = [
  { id: 1, university: 'Harvard University', course: 'Computer Science', status: 'Approved' },
  { id: 2, university: 'MIT', course: 'Electrical Engineering', status: 'Pending' },
  // More data...
]
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
