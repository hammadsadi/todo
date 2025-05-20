import { ContentLayout } from "@/components/modules/admin-panel/content-layout";
import React from "react";

const AdminEducationPage = () => {
  return (
    <ContentLayout title="EDUCATION">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>
      {/* <AdminDashboardProjectComponent projects={projects} /> */}
    </ContentLayout>
  );
};

export default AdminEducationPage;
