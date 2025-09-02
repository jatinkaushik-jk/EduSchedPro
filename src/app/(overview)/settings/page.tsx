"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft,
  User,
  Building2,
  CreditCard,
  Bell,
  Settings,
  Shield,
  Edit3,
  Save,
  X,
  Globe,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Lock,
  Key,
  Smartphone,
  Monitor
} from 'lucide-react';

// Types for settings data
interface PersonalProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  employeeId: string;
  joinDate: string;
  avatar?: string;
}

interface OrganizationInfo {
  instituteName: string;
  instituteType: string;
  affiliation: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  description: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  scheduleUpdates: boolean;
  conflictAlerts: boolean;
  weeklyReports: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: string;
  passwordLastChanged: string;
  activeDevices: number;
}

const EduSchedulerSettings = () => {
  const [activeSection, setActiveSection] = useState<string>('main');
  const [isEditing, setIsEditing] = useState(false);

  // Sample data - in real app this would come from API
  const [personalProfile, setPersonalProfile] = useState<PersonalProfile>({
    name: 'Dr. Jatin Kaushik',
    email: 'jatin.kaushik@university.edu',
    phone: '+91 98765 43210',
    role: 'Professor & HOD',
    department: 'Computer Science',
    employeeId: 'EMP001',
    joinDate: '2020-08-15',
  });

  const [organizationInfo, setOrganizationInfo] = useState<OrganizationInfo>({
    instituteName: 'Jatin Kaushik\'s Org',
    instituteType: '',
    affiliation: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    phone: '',
    email: '',
    description: ''
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    scheduleUpdates: true,
    conflictAlerts: true,
    weeklyReports: false
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordLastChanged: '2025-07-15',
    activeDevices: 3
  });

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to API here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // In real app, reset form to original values
  };

  // Main Settings Dashboard
  const SettingsMain = () => (
    <div className="space-y-8">
      {/* Account Settings Section */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
        <p className="text-muted-foreground mb-6">Manage your personal and organizational preferences</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('personal')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Personal Profile</CardTitle>
                  <CardDescription>Update your personal information and account details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto text-blue-600 hover:text-blue-700">
                Configure →
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('organization')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Organization</CardTitle>
                  <CardDescription>Manage institute details and organizational settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto text-blue-600 hover:text-blue-700">
                Configure →
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('billing')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Billing & Subscription</CardTitle>
                  <CardDescription>View your plan, billing history, and payment methods</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                Configure →
              </Button>
              <Badge variant="outline" className="text-green-600 border-green-200">
                No Auto-Renewal
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preferences Section */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Preferences</h2>
        <p className="text-muted-foreground mb-6">Customize your EduScheduler Pro experience</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('notifications')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Bell className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Notifications</CardTitle>
                  <CardDescription>Configure email and in-app notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto text-blue-600 hover:text-blue-700">
                Configure →
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('general')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">General Preferences</CardTitle>
                  <CardDescription>Language, timezone, and display preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto text-blue-600 hover:text-blue-700">
                Configure →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Security Section */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Security & Privacy</h2>
        <p className="text-muted-foreground mb-6">Manage your account security and privacy settings</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('security')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Security Settings</CardTitle>
                  <CardDescription>Two-factor authentication, password, and session management</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto text-blue-600 hover:text-blue-700">
                Configure →
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Lock className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Privacy & Data</CardTitle>
                  <CardDescription>Control your data and privacy preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="text-gray-500">
                Coming Soon
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Personal Profile Settings
  const PersonalProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Personal Profile</h2>
          <p className="text-muted-foreground">Update your personal information and account details</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
            <Edit3 className="h-4 w-4" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={personalProfile.avatar} />
              <AvatarFallback>{personalProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={personalProfile.name}
                disabled={!isEditing}
                onChange={(e) => setPersonalProfile({...personalProfile, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                value={personalProfile.email}
                disabled={!isEditing}
                onChange={(e) => setPersonalProfile({...personalProfile, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={personalProfile.phone}
                disabled={!isEditing}
                onChange={(e) => setPersonalProfile({...personalProfile, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input 
                id="role" 
                value={personalProfile.role}
                disabled={!isEditing}
                onChange={(e) => setPersonalProfile({...personalProfile, role: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input 
                id="department" 
                value={personalProfile.department}
                disabled={!isEditing}
                onChange={(e) => setPersonalProfile({...personalProfile, department: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input 
                id="employeeId" 
                value={personalProfile.employeeId}
                disabled
              />
            </div>
          </div>
          <div className="grid md:grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date</Label>
              <Input 
                id="joinDate" 
                value={personalProfile.joinDate}
                disabled
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Organization Settings
  const OrganizationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Organization Settings</h2>
          <p className="text-muted-foreground">Manage your institute details and organizational information</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
            <Edit3 className="h-4 w-4" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Institute Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="instituteName" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Institute Name
              </Label>
              <Input 
                id="instituteName" 
                value={organizationInfo.instituteName}
                disabled={!isEditing}
                onChange={(e) => setOrganizationInfo({...organizationInfo, instituteName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Label>
              <Input 
                id="website" 
                value={organizationInfo.website || 'Not provided'}
                disabled={!isEditing}
                placeholder="https://your-institute.edu"
                onChange={(e) => setOrganizationInfo({...organizationInfo, website: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instituteType">Institute Type</Label>
              <Input 
                id="instituteType" 
                value={organizationInfo.instituteType || 'Not provided'}
                disabled={!isEditing}
                onChange={(e) => setOrganizationInfo({...organizationInfo, instituteType: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="affiliation">Affiliation</Label>
              <Input 
                id="affiliation" 
                value={organizationInfo.affiliation || 'Not provided'}
                disabled={!isEditing}
                onChange={(e) => setOrganizationInfo({...organizationInfo, affiliation: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Input 
                id="address" 
                value={organizationInfo.address || 'Not provided'}
                disabled={!isEditing}
                onChange={(e) => setOrganizationInfo({...organizationInfo, address: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                value={organizationInfo.city || 'Not provided'}
                disabled={!isEditing}
                onChange={(e) => setOrganizationInfo({...organizationInfo, city: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input 
                id="state" 
                value={organizationInfo.state || 'Not provided'}
                disabled={!isEditing}
                onChange={(e) => setOrganizationInfo({...organizationInfo, state: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country" 
                value={organizationInfo.country || 'Not provided'}
                disabled={!isEditing}
                onChange={(e) => setOrganizationInfo({...organizationInfo, country: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input 
                id="postalCode" 
                value={organizationInfo.postalCode || 'Not provided'}
                disabled={!isEditing}
                onChange={(e) => setOrganizationInfo({...organizationInfo, postalCode: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institutePhone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Institute Phone
              </Label>
              <Input 
                id="institutePhone" 
                value={organizationInfo.phone || 'Not provided'}
                disabled={!isEditing}
                onChange={(e) => setOrganizationInfo({...organizationInfo, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instituteEmail" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Institute Email
              </Label>
              <Input 
                id="instituteEmail" 
                value={organizationInfo.email || 'Not provided'}
                disabled={!isEditing}
                onChange={(e) => setOrganizationInfo({...organizationInfo, email: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={organizationInfo.description || 'Not provided'}
              disabled={!isEditing}
              placeholder="Brief description of your institute..."
              onChange={(e) => setOrganizationInfo({...organizationInfo, description: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Notification Settings
  const NotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notification Settings</h2>
          <p className="text-muted-foreground">Configure email and in-app notification preferences</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose which notifications you want to receive and how you want to receive them.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch 
                id="email-notifications"
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, emailNotifications: checked})
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications in the app</p>
              </div>
              <Switch 
                id="push-notifications"
                checked={notificationSettings.pushNotifications}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, pushNotifications: checked})
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="schedule-updates">Schedule Updates</Label>
                <p className="text-sm text-muted-foreground">Notify when timetables are updated</p>
              </div>
              <Switch 
                id="schedule-updates"
                checked={notificationSettings.scheduleUpdates}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, scheduleUpdates: checked})
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="conflict-alerts">Conflict Alerts</Label>
                <p className="text-sm text-muted-foreground">Immediate alerts for scheduling conflicts</p>
              </div>
              <Switch 
                id="conflict-alerts"
                checked={notificationSettings.conflictAlerts}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, conflictAlerts: checked})
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-reports">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Weekly utilization and performance reports</p>
              </div>
              <Switch 
                id="weekly-reports"
                checked={notificationSettings.weeklyReports}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, weeklyReports: checked})
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Security Settings
  const SecuritySettingsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Settings</h2>
          <p className="text-muted-foreground">Manage your account security and authentication preferences</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch 
                id="two-factor"
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => 
                  setSecuritySettings({...securitySettings, twoFactorAuth: checked})
                }
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout</Label>
              <Select value={securitySettings.sessionTimeout}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="240">4 hours</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Automatically log out after period of inactivity</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Password & Recovery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-muted-foreground">Last changed on {securitySettings.passwordLastChanged}</p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Recovery Options</p>
                <p className="text-sm text-muted-foreground">Manage backup recovery methods</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Active Devices</p>
                <p className="text-sm text-muted-foreground">{securitySettings.activeDevices} devices currently signed in</p>
              </div>
              <Button variant="outline">View All Sessions</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Billing Settings
  const BillingSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Billing & Subscription</h2>
          <p className="text-muted-foreground">Manage your subscription and billing information</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">EduScheduler Pro - Enterprise</p>
                <p className="text-sm text-muted-foreground">For large educational institutions</p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">₹15,000/month</p>
                <p className="text-sm text-muted-foreground">Next billing date: Oct 1, 2025</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
            <div className="mt-4">
              <Badge variant="outline" className="text-green-600 border-green-200">
                No Auto-Renewal
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">September 2025</p>
                  <p className="text-sm text-muted-foreground">Enterprise Plan</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹15,000</p>
                  <p className="text-sm text-green-600">Paid</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">August 2025</p>
                  <p className="text-sm text-muted-foreground">Enterprise Plan</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹15,000</p>
                  <p className="text-sm text-green-600">Paid</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline">View All History</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // General Preferences
  const GeneralPreferences = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">General Preferences</h2>
          <p className="text-muted-foreground">Customize language, timezone, and display preferences</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Display & Localization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="bn">Bengali</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="ist">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select defaultValue="dd-mm-yyyy">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeFormat">Time Format</Label>
              <Select defaultValue="24h">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12 Hour</SelectItem>
                  <SelectItem value="24h">24 Hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalProfileSettings />;
      case 'organization':
        return <OrganizationSettings />;
      case 'billing':
        return <BillingSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettingsView />;
      case 'general':
        return <GeneralPreferences />;
      default:
        return <SettingsMain />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          {activeSection !== 'main' && (
            <Button 
              variant="ghost" 
              onClick={() => {
                setActiveSection('main');
                setIsEditing(false);
              }}
              className="mb-4 hover:bg-muted"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Settings
            </Button>
          )}
          {activeSection === 'main' && (
            <div>
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">Manage your account settings, security, and preferences</p>
            </div>
          )}
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default EduSchedulerSettings;