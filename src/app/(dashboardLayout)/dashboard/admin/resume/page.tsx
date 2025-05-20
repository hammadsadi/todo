import { ContentLayout } from "@/components/modules/admin-panel/content-layout";
import React from "react";

const AdminResumePage = () => {
  return (
    <ContentLayout title="RESUME">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>
      {/* <AdminDashboardProjectComponent projects={projects} /> */}
    </ContentLayout>
  );
};

export default AdminResumePage;
