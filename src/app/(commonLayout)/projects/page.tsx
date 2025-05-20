import ProjectItem from "@/components/modules/Home/Portfolio/ProjectItem";
import React from "react";
const projects = [
  {
    title: "IntervueAI",
    description:
      "Real-time mock interviews with AI, no forms or clicks just natural, personalized conversations.",
    image:
      "https://files.selar.co/product-images/2024/products/Viclabulary/project-management-selar.co-65f60d5694847.jpg",
    live: "#",
    details: "#",
  },
  {
    title: "Blendy",
    description:
      "A social app where you can connect in real-time, log in with one click, share moments, posts instantly.",
    image:
      "https://files.selar.co/product-images/2024/products/Viclabulary/project-management-selar.co-65f60d5694847.jpg",
    live: "#",
    details: "#",
  },
  {
    title: "WATCHit",
    description:
      "A video streaming app made for easy, personal entertainment and everything you love to binge.",
    image:
      "https://files.selar.co/product-images/2024/products/Viclabulary/project-management-selar.co-65f60d5694847.jpg",
    live: "#",
    details: "#",
  },
];
const ProjectsPage = () => {
  return (
    <div className="max-w-7xl mx-auto my-6 lg:my-10">
      <div className="flex justify-center items-center">
        <h2 className="text-3xl font-bold border-b-4 border-primary inline-block pb-1">
          All Projects
        </h2>
      </div>
      <div className="mt-5 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-6 xl:gap-8">
        {projects.map((item, idx) => (
          <ProjectItem key={idx} project={item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
