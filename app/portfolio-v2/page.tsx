"use client";

import { useGetProfileMe } from "@/api/profile";
import { useGetAllCategories } from "@/api/skills";
import { useGetAllExperiences } from "@/api/experiences";
import { useGetAllProjects } from "@/api/projects";
import ThemeToggleButton from "@/components/themeToggleBtn";
import FormContact from "@/components/form/form-contact";
import { formatDateName } from "@/lib/format-date";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    Mail,
    MapPin,
    Phone,
    Github,
    Linkedin,
    Briefcase,
    Code,
    Sparkles,
    Cpu,
    Layers,
    Send,
    Heart,
    Globe,
    Terminal
} from "lucide-react";

export default function PortfolioV2() {
    const { data: profileData, isLoading: isProfileLoading } = useGetProfileMe();
    const { data: skillsData, isLoading: isSkillsLoading } = useGetAllCategories();
    const { data: experiencesData, isLoading: isExpLoading } = useGetAllExperiences(true);
    const { data: projectsData, isLoading: isProjectsLoading } = useGetAllProjects();

    const profile = profileData?.data?.[0];
    const skills = skillsData?.data || [];
    const experiences = experiencesData?.data || [];
    const projects = projectsData?.data || [];

    const [activeSection, setActiveSection] = useState("about");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Smooth scrolling intersection observer to update active nav state
        const sections = ["about", "skills", "experience", "projects", "contact"];
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const getImageUrl = (path: string | undefined) => {
        if (!path) return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"; // elegant fallback
        if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
            return path;
        }
        const cleanPath = path.startsWith("/") ? path.slice(1) : path;
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        return `${baseUrl}/${cleanPath}`;
    };

    const renderDescription = (desc: string | undefined) => {
        if (!desc) return null;
        try {
            const parsed = JSON.parse(desc);
            return <div className="description-content text-sm text-stone-600 dark:text-zinc-300 leading-relaxed space-y-1.5" dangerouslySetInnerHTML={{ __html: parsed }} />;
        } catch (e) {
            return <div className="description-content text-sm text-stone-600 dark:text-zinc-300 leading-relaxed space-y-1.5" dangerouslySetInnerHTML={{ __html: desc }} />;
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FCFAF2] via-[#F4F6F2] to-[#EEF4F8] dark:from-[#111215] dark:via-[#14161B] dark:to-[#191C24] text-stone-800 dark:text-zinc-100 selection:bg-purple-100 dark:selection:bg-purple-950 transition-colors duration-300 font-sans">

            {/* Visual background organic shapes - Soft glow, pleasant to the eye */}
            <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-200/30 dark:bg-purple-950/10 blur-[120px] animate-pulse duration-[8000ms]" />
                <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-emerald-100/30 dark:bg-emerald-950/10 blur-[100px] animate-pulse duration-[6000ms]" />
                <div className="absolute top-[50%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-amber-100/20 dark:bg-amber-950/5 blur-[140px]" />
            </div>

            {/* Modern Soft Floating Glass Header */}
            <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4">
                <nav className="flex items-center justify-between px-6 py-3.5 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border border-white/80 dark:border-zinc-800/40 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300">
                    <Link href="#about" className="flex items-center gap-2 group">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform duration-300">
                            {profile?.fullName ? profile.fullName.charAt(0) : "S"}
                        </span>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm tracking-tight text-stone-900 dark:text-white">
                                {profile?.fullName || "Siroojuddin Apendi"}
                            </span>
                            <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-medium -mt-1">
                                {profile?.jobTitle || "Fullstack Engineer"}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1.5">
                        {["about", "skills", "experience", "projects", "contact"].map((item) => (
                            <a
                                key={item}
                                href={`#${item}`}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${activeSection === item
                                    ? "bg-stone-900 text-white dark:bg-white dark:text-stone-950 shadow-sm"
                                    : "text-stone-600 dark:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-800"
                                    }`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Actions: Theme Toggle & CTA */}
                    <div className="flex items-center gap-3">
                        <ThemeToggleButton />
                        <a
                            href="#contact"
                            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                        >
                            Get in Touch
                        </a>
                    </div>
                </nav>
            </header>

            {/* Main Container */}
            <main className="max-w-6xl mx-auto px-4 py-12 relative z-10 space-y-24">

                {/* HERO SECTION */}
                <section id="about" className="pt-8 w-full flex justify-center">

                    <div className="lg:col-span-7 space-y-8">

                        {/* Introduction Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50/80 dark:bg-purple-950/30 border border-purple-100/50 dark:border-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 animate-spin duration-[4000ms]" />
                            <span className="text-xs font-bold tracking-wider uppercase">Welcome to my Digital Space</span>
                        </div>

                        {/* Core Presentation Info */}
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-stone-950 dark:text-white">
                                Hi, I am <span className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">{profile?.fullName || "Siroojuddin Apendi"}</span>
                            </h1>
                            <h2 className="text-xl sm:text-2xl font-bold text-stone-600 dark:text-zinc-300 flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-indigo-500" />
                                {profile?.jobTitle || "Fullstack Software Engineer / S.T."}
                            </h2>
                        </div>

                        {/* Bio / About */}
                        <p className="text-base sm:text-lg text-stone-600 dark:text-zinc-300 leading-relaxed font-normal max-w-xl">
                            {profile?.about || "I am a passionate software developer dedicated to crafting modern, premium, and functional web applications. Bringing complex layouts and user interactions to life with clean, efficient architecture is what I do best."}
                        </p>

                        {/* Quick Contact & Details badges */}
                        <div className="flex flex-wrap gap-3">
                            {profile?.location && (
                                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-white/80 dark:border-zinc-800/40 text-stone-600 dark:text-zinc-300 shadow-sm text-xs font-medium">
                                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                                    {profile.location}
                                </div>
                            )}
                            {profile?.email && (
                                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-white/80 dark:border-zinc-800/40 text-stone-600 dark:text-zinc-300 shadow-sm text-xs font-medium">
                                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                                    {profile.email}
                                </div>
                            )}
                            {profile?.phoneNumber && (
                                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-white/80 dark:border-zinc-800/40 text-stone-600 dark:text-zinc-300 shadow-sm text-xs font-medium">
                                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                                    {profile.phoneNumber}
                                </div>
                            )}
                        </div>

                        {/* Interactive CTAs */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-stone-850 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-950 text-sm font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                            >
                                <Send className="w-4 h-4" /> Let's Work Together
                            </a>

                            <div className="flex items-center gap-3">
                                {profile?.repository && (
                                    <Link
                                        href={profile.repository}
                                        target="_blank"
                                        className="p-3 bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-850 border border-stone-200/50 dark:border-zinc-800/50 rounded-2xl shadow-sm text-stone-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                                        title="GitHub Repository"
                                    >
                                        <Github className="w-5 h-5" />
                                    </Link>
                                )}
                                {profile?.linkedin && (
                                    <Link
                                        href={profile.linkedin}
                                        target="_blank"
                                        className="p-3 bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-850 border border-stone-200/50 dark:border-zinc-800/50 rounded-2xl shadow-sm text-stone-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:-translate-y-0.5"
                                        title="LinkedIn Profile"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* SKILLS SECTION */}
                <section id="skills" className="space-y-10 scroll-mt-24">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <h2 className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl flex items-center justify-center gap-2">
                            <Cpu className="w-8 h-8 text-purple-500" />
                            Technologies & Skills
                        </h2>
                        <p className="text-stone-500 dark:text-zinc-400 text-sm">
                            The tools, frameworks, and methodologies I specialize in to bring ideas to reality.
                        </p>
                    </div>

                    {isSkillsLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="h-48 rounded-3xl bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/30 animate-pulse" />
                            ))}
                        </div>
                    ) : skills.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skills.map((cat, idx) => {
                                // Different soft theme for each skill category
                                const softColors = [
                                    {
                                        header: "text-indigo-700 dark:text-indigo-300",
                                        border: "border-indigo-100/50 dark:border-indigo-900/30",
                                        bg: "from-indigo-500/5 via-purple-500/5 to-indigo-500/5"
                                    },
                                    {
                                        header: "text-emerald-700 dark:text-emerald-300",
                                        border: "border-emerald-100/50 dark:border-emerald-900/30",
                                        bg: "from-emerald-500/5 via-teal-500/5 to-emerald-500/5"
                                    },
                                    {
                                        header: "text-amber-700 dark:text-amber-300",
                                        border: "border-amber-100/50 dark:border-amber-900/30",
                                        bg: "from-amber-500/5 via-rose-500/5 to-amber-500/5"
                                    }
                                ];

                                const colorSet = softColors[idx % softColors.length];

                                return (
                                    <div
                                        key={cat.id || cat.category}
                                        className={`relative overflow-hidden p-6 bg-gradient-to-br ${colorSet.bg} bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/40 backdrop-blur-md rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
                                    >
                                        <h3 className={`font-bold text-lg mb-6 ${colorSet.header} flex items-center justify-between`}>
                                            {cat.category}
                                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                        </h3>

                                        <div className="flex flex-wrap gap-2.5">
                                            {cat.skills.map((item) => (
                                                <div
                                                    key={item.id || item.name}
                                                    className="flex items-center gap-2 px-3 py-2 bg-white/70 dark:bg-zinc-850/80 hover:bg-white dark:hover:bg-zinc-800 border border-stone-200/40 dark:border-zinc-800/40 rounded-2xl shadow-sm group hover:-translate-y-0.5 transition-all duration-200"
                                                >
                                                    <div className="w-5 h-5 relative shrink-0 overflow-hidden rounded-md flex items-center justify-center">
                                                        {item.icon ? (
                                                            <img
                                                                src={getImageUrl(item.icon)}
                                                                alt={item.name}
                                                                width={20}
                                                                height={20}
                                                                className="object-contain group-hover:scale-110 transition-transform"
                                                            />
                                                        ) : (
                                                            <Code className="w-3.5 h-3.5 text-stone-500" />
                                                        )}
                                                    </div>
                                                    <span className="text-xs font-bold text-stone-700 dark:text-zinc-200">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white/50 dark:bg-zinc-900/50 rounded-3xl border border-white/80 dark:border-zinc-800/30">
                            <p className="text-stone-500">No technology categories found.</p>
                        </div>
                    )}
                </section>

                {/* EXPERIENCE SECTION */}
                <section id="experience" className="space-y-10 scroll-mt-24">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <h2 className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl flex items-center justify-center gap-2">
                            <Briefcase className="w-8 h-8 text-rose-500" />
                            Work History
                        </h2>
                        <p className="text-stone-500 dark:text-zinc-400 text-sm">
                            My professional journey and achievements throughout the years.
                        </p>
                    </div>

                    {isExpLoading ? (
                        <div className="space-y-6 max-w-3xl mx-auto">
                            {[1, 2].map((n) => (
                                <div key={n} className="h-32 rounded-3xl bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/30 animate-pulse" />
                            ))}
                        </div>
                    ) : experiences.length > 0 ? (
                        <div className="relative max-w-3xl mx-auto pl-6 sm:pl-8 border-l border-indigo-100 dark:border-zinc-800/80 space-y-12 py-2">
                            {experiences.map((exp, idx) => (
                                <div key={exp.id || exp.office} className="relative group">
                                    {/* Timeline Dot Indicator */}
                                    <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4.5 h-4.5 rounded-full border-4 border-[#FAF9F5] dark:border-[#14161B] bg-gradient-to-r from-indigo-500 to-purple-600 shadow-[0_0_10px_rgba(99,102,241,0.4)] group-hover:scale-110 transition-transform duration-300" />

                                    {/* Experience Card */}
                                    <div className="p-6 bg-white/45 dark:bg-zinc-900/45 border border-white/60 dark:border-zinc-800/40 backdrop-blur-md rounded-3xl shadow-[0_4px_35px_rgba(0,0,0,0.01)] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {exp.position}
                                                </h3>
                                                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mt-0.5">
                                                    <span>{exp.office}</span>
                                                </p>
                                            </div>

                                            {/* Dates Tag */}
                                            <span className="inline-flex max-w-max items-center px-3 py-1 rounded-full bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-300 text-xs font-semibold">
                                                {formatDateName(exp?.start?.toString())} — {formatDateName(exp?.end?.toString())}
                                            </span>
                                        </div>

                                        {/* Rich description parsed cleanly */}
                                        <div className="mt-4 border-t border-stone-100 dark:border-zinc-800/40 pt-4">
                                            {renderDescription(exp.description)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white/50 dark:bg-zinc-900/50 rounded-3xl border border-white/80 dark:border-zinc-800/30 max-w-3xl mx-auto">
                            <p className="text-stone-500">No experiences found.</p>
                        </div>
                    )}
                </section>

                {/* PROJECTS SECTION */}
                <section id="projects" className="space-y-10 scroll-mt-24">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <h2 className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl flex items-center justify-center gap-2">
                            <Layers className="w-8 h-8 text-indigo-500" />
                            Featured Projects
                        </h2>
                        <p className="text-stone-500 dark:text-zinc-400 text-sm">
                            A curated selection of the projects I built, utilizing modern stack setups.
                        </p>
                    </div>

                    {isProjectsLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="h-64 rounded-3xl bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/30 animate-pulse" />
                            ))}
                        </div>
                    ) : projects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => {
                                const stack = project.techStack
                                    ? project.techStack.split(",").map((s) => s.trim())
                                    : [];

                                return (
                                    <div
                                        key={project.id || project.title}
                                        className="group relative flex flex-col justify-between overflow-hidden bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/40 backdrop-blur-md rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                                    >

                                        {/* Top Content (Image & Text) */}
                                        <div>
                                            {/* Project Image Frame */}
                                            <div className="relative aspect-video w-full overflow-hidden bg-stone-100 dark:bg-zinc-800 border-b border-stone-200/30 dark:border-zinc-800/30">
                                                <img
                                                    src={getImageUrl(project.FilePath)}
                                                    alt={project.title}
                                                    // fill
                                                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 100vw, 350px"
                                                />
                                            </div>

                                            {/* Info block */}
                                            <div className="p-6 space-y-4">
                                                <h3 className="font-bold text-lg text-stone-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {project.title}
                                                </h3>

                                                <p className="text-sm text-stone-500 dark:text-zinc-400 leading-relaxed font-normal line-clamp-3">
                                                    {project.description}
                                                </p>

                                                {/* Tech pills */}
                                                {stack.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {stack.map((t) => (
                                                            <span
                                                                key={t}
                                                                className="px-2.5 py-1 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-300 text-[10px] font-extrabold uppercase tracking-wide border border-indigo-100/20 dark:border-indigo-900/20"
                                                            >
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Bottom Action Footer */}
                                        <div className="p-6 pt-0 mt-auto border-t border-stone-100/50 dark:border-zinc-800/20 flex gap-2">
                                            {project.demoUrl && project.demoUrl.length > 0 && (
                                                <Link
                                                    href={project.demoUrl}
                                                    target="_blank"
                                                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-indigo-500 hover:bg-indigo-650 rounded-xl transition-colors"
                                                >
                                                    <Globe className="w-3.5 h-3.5" /> Demo
                                                </Link>
                                            )}

                                            {project.githubUrl && project.githubUrl.length > 0 && (
                                                <Link
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-stone-700 dark:text-zinc-200 bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 rounded-xl border border-stone-200/50 dark:border-zinc-800/50 transition-colors"
                                                >
                                                    <Github className="w-3.5 h-3.5" /> Code
                                                </Link>
                                            )}
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white/50 dark:bg-zinc-900/50 rounded-3xl border border-white/80 dark:border-zinc-800/30">
                            <p className="text-stone-500">No projects found.</p>
                        </div>
                    )}
                </section>

                {/* CONTACT SECTION */}
                <section id="contact" className="space-y-10 scroll-mt-24 pb-12">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <h2 className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl flex items-center justify-center gap-2">
                            <Mail className="w-8 h-8 text-emerald-500" />
                            Contact Hub
                        </h2>
                        <p className="text-stone-500 dark:text-zinc-400 text-sm">
                            Feel free to reach out. I would love to hear from you and discuss opportunities.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                        {/* Quick Contacts details cards */}
                        <div className="md:col-span-5 space-y-4">

                            <div className="p-5 bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/40 backdrop-blur-md rounded-3xl shadow-sm flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-indigo-500" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-extrabold text-stone-400 dark:text-zinc-500 uppercase tracking-wider">Email Address</h4>
                                    <p className="text-sm font-bold text-stone-900 dark:text-white mt-1 break-all select-all">
                                        {profile?.email || "sirojuddinapendi05@gmail.com"}
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/40 backdrop-blur-md rounded-3xl shadow-sm flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-rose-500" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-extrabold text-stone-400 dark:text-zinc-500 uppercase tracking-wider">Location</h4>
                                    <p className="text-sm font-bold text-stone-900 dark:text-white mt-1">
                                        {profile?.location || "Jakarta, Indonesia"}
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/40 backdrop-blur-md rounded-3xl shadow-sm flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-extrabold text-stone-400 dark:text-zinc-500 uppercase tracking-wider">Telephone</h4>
                                    <p className="text-sm font-bold text-stone-900 dark:text-white mt-1 select-all">
                                        {profile?.phoneNumber || "+62 822-xxxx-xxxx"}
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Form contact box container with delicate pastel accents */}
                        <div className="md:col-span-7 p-6 sm:p-8 bg-white/45 dark:bg-zinc-900/45 border border-white/70 dark:border-zinc-800/50 backdrop-blur-md rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
                            <FormContact />
                        </div>

                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-24 border-t border-stone-200/40 dark:border-zinc-850/30 bg-white/30 dark:bg-[#121316]/30 backdrop-blur-md py-10">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div>
                        <p className="text-sm text-stone-500 dark:text-zinc-400 font-medium">
                            © {new Date().getFullYear()} {profile?.fullName || "Siroojuddin Apendi"}. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

        </div>
    );
}