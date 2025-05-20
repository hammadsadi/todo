import { ContentLayout } from "@/components/modules/admin-panel/content-layout";
import React from "react";

const AdminExperiencePage = () => {
  return (
    <ContentLayout title="EXPERIENCE">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>
      {/* <AdminDashboardProjectComponent projects={projects} /> */}
    </ContentLayout>
  );
};

export default AdminExperiencePage;
