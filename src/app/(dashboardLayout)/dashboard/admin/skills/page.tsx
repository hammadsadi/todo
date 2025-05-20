import { ContentLayout } from "@/components/modules/admin-panel/content-layout";
import React from "react";

const AdminSkillsPage = () => {
  return (
    <ContentLayout title="SKILLS">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>
      {/* <AdminDashboardProjectComponent projects={projects} /> */}
    </ContentLayout>
  );
};

export default AdminSkillsPage;
