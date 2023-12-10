import NewUserForm from "@/components/auth/NewUserForm";
import { auth } from "@/lib/auth/auth";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/base/card";
import { SessionProvider } from "next-auth/react";

export default async function Page() {
  const session = await auth();

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Card className="max-w-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome onboard!</CardTitle>
          <CardDescription>
            Please enter the information below to create your account.
          </CardDescription>
        </CardHeader>
        <SessionProvider session={session}>
          <NewUserForm />
        </SessionProvider>
      </Card>
    </main>
  );
}
