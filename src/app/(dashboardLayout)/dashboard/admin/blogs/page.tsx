import { ContentLayout } from "@/components/modules/admin-panel/content-layout";
import AdminDashboardBlogComponent from "@/components/modules/dashboard-components/admin-dashboard/blog/AdminDashboardBlogComponent";
import { getAllBlogs } from "@/services/BlogServices";
import React from "react";

const AdminBlogPage = async () => {
  const { data } = await getAllBlogs();
  return (
    <ContentLayout title="BLOGS">
      <AdminDashboardBlogComponent blog={data} />
    </ContentLayout>
  );
};

export default AdminBlogPage;
