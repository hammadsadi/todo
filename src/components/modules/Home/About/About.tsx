"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="bg-[#0d051a] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 items-start">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-6"
        >
          <h2 className="text-3xl font-bold border-b-4 border-blue-600 inline-block pb-1">
            About Me
          </h2>

          <div>
            <p className="text-gray-300 text-base leading-relaxed">
              Software engineering student with a passion for creating
              innovative solutions. Specializing in full-stack development, I
              combine technical expertise with creative problem-solving to build
              user-centric applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Education */}
            <Card className="bg-[#12101e] border border-[#2c2a4a] text-white">
              <CardContent className="space-y-2 pt-4">
                <h3 className="text-lg font-semibold">🎓 Education</h3>
                <p className="text-sm font-medium">
                  BSc in Software Engineering
                </p>
                <p className="text-sm text-gray-400">
                  SLIIT (Sri Lanka Institute of Information Technology)
                </p>
                <p className="text-sm text-gray-400">2022 - Present</p>
                <p className="text-sm text-blue-400">Dean’s List (2023)</p>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="bg-[#12101e] border border-[#2c2a4a] text-white">
              <CardContent className="space-y-2 pt-4">
                <h3 className="text-lg font-semibold">💼 Experience</h3>
                <div>
                  <p className="text-sm font-medium">
                    Full Stack Developer Intern
                  </p>
                  <p className="text-sm text-gray-400">Twist Digital</p>
                  <p className="text-sm text-gray-400">Since March 2025</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Graphic Designer</p>
                  <p className="text-sm text-gray-400">SLIIT Media Unit</p>
                  <p className="text-sm text-gray-400">Freelance</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Right Side - Profile */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
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
              3.41 GPA
            </Badge>
          </div>
          <h3 className="text-xl font-semibold">Aathif Zahir</h3>
          <p className="text-sm text-gray-300">Software Engineering Student</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">Node</Badge>
            <Badge variant="outline">UI/UX</Badge>
            <Badge variant="outline">Full Stack</Badge>
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
