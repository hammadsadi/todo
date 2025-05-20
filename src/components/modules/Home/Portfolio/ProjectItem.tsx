import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProjectItem = ({ project }) => {
  return (
    <div className="bg-gray-100 dark:bg-[#09090b] border  dark:text-gray-300 text-gray-900 rounded-xl p-4">
      <Image
        src={project.image}
        alt={project.title}
        width={500}
        height={300}
        className="rounded-md mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-400 text-sm mb-4">{project.description}</p>
      <div className="flex justify-between items-center text-sm text-primary">
        <Link href={project.live} className="hover:underline">
          Live Demo ↗
        </Link>
        <Link
          href={`/projects/addsdd`}
          className="text-white bg-primary px-3 py-1 rounded-md "
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectItem;
