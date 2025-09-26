"use client";
import { useGetProfileMe } from "@/api/profile";
import Navbar from "@/components/navbar";
import AboutSection from "@/components/section/about-section";
import ContactSection from "@/components/section/contact-section";
import ExperienceSection from "@/components/section/experience-section";
import HomeSection from "@/components/section/home-section";
import ProjectSection from "@/components/section/project-section";
import SkillsSection from "@/components/section/skills-section";


export default function Portfolio() {
  const {data:profile, isLoading, isError, isSuccess} = useGetProfileMe()
  const data = profile?.data[0]

  return (
    <div>
      {/* navbar */}
      <Navbar 
        data={data!}
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      <div className="space-y-20 my-10 max-[691px]:mx-10">
        {/* hero section */}
        <HomeSection
          data={data!}
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
        />

        {/* about section*/}
        <AboutSection
          about={data?.about!}
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
        />

        {/* Skills */}
        <SkillsSection/>

        {/* Projects */}
        <ProjectSection/>

        {/* Work Experience */}
        <ExperienceSection/>

        {/* contact */}
        <ContactSection
          data={data!}
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
        />
      </div>

      {/* footer */}
      <footer className="dark:bg-zinc-800 bg-zinc-100 h-[100px] flex justify-center items-center">
        <p className="text-center max-sm:text-[11px]">
          © 2025 Siroojuddin Apendi. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
