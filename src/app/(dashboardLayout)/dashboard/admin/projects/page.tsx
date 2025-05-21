import { ContentLayout } from "@/components/modules/admin-panel/content-layout";
import AdminDashboardProjectComponent from "@/components/modules/dashboard-components/admin-dashboard/project/AdminDashboardProjectComponent";
import { getProjects } from "@/services/Project";

export default async function AdminProjectPage() {
  const { data } = await getProjects();
  return (
    <ContentLayout title="PROJECTS">
      <AdminDashboardProjectComponent projects={data} />
    </ContentLayout>
  );
}
