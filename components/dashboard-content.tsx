// import SearchPassword from "@/components/search-password";
// import AddNewPasswordDialog from "@/components/add-new-password-dialog";
// import { Alert, AlertDescription, AlertTitle } from "@/components/molecules/shadcn/alert";



export function DashboardContent() {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    );
  }

//   <div className="mb-6 flex items-center space-x-3">
//   <SearchPassword total={total} />
//   <AddNewPasswordDialog categories={categories} />
// </div>

// <div className="space-y-2.5">
//   {!passwordsCollection.length ? (
//     <Alert variant="destructive">
//       <Terminal className="h-4 w-4" />
//       <AlertTitle>No Password Found</AlertTitle>
//       <AlertDescription>
//         Looks like you haven&apos;t added any passwords yet.
//       </AlertDescription>
//     </Alert>
//   ) : (
//     passwordsCollection.map((collection, index) => (
//       <PasswordCollectionCard
//         key={index}
//         password={collection}
//         categories={categories}
//       />
//     ))
//   )}
// </div>