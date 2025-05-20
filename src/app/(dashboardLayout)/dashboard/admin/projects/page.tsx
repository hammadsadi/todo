import { ContentLayout } from "@/components/modules/admin-panel/content-layout";
import AdminDashboardProjectComponent from "@/components/modules/dashboard-components/admin-dashboard/project/AdminDashboardProjectComponent";
import { TProjects } from "@/types/project.types";
// Type definition

// Array of product objects
const projects: TProjects[] = [
  {
    name: "Smartphone X10",
    image: "https://example.com/images/smartphone-x10.jpg",
    price: 299.99,
    location: "Dhaka, Bangladesh",
    description: "A powerful smartphone with 6GB RAM and 128GB storage.",
  },
  {
    name: "Laptop Pro 15",
    image: "https://example.com/images/laptop-pro-15.jpg",
    price: 999.99,
    location: "Chattogram, Bangladesh",
    description: "High performance laptop for work and gaming.",
  },
  {
    name: "Wireless Headphones",
    image: "https://example.com/images/wireless-headphones.jpg",
    price: 149.5,
    location: "Khulna, Bangladesh",
    description: "Noise-canceling wireless headphones with 30h battery.",
  },
  {
    name: "Gaming Chair",
    image: "https://example.com/images/gaming-chair.jpg",
    price: 220.0,
    location: "Sylhet, Bangladesh",
    description: "Ergonomic gaming chair with adjustable height.",
  },
  {
    name: "Smart Watch Z5",
    image: "https://example.com/images/smartwatch-z5.jpg",
    price: 89.99,
    location: "Rajshahi, Bangladesh",
    description: "Track your fitness and notifications on the go.",
  },
];

export default async function AdminProjectPage() {
  return (
    <ContentLayout title="PROJECTS">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Projects</h1>
      </div>
      <AdminDashboardProjectComponent projects={projects} />
    </ContentLayout>
  );
}
