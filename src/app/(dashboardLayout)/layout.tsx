import AdminPanelLayout from "@/components/modules/admin-panel/admin-panel-layout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
};

export default DashboardLayout;
