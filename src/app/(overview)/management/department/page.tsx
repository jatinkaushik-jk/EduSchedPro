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
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Building2, 
  Users, 
  CheckCircle, 
  XCircle,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// TypeScript interfaces matching the Mongoose schema
interface Department {
  _id: string;
  name: string;
  code: string;
  hod?: {
    _id: string;
    name: string;
    email: string;
  };
  faculty: Array<{
    _id: string;
    name: string;
    email: string;
  }>;
  subjects: Array<{
    _id: string;
    name: string;
    code: string;
  }>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  employeeId?: string;
  role: 'admin' | 'faculty' | 'hod' | 'principal';
}

const DepartmentManagement: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    hod: '',
    isActive: true
  });

  // Load data on component mount
  useEffect(() => {
    loadDepartments();
    loadUsers();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockDepartments: Department[] = [
        {
          _id: '1',
          name: 'Computer Science and Engineering',
          code: 'CSE',
          hod: { _id: '1', name: 'Dr. Jatin Kaushik', email: 'jatin@university.edu' },
          faculty: [
            { _id: '1', name: 'Dr. Jatin Kaushik', email: 'jatin@university.edu' },
            { _id: '2', name: 'Prof. Sarah Wilson', email: 'sarah@university.edu' }
          ],
          subjects: [
            { _id: '1', name: 'Data Structures', code: 'CSE201' },
            { _id: '2', name: 'Algorithms', code: 'CSE301' }
          ],
          isActive: true,
          createdAt: '2025-01-15T10:00:00Z',
          updatedAt: '2025-01-15T10:00:00Z'
        },
        {
          _id: '2',
          name: 'Electronics and Communication',
          code: 'ECE',
          faculty: [
            { _id: '3', name: 'Dr. Amit Sharma', email: 'amit@university.edu' }
          ],
          subjects: [
            { _id: '3', name: 'Digital Electronics', code: 'ECE201' }
          ],
          isActive: true,
          createdAt: '2025-01-16T10:00:00Z',
          updatedAt: '2025-01-16T10:00:00Z'
        }
      ];
      setDepartments(mockDepartments);
    } catch (error) {
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      // Mock users data - replace with actual API call
      const mockUsers: User[] = [
        { _id: '1', name: 'Dr. Jatin Kaushik', email: 'jatin@university.edu', employeeId: 'EMP001', role: 'hod' },
        { _id: '2', name: 'Prof. Sarah Wilson', email: 'sarah@university.edu', employeeId: 'EMP002', role: 'faculty' },
        { _id: '3', name: 'Dr. Amit Sharma', email: 'amit@university.edu', employeeId: 'EMP003', role: 'faculty' },
        { _id: '4', name: 'Dr. Priya Singh', email: 'priya@university.edu', employeeId: 'EMP004', role: 'faculty' }
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.code.trim()) {
      toast.error("Validation Error", { description: "Department name and code are required" });
      return;
    }

    try {
      if (editingDepartment) {
        // Update existing department
        // Replace with actual API call
        console.log('Updating department:', { ...editingDepartment, ...formData });
        toast.success("Department updated successfully");
      } else {
        // Create new department
        // Replace with actual API call
        console.log('Creating department:', formData);
        toast.success("Department created successfully");
      }
      
      resetForm();
      setIsAddDialogOpen(false);
      setEditingDepartment(null);
      loadDepartments();
    } catch (error) {
      toast.error("Failed to save department");
    }
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setFormData({
      name: department.name,
      code: department.code,
      hod: department.hod?._id || '',
      isActive: department.isActive
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (departmentId: string) => {
    try {
      // Replace with actual API call
      console.log('Deleting department:', departmentId);
      toast.success("Department deleted successfully");
      loadDepartments();
    } catch (error) {
      toast.error("Failed to delete department");
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      hod: '',
      isActive: true
    });
  };

  // Filter and search logic
  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === 'all' || 
                         (filterActive === 'active' && dept.isActive) ||
                         (filterActive === 'inactive' && !dept.isActive);
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading departments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Department Management</h1>
          <p className="text-muted-foreground">Manage academic departments and organizational structure</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {resetForm(); setEditingDepartment(null);}}>
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingDepartment ? 'Edit Department' : 'Add New Department'}
              </DialogTitle>
              <DialogDescription>
                {editingDepartment ? 'Update department information' : 'Create a new academic department'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Department Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Computer Science and Engineering"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Department Code</Label>
                <Input
                  id="code"
                  placeholder="e.g., CSE, ECE, ME"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hod">Head of Department</Label>
                <Select value={formData.hod} onValueChange={(value) => setFormData({...formData, hod: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select HOD (Optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.filter(user => user.role === 'hod' || user.role === 'faculty').map(user => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.name} ({user.employeeId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isActive">Department Active</Label>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingDepartment ? 'Update' : 'Create'} Department
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">
              {departments.filter(d => d.isActive).length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {departments.reduce((acc, dept) => acc + dept.faculty.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all departments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {departments.reduce((acc, dept) => acc + dept.subjects.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Available subjects
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
          <CardDescription>Manage and organize your academic departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterActive} onValueChange={setFilterActive}>
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Data Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>HOD</TableHead>
                  <TableHead>Faculty Count</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="text-muted-foreground">
                        {searchTerm ? 'No departments found matching your search.' : 'No departments found.'}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDepartments.map((department) => (
                    <TableRow key={department._id}>
                      <TableCell className="font-medium">{department.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{department.code}</Badge>
                      </TableCell>
                      <TableCell>
                        {department.hod ? (
                          <div>
                            <div className="font-medium">{department.hod.name}</div>
                            <div className="text-sm text-muted-foreground">{department.hod.email}</div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell>{department.faculty.length}</TableCell>
                      <TableCell>{department.subjects.length}</TableCell>
                      <TableCell>
                        {department.isActive ? (
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
                            <DropdownMenuItem onClick={() => console.log('View', department._id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(department)}>
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
                                  <AlertDialogTitle>Delete Department</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete &quot;{department.name}&quot;? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(department._id)}>
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

export default DepartmentManagement;