import SearchPassword from "@/components/search-password";
import PasswordDialog from "@/components/PasswordDialog";
//import { Alert, AlertDescription, AlertTitle } from "@/components/molecules/shadcn/alert";

export function DashboardContent() {
  return (
    <div className="mb-6 flex items-center space-x-3 px-4">
      <SearchPassword />
      <PasswordDialog />
    </div>
  );
}
