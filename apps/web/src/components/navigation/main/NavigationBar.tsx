import React from "react";
import { Options } from "./Options";
import { User } from "./User";
import { auth } from "@/lib/auth/auth";
import Image from "next/image";

export default async function NavigationBar() {
  const session = await auth();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="h-8">
          <Image
            alt="heimhub. branding"
            height={24}
            width={150}
            src="/images/brand/name-logo.svg"
          ></Image>
        </div>
        <Options className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <User session={session} />
        </div>
      </div>
    </div>
  );
}
