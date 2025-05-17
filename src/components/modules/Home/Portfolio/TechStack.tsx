// app/components/TechStack.tsx

import { Card, CardContent } from "@/components/ui/card";
import {
  FileCode,
  LayoutTemplate,
  Code,
  Atom,
  Server,
  Terminal,
  Database,
  LockKeyhole,
  Boxes,
  Cloud,
  BadgeCheck,
  Settings,
} from "lucide-react";

const techs = [
  { name: "HTML", icon: FileCode, color: "#e44d26" },
  { name: "CSS", icon: LayoutTemplate, color: "#264de4" },
  { name: "JavaScript", icon: Code, color: "#f0db4f" },
  { name: "Tailwind CSS", icon: Atom, color: "#38bdf8" },
  { name: "Express JS", icon: Server, color: "#ffffff" },
  { name: "Node JS", icon: Terminal, color: "#3c873a" },
  { name: "React + Native", icon: Atom, color: "#61dbfb" },
  { name: "MongoDB", icon: Database, color: "#4db33d" },
  { name: "JWT", icon: LockKeyhole, color: "#ec4899" },
  { name: "PostgreSQL", icon: Database, color: "#336791" },
  { name: "TypeScript", icon: BadgeCheck, color: "#007acc" },
  { name: "Docker", icon: Boxes, color: "#2496ed" },
  { name: "Next.js", icon: Settings, color: "#ffffff" },
];

export default function TechStack() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-6 p-2  rounded-xl">
      {techs.map((tech, index) => (
        <Card
          key={index}
          className="bg-gray-100 dark:bg-[#09090b] border  dark:text-gray-300 text-gray-900 shadow-md hover:shadow-xl hover:scale-105 transition-transform"
        >
          <CardContent className="flex flex-col items-center justify-center p-2 space-y-2">
            <tech.icon className="w-8 h-8" color={tech.color} />
            <p className="text-sm font-medium">{tech.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
