import ProjectItem from "@/components/modules/Home/Portfolio/ProjectItem";
import { getProjects } from "@/services/Project";
import { TProject } from "@/types/project.types";
import React from "react";

const ProjectsPage = async () => {
  const { data } = await getProjects();
  return (
    <div className="max-w-7xl mx-auto my-6 lg:my-10">
      <div className="flex justify-center items-center">
        <h2 className="text-3xl font-bold border-b-4 border-primary inline-block pb-1">
          All Projects
        </h2>
      </div>
      <div className="mt-5 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-6 xl:gap-8">
        {data?.map((item: TProject) => (
          <ProjectItem key={item.id} project={item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
