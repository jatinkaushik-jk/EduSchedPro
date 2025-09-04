"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Edit, 
  Trash2, 
  Calendar, 
  Brain,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  MoreHorizontal,
  Eye,
  Download,
  Share,
  Play,
  Target,
  Zap,
  Building2
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// TypeScript interfaces for timetable generation
interface TimetableEntry {
  day: string;
  timeSlot: string;
  subject: {
    _id: string;
    name: string;
    code: string;
    type: string;
  };
  faculty: {
    _id: string;
    name: string;
    employeeId: string;
  };
  classroom: {
    _id: string;
    name: string;
    number: string;
    capacity: number;
  };
  batch: {
    _id: string;
    name: string;
    strength: number;
  };
}

interface Timetable {
  _id: string;
  name: string;
  academicYear: string;
  semester: number;
  department: {
    _id: string;
    name: string;
    code: string;
  };
  schedule: TimetableEntry[];
  status: 'draft' | 'approved' | 'active' | 'archived';
  conflicts: Array<{
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  optimizationScore: number;
  generatedBy: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface OptimizationResult {
  _id: string;
  timetable: string;
  algorithm: AlgorithmType;
  parameters: Record<string, string>;
  metrics: {
    conflicts: number;
    utilization: number;
    fairness: number;
    satisfaction: number;
  };
  executionTime: number;
  iterations: number;
  convergence: number[];
}

interface Department {
  _id: string;
  name: string;
  code: string;
}

interface Batch {
  _id: string;
  name: string;
  department: string;
  semester: number;
  year: number;
  section: string;
}

enum AlgorithmType{
    GENETIC = 'genetic',
    SIMULATED_ANNEALING = 'simulated_annealing',
    HYBRID = 'hybrid',
    GREEDY_MVP = 'greedy_mvp',
    CP_SAT = 'cp_sat'
}

enum GenerationStatus {
    DRAFT = 'draft',
    APPROVED = 'approved',
    ACTIVE = 'active',
    ARCHIVED = 'archived'
}

const TimetableGeneration: React.FC = () => {
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [selectedTimetable, setSelectedTimetable] = useState<Timetable | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Generation form state
  const [generationConfig, setGenerationConfig] = useState({
    name: '',
    academicYear: '2024-2025',
    semester: 3,
    department: '',
    batches: [] as string[],
    algorithm: AlgorithmType.HYBRID,
    parameters: {
      maxIterations: 1000,
      populationSize: 100,
      mutationRate: 0.1,
      crossoverRate: 0.8,
      timeLimit: 300 // seconds
    },
    constraints: {
      noGapsForBatches: true,
      maxConsecutiveHours: 4,
      lunchBreak: true,
      facultyPreferences: true
    }
  });

  // Time slots for display
  const timeSlots = [
    { id: '1', label: '9:00 - 10:00 AM', short: 'P1' },
    { id: '2', label: '10:00 - 11:00 AM', short: 'P2' },
    { id: '3', label: '11:00 - 12:00 PM', short: 'P3' },
    { id: '4', label: '12:00 - 1:00 PM', short: 'P4' },
    { id: '5', label: '2:00 - 3:00 PM', short: 'P5' },
    { id: '6', label: '3:00 - 4:00 PM', short: 'P6' },
    { id: '7', label: '4:00 - 5:00 PM', short: 'P7' },
    { id: '8', label: '5:00 - 6:00 PM', short: 'P8' }
  ];

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

  // Load data on component mount
  useEffect(() => {
    loadTimetables();
    loadDepartments();
    loadBatches();
  }, []);

  const loadTimetables = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockTimetables: Timetable[] = [
        {
          _id: '1',
          name: 'CSE Semester 3 - 2024-25',
          academicYear: '2024-2025',
          semester: 3,
          department: { _id: '1', name: 'Computer Science and Engineering', code: 'CSE' },
          schedule: [], // Will be populated with actual schedule entries
          status: 'active',
          conflicts: [
            { type: 'FACULTY_DOUBLE_BOOKING', description: 'Dr. Smith scheduled in two classrooms at MON-3', severity: 'high' }
          ],
          optimizationScore: 87,
          generatedBy: { _id: '1', name: 'Dr. Jatin Kaushik' },
          createdAt: '2025-01-15T10:00:00Z',
          updatedAt: '2025-01-15T10:00:00Z'
        },
        {
          _id: '2',
          name: 'ECE Semester 1 - 2024-25',
          academicYear: '2024-2025',
          semester: 1,
          department: { _id: '2', name: 'Electronics and Communication', code: 'ECE' },
          schedule: [],
          status: 'draft',
          conflicts: [],
          optimizationScore: 95,
          generatedBy: { _id: '2', name: 'Prof. Sarah Wilson' },
          createdAt: '2025-01-16T10:00:00Z',
          updatedAt: '2025-01-16T10:00:00Z'
        }
      ];
      setTimetables(mockTimetables);
    } catch (error) {
      toast.error("Failed to load timetables");
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const mockDepartments: Department[] = [
        { _id: '1', name: 'Computer Science and Engineering', code: 'CSE' },
        { _id: '2', name: 'Electronics and Communication', code: 'ECE' },
        { _id: '3', name: 'Mechanical Engineering', code: 'ME' }
      ];
      setDepartments(mockDepartments);
    } catch (error) {
      console.error('Failed to load departments:', error);
    }
  };

