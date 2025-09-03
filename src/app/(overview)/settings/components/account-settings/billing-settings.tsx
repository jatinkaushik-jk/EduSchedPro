"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";

export default function BillingSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Billing & Subscription</h2>
          <p className="text-muted-foreground">
            Manage your subscription and billing information
          </p>
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
                <p className="text-sm text-muted-foreground">
                  For large educational institutions
                </p>
              </div>
              <Badge
                variant="outline"
                className="text-green-600 border-green-200"
              >
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">₹15,000/month</p>
                <p className="text-sm text-muted-foreground">
                  Next billing date: Oct 1, 2025
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
            <div className="mt-4">
              <Badge
                variant="outline"
                className="text-green-600 border-green-200"
              >
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
                  <p className="text-sm text-muted-foreground">
                    Enterprise Plan
                  </p>
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
                  <p className="text-sm text-muted-foreground">
                    Enterprise Plan
                  </p>
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
}
