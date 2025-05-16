"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ModeToggle } from "../../Shared/ToggleTheme/ToggleTheme";
import { Menu, X } from "lucide-react";

export default function Hero() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowNavbar(scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen dark:text-white text-gray-900">
      {/* Animated Responsive Navbar */}
      <AnimatePresence>
        {showNavbar && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-2 left-0 w-full md:w-1/2 md:left-1/4 bg-gray-100 dark:bg-[#09090b] backdrop-blur-lg shadow-xl z-50 flex justify-center rounded-4xl border"
          >
            <div className="w-full px-4 py-4 flex justify-between items-center max-w-[600px]">
              <h1 className="text-xl font-bold">Hammad</h1>
              <div className="flex gap-6 items-center">
                <Link href="#about">Home</Link>
                <Link href="#projects">Projects</Link>
                <Link href="#contact">Blogs</Link>
                <ModeToggle />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center px-6 md:flex-row md:items-center md:justify-between max-w-7xl mx-auto gap-10 pt-24">
        {/* Left Content */}
        <div className="text-center md:text-left max-w-xl">
          <p className="text-primary text-lg">Hello! I'm</p>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            <span className="">Hammad </span>
            <span className="text-primary underline decoration-primary/50">
              Sadi
            </span>
          </h1>
          <p className="mt-4 text-xl dark:text-gray-300">
            Full-Stack Developer | Passionate Tech Learner
          </p>
          <p className="mt-2 dark:text-gray-400">
            Building elegant solutions to complex problems with modern
            technologies.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <Button className="bg-primary text-white rounded-md">
              Contact Me
            </Button>
            <Button variant="outline" className="rounded-md">
              View Projects
            </Button>
          </div>
        </div>

        {/* Right Content - Code-like Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-[#111827] rounded-xl border border-white/10 w-full md:w-[500px] shadow-xl"
        >
          <div className="flex items-center gap-2 p-4">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>

          <pre className="text-sm px-6 pb-6 text-white font-mono">
            <span className="text-gray-500">// Software Engineer</span>
            {"\n"}
            <span className="text-pink-400">const</span>{" "}
            <span className="text-blue-400">developer</span> = {"{"}
            {"\n"} <span className="text-purple-400">name</span>:{" "}
            <span className="text-green-400">'Hammad Sadiq'</span>,{"\n"}{" "}
            <span className="text-purple-400">skills</span>:{" "}
            <span className="text-yellow-400">
              ['React', 'Node.js', 'MongoDB']
            </span>
            ,{"\n"} <span className="text-purple-400">focuses</span>:{" "}
            <span className="text-yellow-400">['Full-Stack', 'UI/UX']</span>,
            {"\n"} <span className="text-purple-400">learning</span>:{" "}
            <span className="text-green-400">'Always'</span>
            {"\n"}
            {"}"};
          </pre>
        </motion.div>
      </section>
    </div>
  );
}
