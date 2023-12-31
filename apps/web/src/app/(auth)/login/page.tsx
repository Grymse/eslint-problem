import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "@/components/auth/AuthForm";
import { H3, Text } from "@repo/ui/base/text";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900">
            <Image
              src="/images/fantasy.jpg"
              width={1280}
              height={843}
              alt="Authentication"
              className="block h-full object-cover"
            />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src="/images/brand/name-logo-dark.svg"
              width={200}
              height={200}
              alt="Authentication"
              className="block h-full object-cover"
            />
          </div>
          {/* <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div> */}
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <H3>Login</H3>
              <Text type="small">
                Choose the provider you want to use to login.
              </Text>
            </div>
            <UserAuthForm />

            <Text type="subtle" className="px-8 text-center leading-normal">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
