"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit3, Save, X } from "lucide-react";
import { useState } from "react";
import { PersonalProfile } from "../../interfaces";

export default function PersonalProfileSettings() {

    const [isEditing, setIsEditing] = useState(false);
  const [personalProfile, setPersonalProfile] = useState<PersonalProfile>({
    name: "Dr. Jatin Kaushik",
    email: "jatin.kaushik@university.edu",
    phone: "+91 98765 43210",
    role: "Professor & HOD",
    department: "Computer Science",
    employeeId: "EMP001",
    joinDate: "2020-08-15",
  });

    const handleSave = () => {
    setIsEditing(false);
    // In real app, save to API here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // In real app, reset form to original values
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Personal Profile</h2>
          <p className="text-muted-foreground">
            Update your personal information and account details
          </p>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2"
          >
            <Edit3 className="h-4 w-4" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
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
              <AvatarFallback>
                {personalProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
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
                name="name"
                value={personalProfile.name}
                disabled={!isEditing}
                onChange={(e) =>
                  setPersonalProfile({
                    ...personalProfile,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={personalProfile.email}
                disabled={!isEditing}
                onChange={(e) =>
                  setPersonalProfile({
                    ...personalProfile,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={personalProfile.phone}
                disabled={!isEditing}
                onChange={(e) =>
                  setPersonalProfile({
                    ...personalProfile,
                    phone: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={personalProfile.role}
                disabled={!isEditing}
                onChange={(e) =>
                  setPersonalProfile({
                    ...personalProfile,
                    role: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                value={personalProfile.department}
                disabled={!isEditing}
                onChange={(e) =>
                  setPersonalProfile({
                    ...personalProfile,
                    department: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                name="employeeId"
                value={personalProfile.employeeId}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date</Label>
              <Input id="joinDate" name="joinDate" value={personalProfile.joinDate} disabled />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
