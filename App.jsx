const { useState, useEffect, useRef, useLayoutEffect } = React;

gsap.registerPlugin(ScrollTrigger);

// ===== DATA & COPY =====
const BRAND_NAME = "Shivam Patel";
const JOB_TITLE = "Chemical Engineering Student";
const IDENTITY_LINE = "Engineering sustainable materials and systems.";

const BIO_PARAGRAPHS = [
    "I'm a Chemical Engineering student at Toronto Metropolitan University with a deep passion for sustainable technology, battery systems, and engineering materials. I thrive on diving into complex processes—whether it's running simulations to optimize reactor yields or exploring the bioleaching of critical metals.",
    "During my time at Multimatic Inc., I got hands-on experience controlling parameters for industrial-scale systems. The most valuable lesson I learned wasn't just how to maintain a chemical bath; it was how to communicate technical deviations clearly so production keeps moving.",
    "Right now, I'm actively looking for opportunities where I can apply my skills in process simulation, material science, and strategic problem-solving to build cleaner, more efficient technologies for the future."
];

const SKILL_CATEGORIES = [
    {
        category: "Process Simulation & Modeling",
        skills: [
            { name: "Aspen Plus / HYSYS", desc: "Rigorous steady-state and dynamic process simulation." },
            { name: "MATLAB & Simulink", desc: "Mathematical modeling, data analysis, and control systems." },
            { name: "SolidWorks", desc: "3D CAD modeling and structural component design." }
        ]
    },
    {
        category: "Technical Knowledge",
        skills: [
            { name: "Battery Technology", desc: "Understanding energy storage capabilities and limitations." },
            { name: "Sustainable Systems", desc: "Designing for reduced emissions and material recovery." },
            { name: "Biohydrometallurgy", desc: "Microbial extraction of metals from ores or waste." }
        ]
    }
];

const PROJECTS = [
    {
        title: "Lithium Recovery Capstone",
        context: "Biohydrometallurgical Bioleaching Research",
        desc: "My ongoing capstone project focuses on extracting critical battery materials—specifically Lithium—using sustainable, biological methods rather than highly toxic traditional mining practices. This involves cultivating specific microbial strains and monitoring leaching kinetics.",
        outcome: "Aiming to establish a viable, low-heat, low-emission pathway for critical mineral recovery.",
        img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2670&auto=format&fit=crop" // Lab/Microscope texture
    },
    {
        title: "Multimatic Inc. Co-op",
        context: "E-Coat Department Engineering Intern",
        desc: "Supported the electrocoating operations at a Tier-1 automotive supplier. Responsible for monitoring chemical tank parameters, optimizing bath conditions, and identifying process deviations before they impacted production quality.",
        outcome: "Enhanced coating consistency and reduced chemical waste by implementing tighter parameter controls.",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" // Industrial machinery
    }
];

// Preset: Retrofuturistic (Warm, Pleasing, MuseoModerno)
const THEME = {
    primary: '#FAF8F5',
    accent: '#FF6B4A',
    accent2: '#4A90E2',
    dark: '#1A1829',
    surface: '#Fdfcfb',
};


// ===== COMPONENTS =====

