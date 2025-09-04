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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Users, 
  GraduationCap, 
  BookOpen,
  Calendar,
  MoreHorizontal,
  Eye,
  Building2,
  CheckCircle,
  XCircle,
  Star
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// TypeScript interfaces matching the Mongoose schema
interface Batch {
  _id: string;
  name: string;
  department: {
    _id: string;
    name: string;
    code: string;
  };
  semester: number;
  year: number;
  section: string;
  strength: number;
  subjects: Array<{
    _id: string;
    name: string;
    code: string;
    type: string;
    credits: number;
    hoursPerWeek: number;
  }>;
  electives: Array<{
    _id: string;
    name: string;
    code: string;
    type: string;
    credits: number;
    hoursPerWeek: number;
  }>;
  timetable?: {
    _id: string;
    name: string;
    status: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Department {
  _id: string;
  name: string;
  code: string;
}

interface Subject {
  _id: string;
  name: string;
  code: string;
  type: 'theory' | 'practical' | 'elective';
  credits: number;
  hoursPerWeek: number;
  department: string;
  semester: number;
}

const BatchManagement: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    semester: 1,
    year: 2025,
    section: '',
    strength: '',
    subjects: [] as string[],
    electives: [] as string[],
    isActive: true
  });

  // Load data on component mount
  useEffect(() => {
    loadBatches();
    loadDepartments();
    loadSubjects();
  }, []);

  const loadBatches = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockBatches: Batch[] = [
        {
          _id: '1',
          name: 'CSE 2023 Batch A',
          department: { _id: '1', name: 'Computer Science and Engineering', code: 'CSE' },
          semester: 3,
          year: 2023,
          section: 'A',
          strength: 60,
          subjects: [
            { _id: '1', name: 'Data Structures', code: 'CSE201', type: 'theory', credits: 4, hoursPerWeek: 4 },
            { _id: '2', name: 'Database Systems', code: 'CSE301', type: 'theory', credits: 3, hoursPerWeek: 3 },
            { _id: '3', name: 'Programming Lab', code: 'CSE202', type: 'practical', credits: 2, hoursPerWeek: 4 }
          ],
          electives: [
            { _id: '4', name: 'AI Ethics', code: 'CSE401', type: 'elective', credits: 2, hoursPerWeek: 2 }
          ],
          timetable: { _id: 'tt1', name: 'CSE Sem 3 Timetable', status: 'active' },
          isActive: true,
          createdAt: '2025-01-15T10:00:00Z',
          updatedAt: '2025-01-15T10:00:00Z'
        },
        {
          _id: '2',
          name: 'CSE 2023 Batch B',
          department: { _id: '1', name: 'Computer Science and Engineering', code: 'CSE' },
          semester: 3,
          year: 2023,
          section: 'B',
          strength: 58,
          subjects: [
            { _id: '1', name: 'Data Structures', code: 'CSE201', type: 'theory', credits: 4, hoursPerWeek: 4 },
            { _id: '2', name: 'Database Systems', code: 'CSE301', type: 'theory', credits: 3, hoursPerWeek: 3 },
            { _id: '3', name: 'Programming Lab', code: 'CSE202', type: 'practical', credits: 2, hoursPerWeek: 4 }
          ],
          electives: [
            { _id: '5', name: 'Web Development', code: 'CSE402', type: 'elective', credits: 3, hoursPerWeek: 3 }
          ],
          isActive: true,
          createdAt: '2025-01-16T10:00:00Z',
          updatedAt: '2025-01-16T10:00:00Z'
        },
        {
          _id: '3',
          name: 'ECE 2024 Batch A',
          department: { _id: '2', name: 'Electronics and Communication', code: 'ECE' },
          semester: 1,
          year: 2024,
          section: 'A',
          strength: 45,
          subjects: [
            { _id: '6', name: 'Circuit Analysis', code: 'ECE101', type: 'theory', credits: 4, hoursPerWeek: 4 },
            { _id: '7', name: 'Digital Electronics', code: 'ECE201', type: 'theory', credits: 3, hoursPerWeek: 3 }
          ],
          electives: [],
          isActive: true,
          createdAt: '2025-01-17T10:00:00Z',
          updatedAt: '2025-01-17T10:00:00Z'
        }
      ];
      setBatches(mockBatches);
    } catch (error) {
      toast.error("Failed to load batches");
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

  const loadSubjects = async () => {
    try {
      const mockSubjects: Subject[] = [
        { _id: '1', name: 'Data Structures', code: 'CSE201', type: 'theory', credits: 4, hoursPerWeek: 4, department: '1', semester: 3 },
        { _id: '2', name: 'Database Systems', code: 'CSE301', type: 'theory', credits: 3, hoursPerWeek: 3, department: '1', semester: 5 },
        { _id: '3', name: 'Programming Lab', code: 'CSE202', type: 'practical', credits: 2, hoursPerWeek: 4, department: '1', semester: 3 },
        { _id: '4', name: 'AI Ethics', code: 'CSE401', type: 'elective', credits: 2, hoursPerWeek: 2, department: '1', semester: 7 },
        { _id: '5', name: 'Web Development', code: 'CSE402', type: 'elective', credits: 3, hoursPerWeek: 3, department: '1', semester: 7 },
        { _id: '6', name: 'Circuit Analysis', code: 'ECE101', type: 'theory', credits: 4, hoursPerWeek: 4, department: '2', semester: 1 },
        { _id: '7', name: 'Digital Electronics', code: 'ECE201', type: 'theory', credits: 3, hoursPerWeek: 3, department: '2', semester: 3 }
      ];
      setSubjects(mockSubjects);
    } catch (error) {
      console.error('Failed to load subjects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.department || !formData.section.trim() || !formData.strength) {
      toast.error("Validation Error", {description: "Name, department, section, and strength are required"});
      return;
    }

    try {
      if (editingBatch) {
        // Update existing batch
        console.log('Updating batch:', { ...editingBatch, ...formData });
        toast.success("Batch updated successfully");
      } else {
        // Create new batch
        console.log('Creating batch:', formData);
        toast.success("Batch created successfully");
      }
      
      resetForm();
      setIsAddDialogOpen(false);
      setEditingBatch(null);
      loadBatches();
    } catch (error) {
      toast.error("Failed to save batch");
    }
  };

  const handleEdit = (batch: Batch) => {
    setEditingBatch(batch);
    setFormData({
      name: batch.name,
      department: batch.department._id,
      semester: batch.semester,
      year: batch.year,
      section: batch.section,
      strength: batch.strength.toString(),
      subjects: batch.subjects.map(s => s._id),
      electives: batch.electives.map(e => e._id),
      isActive: batch.isActive
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (batchId: string) => {
    try {
      console.log('Deleting batch:', batchId);
      toast.success("Batch deleted successfully");
      loadBatches();
    } catch (error) {
      toast.error("Failed to delete batch");
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      department: '',
      semester: 1,
      year: 2025,
      section: '',
      strength: '',
      subjects: [],
      electives: [],
      isActive: true
    });
  };

  const getSubjectsByDepartmentAndSemester = (departmentId: string, semester: number, type?: 'theory' | 'practical' | 'elective') => {
    return subjects.filter(s => 
      s.department === departmentId && 
      s.semester <= semester && 
      (type ? s.type === type : s.type !== 'elective')
    );
  };

  const getElectivesByDepartment = (departmentId: string) => {
    return subjects.filter(s => s.department === departmentId && s.type === 'elective');
  };

  // Filter and search logic
  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.section.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || batch.department._id === filterDepartment;
    const matchesYear = filterYear === 'all' || batch.year.toString() === filterYear;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && batch.isActive) ||
                         (filterStatus === 'inactive' && !batch.isActive);
    return matchesSearch && matchesDepartment && matchesYear && matchesStatus;
  });

  const getUniqueYears = () => {
    return [...new Set(batches.map(b => b.year))].sort((a, b) => b - a);
  };

  const getTotalStudents = () => {
    return batches.filter(b => b.isActive).reduce((sum, b) => sum + b.strength, 0);
  };

  const getTotalCredits = (batch: Batch) => {
    const coreCredits = batch.subjects.reduce((sum, s) => sum + s.credits, 0);
    const electiveCredits = batch.electives.reduce((sum, e) => sum + e.credits, 0);
    return coreCredits + electiveCredits;
  };

  const getTotalHours = (batch: Batch) => {
    const coreHours = batch.subjects.reduce((sum, s) => sum + s.hoursPerWeek, 0);
    const electiveHours = batch.electives.reduce((sum, e) => sum + e.hoursPerWeek, 0);
    return coreHours + electiveHours;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading batches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Batch Management</h1>
          <p className="text-muted-foreground">Manage student batches, subjects, and curriculum assignments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {resetForm(); setEditingBatch(null);}}>
              <Plus className="mr-2 h-4 w-4" />
              Add Batch
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBatch ? 'Edit Batch' : 'Add New Batch'}
              </DialogTitle>
              <DialogDescription>
                {editingBatch ? 'Update batch information and subject assignments' : 'Create a new student batch with subject curriculum'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Batch Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., CSE 2024 Batch A"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      value={formData.department} 
                      onValueChange={(value) => setFormData({...formData, department: value, subjects: [], electives: []})}
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
                  <div className="space-y-2">
                    <Label htmlFor="year">Academic Year</Label>
                    <Select 
                      value={formData.year.toString()} 
                      onValueChange={(value) => setFormData({...formData, year: parseInt(value)})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Current Semester</Label>
                    <Select 
                      value={formData.semester.toString()} 
                      onValueChange={(value) => setFormData({...formData, semester: parseInt(value), subjects: [], electives: []})}
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
                    <Label htmlFor="section">Section</Label>
                    <Input
                      id="section"
                      placeholder="e.g., A, B, C"
                      value={formData.section}
                      onChange={(e) => setFormData({...formData, section: e.target.value.toUpperCase()})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="strength">Student Strength</Label>
                    <Input
                      id="strength"
                      type="number"
                      min="1"
                      max="500"
                      placeholder="e.g., 60"
                      value={formData.strength}
                      onChange={(e) => setFormData({...formData, strength: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Subject Assignment */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Core Subjects</h3>
                <div className="space-y-2">
                  <Label>Assigned Core Subjects (Select multiple)</Label>
                  <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
                    {getSubjectsByDepartmentAndSemester(formData.department, formData.semester).map(subject => (
                      <div key={subject._id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={subject._id}
                            checked={formData.subjects.includes(subject._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({...formData, subjects: [...formData.subjects, subject._id]});
                              } else {
                                setFormData({...formData, subjects: formData.subjects.filter(id => id !== subject._id)});
                              }
                            }}
                          />
                          <Label htmlFor={subject._id} className="text-sm">
                            {subject.name} ({subject.code})
                          </Label>
                        </div>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {subject.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {subject.credits} credits
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {subject.hoursPerWeek}h/week
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {getSubjectsByDepartmentAndSemester(formData.department, formData.semester).length === 0 && (
                      <p className="text-sm text-muted-foreground">No core subjects available for selected department and semester</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Elective Assignment */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Elective Subjects</h3>
                <div className="space-y-2">
                  <Label>Available Electives (Select multiple)</Label>
                  <div className="border rounded-md p-3 max-h-32 overflow-y-auto">
                    {getElectivesByDepartment(formData.department).map(elective => (
                      <div key={elective._id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`elective-${elective._id}`}
                            checked={formData.electives.includes(elective._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({...formData, electives: [...formData.electives, elective._id]});
                              } else {
                                setFormData({...formData, electives: formData.electives.filter(id => id !== elective._id)});
                              }
                            }}
                          />
                          <Label htmlFor={`elective-${elective._id}`} className="text-sm">
                            {elective.name} ({elective.code})
                          </Label>
                        </div>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {elective.credits} credits
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {elective.hoursPerWeek}h/week
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {getElectivesByDepartment(formData.department).length === 0 && (
                      <p className="text-sm text-muted-foreground">No elective subjects available for selected department</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Status */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
                />
                <Label htmlFor="isActive">Batch Active</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBatch ? 'Update' : 'Create'} Batch
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{batches.length}</div>
            <p className="text-xs text-muted-foreground">
              {batches.filter(b => b.isActive).length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalStudents()}</div>
            <p className="text-xs text-muted-foreground">across active batches</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Academic Years</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getUniqueYears().length}</div>
            <p className="text-xs text-muted-foreground">years represented</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">active departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Student Batches</CardTitle>
          <CardDescription>Manage student batches, curriculum, and subject assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6 flex-wrap gap-y-2">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search batches..."
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
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {getUniqueYears().map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Data Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Year/Sem</TableHead>
                  <TableHead>Strength</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Timetable</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="text-muted-foreground">
                        {searchTerm ? 'No batches found matching your search.' : 'No batches found.'}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBatches.map((batch) => (
                    <TableRow key={batch._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{batch.name}</div>
                          <div className="text-sm text-muted-foreground">Section {batch.section}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{batch.department.code}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{batch.year}</div>
                          <div className="text-sm text-muted-foreground">Semester {batch.semester}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                          {batch.strength}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <Badge variant="secondary" className="mr-1 text-xs">
                              {batch.subjects.length} core
                            </Badge>
                            {batch.electives.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                <Star className="mr-1 h-3 w-3" />
                                {batch.electives.length} electives
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {getTotalCredits(batch)} credits • {getTotalHours(batch)}h/week
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {batch.timetable ? (
                          <div>
                            <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                              {batch.timetable.status}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              {batch.timetable.name}
                            </div>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            No timetable
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {batch.isActive ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="mr-1 h-3 w-3" />
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => console.log('View', batch._id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(batch)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Batch</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete &quot;{batch.name}&quot;? This action cannot be undone and may affect timetables.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(batch._id)}>
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
    </div>
  );
};

export default BatchManagement;