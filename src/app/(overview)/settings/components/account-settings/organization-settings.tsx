"use client";
import { OrganizationInfo } from "../../interfaces";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Edit3,
  Save,
  X,
  Globe,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function OrganizationSettings() {
  const [isEditing, setIsEditing] = useState(false);

  const [organizationInfo, setOrganizationInfo] = useState<OrganizationInfo>({
    instituteName: "Jatin Kaushik's Org",
    instituteType: "",
    affiliation: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
    email: "",
    description: "",
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
          <h2 className="text-2xl font-bold">Organization Settings</h2>
          <p className="text-muted-foreground">
            Manage your institute details and organizational information
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
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Institute Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="instituteName"
                className="flex items-center gap-2"
              >
                <Building2 className="h-4 w-4" />
                Institute Name
              </Label>
              <Input
                id="instituteName"
                name="instituteName"
                value={organizationInfo.instituteName}
                disabled={!isEditing}
                onChange={(e) =>
                  setOrganizationInfo({
                    ...organizationInfo,
                    instituteName: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Label>
              <Input
                id="website"
                name="website"
                value={organizationInfo.website || "Not provided"}
                disabled={!isEditing}
                placeholder="https://your-institute.edu"
                onChange={(e) =>
                  setOrganizationInfo({
                    ...organizationInfo,
                    website: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instituteType">Institute Type</Label>
              <Input
                id="instituteType"
                name="instituteType"
                value={organizationInfo.instituteType || "Not provided"}
                disabled={!isEditing}
                onChange={(e) =>
                  setOrganizationInfo({
                    ...organizationInfo,
                    instituteType: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="affiliation">Affiliation</Label>
              <Input
                id="affiliation"
                name="affiliation"
                value={organizationInfo.affiliation || "Not provided"}
                disabled={!isEditing}
                onChange={(e) =>
                  setOrganizationInfo({
                    ...organizationInfo,
                    affiliation: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={organizationInfo.address || "Not provided"}
                disabled={!isEditing}
                onChange={(e) =>
                  setOrganizationInfo({
                    ...organizationInfo,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={organizationInfo.city || "Not provided"}
                disabled={!isEditing}
                onChange={(e) =>
                  setOrganizationInfo({
                    ...organizationInfo,
                    city: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={organizationInfo.state || "Not provided"}
                disabled={!isEditing}
                onChange={(e) =>
                  setOrganizationInfo({
                    ...organizationInfo,
                    state: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={organizationInfo.country || "Not provided"}
                disabled={!isEditing}
                onChange={(e) =>
                  setOrganizationInfo({
                    ...organizationInfo,
                    country: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={organizationInfo.postalCode || "Not provided"}
                disabled={!isEditing}
                onChange={(e) =>
                  setOrganizationInfo({
                    ...organizationInfo,
                    postalCode: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="institutePhone"
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Institute Phone
              </Label>
              <Input
                id="institutePhone"
                name="institutePhone"
                value={organizationInfo.phone || "Not provided"}
                disabled={!isEditing}
                onChange={(e) =>
                  setOrganizationInfo({
                    ...organizationInfo,
                    phone: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="instituteEmail"
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Institute Email
              </Label>
              <Input
                id="instituteEmail"
                name="instituteEmail"
                value={organizationInfo.email || "Not provided"}
                disabled={!isEditing}
                onChange={(e) =>
                  setOrganizationInfo({
                    ...organizationInfo,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={organizationInfo.description || "Not provided"}
              disabled={!isEditing}
              placeholder="Brief description of your institute..."
              onChange={(e) =>
                setOrganizationInfo({
                  ...organizationInfo,
                  description: e.target.value,
                })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
