import SearchPassword from "@/components/search-password";
import PasswordDialog from "@/components/PasswordDialog";
//import { Alert, AlertDescription, AlertTitle } from "@/components/molecules/shadcn/alert";

export function DashboardContent() {
  return (
    <div className="mb-6 flex items-center space-x-3 px-4">
      <SearchPassword />
      <PasswordDialog />
    </div>

    //   <div className="space-y-2.5">
    //     {!passwordsCollection.length ? (
    //       <Alert variant="destructive">
    //         <Terminal className="h-4 w-4" />
    //         <AlertTitle>No Password Found</AlertTitle>
    //         <AlertDescription>
    //           Looks like you haven&apos;t added any passwords yet.
    //         </AlertDescription>
    //       </Alert>
    //     ) : (
    //       passwordsCollection.map((collection, index) => (
    //         <PasswordCollectionCard
    //           key={index}
    //           password={collection}
    //           categories={categories}
    //         />
    //       ))
    //     )}
    //   </div>
  );
}
