import { ContentLayout } from "@/components/modules/admin-panel/content-layout";
import CreateBlog from "@/components/modules/dashboard-components/admin-dashboard/blog/CreateBlog";
import CreateProject from "@/components/modules/dashboard-components/admin-dashboard/project/CreateProject";
import React from "react";

const AdminBlogCreate = () => {
  return (
    <ContentLayout title="CREATE BLOG">
      <CreateBlog />
    </ContentLayout>
  );
};

export default AdminBlogCreate;
