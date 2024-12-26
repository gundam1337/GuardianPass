import SearchPassword from "@/components/search-password";
import PasswordDialog from "@/components/PasswordDialog";
import { PassDataTable } from "@/components/PassDataTable";

export function PasswordsContent() {
  return (
    <>
    {/* add some space to the top */}
      <div className="mb-6 flex items-center space-x-3 px-4">
        <SearchPassword />
        <PasswordDialog />
      </div>
      <div className="space-x-3 px-4">
        <PassDataTable />
      </div>
    </>
  );
}
