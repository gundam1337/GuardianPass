import React from "react";
import { PasswordsContent } from "@/components/PasswordsContent";
import { useDashboard } from "@/contexts/DashboardContext";
import PasswordGenerator from "@/components/PasswordGenerator";
import PasswordAnalyzer from "@/components/PasswordAnalyzer";
import AdminConsole from "@/components/AdminConsole";

const CategoryContent = ({ category }: { category: string }) => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">{category}</h2>
    {/* Add your category-specific content here */}
  </div>
);
const Trash = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Trash</h2>
    trash
  </div>
);

export function DashboardContent() {
  const { activeContent } = useDashboard();
  console.log("DashboardContent - activeContent:", activeContent);

  const renderContent = () => {
    switch (activeContent) {
      case "adminConsole":
        return <AdminConsole />;
      case "passwords":
        return <PasswordsContent />;
      case "passwordGenerator":
        return <PasswordGenerator />;
      case "passwordAnalyzer":
        return <PasswordAnalyzer />;
      case "trash":
        return <Trash />;
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
