import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Building2,
  CreditCard,
  Bell,
  Settings,
  Shield,
  Lock,
} from "lucide-react";
import ConfigureBtn from "./configureBtn";
export default function SettingsMain({
  setActiveSection,
}: {
  setActiveSection: (section: string) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Account Settings Section */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
        <p className="text-muted-foreground mb-6">
          Manage your personal and organizational preferences
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setActiveSection("personal")}
          >
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Personal Profile</CardTitle>
                  <CardDescription>
                    Update your personal information and account details
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ConfigureBtn />
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setActiveSection("organization")}
          >
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Organization</CardTitle>
                  <CardDescription>
                    Manage institute details and organizational settings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ConfigureBtn />
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setActiveSection("billing")}
          >
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Billing & Subscription
                  </CardTitle>
                  <CardDescription>
                    View your plan, billing history, and payment methods
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <ConfigureBtn />
              <Badge
                variant="outline"
                className="text-green-600 border-green-200"
              >
                No Auto-Renewal
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preferences Section */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Preferences</h2>
        <p className="text-muted-foreground mb-6">
          Customize your EduScheduler Pro experience
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setActiveSection("notifications")}
          >
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Bell className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Notifications</CardTitle>
                  <CardDescription>
                    Configure email and in-app notification preferences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ConfigureBtn />
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setActiveSection("general")}
          >
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">General Preferences</CardTitle>
                  <CardDescription>
                    Language, timezone, and display preferences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ConfigureBtn />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Security Section */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Security & Privacy</h2>
        <p className="text-muted-foreground mb-6">
          Manage your account security and privacy settings
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setActiveSection("security")}
          >
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Security Settings</CardTitle>
                  <CardDescription>
                    Two-factor authentication, password, and session management
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ConfigureBtn />
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
                  <CardDescription>
                    Control your data and privacy preferences
                  </CardDescription>
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
}
