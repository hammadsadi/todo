import { ContentLayout } from "@/components/modules/admin-panel/content-layout";
import AdminDashboardExperienceComponent from "@/components/modules/dashboard-components/admin-dashboard/experience/AdminDashboardExperienceComponent";
import { getAllExperience } from "@/services/Experience";
import { getAllMessages } from "@/services/Message";
import React from "react";

const AdminExperiencePage = async () => {
  const { data } = await getAllExperience();
  return (
    <ContentLayout title="EXPERIENCE">
      <AdminDashboardExperienceComponent experience={data} />
    </ContentLayout>
  );
};

export default AdminExperiencePage;
