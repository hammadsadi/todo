import React from "react";
import Hero from "./Hero/Hero";
import AboutSection from "./About/About";
import Portfolio from "./Portfolio/Portfolio";
import BlogSection from "./BlogSection/BlogSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <Portfolio />
      <BlogSection />
    </div>
  );
};

export default Home;
