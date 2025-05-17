"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function AboutSection() {
  return (
    <section className=" text-gray-900 dark:text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 items-start">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-6"
        >
          <h2 className="text-3xl font-bold border-b-4 border-primary inline-block pb-1">
            About Me
          </h2>

          <div>
            <p className="text-gray-900 dark:text-gray-300 text-base leading-relaxed">
              Full stack web developer trained through Programming Hero’s
              intensive course, with a strong passion for building user-focused
              and scalable web applications. I’ve contributed to multiple team
              projects using modern JavaScript technologies. My background in
              Philosophy sharpens my analytical thinking, which I bring into
              solving real-world problems through code.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Experience */}
            <Card className="bg-gray-100 dark:bg-[#09090b] border  dark:text-gray-300 text-gray-900">
              <CardContent className="space-y-2 pt-4">
                <h3 className="text-lg font-semibold">💼 Experience</h3>
                <div>
                  <p className="text-sm font-medium">Full Stack Developer</p>
                  <p className="text-sm dark:text-gray-400">
                    Team Project: Event Planner
                  </p>
                  <p className="text-sm dark:text-gray-400">May 2025</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Full Stack Developer</p>
                  <p className="text-sm dark:text-gray-400">
                    Team Project: Giftly
                  </p>
                  <p className="text-sm dark:text-gray-400">September 2024</p>
                </div>
              </CardContent>
            </Card>
            {/* Education */}
            <Card className="bg-gray-100 dark:bg-[#09090b] border  dark:text-gray-300 text-gray-900">
              <CardContent className="space-y-2 pt-4">
                <h3 className="text-lg font-semibold">🎓 Education</h3>
                <p className="text-sm font-medium">
                  BA in Philosophy (Running)
                </p>
                <p className="text-sm dark:text-gray-400">
                  National University, Bangladesh
                </p>
                <p className="text-sm dark:text-gray-400">
                  3rd Year (2022 - Present)
                </p>
                {/* <p className="text-sm text-blue-400">GPA: 3.41</p> */}
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Right Side - Profile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dro1r3fxd/image/upload/v1747240915/user_botwws.png"
              alt="Profile"
              className="w-36 h-36 object-cover rounded-full border-4 border-primary"
            />
            <Badge className="absolute -bottom-2 right-0 bg-primary text-white px-2 py-1 text-xs rounded-full">
              Open to Work
            </Badge>
          </div>
          <h3 className="text-xl font-semibold">Hammad Sadi</h3>
          <p className="text-sm text-gray-900 dark:text-gray-300">
            Full Stack Developer | Passionate Coder
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">Node</Badge>
            <Badge variant="outline">MongoDB</Badge>
            <Badge variant="outline">PostgreSQL</Badge>
            <Badge variant="outline">Tailwind</Badge>
          </div>

          {/* Download Button */}
          <a
            href="https://www.dropbox.com/scl/fi/q4xrx79y71qi3i01yffja/Aathif_Zahir_CV.pdf?rlkey=7v6aicpcshu6h1diyq9cb0p2s&st=wbf2xkt8&dl=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="mt-4 bg-primary text-white ">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
