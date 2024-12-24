import { Check } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "../molecules/shadcn/aspect-ratio";
import { Badge } from "../molecules/shadcn/badge";

export default function Features() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-primary text-secondary">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <AspectRatio ratio={16 / 9} className="bg-primary relative">
            <Image
              src="/Technology-Lock.webp"
              alt="A secure vault illustration"
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-md object-cover"
            />
          </AspectRatio>

          <div className="space-y-6">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              Security &amp; Productivity
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Security and productivity wrapped into one
            </h2>
            <p className="text-muted-foreground">
              Protect your organization with secure sign-ins, streamline access
              across all applications, and ensure trusted connections from any
              device—all in a single, unified platform.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <Check className="h-6 w-6 text-secondary" />
                <div>
                  <h3 className="text-lg font-semibold">
                    Secure every sign-in
                  </h3>
                  <p className="text-muted-foreground">
                    Store all sign-ins in secure vaults, with the ability to
                    securely share passwords, secrets, and more.
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-6 w-6 text-secondary" />
                <div>
                  <h3 className="text-lg font-semibold">
                    To every application
                  </h3>
                  <p className="text-muted-foreground">
                    Manage access to every application and web account for every
                    member of your account.
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-6 w-6 text-secondary" />
                <div>
                  <h3 className="text-lg font-semibold">From any device</h3>
                  <p className="text-muted-foreground">
                    Sign in to everything from any device, and manage
                    permissions to ensure only healthy devices are allowed
                    access.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
