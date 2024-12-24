"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/molecules/shadcn/aspect-ratio";
import { SignUpButton, SignOutButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';

export default function Hero() {
  const { isSignedIn } = useAuth();

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Security and productivity wrapped into one
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              GuardianPass is so much more than a password manager.
            </p>
            <div className="flex items-center justify-center h-full space-x-4">
              {!isSignedIn ? (
                <SignUpButton mode="modal">
                  <button className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
                    Get started
                  </button>
                </SignUpButton>
              ) : (
                <Link 
                  href="/dashboard" 
                  className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 rounded-md inline-flex items-center"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden lg:block">
            <AspectRatio
              ratio={16 / 9}
              className="w-[70%] mx-auto flex items-center justify-center"
            >
              <Image
                src="/Technology-Lock.webp"
                alt="Technology Lock Image"
                width={700}
                height={400}
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
}