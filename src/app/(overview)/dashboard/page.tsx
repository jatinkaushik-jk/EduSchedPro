"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Building2, 
  BookOpen, 
  Calendar, 
  Clock,
  AlertCircle,
  CheckCircle,
  Brain,
  Target,
  Award,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import Link from 'next/link';

// TypeScript interfaces for dashboard data
interface DashboardStats {
  departments: {
    total: number;
    active: number;
    trend: number;
  };
  faculty: {
    total: number;
    active: number;
    averageWorkload: number;
    trend: number;
  };
  subjects: {
    total: number;
    theory: number;
    practical: number;
    elective: number;
    trend: number;
  };
  batches: {
    total: number;
    students: number;
    avgStrength: number;
    trend: number;
  };
  classrooms: {
    total: number;
    capacity: number;
    utilization: number;
    trend: number;
  };
  timetables: {
    total: number;
    active: number;
    avgOptimization: number;
    totalConflicts: number;
    trend: number;
  };
}

interface RecentActivity {
  id: string;
  type: 'timetable_generated' | 'faculty_added' | 'subject_updated' | 'conflict_resolved';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

interface ConflictAlert {
  id: string;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timetable: string;
  department: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [conflicts, setConflicts] = useState<ConflictAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data - replace with actual API calls
      const mockStats: DashboardStats = {
        departments: { total: 6, active: 5, trend: 2 },
        faculty: { total: 45, active: 42, averageWorkload: 28, trend: 5 },
        subjects: { total: 128, theory: 85, practical: 28, elective: 15, trend: 8 },
        batches: { total: 24, students: 1340, avgStrength: 56, trend: 3 },
        classrooms: { total: 38, capacity: 2240, utilization: 78, trend: -2 },
        timetables: { total: 12, active: 8, avgOptimization: 89, totalConflicts: 3, trend: 1 }
      };

      const mockActivity: RecentActivity[] = [
        {
          id: '1',
          type: 'timetable_generated',
          title: 'CSE Semester 3 timetable generated',
          description: 'AI optimization completed with 92% efficiency score',
          timestamp: '2 hours ago',
          user: 'Dr. Jatin Kaushik'
        },
        {
          id: '2',
          type: 'faculty_added',
          title: 'New faculty member added',
          description: 'Prof. Sarah Wilson joined ECE department',
          timestamp: '5 hours ago',
          user: 'Admin'
        },
        {
          id: '3',
          type: 'conflict_resolved',
          title: 'Room conflict resolved',
          description: 'Double booking in Lab A101 has been resolved',
          timestamp: '1 day ago',
          user: 'Dr. Amit Sharma'
        },
        {
          id: '4',
          type: 'subject_updated',
          title: 'Subject prerequisites updated',
          description: 'Database Systems prerequisites modified',
          timestamp: '2 days ago',
          user: 'Prof. Michael Chen'
        }
      ];

      const mockConflicts: ConflictAlert[] = [
        {
          id: '1',
          type: 'FACULTY_DOUBLE_BOOKING',
          description: 'Dr. Smith scheduled in two classrooms at MON-3',
          severity: 'high',
          timetable: 'CSE Sem 5',
          department: 'CSE'
        },
        {
          id: '2',
          type: 'ROOM_CAPACITY_EXCEEDED',
          description: 'Batch size (65) exceeds room A201 capacity (60)',
          severity: 'medium',
          timetable: 'ECE Sem 1',
          department: 'ECE'
        },
        {
          id: '3',
          type: 'SUBJECT_HOURS_DEFICIT',
          description: 'Database Systems scheduled for 2/3 required weekly hours',
          severity: 'low',
          timetable: 'CSE Sem 3',
          department: 'CSE'
        }
      ];

