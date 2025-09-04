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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users, 
  Clock,
  BookOpen,
  MoreHorizontal,
  Eye,
  Building2,
  Award,
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from 'sonner';

// TypeScript interfaces matching the Mongoose schema
interface Faculty {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    employeeId?: string;
    role: string;
    isActive: boolean;
  };
  employeeId: string;
  department: {
    _id: string;
    name: string;
    code: string;
  };
  subjects: Array<{
    _id: string;
    name: string;
    code: string;
    type: string;
    hoursPerWeek: number;
  }>;
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
  hoursPerWeek: number;
  department: string;
}

const FacultyManagement: React.FC = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);

  // Form state for faculty management
  const [formData, setFormData] = useState({
    // User information
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    password: '',
    role: 'faculty',
    
    // Faculty-specific information
    department: '',
    subjects: [] as string[],
    maxHoursPerDay: 8,
    maxHoursPerWeek: 40,
    unavailableSlots: [] as Array<{day: string; time: string; reason: string;}>,
    preferredSlots: [] as string[],
    avoidSlots: [] as string[],
    isActive: true
  });

  // Available time slots for preferences
  const timeSlots = [
    'MON-1', 'MON-2', 'MON-3', 'MON-4', 'MON-5', 'MON-6', 'MON-7', 'MON-8',
    'TUE-1', 'TUE-2', 'TUE-3', 'TUE-4', 'TUE-5', 'TUE-6', 'TUE-7', 'TUE-8',
    'WED-1', 'WED-2', 'WED-3', 'WED-4', 'WED-5', 'WED-6', 'WED-7', 'WED-8',
    'THU-1', 'THU-2', 'THU-3', 'THU-4', 'THU-5', 'THU-6', 'THU-7', 'THU-8',
    'FRI-1', 'FRI-2', 'FRI-3', 'FRI-4', 'FRI-5', 'FRI-6', 'FRI-7', 'FRI-8'
  ];

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Load data on component mount
  useEffect(() => {
    loadFaculty();
    loadDepartments();
    loadSubjects();
  }, []);

  const loadFaculty = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockFaculty: Faculty[] = [
        {
          _id: '1',
          user: {
            _id: '1',
            name: 'Dr. Jatin Kaushik',
            email: 'jatin@university.edu',
            phone: '+91 98765 43210',
            employeeId: 'EMP001',
            role: 'hod',
            isActive: true
          },
          employeeId: 'EMP001',
          department: {
            _id: '1',
            name: 'Computer Science and Engineering',
            code: 'CSE'
          },
          subjects: [
            { _id: '1', name: 'Data Structures', code: 'CSE201', type: 'theory', hoursPerWeek: 3 },
            { _id: '2', name: 'Algorithms', code: 'CSE301', type: 'theory', hoursPerWeek: 4 }
          ],
          maxHoursPerDay: 6,
          maxHoursPerWeek: 30,
          unavailableSlots: [
            { day: 'MON', time: '1', reason: 'Administrative Meeting' }
          ],
          preferences: {
            preferredSlots: ['MON-2', 'TUE-3', 'WED-2'],
            avoidSlots: ['FRI-8']
          },
          workload: 14,
          isActive: true,
          createdAt: '2025-01-15T10:00:00Z',
          updatedAt: '2025-01-15T10:00:00Z'
        },
        {
          _id: '2',
          user: {
            _id: '2',
            name: 'Prof. Sarah Wilson',
            email: 'sarah@university.edu',
            phone: '+91 98765 43211',
            employeeId: 'EMP002',
            role: 'faculty',
            isActive: true
          },
          employeeId: 'EMP002',
          department: {
            _id: '1',
            name: 'Computer Science and Engineering',
            code: 'CSE'
          },
          subjects: [
            { _id: '3', name: 'Database Systems', code: 'CSE401', type: 'theory', hoursPerWeek: 3 },
            { _id: '4', name: 'Database Lab', code: 'CSE402', type: 'practical', hoursPerWeek: 2 }
          ],
          maxHoursPerDay: 8,
          maxHoursPerWeek: 40,
          unavailableSlots: [],
          preferences: {
            preferredSlots: ['TUE-1', 'WED-3', 'THU-2'],
            avoidSlots: ['MON-1']
          },
          workload: 18,
          isActive: true,
          createdAt: '2025-01-16T10:00:00Z',
          updatedAt: '2025-01-16T10:00:00Z'
        }
      ];
      setFaculty(mockFaculty);
    } catch (error) {
      toast.error("Failed to load faculty data");
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
        { _id: '1', name: 'Data Structures', code: 'CSE201', type: 'theory', hoursPerWeek: 3, department: '1' },
        { _id: '2', name: 'Algorithms', code: 'CSE301', type: 'theory', hoursPerWeek: 4, department: '1' },
        { _id: '3', name: 'Database Systems', code: 'CSE401', type: 'theory', hoursPerWeek: 3, department: '1' },
        { _id: '4', name: 'Database Lab', code: 'CSE402', type: 'practical', hoursPerWeek: 2, department: '1' },
        { _id: '5', name: 'Digital Electronics', code: 'ECE201', type: 'theory', hoursPerWeek: 3, department: '2' }
      ];
      setSubjects(mockSubjects);
    } catch (error) {
      console.error('Failed to load subjects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.employeeId.trim()) {
      toast.error("Validation Error",{
        description: "Name, email, and employee ID are required"
      });
      return;
    }

    try {
      if (editingFaculty) {
        // Update existing faculty
        console.log('Updating faculty:', { ...editingFaculty, ...formData });
        toast.success("Faculty updated successfully")
      } else {
        // Create new faculty
        console.log('Creating faculty:', formData);
        toast.success("Faculty created successfully");
      }
      
      resetForm();
      setIsAddDialogOpen(false);
      setEditingFaculty(null);
      loadFaculty();
    } catch (error) {
      toast.error("Failed to save faculty data");
    }
  };

  const handleEdit = (facultyMember: Faculty) => {
    setEditingFaculty(facultyMember);
    setFormData({
      name: facultyMember.user.name,
      email: facultyMember.user.email,
      phone: facultyMember.user.phone || '',
      employeeId: facultyMember.employeeId,
      password: '',
      role: facultyMember.user.role,
      department: facultyMember.department._id,
      subjects: facultyMember.subjects.map(s => s._id),
      maxHoursPerDay: facultyMember.maxHoursPerDay,
      maxHoursPerWeek: facultyMember.maxHoursPerWeek,
      unavailableSlots: facultyMember.unavailableSlots,
      preferredSlots: facultyMember.preferences.preferredSlots,
      avoidSlots: facultyMember.preferences.avoidSlots,
      isActive: facultyMember.isActive
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (facultyId: string) => {
    try {
      console.log('Deleting faculty:', facultyId);
      toast.success("Faculty deleted successfully");
      loadFaculty();
    } catch (error) {
      toast.error("Failed to delete faculty");
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      employeeId: '',
      password: '',
      role: 'faculty',
      department: '',
      subjects: [],
      maxHoursPerDay: 8,
      maxHoursPerWeek: 40,
      unavailableSlots: [],
      preferredSlots: [],
      avoidSlots: [],
      isActive: true
    });
  };

  const addUnavailableSlot = () => {
    setFormData({
      ...formData,
      unavailableSlots: [
        ...formData.unavailableSlots,
        { day: 'MON', time: '1', reason: '' }
      ]
    });
  };

  const removeUnavailableSlot = (index: number) => {
    setFormData({
      ...formData,
      unavailableSlots: formData.unavailableSlots.filter((_, i) => i !== index)
    });
  };

  const updateUnavailableSlot = (index: number, field: string, value: string) => {
    const updatedSlots = [...formData.unavailableSlots];
    updatedSlots[index] = { ...updatedSlots[index], [field]: value };
    setFormData({
      ...formData,
      unavailableSlots: updatedSlots
    });
  };

  // Filter and search logic
  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = member.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department._id === filterDepartment;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && member.isActive) ||
                         (filterStatus === 'inactive' && !member.isActive);
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getWorkloadColor = (workload: number, maxHours: number) => {
    const percentage = (workload / maxHours) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getSubjectsByDepartment = (departmentId: string) => {
    return subjects.filter(subject => subject.department === departmentId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading faculty data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Faculty Management</h1>
          <p className="text-muted-foreground">Manage faculty profiles, subjects, and scheduling preferences</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {resetForm(); setEditingFaculty(null);}}>
              <Plus className="mr-2 h-4 w-4" />
              Add Faculty
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}
              </DialogTitle>
              <DialogDescription>
                {editingFaculty ? 'Update faculty information and preferences' : 'Create a new faculty profile with subjects and preferences'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Dr. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      placeholder="e.g., EMP001"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({...formData, employeeId: e.target.value.toUpperCase()})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="professor@university.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="faculty">Faculty</SelectItem>
                        <SelectItem value="hod">Head of Department</SelectItem>
                        <SelectItem value="principal">Principal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {!editingFaculty && (
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required={!editingFaculty}
                      />
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value, subjects: []})}>
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
                    <Label>Subjects (Select multiple)</Label>
                    <div className="border rounded-md p-3 max-h-32 overflow-y-auto">
                      {getSubjectsByDepartment(formData.department).map(subject => (
                        <div key={subject._id} className="flex items-center space-x-2 mb-2">
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
                            {subject.name} ({subject.code}) - {subject.type}
                          </Label>
                        </div>
                      ))}
                      {getSubjectsByDepartment(formData.department).length === 0 && (
                        <p className="text-sm text-muted-foreground">No subjects available for selected department</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Workload Constraints */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Workload Constraints</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxHoursPerDay">Max Hours Per Day</Label>
                    <Input
                      id="maxHoursPerDay"
                      type="number"
                      min="1"
                      max="12"
                      value={formData.maxHoursPerDay}
                      onChange={(e) => setFormData({...formData, maxHoursPerDay: parseInt(e.target.value)})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxHoursPerWeek">Max Hours Per Week</Label>
                    <Input
                      id="maxHoursPerWeek"
                      type="number"
                      min="1"
                      max="60"
                      value={formData.maxHoursPerWeek}
                      onChange={(e) => setFormData({...formData, maxHoursPerWeek: parseInt(e.target.value)})}
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Unavailable Slots */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Unavailable Time Slots</h3>
                  <Button type="button" onClick={addUnavailableSlot} variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Slot
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.unavailableSlots.map((slot, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Select
                        value={slot.day}
                        onValueChange={(value) => updateUnavailableSlot(index, 'day', value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map(day => (
                            <SelectItem key={day} value={day}>{day}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={slot.time}
                        onValueChange={(value) => updateUnavailableSlot(index, 'time', value)}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8].map(period => (
                            <SelectItem key={period} value={period.toString()}>P{period}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Reason (e.g., Meeting, Research)"
                        value={slot.reason}
                        onChange={(e) => updateUnavailableSlot(index, 'reason', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeUnavailableSlot(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {formData.unavailableSlots.length === 0 && (
                    <p className="text-sm text-muted-foreground">No unavailable slots defined</p>
                  )}
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
                <Label htmlFor="isActive">Faculty Active</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingFaculty ? 'Update' : 'Create'} Faculty
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
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faculty.length}</div>
            <p className="text-xs text-muted-foreground">
              {faculty.filter(f => f.isActive).length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Workload</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {faculty.length > 0 ? Math.round(faculty.reduce((acc, f) => acc + f.workload, 0) / faculty.length) : 0}
            </div>
            <p className="text-xs text-muted-foreground">hours per week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {faculty.reduce((acc, f) => acc + f.subjects.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">subjects assigned</p>
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
          <CardTitle>Faculty Members</CardTitle>
          <CardDescription>Manage faculty profiles, workload, and teaching assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search faculty..."
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
                  <TableHead>Faculty</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Workload</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculty.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-muted-foreground">
                        {searchTerm ? 'No faculty found matching your search.' : 'No faculty members found.'}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFaculty.map((member) => (
                    <TableRow key={member._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.user.avatar} />
                            <AvatarFallback>
                              {member.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.user.name}</div>
                            <div className="text-sm text-muted-foreground">{member.employeeId}</div>
                            <div className="text-sm text-muted-foreground">{member.user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge variant="outline">{member.department.code}</Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            {member.department.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {member.subjects.slice(0, 2).map(subject => (
                            <Badge key={subject._id} variant="secondary" className="mr-1 text-xs">
                              {subject.code}
                            </Badge>
                          ))}
                          {member.subjects.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{member.subjects.length - 2} more
                            </Badge>
                          )}
                          <div className="text-xs text-muted-foreground">
                            {member.subjects.length} subject{member.subjects.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={getWorkloadColor(member.workload, member.maxHoursPerWeek)}>
                          <div className="font-medium">
                            {member.workload} / {member.maxHoursPerWeek} hrs
                          </div>
                          <div className="text-xs">
                            {Math.round((member.workload / member.maxHoursPerWeek) * 100)}% utilization
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {member.isActive ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          <Award className="inline h-3 w-3 mr-1" />
                          {member.user.role.toUpperCase()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => console.log('View', member._id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(member)}>
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
                                  <AlertDialogTitle>Delete Faculty Member</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete &quot;{member.user.name}&quot;? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(member._id)}>
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

export default FacultyManagement;