import React from "react";
import ModernSidebar from "./components/sidebar";
import { Toaster } from "sonner";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex">
      <ModernSidebar />
      <div className="flex-1 bg-gray-100">
        {children}
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
