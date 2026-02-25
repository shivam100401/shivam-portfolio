const { useState, useEffect, useRef, useLayoutEffect } = React;

gsap.registerPlugin(ScrollTrigger);

// ===== DATA & COPY =====
const BRAND_NAME = "Shivam Patel";
const JOB_TITLE = "Chemical Engineering Student";
const IDENTITY_LINE = "Engineering sustainable materials and systems.";

const BIO_PARAGRAPHS = [
    "I'm a Chemical Engineering student at Toronto Metropolitan University with a deep passion for sustainable technology, battery systems, and engineering materials. I thrive on diving into complex processes whether it's running simulations to optimize reactor yields or exploring the bioleaching of critical metals.",
    "During my time at Multimatic Inc., I got hands on experience controlling parameters for industrial scale systems. The most valuable lesson I learned wasn't just how to maintain a chemical bath; it was how to communicate technical deviations clearly so production keeps moving.",
    "Right now, I'm actively looking for opportunities where I can apply my skills in process simulation, material science, and strategic problem solving to build cleaner, more efficient technologies for the future."
];

const SKILL_CATEGORIES = [
    {
        category: "Process Simulation & Modeling",
        skills: [
            { name: "Aspen Plus / HYSYS", desc: "Rigorous steady state and dynamic process simulation." },
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
        desc: "My ongoing capstone project focuses on extracting critical battery materials specifically Lithium using sustainable, biological methods rather than highly toxic traditional mining practices. This involves cultivating specific microbial strains and monitoring leaching kinetics.",
        outcome: "Aiming to establish a viable, low-heat, low-emission pathway for critical mineral recovery.",
        img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2670&auto=format&fit=crop" // Lab/Microscope texture
    },
    {
        title: "Multimatic Inc. Co-op",
        context: "E-Coat Department Engineering Intern",
        desc: "Supported the electrocoating operations at a Tier 1 automotive supplier. Responsible for monitoring chemical tank parameters, optimizing bath conditions, and identifying process deviations before they impacted production quality.",
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


// --- Custom Hooks ---
const usePolymorphicCursor = () => {
    useEffect(() => {
        const dot = document.getElementById('cursor-dot');
        const shell = document.getElementById('cursor-shell');
        if (!dot || !shell) return;

        const setDotX = gsap.quickTo(dot, "left", { duration: 0.1, ease: "power3" });
        const setDotY = gsap.quickTo(dot, "top", { duration: 0.1, ease: "power3" });
        const setShellX = gsap.quickTo(shell, "left", { duration: 0.4, ease: "power3" });
        const setShellY = gsap.quickTo(shell, "top", { duration: 0.4, ease: "power3" });

        const onMouseMove = (e) => {
            setDotX(e.clientX);
            setDotY(e.clientY);
            setShellX(e.clientX);
            setShellY(e.clientY);
        };

        window.addEventListener("mousemove", onMouseMove);

        const handleMouseEnter = (e) => {
            const type = e.currentTarget.getAttribute('data-cursor') || 'hover';
            document.body.className = `cursor-${type}`;
        };
        const handleMouseLeave = () => {
            document.body.className = '';
        };

        const attachCursorEvents = () => {
            document.querySelectorAll('[data-cursor]').forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        setTimeout(attachCursorEvents, 500);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.querySelectorAll('[data-cursor]').forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);
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
            <div className="hidden md:flex items-center gap-6 font-outfit text-sm font-medium text-[#1A1829]/80">
                <a href="#about" className="hover:text-[#FF6B4A] hover:-translate-y-[1px] transition-all">About</a>
                <a href="#work" className="hover:text-[#FF6B4A] hover:-translate-y-[1px] transition-all">Work</a>
                <a href="#skills" className="hover:text-[#FF6B4A] hover:-translate-y-[1px] transition-all">Skills</a>
            </div>
            <a href="#contact" className="font-outfit font-semibold text-sm px-6 py-2.5 rounded-full bg-[#1A1829] text-[#FAF8F5] magnetic-btn shadow-md relative overflow-hidden group">
                <span className="relative z-10">Hire Me</span>
                <div className="absolute inset-0 bg-[#FF6B4A] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-full"></div>
            </a>
        </nav>
    );
};

const ExplodingCADWidget = () => (
    <div className="reveal-bento col-span-2 aspect-[16/7] md:aspect-[16/8] bg-[#FAF8F5] rounded-[2rem] border border-[#1A1829]/5 shadow-sm flex flex-col items-center justify-center relative group overflow-hidden" data-cursor="bracket">

        <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="font-data text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#1A1829]/40 font-bold mb-1 block">CAD Viewer</span>
            <span className="font-outfit text-[8px] md:text-[9px] text-[#1A1829]/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Hover to explode</span>
        </div>

        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 400 300" className="w-full h-full max-w-[500px] drop-shadow-md overflow-visible">
                <style>
                    {`
                        .cad-part { transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease; opacity: 0.95; }
                        .cad-label { opacity: 0; transition: opacity 0.4s ease 0.3s; pointer-events: none; }
                        .cad-line { opacity: 0; transition: opacity 0.4s ease 0.2s, stroke 0.4s; stroke: #4A90E2; stroke-width: 1; stroke-dasharray: 4,4; }
                        
                        .group:hover .cad-part { opacity: 1; filter: drop-shadow(0px 10px 15px rgba(0,0,0,0.15)); }
                        .group:hover .cad-label { opacity: 1; }
                        .group:hover .cad-line { opacity: 0.5; }
                        
                        .group:hover .part-shaft { transform: translate(-35px, 17px); }
                        .group:hover .part-endplate { transform: translate(-10px, 5px); }
                        .group:hover .part-rotor { transform: translate(15px, -7px) scale(0.95); }
                        .group:hover .part-stator { transform: translate(45px, -22px); }
                        .group:hover .part-handle { transform: translate(80px, -40px); }
                    `}
                </style>

                <line x1="80" y1="180" x2="320" y2="60" className="cad-line" />

                {/* 1. HANDLE */}
                <g className="cad-part part-handle">
                    <path d="M 230 110 Q 280 60 320 80 Q 320 140 280 180 Q 250 160 230 110 Z" fill="#2D3A70" stroke="#1A1829" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M 260 125 Q 280 100 295 110 Q 295 130 280 145 Q 265 130 260 125 Z" fill="#FAF8F5" />
                    <g className="cad-label">
                        <line x1="280" y1="70" x2="310" y2="40" stroke="#1A1829" strokeWidth="1" />
                        <rect x="310" y="28" width="50" height="15" fill="#FAF8F5" stroke="#1A1829" strokeWidth="1" />
                        <text x="314" y="38" fontSize="8" fontFamily="monospace" fill="#1A1829">HANDLE</text>
                    </g>
                </g>

                {/* 2. STATOR */}
                <g className="cad-part part-stator">
                    <path d="M 180 100 Q 220 70 240 100 Q 230 160 190 150 Q 160 140 180 100 Z" fill="#4B5E65" stroke="#1A1829" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M 175 80 Q 185 60 210 70" fill="none" stroke="#1A1829" strokeWidth="4" />
                    <path d="M 195 160 Q 210 180 235 160" fill="none" stroke="#1A1829" strokeWidth="4" />
                    <g className="cad-label">
                        <line x1="200" y1="70" x2="210" y2="30" stroke="#1A1829" strokeWidth="1" />
                        <rect x="180" y="15" width="85" height="15" fill="#FAF8F5" stroke="#1A1829" strokeWidth="1" />
                        <text x="184" y="25" fontSize="8" fontFamily="monospace" fill="#1A1829">STATOR_WINDINGS</text>
                    </g>
                </g>

                {/* 3. ROTOR */}
                <g className="cad-part part-rotor">
                    <path d="M 150 110 L 160 90 L 175 105 Z" fill="#4A90E2" stroke="#1A1829" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M 155 130 L 150 150 L 170 145 Z" fill="#4A90E2" stroke="#1A1829" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M 170 115 L 190 100 L 195 120 Z" fill="#4A90E2" stroke="#1A1829" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M 165 140 L 190 155 L 185 135 Z" fill="#4A90E2" stroke="#1A1829" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="170" cy="125" r="12" fill="#FAF8F5" stroke="#1A1829" strokeWidth="2" />
                    <circle cx="170" cy="125" r="4" fill="#1A1829" />
                    <g className="cad-label">
                        <line x1="170" y1="105" x2="160" y2="70" stroke="#1A1829" strokeWidth="1" />
                        <rect x="125" y="55" width="60" height="15" fill="#FAF8F5" stroke="#1A1829" strokeWidth="1" />
                        <text x="129" y="65" fontSize="8" fontFamily="monospace" fill="#1A1829">ROTOR_FAN</text>
                    </g>
                </g>

                {/* 4. ENDPLATE */}
                <g className="cad-part part-endplate">
                    <path d="M 110 130 Q 130 90 150 115 Q 160 150 130 160 Q 100 150 110 130 Z" fill="#E6C84C" stroke="#1A1829" strokeWidth="2" strokeLinejoin="round" />
                    <circle cx="135" cy="130" r="8" fill="#FAF8F5" stroke="#1A1829" strokeWidth="2" />
                    <path d="M 105 135 L 115 130" stroke="#1A1829" strokeWidth="2" />
                    <g className="cad-label">
                        <line x1="120" y1="100" x2="110" y2="60" stroke="#1A1829" strokeWidth="1" />
                        <rect x="50" y="45" width="80" height="15" fill="#FAF8F5" stroke="#1A1829" strokeWidth="1" />
                        <text x="54" y="55" fontSize="8" fontFamily="monospace" fill="#1A1829">MOTOR_ENDPLATE</text>
                    </g>
                </g>

                {/* 5. SHAFT */}
                <g className="cad-part part-shaft">
                    <path d="M 50 170 L 130 130 L 135 140 L 55 180 Z" fill="#889CBA" stroke="#1A1829" strokeWidth="2" strokeLinejoin="round" />
                    <rect x="70" y="145" width="8" height="20" transform="rotate(-26.5, 74, 155)" fill="#FAF8F5" stroke="#1A1829" strokeWidth="1.5" />
                    <rect x="100" y="130" width="10" height="25" transform="rotate(-26.5, 105, 142)" fill="#FAF8F5" stroke="#1A1829" strokeWidth="1.5" />
                    <g className="cad-label">
                        <line x1="70" y1="150" x2="60" y2="120" stroke="#1A1829" strokeWidth="1" />
                        <rect x="25" y="105" width="40" height="15" fill="#FAF8F5" stroke="#1A1829" strokeWidth="1" />
                        <text x="29" y="115" fontSize="8" fontFamily="monospace" fill="#1A1829">SHAFT</text>
                    </g>
                </g>
            </svg>
        </div>
    </div>
);

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
                .from(".reveal-bento", {
                    y: 40,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power3.out"
                }, "-=1")
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
        <section ref={comp} className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-center pb-24 px-6 md:px-16 lg:px-24 bg-[#FAF8F5]">

            {/* Retrofuturistic Soft Background Globs */}
            <div className="glow-blob bg-[#FF6B4A] w-[400px] h-[400px] top-[-100px] right-[-100px] animate-pulse-slow"></div>
            <div className="glow-blob bg-[#4A90E2] w-[500px] h-[500px] bottom-[-200px] left-[-100px]" style={{ animation: 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate' }}></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-20">
                <div className="lg:col-span-7 text-[#1A1829]">
                    <h1 className="leading-[1.1] mb-8" data-cursor="hover">
                        <div className="overflow-hidden mb-6">
                            <span data-cursor="hover" className="reveal-text inline-block font-data text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#1A1829] bg-white/70 backdrop-blur-md px-3 py-1.5 border border-[#1A1829]/10 rounded-full shadow-sm">
                                {JOB_TITLE}
                            </span>
                        </div>
                        <div className="overflow-hidden">
                            <span data-cursor="hover" className="reveal-text block font-heading font-bold text-5xl md:text-6xl tracking-tight mb-4 text-[#1A1829] drop-shadow-sm">{BRAND_NAME}</span>
                        </div>
                        <div className="overflow-hidden">
                            <span data-cursor="hover" className="reveal-text block font-heading font-medium text-3xl md:text-4xl text-[#FF6B4A] pr-4 max-w-2xl leading-tight">{IDENTITY_LINE}</span>
                        </div>
                    </h1>

                    <div className="hero-cta flex flex-wrap gap-4 mt-8">
                        <a href="#contact" data-cursor="magnetic" className="bg-[#FF6B4A] text-[#FAF8F5] px-6 py-3 rounded-full font-outfit font-semibold text-[13px] tracking-wide magnetic-btn relative overflow-hidden group shadow-[0_8px_20px_rgba(255,107,74,0.3)] inline-flex items-center gap-2">
                            <span className="relative z-10">Start a Conversation</span>
                            <div className="absolute inset-0 bg-[#1A1829] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 flex items-center justify-center font-semibold">
                                <span className="flex items-center gap-2 text-[#FAF8F5] text-[13px]">Start a Conversation</span>
                            </div>
                        </a>
                        <a href="#about" data-cursor="hover" className="bg-white/50 backdrop-blur-sm border border-[#1A1829]/10 text-[#1A1829] px-6 py-3 rounded-full font-outfit font-semibold text-[13px] tracking-wide magnetic-btn hover:bg-white transition-colors">
                            Learn More
                        </a>
                    </div>
                </div>

                {/* Right-Side Bento Box */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                    <div className="reveal-bento col-span-2 aspect-[16/7] bg-white/60 backdrop-blur-md rounded-[2rem] p-6 border border-[#1A1829]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all flex flex-col justify-between group" data-cursor="bracket">
                        <div className="flex justify-between items-start">
                            <span className="font-data text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#FF6B4A] font-bold">System Status</span>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_infinite]"></div>
                        </div>
                        <div className="text-xl md:text-2xl font-heading font-medium text-[#1A1829] leading-tight group-hover:text-[#4A90E2] transition-colors" data-cursor="hover">
                            Engineering robust solutions for sustainable industry.
                        </div>
                    </div>

                    <ExplodingCADWidget />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div data-cursor="hover" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 mix-blend-multiply opacity-50 relative z-20">
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

                <div className="lg:col-span-7 relative z-10" data-cursor="hover">
                    <h2 className="about-text font-heading font-medium text-3xl md:text-4xl text-[#1A1829] mb-6">The Human Behind the Work</h2>
                    <div className="space-y-4 text-[#1A1829]/95 font-outfit text-xl md:text-2xl font-light leading-[1.6] tracking-wide mb-10" data-cursor="hover">
                        {BIO_PARAGRAPHS.map((p, i) => <p key={i} className="about-text">{p}</p>)}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="about-chip bg-[#FAF8F5] border border-[#1A1829]/5 rounded-full px-5 py-2 flex items-center gap-3 shadow-sm" data-cursor="hover">
                            <i data-lucide="graduation-cap" className="w-4 h-4 text-[#FF6B4A]"></i>
                            <span className="font-heading font-semibold text-xs md:text-sm text-[#1A1829]">Chemical Engineering</span>
                        </div>
                        <div className="about-chip bg-[#FAF8F5] border border-[#1A1829]/5 rounded-full px-5 py-2 flex items-center gap-3 shadow-sm" data-cursor="hover">
                            <i data-lucide="search" className="w-4 h-4 text-[#FF6B4A]"></i>
                            <span className="font-data text-xs font-semibold text-[#1A1829]">Seeking Opportunities</span>
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

            <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} p-2`} data-cursor="hover">
                <div className="font-data text-[#FF6B4A] text-[9px] md:text-[10px] tracking-widest uppercase mb-3">{project.context}</div>
                <h3 className="font-heading font-semibold text-2xl md:text-3xl text-[#1A1829] mb-4 tracking-tight">{project.title}</h3>
                <p className="font-outfit text-[#1A1829]/70 text-[0.85rem] md:text-sm leading-relaxed mb-6">{project.desc}</p>

                <div className="bg-[#FAF8F5] border-l-4 border-[#FF6B4A] p-4 rounded-r-2xl shadow-sm">
                    <p className="font-outfit italic text-[#1A1829] font-medium leading-relaxed text-xs md:text-[13px]">
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
                <div className="text-center mb-16" data-cursor="hover">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-[#1A1829] mb-4">Selected Projects</h2>
                    <p className="font-outfit text-[#1A1829]/60 max-w-xl mx-auto text-sm md:text-[0.95rem]">Applied engineering across battery technologies and broad industrial processes.</p>
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
        <div className="group relative h-[60px] w-full max-w-[320px] perspective-1000" data-cursor="hover">
            <div className="w-full h-full transition-all duration-500 transform-style-3d group-hover:rotate-y-180 cursor-default">
                {/* Front */}
                <div className="absolute inset-0 bg-white border border-[#1A1829]/10 rounded-2xl flex items-center justify-center shadow-sm backface-hidden group-hover:shadow-md transition-shadow">
                    <span className="font-heading font-medium text-[0.95rem] text-[#1A1829]">{skill.name}</span>
                </div>
                {/* Back */}
                <div className="absolute inset-0 bg-[#FF6B4A] rounded-2xl flex items-center justify-center p-3 backface-hidden rotate-y-180 shadow-lg text-white">
                    <span className="font-outfit text-[11px] text-center leading-tight font-medium">{skill.desc}</span>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div data-cursor="hover">
                            <h3 className="font-heading font-semibold text-xl md:text-2xl text-[#1A1829] mb-4">Core Competencies</h3>
                            <div className="space-y-6">
                                {SKILL_CATEGORIES.map((cat, i) => (
                                    <div key={i}>
                                        <h4 className="font-data text-[10px] uppercase tracking-widest text-[#FF6B4A] mb-3">{cat.category}</h4>
                                        <div className="flex flex-col gap-3">
                                            {cat.skills.map((s, idx) => <SkillChip key={idx} skill={s} />)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/40 p-6 rounded-[2rem] border border-[#1A1829]/5" data-cursor="hover">
                            <h3 className="font-heading font-semibold text-xl md:text-2xl text-[#1A1829] mb-4">Engineering Philosophy</h3>
                            <div className="space-y-4 text-[#1A1829]/80 font-outfit text-sm leading-relaxed">
                                <p>
                                    I believe the best engineers operate where the math meets the metal. It is not enough to simulate a perfect process; you have to understand the physical constraints of the hardware, the flow dynamics, and the operational realities of the plant floor.
                                </p>
                                <p>
                                    Whether I am analyzing bioleaching kinetics to recover lithium, or monitoring electrocoating baths on a production line, my approach remains the same:
                                    <strong> Isolate variables, model the ideal state, and engineer robust, sustainable pathways to achieve it.</strong>
                                </p>
                            </div>
                        </div>
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
                    <p className="phil-text font-outfit text-xl md:text-2xl text-[#FAF8F5]/60 mb-8 max-w-2xl mx-auto" data-cursor="hover">
                        Most approaches focus on: <span className="text-white">immediate short-term yields.</span>
                    </p>
                    <h2 className="phil-text font-heading font-medium text-4xl md:text-6xl text-white leading-tight mb-8" data-cursor="hover">
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
                <div className="max-w-4xl mx-auto text-center" data-cursor="hover">
                    <h2 className="font-heading font-bold text-4xl md:text-6xl text-[#1A1829] mb-4">Let's Connect</h2>
                    <p className="font-outfit text-sm md:text-base text-[#1A1829]/70 mb-10">I am currently looking for full-time opportunities in process engineering, sustainable materials, and modeling.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a href="mailto:shivam100401@gmail.com" className="group flex flex-col items-center gap-3 bg-white/60 p-6 rounded-3xl hover:bg-white transition-colors" data-cursor="magnetic">
                            <div className="w-12 h-12 bg-[#FF6B4A]/10 text-[#FF6B4A] rounded-full flex items-center justify-center group-hover:bg-[#FF6B4A] group-hover:text-white transition-colors">
                                <i data-lucide="mail"></i>
                            </div>
                            <span className="font-heading font-semibold text-[#1A1829] text-[0.95rem]">Direct Email</span>
                            <span className="font-outfit text-xs text-[#1A1829]/50">shivam100401@gmail.com</span>
                        </a>

                        <a href="https://linkedin.com/in/shivam100401" target="_blank" className="group flex flex-col items-center gap-3 bg-white/60 p-6 rounded-3xl hover:bg-white transition-colors" data-cursor="magnetic">
                            <div className="w-12 h-12 bg-[#4A90E2]/10 text-[#4A90E2] rounded-full flex items-center justify-center group-hover:bg-[#4A90E2] group-hover:text-white transition-colors">
                                <i data-lucide="linkedin"></i>
                            </div>
                            <span className="font-heading font-semibold text-[#1A1829] text-[0.95rem]">LinkedIn Network</span>
                            <span className="font-outfit text-xs text-[#1A1829]/50">Connect professionally</span>
                        </a>

                        <a href="#" className="group flex flex-col items-center gap-3 bg-white/60 p-6 rounded-3xl hover:bg-white transition-colors" data-cursor="magnetic">
                            <div className="w-12 h-12 bg-[#1A1829]/10 text-[#1A1829] rounded-full flex items-center justify-center group-hover:bg-[#1A1829] group-hover:text-white transition-colors">
                                <i data-lucide="file-text"></i>
                            </div>
                            <span className="font-heading font-semibold text-[#1A1829] text-[0.95rem]">Full Resume</span>
                            <span className="font-outfit text-xs text-[#1A1829]/50">Download specifications</span>
                        </a>
                    </div>
                </div>

                <p className="mt-12 text-center font-data text-[10px] text-[#1A1829]/40 uppercase tracking-widest">
                    © {new Date().getFullYear()} Shivam Patel. Designed with Precision.
                </p>
            </section>

            <footer className="bg-[#1A1829] text-[#FAF8F5] pt-20 pb-12 px-6 md:px-16 rounded-t-[3rem] relative z-10 w-full">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                    <div>
                        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 tracking-tight">{BRAND_NAME}</h2>
                        <p className="font-outfit text-lg opacity-60 max-w-xs">{JOB_TITLE}</p>
                    </div>

                    <div className="flex md:justify-end font-outfit">
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

    usePolymorphicCursor();

    return (
        <div className="min-h-screen">
            <div id="cursor-dot"></div>
            <div id="cursor-shell"></div>
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
