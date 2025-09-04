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
  Edit, 
  Trash2, 
  Building, 
  Users, 
  MapPin,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  Layers
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// TypeScript interfaces matching the Mongoose schema
interface Classroom {
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
  createdAt: string;
  updatedAt: string;
}

const ClassroomManagement: React.FC = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBuilding, setFilterBuilding] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState<Classroom | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    building: '',
    floor: '',
    capacity: '',
    type: 'lecture' as 'lecture' | 'lab' | 'seminar',
    equipment: [] as string[],
    unavailableSlots: [] as Array<{day: string; time: string; reason: string;}>,
    isActive: true
  });

  // Predefined equipment options
  const equipmentOptions = [
    'Projector', 'Smart Board', 'Desktop Computers', 'Laptops', 'WiFi', 
    'Audio System', 'Whiteboard', 'Air Conditioning', 'Cameras', 
    'Microphone', 'Laboratory Equipment', 'Software Tools', 'Power Outlets'
  ];

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Load data on component mount
  useEffect(() => {
    loadClassrooms();
  }, []);

  const loadClassrooms = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockClassrooms: Classroom[] = [
        {
          _id: '1',
          name: 'Computer Lab 1',
          number: 'A101',
          building: 'Academic Block A',
          floor: 1,
          capacity: 40,
          type: 'lab',
          equipment: ['Desktop Computers', 'Projector', 'Air Conditioning', 'WiFi'],
          isActive: true,
          unavailableSlots: [
            { day: 'SAT', time: '1', reason: 'Maintenance' }
          ],
          createdAt: '2025-01-15T10:00:00Z',
          updatedAt: '2025-01-15T10:00:00Z'
        },
        {
          _id: '2',
          name: 'Lecture Hall 1',
          number: 'B201',
          building: 'Academic Block B',
          floor: 2,
          capacity: 120,
          type: 'lecture',
          equipment: ['Projector', 'Smart Board', 'Audio System', 'Air Conditioning', 'Microphone'],
          isActive: true,
          unavailableSlots: [],
          createdAt: '2025-01-16T10:00:00Z',
          updatedAt: '2025-01-16T10:00:00Z'
        },
        {
          _id: '3',
          name: 'Electronics Lab',
          number: 'C301',
          building: 'Engineering Block',
          floor: 3,
          capacity: 30,
          type: 'lab',
          equipment: ['Laboratory Equipment', 'Projector', 'WiFi', 'Power Outlets'],
          isActive: true,
          unavailableSlots: [
            { day: 'FRI', time: '7', reason: 'Research Work' },
            { day: 'FRI', time: '8', reason: 'Research Work' }
          ],
          createdAt: '2025-01-17T10:00:00Z',
          updatedAt: '2025-01-17T10:00:00Z'
        },
        {
          _id: '4',
          name: 'Seminar Hall',
          number: 'A301',
          building: 'Academic Block A',
          floor: 3,
          capacity: 80,
          type: 'seminar',
          equipment: ['Projector', 'Audio System', 'Air Conditioning', 'Cameras', 'Microphone'],
          isActive: false,
          unavailableSlots: [
            { day: 'MON', time: '1', reason: 'Renovation' },
            { day: 'MON', time: '2', reason: 'Renovation' },
            { day: 'TUE', time: '1', reason: 'Renovation' },
            { day: 'TUE', time: '2', reason: 'Renovation' }
          ],
          createdAt: '2025-01-18T10:00:00Z',
          updatedAt: '2025-01-18T10:00:00Z'
        }
      ];
      setClassrooms(mockClassrooms);
    } catch (error) {
      toast.error("Failed to load classrooms");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.number.trim() || !formData.building.trim() || !formData.capacity) {
      toast.error("Validation Error", {description: "Name, number, building, and capacity are required"});
      return;
    }

    try {
      if (editingClassroom) {
        // Update existing classroom
        console.log('Updating classroom:', { ...editingClassroom, ...formData });
        toast.success("Classroom updated successfully");
      } else {
        // Create new classroom
        console.log('Creating classroom:', formData);
        toast.success("Classroom created successfully");
      }
      
      resetForm();
      setIsAddDialogOpen(false);
      setEditingClassroom(null);
      loadClassrooms();
    } catch (error) {
      toast.error("Failed to save classroom");
    }
  };

  const handleEdit = (classroom: Classroom) => {
    setEditingClassroom(classroom);
    setFormData({
      name: classroom.name,
      number: classroom.number,
      building: classroom.building,
      floor: classroom.floor?.toString() || '',
      capacity: classroom.capacity.toString(),
      type: classroom.type,
      equipment: classroom.equipment,
      unavailableSlots: classroom.unavailableSlots,
      isActive: classroom.isActive
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (classroomId: string) => {
    try {
      console.log('Deleting classroom:', classroomId);
      toast.success("Classroom deleted successfully");
      loadClassrooms();
    } catch (error) {
      toast.error("Failed to delete classroom");
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      number: '',
      building: '',
      floor: '',
      capacity: '',
      type: 'lecture',
      equipment: [],
      unavailableSlots: [],
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

  const toggleEquipment = (item: string) => {
    if (formData.equipment.includes(item)) {
      setFormData({
        ...formData,
        equipment: formData.equipment.filter(eq => eq !== item)
      });
    } else {
      setFormData({
        ...formData,
        equipment: [...formData.equipment, item]
      });
    }
  };

  // Filter and search logic
  const filteredClassrooms = classrooms.filter(classroom => {
    const matchesSearch = classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classroom.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classroom.building.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBuilding = filterBuilding === 'all' || classroom.building === filterBuilding;
    const matchesType = filterType === 'all' || classroom.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && classroom.isActive) ||
                         (filterStatus === 'inactive' && !classroom.isActive);
    return matchesSearch && matchesBuilding && matchesType && matchesStatus;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 text-blue-800';
      case 'lab': return 'bg-green-100 text-green-800';
      case 'seminar': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUniqueBuildings = () => {
    return [...new Set(classrooms.map(c => c.building))].sort();
  };

  const getCapacityStats = () => {
    const capacities = classrooms.filter(c => c.isActive).map(c => c.capacity);
    const total = capacities.reduce((sum, cap) => sum + cap, 0);
    const average = capacities.length > 0 ? Math.round(total / capacities.length) : 0;
    return { total, average };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading classrooms...</p>
        </div>
      </div>
    );
  }

  const capacityStats = getCapacityStats();

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Classroom Management</h1>
          <p className="text-muted-foreground">Manage classrooms, capacity, equipment, and availability</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {resetForm(); setEditingClassroom(null);}}>
              <Plus className="mr-2 h-4 w-4" />
              Add Classroom
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingClassroom ? 'Edit Classroom' : 'Add New Classroom'}
              </DialogTitle>
              <DialogDescription>
                {editingClassroom ? 'Update classroom information and equipment' : 'Create a new classroom with equipment and availability'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Classroom Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Computer Lab 1, Lecture Hall A"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Room Number</Label>
                    <Input
                      id="number"
                      placeholder="e.g., A101, B201"
                      value={formData.number}
                      onChange={(e) => setFormData({...formData, number: e.target.value.toUpperCase()})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="building">Building</Label>
                    <Input
                      id="building"
                      placeholder="e.g., Academic Block A, Engineering Block"
                      value={formData.building}
                      onChange={(e) => setFormData({...formData, building: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floor">Floor (Optional)</Label>
                    <Input
                      id="floor"
                      type="number"
                      min="0"
                      max="50"
                      placeholder="e.g., 1, 2, 3"
                      value={formData.floor}
                      onChange={(e) => setFormData({...formData, floor: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Capacity and Type */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Capacity and Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Seating Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      max="1000"
                      placeholder="e.g., 40, 60, 120"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Room Type</Label>
                    <Select value={formData.type} onValueChange={(value: 'lecture' | 'lab' | 'seminar') => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lecture">Lecture Hall</SelectItem>
                        <SelectItem value="lab">Laboratory</SelectItem>
                        <SelectItem value="seminar">Seminar Room</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Equipment */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Available Equipment</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {equipmentOptions.map(item => (
                    <div key={item} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={item}
                        checked={formData.equipment.includes(item)}
                        onChange={() => toggleEquipment(item)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={item} className="text-sm">{item}</Label>
                    </div>
                  ))}
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
                        placeholder="Reason (e.g., Maintenance, Special Event)"
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
                <Label htmlFor="isActive">Classroom Active</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingClassroom ? 'Update' : 'Create'} Classroom
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
            <CardTitle className="text-sm font-medium">Total Classrooms</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classrooms.length}</div>
            <p className="text-xs text-muted-foreground">
              {classrooms.filter(c => c.isActive).length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capacityStats.total}</div>
            <p className="text-xs text-muted-foreground">seats available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Capacity</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capacityStats.average}</div>
            <p className="text-xs text-muted-foreground">seats per room</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buildings</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getUniqueBuildings().length}</div>
            <p className="text-xs text-muted-foreground">building locations</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Classrooms</CardTitle>
          <CardDescription>Manage classroom inventory, capacity, and equipment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6 flex-wrap gap-y-2">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search classrooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterBuilding} onValueChange={setFilterBuilding}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Buildings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Buildings</SelectItem>
                {getUniqueBuildings().map(building => (
                  <SelectItem key={building} value={building}>{building}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="lecture">Lecture</SelectItem>
                <SelectItem value="lab">Lab</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
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
                  <TableHead>Classroom</TableHead>
                  <TableHead>Building</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClassrooms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="text-muted-foreground">
                        {searchTerm ? 'No classrooms found matching your search.' : 'No classrooms found.'}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClassrooms.map((classroom) => (
                    <TableRow key={classroom._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{classroom.name}</div>
                          <div className="text-sm text-muted-foreground">{classroom.number}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{classroom.building}</div>
                          {classroom.floor && (
                            <div className="text-sm text-muted-foreground">Floor {classroom.floor}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(classroom.type)}>
                          {classroom.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                          {classroom.capacity}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {classroom.equipment.slice(0, 3).map(item => (
                            <Badge key={item} variant="outline" className="mr-1 text-xs">
                              {item}
                            </Badge>
                          ))}
                          {classroom.equipment.length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{classroom.equipment.length - 3} more
                            </div>
                          )}
                          {classroom.equipment.length === 0 && (
                            <span className="text-xs text-muted-foreground">No equipment</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {classroom.unavailableSlots.length > 0 ? (
                          <div>
                            <Badge variant="outline" className="text-xs">
                              <Calendar className="mr-1 h-3 w-3" />
                              {classroom.unavailableSlots.length} restrictions
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              {classroom.unavailableSlots[0].reason}
                              {classroom.unavailableSlots.length > 1 && ' +more'}
                            </div>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            Available
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {classroom.isActive ? (
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
                            <DropdownMenuItem onClick={() => console.log('View', classroom._id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(classroom)}>
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
                                  <AlertDialogTitle>Delete Classroom</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete &quot;{classroom.name}&quot;? This action cannot be undone and may affect timetables.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(classroom._id)}>
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

export default ClassroomManagement;