import "@repo/ui/styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "heimhub. system",
  description: "The next generation of organizing move-outs",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <Providers> */}
        {children}
        <Toaster />
        {/* </Providers> */}
      </body>
    </html>
  );
}
