import { ContentLayout } from "@/components/modules/admin-panel/content-layout";
import CreateProject from "@/components/modules/dashboard-components/admin-dashboard/project/CreateProject";
import React from "react";

const AdminProjectCreate = () => {
  return (
    <ContentLayout title="CREATE PROJECT">
      <CreateProject />
    </ContentLayout>
  );
};

export default AdminProjectCreate;