const Navbar = () => {
    const navRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.1);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            ref={navRef}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-in-out px-6 py-3 rounded-full flex items-center justify-between gap-8 backdrop-blur-xl
            ${scrolled
                    ? 'bg-[#FAF8F5]/80 border border-[#1A1829]/10 text-[#1A1829] shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-[90%] md:w-[600px]'
                    : 'bg-transparent text-[#1A1829] w-[95%] md:w-[800px]'}`}
        >
            <div className="font-heading font-bold tracking-tight text-2xl text-[#FF6B4A]">{BRAND_NAME}</div>
            <div className="hidden md:flex items-center gap-6 font-sans text-sm font-medium text-[#1A1829]/80">
                <a href="#about" className="hover:text-[#FF6B4A] hover:-translate-y-[1px] transition-all">About</a>
                <a href="#work" className="hover:text-[#FF6B4A] hover:-translate-y-[1px] transition-all">Work</a>
                <a href="#skills" className="hover:text-[#FF6B4A] hover:-translate-y-[1px] transition-all">Skills</a>
            </div>
            <a href="#contact" className="font-sans font-semibold text-sm px-6 py-2.5 rounded-full bg-[#1A1829] text-[#FAF8F5] magnetic-btn shadow-md relative overflow-hidden group">
                <span className="relative z-10">Hire Me</span>
                <div className="absolute inset-0 bg-[#FF6B4A] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-full"></div>
            </a>
        </nav>
    );
};

// --- B. HERO SECTION ---
const Hero = () => {
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const t1 = gsap.timeline();
            t1.from(".reveal-text", {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.2
            }).from(".hero-cta", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.6")
                .from(".glow-blob", {
                    scale: 0.8,
                    opacity: 0,
                    duration: 2,
                    stagger: 0.2,
                    ease: "power2.out"
                }, 0);
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={comp} className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-start pb-24 px-6 md:px-16 lg:px-24 bg-[#FAF8F5]">

            {/* Retrofuturistic Soft Background Globs */}
            <div className="glow-blob bg-[#FF6B4A] w-[400px] h-[400px] top-[-100px] right-[-100px] animate-pulse-slow"></div>
            <div className="glow-blob bg-[#4A90E2] w-[500px] h-[500px] bottom-[-200px] left-[-100px]" style={{ animation: 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate' }}></div>

            <div className="relative z-10 max-w-5xl text-[#1A1829] mt-20">
                <h1 className="leading-[1.1] mb-8">
                    <div className="overflow-hidden mb-6">
                        <span className="reveal-text inline-block font-data text-xs md:text-sm tracking-[0.2em] uppercase text-[#1A1829] bg-white/70 backdrop-blur-md px-4 py-2 border border-[#1A1829]/10 rounded-full shadow-sm">
                            {JOB_TITLE}
                        </span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="reveal-text block font-heading font-bold text-6xl md:text-[7rem] tracking-tight mb-4 text-[#1A1829] drop-shadow-sm">{BRAND_NAME}</span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="reveal-text block font-heading font-medium text-4xl md:text-6xl text-[#FF6B4A] pr-4 max-w-4xl">{IDENTITY_LINE}</span>
                    </div>
                </h1>

                <div className="hero-cta flex gap-4 mt-12">
                    <a href="#contact" className="bg-[#FF6B4A] text-[#FAF8F5] px-8 py-4 rounded-full font-sans font-semibold text-sm tracking-wide magnetic-btn relative overflow-hidden group shadow-[0_8px_20px_rgba(255,107,74,0.3)] inline-flex items-center gap-2">
                        <span className="relative z-10">Start a Conversation</span>
                        <div className="absolute inset-0 bg-[#1A1829] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 flex items-center justify-center font-semibold">
                            <span className="flex items-center gap-2 text-[#FAF8F5]">Start a Conversation</span>
                        </div>
                    </a>
                    <a href="#about" className="bg-white/50 backdrop-blur-sm border border-[#1A1829]/10 text-[#1A1829] px-8 py-4 rounded-full font-sans font-semibold text-sm tracking-wide magnetic-btn hover:bg-white transition-colors">
                        Learn More
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 flex flex-col items-center gap-2">
                <span className="font-data text-[10px] tracking-widest uppercase text-[#1A1829]">Scroll</span>
                <i data-lucide="arrow-down" className="w-4 h-4 text-[#1A1829]"></i>
            </div>
        </section>
    );
};

// --- C. ABOUT ---
const About = () => {
    const sectionRef = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

            tl.from(".about-img", { x: -40, opacity: 0, duration: 1, ease: "power3.out" })
                .from(".about-text", { y: 20, opacity: 0, duration: 0.8, stagger: 0.15 }, "-=0.6")
                .from(".about-chip", { y: 15, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4");
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-32 px-6 md:px-16 lg:px-24 w-full bg-white relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                <div className="lg:col-span-5 about-img relative">
                    {/* Decorative element behind image */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-[#FF6B4A]/20 to-[#4A90E2]/20 rounded-[2.5rem] transform -rotate-3 z-0"></div>

                    <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border-4 border-white bg-[#Fdfcfb] flex items-center justify-center">
                        <img
                            src="./profile.jpg"
                            alt="Shivam Patel"
                            className="w-full h-full object-cover object-center"
                            onError={(e) => {
                                // Fallback if image path is incorrect
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1542644265-5b4870f4dc79?q=80&w=1000&auto=format&fit=crop";
                            }}
                        />
                    </div>
                </div>

                <div className="lg:col-span-7 relative z-10">
                    <h2 className="about-text font-heading font-medium text-4xl md:text-5xl text-[#1A1829] mb-8">The Human Behind the Work</h2>
                    <div className="space-y-6 text-[#1A1829]/70 font-sans text-lg leading-relaxed mb-12">
                        {BIO_PARAGRAPHS.map((p, i) => <p key={i} className="about-text">{p}</p>)}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="about-chip bg-[#FAF8F5] border border-[#1A1829]/5 rounded-full px-6 py-3 flex items-center gap-3 shadow-sm">
                            <i data-lucide="graduation-cap" className="w-4 h-4 text-[#FF6B4A]"></i>
                            <span className="font-heading font-semibold text-sm text-[#1A1829]">Chemical Engineering</span>
                        </div>
                        <div className="about-chip bg-[#FAF8F5] border border-[#1A1829]/5 rounded-full px-6 py-3 flex items-center gap-3 shadow-sm">
                            <i data-lucide="search" className="w-4 h-4 text-[#FF6B4A]"></i>
                            <span className="font-data text-sm font-semibold text-[#1A1829]">Seeking Opportunities</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- D. WORK ---
const WorkCard = ({ project, index }) => {
    const isEven = index % 2 === 0;

    return (
        <div className="work-card group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 hover:-translate-y-1 transition-transform duration-500 ease-out bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#1A1829]/5 hover:shadow-xl">
            <div className={`lg:col-span-7 aspect-[16/10] rounded-xl overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'} relative`}>
                <div className="absolute inset-0 bg-[#4A90E2]/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700"></div>
                <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
                />
            </div>

            <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} p-2`}>
                <div className="font-data text-[#FF6B4A] text-xs tracking-widest uppercase mb-4">{project.context}</div>
                <h3 className="font-heading font-semibold text-3xl md:text-4xl text-[#1A1829] mb-6 tracking-tight">{project.title}</h3>
                <p className="font-sans text-[#1A1829]/70 text-[1.05rem] leading-relaxed mb-8">{project.desc}</p>

                <div className="bg-[#FAF8F5] border-l-4 border-[#FF6B4A] p-6 rounded-r-2xl shadow-sm">
                    <p className="font-sans italic text-[#1A1829] font-medium leading-relaxed text-sm">
                        "{project.outcome}"
                    </p>
                </div>
            </div>
        </div>
    );
};

const Work = () => {
    const sectionRef = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.utils.toArray('.work-card').forEach(card => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="work" ref={sectionRef} className="py-24 px-6 md:px-16 lg:px-24 bg-[#FAF8F5]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="font-heading font-bold text-5xl md:text-6xl text-[#1A1829] mb-6">Selected Projects</h2>
                    <p className="font-sans text-[#1A1829]/60 max-w-xl mx-auto text-lg">Applied engineering across battery technologies and broad industrial processes.</p>
                </div>
                <div className="space-y-8 md:space-y-12">
                    {PROJECTS.map((p, i) => <WorkCard key={i} project={p} index={i} />)}
                </div>
            </div>
        </section>
    );
};

// --- E. SKILLS & PHILOSOPHY ---
const SkillChip = ({ skill }) => {
    return (
        <div className="group relative h-[70px] w-full max-w-[320px] perspective-1000">
            <div className="w-full h-full transition-all duration-500 transform-style-3d group-hover:rotate-y-180 cursor-default">
                {/* Front */}
                <div className="absolute inset-0 bg-white border border-[#1A1829]/10 rounded-[1.5rem] flex items-center justify-center shadow-sm backface-hidden group-hover:shadow-md transition-shadow">
                    <span className="font-heading font-medium text-lg text-[#1A1829]">{skill.name}</span>
                </div>
                {/* Back */}
                <div className="absolute inset-0 bg-[#FF6B4A] rounded-[1.5rem] flex items-center justify-center p-4 backface-hidden rotate-y-180 shadow-lg text-white">
                    <span className="font-sans text-sm text-center leading-tight font-medium">{skill.desc}</span>
                </div>
            </div>
            {/* CSS Additions for 3D flip since Tailwind assumes custom classes for this */}
            <style jsx>{`
                .perspective-1000 { transform: perspective(1000px); }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .group:hover .group-hover\\:rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </div>
    );
};

