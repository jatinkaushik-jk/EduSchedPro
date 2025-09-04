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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  BookOpen, 
  Clock,
  Award,
  MoreHorizontal,
  Eye,
  Star,
  CheckCircle
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// TypeScript interfaces matching the Mongoose schema
interface Subject {
  _id: string;
  name: string;
  code: string;
  department: {
    _id: string;
    name: string;
    code: string;
  };
  semester: number;
  credits: number;
  hoursPerWeek: number;
  type: 'theory' | 'practical' | 'elective';
  faculty: Array<{
    _id: string;
    name: string;
    employeeId: string;
  }>;
  isNEPMultidisciplinary: boolean;
  prerequisites: Array<{
    _id: string;
    name: string;
    code: string;
  }>;
  maxStudents?: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Department {
  _id: string;
  name: string;
  code: string;
}

interface Faculty {
  _id: string;
  name: string;
  employeeId: string;
  department: string;
}

const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSemester, setFilterSemester] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    department: '',
    semester: 1,
    credits: 3,
    hoursPerWeek: 3,
    type: 'theory' as 'theory' | 'practical' | 'elective',
    faculty: [] as string[],
    isNEPMultidisciplinary: false,
    prerequisites: [] as string[],
    maxStudents: '',
    description: '',
    isActive: true
  });

  // Load data on component mount
  useEffect(() => {
    loadSubjects();
    loadDepartments();
    loadFaculty();
  }, []);

  const loadSubjects = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockSubjects: Subject[] = [
        {
          _id: '1',
          name: 'Data Structures and Algorithms',
          code: 'CSE201',
          department: { _id: '1', name: 'Computer Science and Engineering', code: 'CSE' },
          semester: 3,
          credits: 4,
          hoursPerWeek: 4,
          type: 'theory',
          faculty: [
            { _id: '1', name: 'Dr. Jatin Kaushik', employeeId: 'EMP001' },
            { _id: '2', name: 'Prof. Sarah Wilson', employeeId: 'EMP002' }
          ],
          isNEPMultidisciplinary: false,
          prerequisites: [
            { _id: '0', name: 'Programming Fundamentals', code: 'CSE101' }
          ],
          maxStudents: 60,
          description: 'Comprehensive coverage of fundamental data structures and algorithm design techniques.',
          isActive: true,
          createdAt: '2025-01-15T10:00:00Z',
          updatedAt: '2025-01-15T10:00:00Z'
        },
        {
          _id: '2',
          name: 'Database Management Systems',
          code: 'CSE301',
          department: { _id: '1', name: 'Computer Science and Engineering', code: 'CSE' },
          semester: 5,
          credits: 3,
          hoursPerWeek: 3,
          type: 'theory',
          faculty: [
            { _id: '2', name: 'Prof. Sarah Wilson', employeeId: 'EMP002' }
          ],
          isNEPMultidisciplinary: false,
          prerequisites: [
            { _id: '1', name: 'Data Structures and Algorithms', code: 'CSE201' }
          ],
          maxStudents: 50,
          description: 'Database design, SQL, normalization, and advanced database concepts.',
          isActive: true,
          createdAt: '2025-01-16T10:00:00Z',
          updatedAt: '2025-01-16T10:00:00Z'
        },
        {
          _id: '3',
          name: 'Database Laboratory',
          code: 'CSE302',
          department: { _id: '1', name: 'Computer Science and Engineering', code: 'CSE' },
          semester: 5,
          credits: 1,
          hoursPerWeek: 2,
          type: 'practical',
          faculty: [
            { _id: '2', name: 'Prof. Sarah Wilson', employeeId: 'EMP002' }
          ],
          isNEPMultidisciplinary: false,
          prerequisites: [],
          maxStudents: 30,
          description: 'Hands-on experience with database design and SQL programming.',
          isActive: true,
          createdAt: '2025-01-16T10:00:00Z',
          updatedAt: '2025-01-16T10:00:00Z'
        },
        {
          _id: '4',
          name: 'Artificial Intelligence Ethics',
          code: 'CSE401',
          department: { _id: '1', name: 'Computer Science and Engineering', code: 'CSE' },
          semester: 7,
          credits: 2,
          hoursPerWeek: 2,
          type: 'elective',
          faculty: [
            { _id: '1', name: 'Dr. Jatin Kaushik', employeeId: 'EMP001' }
          ],
          isNEPMultidisciplinary: true,
          prerequisites: [],
          maxStudents: 40,
          description: 'Interdisciplinary study of ethical considerations in AI development.',
          isActive: true,
          createdAt: '2025-01-17T10:00:00Z',
          updatedAt: '2025-01-17T10:00:00Z'
        }
      ];
      setSubjects(mockSubjects);
    } catch (error) {
      toast.error("Failed to load subjects");
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

  const loadFaculty = async () => {
    try {
      const mockFaculty: Faculty[] = [
        { _id: '1', name: 'Dr. Jatin Kaushik', employeeId: 'EMP001', department: '1' },
        { _id: '2', name: 'Prof. Sarah Wilson', employeeId: 'EMP002', department: '1' },
        { _id: '3', name: 'Dr. Amit Sharma', employeeId: 'EMP003', department: '2' },
        { _id: '4', name: 'Dr. Priya Singh', employeeId: 'EMP004', department: '3' }
      ];
      setFaculty(mockFaculty);
    } catch (error) {
      console.error('Failed to load faculty:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.code.trim() || !formData.department) {
      toast.error("Validation Error", {description: "Subject name, code, and department are required"});
      return;
    }

    try {
      if (editingSubject) {
        // Update existing subject
        console.log('Updating subject:', { ...editingSubject, ...formData });
        toast.success("Subject updated successfully");
      } else {
        // Create new subject
        console.log('Creating subject:', formData);
        toast.success("Subject created successfully");
      }
      
      resetForm();
      setIsAddDialogOpen(false);
      setEditingSubject(null);
      loadSubjects();
    } catch (error) {
      toast.error("Failed to save subject");
    }
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      department: subject.department._id,
      semester: subject.semester,
      credits: subject.credits,
      hoursPerWeek: subject.hoursPerWeek,
      type: subject.type,
      faculty: subject.faculty.map(f => f._id),
      isNEPMultidisciplinary: subject.isNEPMultidisciplinary,
      prerequisites: subject.prerequisites.map(p => p._id),
      maxStudents: subject.maxStudents?.toString() || '',
      description: subject.description || '',
      isActive: subject.isActive
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (subjectId: string) => {
    try {
      console.log('Deleting subject:', subjectId);
      toast.success("Subject deleted successfully");
      loadSubjects();
    } catch (error) {
      toast.error("Failed to delete subject");
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      department: '',
      semester: 1,
      credits: 3,
      hoursPerWeek: 3,
      type: 'theory',
      faculty: [],
      isNEPMultidisciplinary: false,
      prerequisites: [],
      maxStudents: '',
      description: '',
      isActive: true
    });
  };

  const getFacultyByDepartment = (departmentId: string) => {
    return faculty.filter(f => f.department === departmentId);
  };

  const getSubjectsByDepartment = (departmentId: string) => {
    return subjects.filter(s => s.department._id === departmentId && s._id !== editingSubject?._id);
  };

  // Filter and search logic
  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || subject.department._id === filterDepartment;
    const matchesType = filterType === 'all' || subject.type === filterType;
    const matchesSemester = filterSemester === 'all' || subject.semester.toString() === filterSemester;
    return matchesSearch && matchesDepartment && matchesType && matchesSemester;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'bg-blue-100 text-blue-800';
      case 'practical': return 'bg-green-100 text-green-800';
      case 'elective': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading subjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subject Management</h1>
          <p className="text-muted-foreground">Manage curriculum subjects, prerequisites, and faculty assignments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {resetForm(); setEditingSubject(null);}}>
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSubject ? 'Edit Subject' : 'Add New Subject'}
              </DialogTitle>
              <DialogDescription>
                {editingSubject ? 'Update subject information and assignments' : 'Create a new subject with faculty assignments and prerequisites'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Subject Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Data Structures and Algorithms"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Subject Code</Label>
                    <Input
                      id="code"
                      placeholder="e.g., CSE201"
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      value={formData.department} 
                      onValueChange={(value) => setFormData({...formData, department: value, faculty: [], prerequisites: []})}
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
                    <Label htmlFor="type">Subject Type</Label>
                    <Select value={formData.type} onValueChange={(value: 'theory' | 'practical' | 'elective') => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="theory">Theory</SelectItem>
                        <SelectItem value="practical">Practical</SelectItem>
                        <SelectItem value="elective">Elective</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Academic Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Academic Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select 
                      value={formData.semester.toString()} 
                      onValueChange={(value) => setFormData({...formData, semester: parseInt(value)})}
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
                    <Label htmlFor="credits">Credits</Label>
                    <Input
                      id="credits"
                      type="number"
                      min="0"
                      max="10"
                      value={formData.credits}
                      onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value) || 0})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hoursPerWeek">Hours/Week</Label>
                    <Input
                      id="hoursPerWeek"
                      type="number"
                      min="1"
                      max="20"
                      value={formData.hoursPerWeek}
                      onChange={(e) => setFormData({...formData, hoursPerWeek: parseInt(e.target.value) || 1})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxStudents">Max Students</Label>
                    <Input
                      id="maxStudents"
                      type="number"
                      placeholder="Optional"
                      value={formData.maxStudents}
                      onChange={(e) => setFormData({...formData, maxStudents: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Faculty Assignment */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Faculty Assignment</h3>
                <div className="space-y-2">
                  <Label>Assigned Faculty (Select multiple)</Label>
                  <div className="border rounded-md p-3 max-h-32 overflow-y-auto">
                    {getFacultyByDepartment(formData.department).map(member => (
                      <div key={member._id} className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          id={member._id}
                          checked={formData.faculty.includes(member._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({...formData, faculty: [...formData.faculty, member._id]});
                            } else {
                              setFormData({...formData, faculty: formData.faculty.filter(id => id !== member._id)});
                            }
                          }}
                        />
                        <Label htmlFor={member._id} className="text-sm">
                          {member.name} ({member.employeeId})
                        </Label>
                      </div>
                    ))}
                    {getFacultyByDepartment(formData.department).length === 0 && (
                      <p className="text-sm text-muted-foreground">No faculty available for selected department</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Prerequisites */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Prerequisites</h3>
                <div className="space-y-2">
                  <Label>Prerequisite Subjects (Select multiple)</Label>
                  <div className="border rounded-md p-3 max-h-32 overflow-y-auto">
                    {getSubjectsByDepartment(formData.department).map(subject => (
                      <div key={subject._id} className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          id={`prereq-${subject._id}`}
                          checked={formData.prerequisites.includes(subject._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({...formData, prerequisites: [...formData.prerequisites, subject._id]});
                            } else {
                              setFormData({...formData, prerequisites: formData.prerequisites.filter(id => id !== subject._id)});
                            }
                          }}
                        />
                        <Label htmlFor={`prereq-${subject._id}`} className="text-sm">
                          {subject.name} ({subject.code})
                        </Label>
                      </div>
                    ))}
                    {getSubjectsByDepartment(formData.department).length === 0 && (
                      <p className="text-sm text-muted-foreground">No other subjects available for prerequisites</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description and Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Subject description, syllabus overview, learning outcomes..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isNEPMultidisciplinary"
                        checked={formData.isNEPMultidisciplinary}
                        onCheckedChange={(checked) => setFormData({...formData, isNEPMultidisciplinary: checked})}
                      />
                      <Label htmlFor="isNEPMultidisciplinary">NEP 2020 Multidisciplinary</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
                      />
                      <Label htmlFor="isActive">Subject Active</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingSubject ? 'Update' : 'Create'} Subject
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
            <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjects.length}</div>
            <p className="text-xs text-muted-foreground">
              {subjects.filter(s => s.isActive).length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subjects.reduce((acc, s) => acc + s.credits, 0)}
            </div>
            <p className="text-xs text-muted-foreground">across all subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teaching Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subjects.reduce((acc, s) => acc + s.hoursPerWeek, 0)}
            </div>
            <p className="text-xs text-muted-foreground">hours per week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NEP Multidisciplinary</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subjects.filter(s => s.isNEPMultidisciplinary).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((subjects.filter(s => s.isNEPMultidisciplinary).length / subjects.length) * 100) || 0}% of subjects
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Subjects</CardTitle>
          <CardDescription>Manage curriculum subjects, prerequisites, and faculty assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6 flex-wrap gap-y-2">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
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
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="theory">Theory</SelectItem>
                <SelectItem value="practical">Practical</SelectItem>
                <SelectItem value="elective">Elective</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSemester} onValueChange={setFilterSemester}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {[1,2,3,4,5,6,7,8].map(sem => (
                  <SelectItem key={sem} value={sem.toString()}>Sem {sem}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Data Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Hours/Week</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <div className="text-muted-foreground">
                        {searchTerm ? 'No subjects found matching your search.' : 'No subjects found.'}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubjects.map((subject) => (
                    <TableRow key={subject._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{subject.name}</div>
                          <div className="text-sm text-muted-foreground">{subject.code}</div>
                          {subject.isNEPMultidisciplinary && (
                            <Badge variant="outline" className="text-xs mt-1">
                              <Star className="mr-1 h-3 w-3" />
                              NEP Multidisciplinary
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{subject.department.code}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(subject.type)}>
                          {subject.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{subject.semester}</TableCell>
                      <TableCell>{subject.credits}</TableCell>
                      <TableCell>{subject.hoursPerWeek}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {subject.faculty.slice(0, 2).map(member => (
                            <div key={member._id} className="text-sm">
                              {member.name}
                            </div>
                          ))}
                          {subject.faculty.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{subject.faculty.length - 2} more
                            </div>
                          )}
                          {subject.faculty.length === 0 && (
                            <div className="text-xs text-muted-foreground">Unassigned</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {subject.isActive ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
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
                            <DropdownMenuItem onClick={() => console.log('View', subject._id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(subject)}>
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
                                  <AlertDialogTitle>Delete Subject</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete &quot;{subject.name}&quot;? This action cannot be undone and may affect timetables.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(subject._id)}>
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

export default SubjectManagement;