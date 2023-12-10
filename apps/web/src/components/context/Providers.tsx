import React, { PropsWithChildren } from "react";
/* import { Toaster } from "@repo/ui/base/toaster"; */

const Providers = ({ children }: PropsWithChildren) => {
  // ADD TOASTER PROVIDER
  return (
    <>
      {children}
      {/* <Toaster /> */}
    </>
  );
};

export default Providers;
