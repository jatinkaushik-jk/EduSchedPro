"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import { NotificationSettingsType } from "../../interfaces";

export default function NotificationSettings() {
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettingsType>({
      emailNotifications: true,
      pushNotifications: true,
      scheduleUpdates: true,
      conflictAlerts: true,
      weeklyReports: false,
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notification Settings</h2>
          <p className="text-muted-foreground">
            Configure email and in-app notification preferences
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose which notifications you want to receive and how you want to
            receive them.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    emailNotifications: checked,
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications in the app
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={notificationSettings.pushNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    pushNotifications: checked,
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="schedule-updates">Schedule Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Notify when timetables are updated
                </p>
              </div>
              <Switch
                id="schedule-updates"
                checked={notificationSettings.scheduleUpdates}
                onCheckedChange={(checked) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    scheduleUpdates: checked,
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="conflict-alerts">Conflict Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Immediate alerts for scheduling conflicts
                </p>
              </div>
              <Switch
                id="conflict-alerts"
                checked={notificationSettings.conflictAlerts}
                onCheckedChange={(checked) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    conflictAlerts: checked,
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-reports">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Weekly utilization and performance reports
                </p>
              </div>
              <Switch
                id="weekly-reports"
                checked={notificationSettings.weeklyReports}
                onCheckedChange={(checked) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    weeklyReports: checked,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
