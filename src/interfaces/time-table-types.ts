export interface IUser {
  _id: string;
  name: string;
  email: string;
  employeeId?: string;
  role: 'admin' | 'faculty' | 'hod';
  department?: string;
  isActive: boolean;
}

export interface IDepartment {
  _id: string;
  name: string;
  code: string;
  hod?: string;
  faculty: string[];
  subjects: string[];
  isActive: boolean;
}

export interface IFaculty {
  _id: string;
  user: string;
  employeeId: string;
  department: string;
  subjects: string[];
  maxHoursPerDay: number;
  maxHoursPerWeek: number;
  unavailableSlots: Array<{
    day: string;
    time: string;
    reason: string;
  }>;
  preferences: {
    preferredSlots: string[];
    avoidSlots: string[];
  };
  workload: number;
  isActive: boolean;
}

export interface ISubject {
  _id: string;
  name: string;
  code: string;
  department: string;
  semester: number;
  credits: number;
  hoursPerWeek: number;
  type: 'theory' | 'practical' | 'elective';
  faculty: string[];
  isNEPMultidisciplinary: boolean;
  prerequisites: string[];
  maxStudents?: number;
  isActive: boolean;
}

export interface IClassroom {
  _id: string;
  name: string;
  number: string;
  building: string;
  floor?: number;
  capacity: number;
  type: 'lecture' | 'lab' | 'seminar';
  equipment: string[];
  isActive: boolean;
  unavailableSlots: Array<{
    day: string;
    time: string;
    reason: string;
  }>;
}

export interface IBatch {
  _id: string;
  name: string;
  department: string;
  semester: number;
  year: number;
  section: string;
  strength: number;
  subjects: string[];
  electives: string[];
  isActive: boolean;
}

export interface ITimetableEntry {
  day: string;
  timeSlot: string;
  subject: string;
  faculty: string;
  classroom: string;
  batch: string;
}

export interface IConflict {
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  entries?: ITimetableEntry[];
}

export interface ITimetableResult {
  schedule: ITimetableEntry[];
  conflicts: IConflict[];
  metrics: {
    totalClasses: number;
    conflicts: number;
    utilization: number;
    fairness: number;
    satisfaction: number;
    optimizationScore: number;
  };
  executionTime: number;
  algorithm: string;
}

export interface IConstraintResult {
  isValid: boolean;
  penalty: number;
  conflicts: IConflict[];
  details: string;
}

export interface IValidationContext {
  schedule: ITimetableEntry[];
  faculty: IFaculty[];
  subjects: ISubject[];
  classrooms: IClassroom[];
  batches: IBatch[];
  facultyMap: Map<string, IFaculty>;
  subjectMap: Map<string, ISubject>;
  classroomMap: Map<string, IClassroom>;
  batchMap: Map<string, IBatch>;
}

export interface IGenerationConfig {
  algorithm: 'greedy_mvp' | 'genetic' | 'simulated_annealing' | 'hybrid';
  maxIterations: number;
  timeLimit: number; // seconds
  populationSize?: number;
  mutationRate?: number;
  crossoverRate?: number;
  initialTemperature?: number;
  coolingRate?: number;
  onProgress?: (progress: number, message: string) => void;
}

export interface IGenerationRequest {
  department: string;
  batches: string[];
  semester: number;
  academicYear: string;
  config: IGenerationConfig;
}