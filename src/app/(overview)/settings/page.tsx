"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
} from 'lucide-react';
import PersonalProfileSettings from './components/account-settings/personal-profile-settings';
import OrganizationSettings from './components/account-settings/organization-settings';
import BillingSettings from './components/account-settings/billing-settings';
import GeneralPreferences from './components/preferences-settings/general-preferences-settings';
import NotificationSettings from './components/preferences-settings/notification-settings';
import SecuritySettingsView from './components/security-settings/security-settings';
import SettingsMain from './components/settings-main';

const EduSchedulerSettings = () => {
  const [activeSection, setActiveSection] = useState<string>('main');

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
        return <SettingsMain setActiveSection={setActiveSection} />;
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
              }}
              className="mb-4 hover:bg-muted"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Settings
            </Button>
          )}
          {activeSection === 'main' && (
            <div>
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