const SkillsAndPhilosophy = () => {
    const sectionRef = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".skills-grid",
                    start: "top 80%",
                }
            });
            tl.from(".skill-group", { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" });

            // Philosophy Parallax
            gsap.from(".phil-text", {
                scrollTrigger: {
                    trigger: ".philosophy-section",
                    start: "top 70%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            gsap.to(".phil-bg", {
                scrollTrigger: {
                    trigger: ".philosophy-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                y: 100,
                ease: "none"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} id="skills">
            <section className="py-24 px-6 md:px-16 bg-white skills-grid border-t border-[#1A1829]/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-[#1A1829] mb-4">Technical Stack</h2>
                        <p className="font-data text-[#FF6B4A] text-sm uppercase tracking-widest">Hover to expand</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
                        {SKILL_CATEGORIES.map((cat, i) => (
                            <div key={i} className="skill-group flex flex-col items-center gap-4">
                                <h4 className="font-data text-sm font-bold text-[#1A1829]/60 mb-4 uppercase tracking-wider">{cat.category}</h4>
                                {cat.skills.map((skill, j) => <SkillChip key={j} skill={skill} />)}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="philosophy-section relative py-40 px-6 md:px-16 bg-[#1A1829] overflow-hidden mx-4 md:mx-8 shadow-2xl mt-12 mb-12 rounded-[2rem] md:rounded-[3rem]">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2670&auto=format&fit=crop"
                        alt="Toronto Metropolitan University"
                        className="phil-bg w-full h-[120%] object-cover opacity-20 -top-[10%] mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1829] via-transparent to-[#1A1829] opacity-80"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
                    <p className="phil-text font-sans text-xl md:text-2xl text-[#FAF8F5]/60 mb-8 max-w-2xl mx-auto">
                        Most approaches focus on: <span className="text-white">immediate short-term yields.</span>
                    </p>
                    <h2 className="phil-text font-heading font-medium text-4xl md:text-6xl text-white leading-tight mb-8">
                        I focus on <span className="text-[#FF6B4A]">sustainable design</span><br />and long-term viability.
                    </h2>
                </div>
            </section>
        </div>
    );
};

// --- G. CONTACT & FOOTER ---
const ContactAndFooter = () => {
    return (
        <div id="contact" className="relative bg-[#FAF8F5] pt-12">
            <section className="py-24 px-6 text-center max-w-4xl mx-auto">
                <h2 className="font-heading font-bold text-5xl md:text-7xl text-[#1A1829] mb-8">Ready to work together?</h2>
                <p className="font-sans text-xl text-[#1A1829]/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                    I am actively seeking engineering roles where I can leverage my expertise in process simulation and sustainable materials. My inbox is open.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
                    <a href="mailto:shivam100401@gmail.com.com" className="bg-[#FF6B4A] text-[#FAF8F5] px-10 py-5 rounded-full font-heading font-bold text-lg tracking-wide magnetic-btn shadow-[0_8px_20px_rgba(255,107,74,0.3)] w-full md:w-auto hover:shadow-[0_12px_25px_rgba(255,107,74,0.4)] transition-shadow">
                        Email Me
                    </a>
                </div>

                <div className="flex justify-center gap-8">
                    <a href="https://www.linkedin.com/in/shivam100401/" target="_blank" className="text-[#1A1829]/60 hover:text-[#4A90E2] hover:-translate-y-1 transition-all flex flex-col items-center gap-2 group">
                        <div className="bg-white p-4 rounded-full shadow-sm border border-[#1A1829]/5 group-hover:shadow-md transition-shadow">
                            <i data-lucide="linkedin" className="w-6 h-6"></i>
                        </div>
                        <span className="font-sans text-sm font-semibold">LinkedIn</span>
                    </a>
                    <a href="mailto:shivam100401@gmail.com" className="text-[#1A1829]/60 hover:text-[#FF6B4A] hover:-translate-y-1 transition-all flex flex-col items-center gap-2 group">
                        <div className="bg-white p-4 rounded-full shadow-sm border border-[#1A1829]/5 group-hover:shadow-md transition-shadow">
                            <i data-lucide="mail" className="w-6 h-6"></i>
                        </div>
                        <span className="font-sans text-sm font-semibold">Email</span>
                    </a>
                    <a href="#" download className="text-[#1A1829]/60 hover:text-[#1A1829] hover:-translate-y-1 transition-all flex flex-col items-center gap-2 group">
                        <div className="bg-white p-4 rounded-full shadow-sm border border-[#1A1829]/5 group-hover:shadow-md transition-shadow">
                            <i data-lucide="file-text" className="w-6 h-6"></i>
                        </div>
                        <span className="font-sans text-sm font-semibold">Download CV</span>
                    </a>
                </div>
            </section>

            <footer className="bg-[#1A1829] text-[#FAF8F5] pt-20 pb-12 px-6 md:px-16 rounded-t-[3rem] relative z-10 w-full">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                    <div>
                        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 tracking-tight">{BRAND_NAME}</h2>
                        <p className="font-sans text-lg opacity-60 max-w-xs">{JOB_TITLE}</p>
                    </div>

                    <div className="flex md:justify-end font-sans">
                        <ul className="flex gap-8 opacity-70 font-semibold text-sm">
                            <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
                            <li><a href="#skills" className="hover:text-white transition-colors">Skills</a></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col flex-col-reverse md:flex-row justify-between items-center gap-6 font-data text-xs opacity-60">
                    <div>&copy; {new Date().getFullYear()} Shivam Patel. All rights reserved.</div>

                    <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-[pulse_2s_infinite]"></div>
                        <span className="tracking-widest uppercase text-white font-bold">Available for Work</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};


const App = () => {
    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Work />
                <SkillsAndPhilosophy />
            </main>
            <ContactAndFooter />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
