"use client";
import Navbar from "@/components/navbar";
import AboutSection from "@/components/section/about-section";
import ContactSection from "@/components/section/contact-section";
import ExperienceSection from "@/components/section/experience-section";
import HomeSection from "@/components/section/home-section";
import ProjectSection from "@/components/section/project-section";
import SkillsSection from "@/components/section/skills-section";


export default function Portfolio() {
  return (
    <div>
      {/* navbar */}
      <Navbar />
      <div className="space-y-20 my-10 max-[691px]:mx-10">
        {/* hero section */}
        <HomeSection/>

        {/* about section*/}
        <AboutSection/>

        {/* Skills */}
        <SkillsSection/>

        {/* Projects */}
        <ProjectSection/>

        {/* Work Experience */}
        <ExperienceSection/>

        {/* contact */}
        <ContactSection/>
      </div>

      {/* footer */}
      <footer className="dark:bg-zinc-800 bg-zinc-100 h-[100px] flex justify-center items-center">
        <p className="text-center">
          © 2025 Siroojuddin Apendi. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
