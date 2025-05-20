import { ContentLayout } from "@/components/modules/admin-panel/content-layout";
import React from "react";

const UserDashboardMyBlogsPage = () => {
  return (
    <ContentLayout title="MY BLOGS">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Coming Son</h1>
      </div>
      {/* <AdminDashboardProjectComponent projects={projects} /> */}
    </ContentLayout>
  );
};

export default UserDashboardMyBlogsPage;
