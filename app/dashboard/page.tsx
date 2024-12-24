

import React from 'react';
import { UserButton } from "@clerk/nextjs";
import { Search } from 'lucide-react';
import { Button } from '@/components/molecules/shadcn/button';
import PasswordDialog from '@/components/PasswordDialog';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/molecules/shadcn/card';

// Sidebar Navigation Component
const SidebarNav = () => {
  return (
    <div className="w-64 h-screen bg-background border-r p-4 flex flex-col">
      {/* User Profile Section */}
      <div className="flex items-center space-x-2 mb-8">
        <span className="text-sm text-muted-foreground"><UserButton /></span>
      </div>

      {/* Main Navigation Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Passwords</h2>
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <span className="mr-2">🔒</span>
              Passwords
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <span className="mr-2">⚡</span>
              Password Generator
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <span className="mr-2">📊</span>
              Password Analyzer
            </Button>
          </nav>
        </div>

        {/* Categories Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Categories</h2>
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <span className="mr-2">📋</span>
              All
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <span className="mr-2">🌐</span>
              Web Logins
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <span className="mr-2">💳</span>
              Credit Cards
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <span className="mr-2">📄</span>
              Identity Documents
            </Button>
            {/* Additional category buttons */}
          </nav>
        </div>
      </div>
    </div>
  );
};

// Main Content Area Component
const MainContent = () => {
  return (
    <div className="flex-1 p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">All Passwords</h1>
            <p className="text-sm text-muted-foreground">
              Safety manage and access your passwords.
            </p>
          </div>
          {/* <Button>
            <span className="mr-2">+</span>
            Add new password
          </Button> */}
          <PasswordDialog />
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
          />
        </div>

        {/* No Passwords Message */}
        <Card>
          <CardContent className="py-10">
            <div className="text-center space-y-2">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-lg font-semibold text-red-500">
                No Password Found
              </h3>
              <p className="text-sm text-muted-foreground">
                Looks like you haven't added any passwords yet.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main App Component
const PasswordDashboard = () => {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      <MainContent />
    </div>
  );
};

export default PasswordDashboard;