  const loadBatches = async () => {
    try {
      const mockBatches: Batch[] = [
        { _id: '1', name: 'CSE 2023 Batch A', department: '1', semester: 3, year: 2023, section: 'A' },
        { _id: '2', name: 'CSE 2023 Batch B', department: '1', semester: 3, year: 2023, section: 'B' },
        { _id: '3', name: 'ECE 2024 Batch A', department: '2', semester: 1, year: 2024, section: 'A' }
      ];
      setBatches(mockBatches);
    } catch (error) {
      console.error('Failed to load batches:', error);
    }
  };

  const handleGenerateTimetable = async () => {
    if (!generationConfig.name.trim() || !generationConfig.department || generationConfig.batches.length === 0) {
      toast.error("Validation Error", {description: "Name, department, and at least one batch are required"});
      return;
    }

    try {
      setGenerating(true);
      setGenerationProgress(0);
      
      // Simulate progressive generation process
      const progressSteps = [
        { progress: 10, message: 'Initializing generation parameters...' },
        { progress: 25, message: 'Loading faculty and subject data...' },
        { progress: 40, message: 'Analyzing classroom availability...' },
        { progress: 60, message: 'Running optimization algorithm...' },
        { progress: 80, message: 'Resolving conflicts...' },
        { progress: 95, message: 'Finalizing timetable...' },
        { progress: 100, message: 'Generation complete!' }
      ];

      for (const step of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setGenerationProgress(step.progress);
        
        // Show progress message as toast for key milestones
        if ([25, 60, 100].includes(step.progress)) {
          toast("Generation Progress", {description: step.message});
        }
      }

      // Mock successful generation
      const newTimetable = {
        _id: Date.now().toString(),
        name: generationConfig.name,
        academicYear: generationConfig.academicYear,
        semester: generationConfig.semester,
        department: departments.find(d => d._id === generationConfig.department)!,
        schedule: [], // In real app, this would contain generated schedule
        status: 'draft' as const,
        conflicts: [],
        optimizationScore: Math.floor(Math.random() * 20) + 80, // Random score 80-100
        generatedBy: { _id: '1', name: 'Current User' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setTimetables(prev => [newTimetable, ...prev]);
      
      toast.success(`Timetable "${generationConfig.name}" generated successfully with ${newTimetable.optimizationScore}% optimization score`);

      resetGenerationForm();
      setIsGenerateDialogOpen(false);

      resetGenerationForm();
      setIsGenerateDialogOpen(false);
      
    } catch (error) {
      toast.error("Failed to generate timetable");
    } finally {
      setGenerating(false);
      setGenerationProgress(0);
    }
  };

  const handleDeleteTimetable = async (timetableId: string) => {
    try {
      setTimetables(prev => prev.filter(tt => tt._id !== timetableId));
      toast.success("Timetable deleted successfully");
    } catch (error) {
      toast.error("Failed to delete timetable");
    }
  };

  const handleStatusChange = async (timetableId: string, newStatus: string) => {
    try {
      setTimetables(prev => prev.map(tt => 
        tt._id === timetableId ? { ...tt, status: newStatus as GenerationStatus } : tt
      ));
      toast.success(`Timetable status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update timetable status");
    }
  };

  const resetGenerationForm = () => {
    setGenerationConfig({
      name: '',
      academicYear: '2024-2025',
      semester: 3,
      department: '',
      batches: [],
      algorithm: AlgorithmType.HYBRID,
      parameters: {
        maxIterations: 1000,
        populationSize: 100,
        mutationRate: 0.1,
        crossoverRate: 0.8,
        timeLimit: 300
      },
      constraints: {
        noGapsForBatches: true,
        maxConsecutiveHours: 4,
        lunchBreak: true,
        facultyPreferences: true
      }
    });
  };

  const getBatchesByDepartment = (departmentId: string) => {
    return batches.filter(b => b.department === departmentId);
  };

  // Filter and search logic
  const filteredTimetables = timetables.filter(tt => {
    const matchesSearch = tt.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || tt.department._id === filterDepartment;
    const matchesStatus = filterStatus === 'all' || tt.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConflictSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading timetables...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Timetable Generation</h1>
          <p className="text-muted-foreground">Generate optimized timetables using AI algorithms</p>
        </div>
        <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {resetGenerationForm();}}>
              <Brain className="mr-2 h-4 w-4" />
              Generate Timetable
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Generate New Timetable</DialogTitle>
              <DialogDescription>
                Configure parameters and constraints for AI-powered timetable generation
              </DialogDescription>
            </DialogHeader>
            
            {generating ? (
              <div className="space-y-4 py-8">
                <div className="text-center">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-blue-600 animate-pulse" />
                  <h3 className="text-lg font-medium mb-2">Generating Timetable...</h3>
                  <p className="text-muted-foreground mb-4">
                    AI is optimizing your schedule. This may take a few minutes.
                  </p>
                </div>
                <Progress value={generationProgress} className="w-full" />
                <p className="text-center text-sm text-muted-foreground">
                  {generationProgress}% Complete
                </p>
              </div>
            ) : (
              <Tabs defaultValue="basic" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                  <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
                  <TabsTrigger value="constraints">Constraints</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ttName">Timetable Name</Label>
                      <Input
                        id="ttName"
                        placeholder="e.g., CSE Semester 3 - 2024-25"
                        value={generationConfig.name}
                        onChange={(e) => setGenerationConfig({...generationConfig, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="academicYear">Academic Year</Label>
                      <Select 
                        value={generationConfig.academicYear} 
                        onValueChange={(value) => setGenerationConfig({...generationConfig, academicYear: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2023-2024">2023-2024</SelectItem>
                          <SelectItem value="2024-2025">2024-2025</SelectItem>
                          <SelectItem value="2025-2026">2025-2026</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select 
                        value={generationConfig.semester.toString()} 
                        onValueChange={(value) => setGenerationConfig({...generationConfig, semester: parseInt(value)})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8].map(sem => (
                            <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select 
                        value={generationConfig.department} 
                        onValueChange={(value) => setGenerationConfig({...generationConfig, department: value, batches: []})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept._id} value={dept._id}>
                              {dept.name} ({dept.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Select Batches</Label>
                    <div className="border rounded-md p-3 max-h-32 overflow-y-auto">
                      {getBatchesByDepartment(generationConfig.department).map(batch => (
                        <div key={batch._id} className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            id={batch._id}
                            checked={generationConfig.batches.includes(batch._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setGenerationConfig({...generationConfig, batches: [...generationConfig.batches, batch._id]});
                              } else {
                                setGenerationConfig({...generationConfig, batches: generationConfig.batches.filter(id => id !== batch._id)});
                              }
                            }}
                          />
                          <Label htmlFor={batch._id} className="text-sm">
                            {batch.name} (Semester {batch.semester})
                          </Label>
                        </div>
                      ))}
                      {getBatchesByDepartment(generationConfig.department).length === 0 && (
                        <p className="text-sm text-muted-foreground">No batches available for selected department</p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="algorithm" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Optimization Algorithm</Label>
                      <Select 
                        value={generationConfig.algorithm} 
                        onValueChange={(value: AlgorithmType) => setGenerationConfig({...generationConfig, algorithm: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hybrid">
                            <div className="flex items-center">
                              <Zap className="mr-2 h-4 w-4" />
                              Hybrid (Recommended)
                            </div>
                          </SelectItem>
                          <SelectItem value="genetic">Genetic Algorithm</SelectItem>
                          <SelectItem value="simulated_annealing">Simulated Annealing</SelectItem>
                          <SelectItem value="cp_sat">Constraint Programming</SelectItem>
                          <SelectItem value="greedy_mvp">Greedy (Fast)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Hybrid algorithm combines multiple approaches for optimal results
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="maxIterations">Max Iterations</Label>
                        <Input
                          id="maxIterations"
                          type="number"
                          min="100"
                          max="5000"
                          value={generationConfig.parameters.maxIterations}
                          onChange={(e) => setGenerationConfig({
                            ...generationConfig, 
                            parameters: {...generationConfig.parameters, maxIterations: parseInt(e.target.value) || 1000}
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeLimit">Time Limit (seconds)</Label>
                        <Input
                          id="timeLimit"
                          type="number"
                          min="60"
                          max="1800"
                          value={generationConfig.parameters.timeLimit}
                          onChange={(e) => setGenerationConfig({
                            ...generationConfig, 
                            parameters: {...generationConfig.parameters, timeLimit: parseInt(e.target.value) || 300}
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="populationSize">Population Size</Label>
                        <Input
                          id="populationSize"
                          type="number"
                          min="20"
                          max="500"
                          value={generationConfig.parameters.populationSize}
                          onChange={(e) => setGenerationConfig({
                            ...generationConfig, 
                            parameters: {...generationConfig.parameters, populationSize: parseInt(e.target.value) || 100}
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mutationRate">Mutation Rate</Label>
                        <Input
                          id="mutationRate"
                          type="number"
                          min="0.01"
                          max="0.5"
                          step="0.01"
                          value={generationConfig.parameters.mutationRate}
                          onChange={(e) => setGenerationConfig({
                            ...generationConfig, 
                            parameters: {...generationConfig.parameters, mutationRate: parseFloat(e.target.value) || 0.1}
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="constraints" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Scheduling Constraints</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="noGaps">Minimize Gaps</Label>
                          <p className="text-xs text-muted-foreground">Avoid free periods between classes</p>
                        </div>
                        <Switch
                          id="noGaps"
                          checked={generationConfig.constraints.noGapsForBatches}
                          onCheckedChange={(checked) => setGenerationConfig({
                            ...generationConfig,
                            constraints: {...generationConfig.constraints, noGapsForBatches: checked}
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="lunchBreak">Lunch Break</Label>
                          <p className="text-xs text-muted-foreground">Ensure lunch break slot</p>
                        </div>
                        <Switch
                          id="lunchBreak"
                          checked={generationConfig.constraints.lunchBreak}
                          onCheckedChange={(checked) => setGenerationConfig({
                            ...generationConfig,
                            constraints: {...generationConfig.constraints, lunchBreak: checked}
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="facultyPrefs">Faculty Preferences</Label>
                          <p className="text-xs text-muted-foreground">Respect faculty time preferences</p>
                        </div>
                        <Switch
                          id="facultyPrefs"
                          checked={generationConfig.constraints.facultyPreferences}
                          onCheckedChange={(checked) => setGenerationConfig({
                            ...generationConfig,
                            constraints: {...generationConfig.constraints, facultyPreferences: checked}
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxConsecutive">Max Consecutive Hours</Label>
                        <Select 
                          value={generationConfig.constraints.maxConsecutiveHours.toString()} 
                          onValueChange={(value) => setGenerationConfig({
                            ...generationConfig,
                            constraints: {...generationConfig.constraints, maxConsecutiveHours: parseInt(value)}
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 hours</SelectItem>
                            <SelectItem value="3">3 hours</SelectItem>
                            <SelectItem value="4">4 hours</SelectItem>
                            <SelectItem value="5">5 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleGenerateTimetable}>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Timetable
                  </Button>
                </div>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Timetables</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timetables.length}</div>
            <p className="text-xs text-muted-foreground">
              {timetables.filter(tt => tt.status === 'active').length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Optimization</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timetables.length > 0 ? Math.round(timetables.reduce((acc, tt) => acc + tt.optimizationScore, 0) / timetables.length) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">optimization score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conflicts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timetables.reduce((acc, tt) => acc + tt.conflicts.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">across all timetables</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">with timetables</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Timetables</CardTitle>
          <CardDescription>View and manage AI-generated timetables with optimization metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6 flex-wrap gap-y-2">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search timetables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept._id} value={dept._id}>{dept.code}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Data Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timetable</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Academic Year</TableHead>
                  <TableHead>Optimization Score</TableHead>
                  <TableHead>Conflicts</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTimetables.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="text-muted-foreground">
                        {searchTerm ? 'No timetables found matching your search.' : 'No timetables generated yet.'}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTimetables.map((timetable) => (
                    <TableRow key={timetable._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{timetable.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Semester {timetable.semester} • Generated by {timetable.generatedBy.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{timetable.department.code}</Badge>
                      </TableCell>
                      <TableCell>{timetable.academicYear}</TableCell>
                      <TableCell>
                        <div className={`flex items-center font-medium ${getScoreColor(timetable.optimizationScore)}`}>
                          <TrendingUp className="mr-1 h-4 w-4" />
                          {timetable.optimizationScore}%
                        </div>
                      </TableCell>
                      <TableCell>
                        {timetable.conflicts.length > 0 ? (
                          <div>
                            <Badge variant="outline" className="text-xs">
                              <AlertCircle className="mr-1 h-3 w-3" />
                              {timetable.conflicts.length} conflicts
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              {timetable.conflicts.filter(c => c.severity === 'high').length} high priority
                            </div>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            No conflicts
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(timetable.status)}>
                          {timetable.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setSelectedTimetable(timetable);
                              setIsViewDialogOpen(true);
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Edit', timetable._id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Download', timetable._id)}>
                              <Download className="mr-2 h-4 w-4" />
                              Export PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Share', timetable._id)}>
                              <Share className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            {timetable.status === 'draft' && (
                              <DropdownMenuItem onClick={() => handleStatusChange(timetable._id, 'approved')}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                            )}
                            {timetable.status === 'approved' && (
                              <DropdownMenuItem onClick={() => handleStatusChange(timetable._id, 'active')}>
                                <Play className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Timetable</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete &quot;{timetable.name}&quot;? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteTimetable(timetable._id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Timetable Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>{selectedTimetable?.name}</DialogTitle>
            <DialogDescription>
              {selectedTimetable?.department.name} • {selectedTimetable?.academicYear} • Semester {selectedTimetable?.semester}
            </DialogDescription>
          </DialogHeader>
          <div className="h-96 bg-gray-50 rounded-md flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Calendar className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Timetable Schedule View</h3>
              <p>Interactive timetable grid would be displayed here</p>
              <p className="text-sm mt-2">
                Showing schedule for {selectedTimetable?.schedule.length || 0} classes
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimetableGeneration;