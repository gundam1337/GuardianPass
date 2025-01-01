import Card, {
  CardContent,
  CardProps,
} from "@/components/AdminConsoleComponents/card";
import MembersCard, {
  MembersProps,
} from "@/components/AdminConsoleComponents/MembersCard";
import { Users, ShieldCheck, User } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/molecules/shadcn/breadcrumb";

const cardData: CardProps[] = [
  {
    label: "Active Teams",
    amount: "3",
    icon: Users,
  },
  {
    label: "Admins",
    amount: "3",
    icon: ShieldCheck,
  },
  {
    label: "Users",
    amount: "12",
    icon: User,
  },
];

const adminData: MembersProps[] = [
  {
    name: "aramn",
    email: "aramn.martin@email.com",
  },
  {
    name: "isalm Lee",
    email: "isalm.nguyen@email.com",
  },
];

const userData: MembersProps[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
  },
  {
    name: "William Kim",
    email: "will@email.com",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
  },
];



export default function AdminConsole() {
  return (
    <div className="mt-6 mb-6 flex items-center space-x-3 px-4">
      <div className="flex flex-col gap-5 w-full">
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-3">
          {cardData.map((data, index) => (
            <Card
              key={index}
              amount={data.amount}
              icon={data.icon}
              label={data.label}
            />
          ))}
        </section>

        <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
          <CardContent>
            {/* add the Breadcrumb to the header of this card  */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">team Acme Inc</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">admins</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            {/* display the curent admins in this team  */}
            {adminData.map((data, index) => (
              <MembersCard key={index} email={data.email} name={data.name} />
            ))}
          </CardContent>

          <CardContent className="flex justify-between gap-4">
            <section>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">team Acme Inc</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">admins</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>users</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </section>
            {userData.map((data, index) => (
              <MembersCard key={index} email={data.email} name={data.name} />
            ))}
          </CardContent>
        </section>
      </div>
    </div>
  );
}
