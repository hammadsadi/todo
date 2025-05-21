import { ContentLayout } from "@/components/modules/admin-panel/content-layout";
import AdminMessageDashboardComponent from "@/components/modules/dashboard-components/admin-dashboard/message/AdminMessageDashboardComponent";
import { getAllMessages } from "@/services/Message";
import React from "react";

const AdminMessages = async () => {
  const { data } = await getAllMessages();
  return (
    <ContentLayout title="MESSAGES">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Messages</h1>
      </div>
      <AdminMessageDashboardComponent message={data} />
    </ContentLayout>
  );
};

export default AdminMessages;
