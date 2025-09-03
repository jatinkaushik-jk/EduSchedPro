export interface PersonalProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  employeeId: string;
  joinDate: string;
  avatar?: string;
}

export interface OrganizationInfo {
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

export interface NotificationSettingsType {
  emailNotifications: boolean;
  pushNotifications: boolean;
  scheduleUpdates: boolean;
  conflictAlerts: boolean;
  weeklyReports: boolean;
}

export interface SecuritySettingsType {
  twoFactorAuth: boolean;
  sessionTimeout: string;
  passwordLastChanged: string;
  activeDevices: number;
}

export interface SettingsProps{
    isEditing: boolean;
    setIsEditing: (editing: boolean) => void;
    handleSave: () => void;
    handleCancel: () => void;
}
