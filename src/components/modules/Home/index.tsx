import React from "react";
import Hero from "./Hero/Hero";
import AboutSection from "./About/About";
import Portfolio from "./Portfolio/Portfolio";
import BlogSection from "./BlogSection/BlogSection";
import { getProjects } from "@/services/Project";
import { getAllBlogs } from "@/services/BlogServices";
import ContactSection from "../Contact/ContactSection";
import Footer from "../Footer/Footer";
import { getAllExperience } from "@/services/Experience";

const Home = async () => {
  const { data } = await getProjects();
  const { data: blog } = await getAllBlogs();
  const { data: experience } = await getAllExperience();
  return (
    <div>
      <Hero />
      <AboutSection experience={experience} />
      <Portfolio projects={data} />
      <BlogSection blog={blog} />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
