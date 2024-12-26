import React from "react";
import {PasswordsContent} from "@/components/PasswordsContent";
import { useDashboard } from "@/contexts/DashboardContext";
import PasswordGenerator from "@/components/PasswordGenerator";


//todo add the trash component


const PasswordAnalyzer = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Password Analyzer</h2>
    {/* Add your password analyzer component here */}
  </div>
);

const CategoryContent = ({ category }: { category: string }) => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">{category}</h2>
    {/* Add your category-specific content here */}
  </div>
);

export function DashboardContent() {
  const { activeContent } = useDashboard();

  const renderContent = () => {
    switch (activeContent) {
      case "passwords":
        return <PasswordsContent />;
      case "passwordGenerator":
        return <PasswordGenerator />;
      case "passwordAnalyzer":
        return <PasswordAnalyzer />;
      case "WebLogins":
      case "CreditCards":
      case "Identity Documents":
      case "Notes":
      case "SocialMediaAccounts":
      case "EmailAccounts":
      case "WifiPasswords":
      case "BankAccounts":
        return <CategoryContent category={activeContent} />;
      default:
        return <PasswordsContent />;
    }
  };

  return <main className="flex-1 overflow-y-auto">{renderContent()}</main>;
}
