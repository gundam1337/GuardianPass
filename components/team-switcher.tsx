"use client";

//fix the theme dark mode in this component

import { useOrganization } from "@clerk/nextjs";

import * as React from "react";
import { OrganizationSwitcher } from "@clerk/nextjs";

export function TeamSwitcher() {
  const { organization } = useOrganization();
  console.log("organization", organization?.name);

  return <OrganizationSwitcher />;
}