      setStats(mockStats);
      setRecentActivity(mockActivity);
      setConflicts(mockConflicts);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    if (trend < 0) return <ArrowDownRight className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getConflictIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'medium': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <AlertCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'timetable_generated': return <Brain className="h-4 w-4 text-blue-600" />;
      case 'faculty_added': return <Users className="h-4 w-4 text-green-600" />;
      case 'subject_updated': return <BookOpen className="h-4 w-4 text-purple-600" />;
      case 'conflict_resolved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">EduScheduler Pro Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your intelligent timetable management system
          </p>
        </div>
        <div className="flex space-x-2">
          <Link href="/timetable-generation">
            <Button>
              <Brain className="mr-2 h-4 w-4" />
              Generate Timetable
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Departments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.departments.total}</div>
            <p className="text-xs text-muted-foreground mb-2">
              {stats.departments.active} active departments
            </p>
            <div className="flex items-center text-xs">
              {getTrendIcon(stats.departments.trend)}
              <span className={`ml-1 ${getTrendColor(stats.departments.trend)}`}>
                {stats.departments.trend > 0 ? '+' : ''}{stats.departments.trend} this month
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Faculty */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.faculty.total}</div>
            <p className="text-xs text-muted-foreground mb-2">
              {stats.faculty.averageWorkload}h avg workload
            </p>
            <div className="flex items-center text-xs">
              {getTrendIcon(stats.faculty.trend)}
              <span className={`ml-1 ${getTrendColor(stats.faculty.trend)}`}>
                {stats.faculty.trend > 0 ? '+' : ''}{stats.faculty.trend} this month
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Subjects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.subjects.total}</div>
            <p className="text-xs text-muted-foreground mb-2">
              {stats.subjects.theory}T • {stats.subjects.practical}P • {stats.subjects.elective}E
            </p>
            <div className="flex items-center text-xs">
              {getTrendIcon(stats.subjects.trend)}
              <span className={`ml-1 ${getTrendColor(stats.subjects.trend)}`}>
                {stats.subjects.trend > 0 ? '+' : ''}{stats.subjects.trend} this month
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Students */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.batches.students.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mb-2">
              {stats.batches.total} batches • {stats.batches.avgStrength} avg size
            </p>
            <div className="flex items-center text-xs">
              {getTrendIcon(stats.batches.trend)}
              <span className={`ml-1 ${getTrendColor(stats.batches.trend)}`}>
                {stats.batches.trend > 0 ? '+' : ''}{stats.batches.trend}% this semester
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Classrooms */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classrooms</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.classrooms.total}</div>
            <p className="text-xs text-muted-foreground mb-2">
              {stats.classrooms.capacity.toLocaleString()} total capacity
            </p>
            <div className="flex items-center text-xs">
              <Target className="h-3 w-3 mr-1" />
              <span>{stats.classrooms.utilization}% utilization</span>
            </div>
          </CardContent>
        </Card>

        {/* Timetables */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Timetables</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.timetables.total}</div>
            <p className="text-xs text-muted-foreground mb-2">
              {stats.timetables.active} active • {stats.timetables.avgOptimization}% avg optimization
            </p>
            <div className="flex items-center text-xs">
              <Zap className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">{stats.timetables.totalConflicts} conflicts</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500 mb-1">{activity.description}</p>
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.timestamp} • {activity.user}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Conflicts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Active Conflicts
            </CardTitle>
            <CardDescription>Issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conflicts.map((conflict) => (
                <div key={conflict.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getConflictIcon(conflict.severity)}
                      <Badge variant="outline" className="text-xs">
                        {conflict.department}
                      </Badge>
                    </div>
                    <Badge 
                      variant={conflict.severity === 'high' ? 'destructive' : 
                             conflict.severity === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {conflict.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-900 mb-1">{conflict.description}</p>
                  <p className="text-xs text-gray-500">{conflict.timetable}</p>
                </div>
              ))}
              {conflicts.length === 0 && (
                <div className="text-center text-muted-foreground py-4">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-sm">No active conflicts</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used features for efficient management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/faculty-management">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-medium text-sm">Manage Faculty</h3>
                  <p className="text-xs text-muted-foreground">Add & edit faculty</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/subject-management">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-medium text-sm">Manage Subjects</h3>
                  <p className="text-xs text-muted-foreground">Configure curriculum</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/classroom-management">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Building2 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-medium text-sm">Manage Rooms</h3>
                  <p className="text-xs text-muted-foreground">Configure classrooms</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/timetable-generation">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h3 className="font-medium text-sm">Generate Timetable</h3>
                  <p className="text-xs text-muted-foreground">AI optimization</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* System Health & Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Overall system health and efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Average Optimization Score</span>
                <span className="font-medium">{stats.timetables.avgOptimization}%</span>
              </div>
              <Progress value={stats.timetables.avgOptimization} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Classroom Utilization</span>
                <span className="font-medium">{stats.classrooms.utilization}%</span>
              </div>
              <Progress value={stats.classrooms.utilization} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Faculty Workload Balance</span>
                <span className="font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Overview</CardTitle>
            <CardDescription>Key resource availability and allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Active Faculty</span>
                </div>
                <span className="font-medium">{stats.faculty.active}/{stats.faculty.total}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Available Rooms</span>
                </div>
                <span className="font-medium">{stats.classrooms.total}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Student Batches</span>
                </div>
                <span className="font-medium">{stats.batches.total}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Active Timetables</span>
                </div>
                <span className="font-medium">{stats.timetables.active}/{stats.timetables.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
