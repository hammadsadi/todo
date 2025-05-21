"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Code, BadgeCheck, Boxes } from "lucide-react";
import { motion } from "framer-motion";

import TechStack from "./TechStack";
import ProjectItem from "./ProjectItem";
import { TProject } from "@/types/project.types";

const tabMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.4 },
};

export default function Portfolio({ projects }: { projects: TProject[] }) {
  return (
    <section id="portfolio" className="py-20  text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold  mb-2">Portfolio Showcase</h2>
        <p className="text-gray-400 mb-10">
          Explore my journey through projects, certifications, and technical
          expertise. Each section represents a milestone in my continuous
          learning path.
        </p>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="flex justify-center flex-wrap gap-2 bg-gray-100 dark:bg-[#09090b] border  rounded-2xl w-1/2 mx-auto">
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2 rounded-xl flex items-center gap-2"
            >
              <Code className="w-5 h-5" /> Projects
            </TabsTrigger>

            <TabsTrigger
              value="techstack"
              className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2 rounded-xl flex items-center gap-2"
            >
              <Boxes className="w-5 h-5" /> Tech Stack
            </TabsTrigger>
            <TabsTrigger
              value="certificates"
              className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2 rounded-xl flex items-center gap-2"
            >
              <BadgeCheck className="w-5 h-5" /> Certificates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" asChild>
            <motion.div
              {...tabMotion}
              className="grid md:grid-cols-3 gap-6 mt-10"
            >
              {projects?.map((project, idx) => (
                // <div
                //   key={idx}
                //   className="bg-gray-100 dark:bg-[#09090b] border  dark:text-gray-300 text-gray-900 rounded-xl p-4"
                // >
                //   <Image
                //     src={project.image}
                //     alt={project.title}
                //     width={500}
                //     height={300}
                //     className="rounded-md mb-4 object-cover"
                //   />
                //   <h3 className="text-xl font-semibold mb-2">
                //     {project.title}
                //   </h3>
                //   <p className="text-gray-400 text-sm mb-4">
                //     {project.description}
                //   </p>
                //   <div className="flex justify-between items-center text-sm text-primary">
                //     <Link href={project.live} className="hover:underline">
                //       Live Demo ↗
                //     </Link>
                //     <Link
                //       href={project.details}
                //       className="text-white bg-primary px-3 py-1 rounded-md "
                //     >
                //       Details
                //     </Link>
                //   </div>
                // </div>
                <ProjectItem project={project} key={idx} />
              ))}
            </motion.div>
          </TabsContent>
          <TabsContent value="techstack" asChild>
            <motion.div {...tabMotion} className="mt-10">
              <TechStack />
            </motion.div>
          </TabsContent>
          <TabsContent value="certificates" asChild>
            <motion.div {...tabMotion} className="mt-10">
              <p className="text-lg text-gray-300">
                🎓 Certificate showcase will go here.
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
