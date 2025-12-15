// lib/types.ts
export interface Professor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  specialty: string;
  phone: string;
  isApproved: boolean;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  sex: "M" | "F" | "Otro";
  weightKg: number;
  heightCm: number;
  professorId: number;
}

export type GoalStatus = "pending" | "in_progress" | "completed" | "failed";

export interface Goal {
  id: number;
  studentId: number;
  title: string;
  description?: string;
  targetType: string;
  targetValue?: number;
  startDate: string; // ISO string
  endDate: string;
  reward?: string;
  status: GoalStatus;
}

export interface ProgressLog {
  id: number;
  studentId: number;
  goalId?: number;
  date: string;
  weightKg?: number;
  notes?: string;
}

export type ProfessorStars = 5 | 3 | 1;

export interface ProfessorLocation {
  lat: number;
  lng: number;
  address?: string;
}

export interface Professor {
  // ...tus campos actuales (firstName, lastName, email, phone, specialty, isApproved, etc.)

  stars: ProfessorStars;
  zone: string;          // ✅ zona geográfica
  showOnMap: boolean;    // ✅ aparece en mapa/proximidad
  location: ProfessorLocation;
}


