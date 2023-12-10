import Image from "next/image";
import React from "react";
import { Button } from "@repo/ui/base/button";
import Link from "next/link";

export default function Verify() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-8 items-center w-72">
        <Image
          src="/images/brand/name-logo.svg"
          width={180}
          height={40}
          alt="heimhub logo"
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-zinc-950 font-['Inter'] text-lg font-semibold leading-loose">
            We have sent you an email
          </h2>
          <p className="text-zinc-500 font-['Inter'] leading-normal">
            Check out the email we sent you and click on the login button to
            proceed the process.
          </p>
        </div>
        <Link href="/login" className="w-full">
          <Button variant="outline" className="w-full" type="button">
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
}
