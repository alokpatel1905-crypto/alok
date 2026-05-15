'use client';

import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, PerspectiveCamera, Environment, Float, 
  Sphere, MeshDistortMaterial, TorusKnot, Points, PointMaterial,
  Text, Stars, MeshWobbleMaterial, ContactShadows, PresentationControls
} from '@react-three/drei';
import * as THREE from 'three';
import { 
  Globe, Leaf, Zap, ShieldCheck, Trophy, Users, GraduationCap, 
  School, BookOpen, Search, ArrowRight, Menu, X, Mail, MapPin, 
  Phone, Facebook, Twitter, Instagram, Linkedin, ChevronDown, 
  Star, Calendar, ArrowUpRight, Award, Waves
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- THEME CONSTANTS ---
const COLORS = {
  deepForest: '#0d2818',
  emerald: '#1a4d2e',
  lime: '#4ade80',
  gold: '#f59e0b',
  white: '#ffffff',
  offWhite: '#f0fdf4',
  darkBg: '#030f06'
};

// --- 3D COMPONENTS ---

function AnimatedGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <group scale={1.5}>
      {/* Wireframe Earth */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color={COLORS.lime} 
          wireframe 
          transparent 
          opacity={0.3} 
          emissive={COLORS.lime}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Location Points */}
      <Points ref={pointsRef}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <PointMaterial 
          color={COLORS.gold} 
          size={0.015} 
          sizeAttenuation 
          transparent 
          opacity={0.8} 
        />
      </Points>

      {/* Atmosphere Glow */}
      <Sphere args={[1.1, 32, 32]}>
        <meshStandardMaterial 
          color={COLORS.emerald} 
          transparent 
          opacity={0.05} 
          side={THREE.BackSide} 
        />
      </Sphere>
    </group>
  );
}

function FloatingParticles({ count = 2000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  return (
    <Points positions={points}>
      <PointMaterial 
        color={COLORS.lime} 
        size={0.02} 
        sizeAttenuation 
        transparent 
        opacity={0.2} 
        depthWrite={false} 
      />
    </Points>
  );
}

function AboutVisual() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <TorusKnot ref={ref} args={[1, 0.3, 128, 32]}>
        <MeshDistortMaterial 
          color={COLORS.lime} 
          speed={3} 
          distort={0.4} 
          metalness={0.8} 
          roughness={0.2} 
        />
      </TorusKnot>
    </Float>
  );
}

function ElementOrb({ color, position, label, index }: any) {
  const [hovered, setHovered] = useState(false);
  return (
    <group position={position}>
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.5, 64, 64]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered ? 2 : 1} 
            metalness={0.9} 
            roughness={0.1} 
          />
        </mesh>
      </Float>
      {hovered && (
        <Text
          position={[0, 1, 0]}
          fontSize={0.2}
          color="white"
          font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD7K_7ZAfY7XJp__939NDp-m_57p_3vT_T_T.woff"
        >
          {label}
        </Text>
      )}
    </group>
  );
}

// --- HTML COMPONENTS ---

const Section = ({ children, className, id }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section 
      id={id}
      ref={ref}
      className={cn("min-h-screen relative flex items-center overflow-hidden", className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
};

const Card3D = ({ children, className }: any) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setRotate({ x: x * 20, y: y * -20 });
  };
  
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn("perspective-1000", className)}
    >
      {children}
    </motion.div>
  );
};

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: any) => setPos({ x: e.clientX, y: e.clientY });
    const hover = () => setHovered(true);
    const unhover = () => setHovered(false);
    
    window.addEventListener('mousemove', move);
    document.querySelectorAll('button, a').forEach(el => {
      el.addEventListener('mouseenter', hover);
      el.addEventListener('mouseleave', unhover);
    });
    
    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-lime-400 pointer-events-none z-[1000] hidden lg:block"
      animate={{ 
        x: pos.x - 16, 
        y: pos.y - 16,
        scale: hovered ? 2 : 1,
        backgroundColor: hovered ? 'rgba(74, 222, 128, 0.2)' : 'transparent'
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
};

// --- MAIN PAGE ---

export default function ExperiencePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-darkBg text-white selection:bg-lime-400 selection:text-darkBg font-inter">
      <CustomCursor />
      
      {/* NAVBAR */}
      <nav className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-8 py-6 flex items-center justify-between",
        scrolled ? "bg-darkBg/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-lime-400 rounded-xl flex items-center justify-center rotate-6">
            <Leaf className="text-darkBg" size={24} />
          </div>
          <span className="text-2xl font-display font-black tracking-tighter italic">GREEN MENTORS</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10">
          {['Home', 'About', 'Programs', 'Impact', 'Events', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-lime-400 transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <button className="bg-lime-400 text-darkBg px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-lime-400/20">
            Get Accredited
          </button>
        </div>

        <button className="lg:hidden text-white" onClick={() => setMobileMenu(true)}>
          <Menu size={32} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[200] bg-darkBg flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-8 right-8 text-white" onClick={() => setMobileMenu(false)}>
              <X size={40} />
            </button>
            {['Home', 'About', 'Programs', 'Impact', 'Events', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-4xl font-display font-black tracking-tighter italic hover:text-lime-400" onClick={() => setMobileMenu(false)}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO */}
      <Section id="home" className="h-screen pt-24">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <AnimatedGlobe />
              <FloatingParticles />
              <Environment preset="night" />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="container mx-auto px-8 relative z-10 grid lg:grid-cols-2 items-center h-full pointer-events-none">
          <div className="space-y-10 pointer-events-auto">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10"
              >
                <ShieldCheck size={16} className="text-lime-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">UN ECOSOC CERTIFIED SPECIAL CONSULTATIVE STATUS</span>
              </motion.div>
              <h1 className="text-7xl md:text-[10rem] font-display font-black tracking-tighter leading-none italic">
                Educating <br /> <span className="text-lime-400">the Planet.</span>
              </h1>
              <p className="text-xl md:text-3xl text-white/40 font-medium italic leading-relaxed max-w-xl">
                Saving the future through responsible and sustainable education across 40+ sovereign nations.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6">
              <button className="bg-lime-400 text-darkBg px-10 py-6 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-lime-400/20 hover:scale-110 active:scale-95 transition-all">
                Get Accredited
              </button>
              <button className="border border-white/20 hover:border-lime-400 hover:bg-lime-400/5 px-10 py-6 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all">
                Explore Programs
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20">
          <span className="text-[10px] font-black uppercase tracking-widest">Scroll to Explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </div>
      </Section>

      {/* SECTION 2: STATS */}
      <Section className="py-24 bg-darkBg/50">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Green Schools', value: '2,000+', icon: School },
              { label: 'Universities', value: '200+', icon: GraduationCap },
              { label: 'Educators', value: '50,000+', icon: Users },
              { label: 'Countries', value: '40+', icon: Globe },
            ].map((stat, i) => (
              <Card3D key={i} className="group">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] text-center space-y-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-lime-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-16 h-16 bg-lime-400/10 rounded-2xl mx-auto flex items-center justify-center text-lime-400 transition-transform group-hover:scale-110">
                    <stat.icon size={32} />
                  </div>
                  <div>
                    <h4 className="text-4xl md:text-6xl font-display font-black italic tracking-tighter mb-2">{stat.value}</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">{stat.label}</p>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 3: ABOUT */}
      <Section id="about" className="py-24 lg:py-48">
        <div className="container mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-lime-400 text-sm font-black uppercase tracking-[0.4em]">Our Legacy</span>
              <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter italic leading-none">
                Born in India, <br /> Scaling <span className="text-white/20">Global.</span>
              </h2>
            </div>
            <p className="text-2xl text-white/60 leading-relaxed italic font-medium">
              Founded in 2017 (concept 2010) in Gujarat, India, by UNGA Award winner Virendra Rawat, Green Mentors has evolved into the world's premier sustainability architecture for education.
            </p>
            <div className="grid grid-cols-2 gap-12">
              {[
                { title: 'UN ECOSOC', desc: 'Special Consultative Status since 2021' },
                { title: 'UNESCO', desc: 'Greening Education Partnership Member' }
              ].map((item, i) => (
                <div key={i} className="space-y-4">
                  <div className="text-2xl font-display font-black italic text-lime-400">{item.title}</div>
                  <p className="text-sm text-white/40 font-bold uppercase tracking-widest">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[600px] bg-emerald-950/20 rounded-[4rem] border border-white/5 relative group">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Suspense fallback={null}>
                <AboutVisual />
                <Environment preset="forest" />
                <ambientLight intensity={0.5} />
              </Suspense>
            </Canvas>
            <div className="absolute bottom-10 left-10 p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 max-w-xs group-hover:scale-105 transition-transform">
               <Quote size={32} className="text-lime-400 mb-4" />
               <p className="text-sm italic font-medium text-white/60">"The best time to plant a tree was 20 years ago. The second best time is now."</p>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 4: PROGRAMS */}
      <Section id="programs" className="py-24 lg:py-48 bg-[#020a04]">
        <div className="container mx-auto px-8 space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-6xl md:text-9xl font-display font-black tracking-tighter italic leading-none">
              Strategic <span className="text-lime-400">Pillars.</span>
            </h2>
            <p className="text-xl text-white/30 uppercase tracking-[0.5em] font-black">Transitioning Educational Ecosystems</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: 'Green School', s: 'Campus Transition', i: School, d: 'Converting existing schools into nature-inspired, carbon-neutral environments.' },
              { t: 'Green University', s: 'Global Leadership', i: GraduationCap, d: 'Integrating sustainability into higher education governance and campus operations.' },
              { t: 'Teacher Training', s: 'Capacity Building', i: Users, d: 'Empowering educators with climate-conscious pedagogical skills.' },
              { t: 'Green Graduate', s: 'Future Workforce', i: Award, d: 'Preparing graduates for the high-demand global green economy.' },
              { t: 'Curriculum Design', s: 'Nature Pedagogy', i: BookOpen, d: 'Developing nature-mimicking curricula aligned with UN SDGs.' },
              { t: 'Accreditation', s: 'Audit & Verify', i: ShieldCheck, d: 'Global benchmark for verified sustainable institutional excellence.' },
            ].map((prog, i) => (
              <div key={i} className="group h-[450px] [perspective:1000px]">
                <motion.div 
                  className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                >
                  {/* Front */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[4rem] p-12 flex flex-col justify-between [backface-visibility:hidden]">
                    <div className="w-20 h-20 bg-lime-400/10 rounded-3xl flex items-center justify-center text-lime-400">
                      <prog.i size={40} />
                    </div>
                    <div className="space-y-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-lime-400">{prog.s}</span>
                      <h3 className="text-4xl font-display font-black tracking-tighter italic">{prog.t}</h3>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 bg-lime-400 border border-lime-400/20 rounded-[4rem] p-12 flex flex-col justify-between text-darkBg [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <p className="text-2xl font-display font-bold italic leading-tight">
                      {prog.d}
                    </p>
                    <button className="bg-darkBg text-white py-6 rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3">
                      Apply Now <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 5: FIVE ELEMENTS */}
      <Section className="py-24 lg:py-48">
        <div className="container mx-auto px-8 relative h-[800px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 10] }}>
              <Suspense fallback={null}>
                <group rotation={[0.5, 0, 0]}>
                  <ElementOrb index={0} color="#8b5e3c" position={[0, 4, 0]} label="SOIL" />
                  <ElementOrb index={1} color="#3b82f6" position={[3.8, 1.2, 0]} label="WATER" />
                  <ElementOrb index={2} color="#94a3b8" position={[2.4, -3.2, 0]} label="AIR" />
                  <ElementOrb index={3} color="#f59e0b" position={[-2.4, -3.2, 0]} label="ENERGY" />
                  <ElementOrb index={4} color="#10b981" position={[-3.8, 1.2, 0]} label="SPACES" />
                </group>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} />
              </Suspense>
            </Canvas>
          </div>
          
          <div className="relative z-10 text-center space-y-8 max-w-2xl pointer-events-none">
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-lime-400">The Framework</span>
             <h2 className="text-7xl md:text-9xl font-display font-black tracking-tighter italic leading-none">Five Elements of <br /> <span className="text-white/20">Existence.</span></h2>
             <p className="text-xl text-white/50 italic leading-relaxed">
               Our accreditation protocol audits institutions across five core natural dimensions, aligning education with the biological rhythm of the planet.
             </p>
          </div>
        </div>
      </Section>

      {/* SECTION 6: IMPACT MAP */}
      <Section id="impact" className="py-24 lg:py-48 bg-emerald-950/10">
        <div className="container mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center h-full">
           <div className="space-y-12">
              <h2 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter italic leading-none">40+ Sovereign <br /> <span className="text-lime-400">Impact.</span></h2>
              <div className="space-y-10">
                 {[
                   { n: 'India', s: '1200+ Schools' },
                   { n: 'UAE', s: '150+ Schools' },
                   { n: 'USA', s: '80+ Institutions' },
                 ].map((c, i) => (
                   <div key={i} className="flex items-end justify-between border-b border-white/5 pb-6">
                      <span className="text-4xl font-display font-black italic">{c.n}</span>
                      <span className="text-lime-400 font-black uppercase tracking-widest text-[10px]">{c.s}</span>
                   </div>
                 ))}
              </div>
              <button className="flex items-center gap-4 text-lime-400 font-black uppercase tracking-[0.4em] text-[10px] hover:gap-8 transition-all">
                View All Nodes <ArrowRight size={20} />
              </button>
           </div>
           <div className="h-[700px] relative">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <Suspense fallback={null}>
                  <PresentationControls 
                    global 
                    snap={true} 
                    rotation={[0, 0.3, 0]} 
                    polar={[-Math.PI / 3, Math.PI / 3]} 
                    azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                  >
                    <AnimatedGlobe />
                  </PresentationControls>
                  <Environment preset="night" />
                </Suspense>
              </Canvas>
           </div>
        </div>
      </Section>

      {/* SECTION 7: EVENTS */}
      <Section id="events" className="py-24 lg:py-48">
        <div className="container mx-auto px-8 space-y-24 overflow-visible">
           <div className="flex flex-col md:flex-row items-end justify-between gap-10">
              <h2 className="text-6xl md:text-9xl font-display font-black tracking-tighter italic leading-none">Global <br /> <span className="text-lime-400">Summits.</span></h2>
              <p className="text-xl text-white/30 uppercase tracking-[0.5em] font-black pb-4">Strategic Timeline 2023-2025</p>
           </div>
           
           <div className="flex gap-8 overflow-x-auto pb-20 no-scrollbar perspective-1000">
              {[
                { name: 'NYC Green School', date: 'SEP 2023', loc: 'New York, USA', color: 'bg-emerald-900/50' },
                { name: 'Davos Edu Forum', date: 'JAN 2024', loc: 'Davos, Switzerland', color: 'bg-lime-900/50' },
                { name: 'National Principal', date: 'MAR 2024', loc: 'Ahmedabad, India', color: 'bg-blue-900/50' },
                { name: 'NYC Green School', date: 'SEP 2024', loc: 'New York, USA', color: 'bg-indigo-900/50' },
                { name: 'NYC Green School', date: 'SEP 2025', loc: 'New York, USA', color: 'bg-purple-900/50' },
              ].map((ev, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05, translateZ: 50 }}
                  className="min-w-[400px] h-[550px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[4rem] p-12 flex flex-col justify-between relative overflow-hidden group shadow-2xl"
                >
                   <div className={cn("absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity", ev.color)} />
                   <div className="space-y-4 relative z-10">
                      <span className="text-lime-400 font-black tracking-[0.4em] text-[10px]">{ev.date}</span>
                      <h3 className="text-5xl font-display font-black tracking-tighter leading-tight italic">{ev.name} <br /> Conference.</h3>
                   </div>
                   <div className="space-y-8 relative z-10">
                      <div className="flex items-center gap-4 text-white/40">
                         <MapPin size={24} className="text-lime-400" />
                         <span className="text-lg font-medium italic">{ev.loc}</span>
                      </div>
                      <button className="w-full bg-white text-darkBg py-6 rounded-full text-xs font-black uppercase tracking-widest hover:bg-lime-400 transition-colors">
                        Protocol Details
                      </button>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </Section>

      {/* SECTION 8: TESTIMONIALS */}
      <Section className="py-24 lg:py-48 bg-[#031106]">
        <div className="container mx-auto px-8 relative h-[600px] overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <h2 className="text-[25rem] font-display font-black italic tracking-tighter select-none">VOICES.</h2>
           </div>
           
           <div className="relative z-10 h-full flex items-center justify-center">
              <div className="grid md:grid-cols-3 gap-12 w-full max-w-6xl">
                 {[
                   { q: 'Green Mentors transformed our school\'s approach completely.', n: 'Dr. Sarah Mitchell', t: 'Principal', s: 'Green Valley School, UK' },
                   { q: 'Our teachers are now climate champions thanks to the training.', n: 'Prof. Rajesh Kumar', t: 'Vice Chancellor', s: 'Sunrise University, India' },
                   { q: 'The accreditation process was thorough and the support was world-class.', n: 'Fatima Al-Hassan', t: 'Director', s: 'Future Academy, UAE' },
                 ].map((t, i) => (
                   <motion.div 
                    key={i}
                    whileHover={{ y: -20 }}
                    className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[3rem] space-y-10 relative group shadow-3xl"
                   >
                      <Star className="text-lime-400 fill-lime-400" size={32} />
                      <p className="text-2xl font-display font-bold italic leading-snug">"{t.q}"</p>
                      <div className="pt-6 border-t border-white/10">
                         <div className="font-black italic text-xl tracking-tighter">{t.n}</div>
                         <div className="text-[10px] font-black uppercase tracking-widest text-lime-400 mt-2">{t.t} // {t.s}</div>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </Section>

      {/* SECTION 9: ACCREDITATION CTA */}
      <Section id="accreditation" className="py-24 lg:py-48 relative">
        <div className="absolute inset-0 z-0">
           <Canvas>
              <Suspense fallback={null}>
                 <Float speed={5} rotationIntensity={2} floatIntensity={2}>
                    <TorusKnot position={[4, 2, 0]} args={[1, 0.3, 128, 32]}>
                       <MeshWobbleMaterial color={COLORS.emerald} factor={0.5} speed={2} />
                    </TorusKnot>
                    <Sphere position={[-4, -2, 0]} args={[1.5, 32, 32]}>
                       <MeshDistortMaterial color={COLORS.lime} distort={0.5} speed={3} />
                    </Sphere>
                 </Float>
                 <Environment preset="night" />
              </Suspense>
           </Canvas>
        </div>
        
        <div className="container mx-auto px-8 relative z-10 text-center space-y-20">
           <div className="space-y-10">
              <h2 className="text-7xl md:text-[10rem] font-display font-black tracking-tighter italic leading-none">Ready to <br /> <span className="text-lime-400 underline decoration-white/20 underline-offset-20">Go Green?</span></h2>
              <p className="text-2xl text-white/40 font-medium italic max-w-3xl mx-auto">
                Join the world's most elite sustainability education network. Start your accreditation protocol today.
              </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {['Apply Online', 'Green Audit', 'Get Certified'].map((step, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl group hover:bg-lime-400 hover:text-darkBg transition-all duration-500 shadow-2xl">
                   <div className="text-4xl font-display font-black italic opacity-20 mb-6">0{i+1}</div>
                   <div className="text-2xl font-display font-black italic tracking-tighter">{step}</div>
                </div>
              ))}
           </div>
           
           <button className="bg-lime-400 text-darkBg px-16 py-10 rounded-full text-xl font-black uppercase tracking-[0.3em] shadow-[0_0_100px_rgba(74,222,128,0.3)] hover:scale-110 active:scale-95 transition-all">
             Start Accreditation
           </button>
        </div>
      </Section>

      {/* SECTION 10: AWARDS */}
      <Section className="py-24 border-y border-white/5">
        <div className="flex overflow-hidden group">
           <div className="flex animate-scroll whitespace-nowrap py-10 gap-20 items-center">
              {[
                'UNGA AWARD 2019', 'UNESCO PARTNER 2021', 'UN ECOSOC CERTIFIED', 
                'AASHE MEMBER', 'UNESCO GREENING EDUCATION PARTNER', 'UNGA AWARD 2019', 
                'UNESCO PARTNER 2021', 'UN ECOSOC CERTIFIED', 'AASHE MEMBER'
              ].map((award, i) => (
                <div key={i} className="flex items-center gap-6">
                   <Trophy className="text-lime-400" size={32} />
                   <span className="text-5xl font-display font-black italic tracking-tighter text-white/20 group-hover:text-white transition-colors uppercase">{award}</span>
                </div>
              ))}
           </div>
        </div>
      </Section>

      {/* SECTION 11: NEWSLETTER */}
      <Section className="py-24 lg:py-48">
        <div className="container mx-auto px-8">
           <div className="bg-gradient-to-br from-emerald-950 to-darkBg rounded-[5rem] p-16 lg:p-32 border border-white/5 relative overflow-hidden shadow-3xl">
              <div className="absolute top-0 right-0 w-full h-full opacity-10">
                 <Canvas>
                    <Suspense fallback={null}>
                       <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={2} />
                    </Suspense>
                 </Canvas>
              </div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                 <div className="space-y-10">
                    <h2 className="text-6xl md:text-8xl font-display font-black italic tracking-tighter leading-none">Join the <br /> <span className="text-lime-400">Movement.</span></h2>
                    <p className="text-2xl text-white/40 italic font-medium">Get strategic sustainability insights delivered to your institutional inbox.</p>
                 </div>
                 <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Enter administrative email" 
                      className="w-full bg-white/5 border border-white/10 rounded-full px-10 py-8 text-xl font-medium outline-none focus:border-lime-400 transition-all backdrop-blur-xl"
                    />
                    <button className="absolute right-3 top-3 bottom-3 bg-lime-400 text-darkBg px-10 rounded-full font-black uppercase tracking-widest text-xs shadow-xl">
                      Subscribe
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#010502] pt-32 pb-12 px-8">
        <div className="container mx-auto grid lg:grid-cols-4 gap-24 border-b border-white/5 pb-24">
          <div className="space-y-10">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-lime-400 rounded-2xl flex items-center justify-center">
                 <Leaf className="text-darkBg" size={24} />
               </div>
               <span className="text-3xl font-display font-black tracking-tighter italic">GREEN MENTORS</span>
             </div>
             <p className="text-xl text-white/30 italic leading-relaxed">Educating the planet for a sustainable future through nature-inspired architecture.</p>
             <div className="flex gap-6">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-lime-400 hover:text-darkBg transition-all">
                    <Icon size={20} />
                  </a>
                ))}
             </div>
          </div>
          
          <div className="space-y-10">
             <h4 className="text-lg font-black uppercase tracking-widest text-white/20 italic">Navigation</h4>
             <ul className="space-y-6">
                {['About Us', 'Programs', 'Impact', 'Events', 'Accreditation'].map((l) => (
                  <li key={l}><a href="#" className="text-xl font-bold italic text-white/60 hover:text-lime-400 transition-colors">{l}</a></li>
                ))}
             </ul>
          </div>

          <div className="space-y-10">
             <h4 className="text-lg font-black uppercase tracking-widest text-white/20 italic">Contact Node 01 (India)</h4>
             <div className="space-y-6 text-white/60 italic font-medium">
                <div className="flex gap-4">
                   <MapPin className="text-lime-400 shrink-0" size={24} />
                   <span>B-802, Mondeal Heights, S.G. Highway, Ahmedabad 380015</span>
                </div>
                <div className="flex gap-4">
                   <Phone className="text-lime-400 shrink-0" size={24} />
                   <span>+91 79 49000160</span>
                </div>
                <div className="flex gap-4">
                   <Mail className="text-lime-400 shrink-0" size={24} />
                   <span>info@greenmentors.in</span>
                </div>
             </div>
          </div>

          <div className="space-y-10">
             <h4 className="text-lg font-black uppercase tracking-widest text-white/20 italic">Contact Node 02 (USA)</h4>
             <div className="space-y-6 text-white/60 italic font-medium">
                <div className="flex gap-4">
                   <MapPin className="text-lime-400 shrink-0" size={24} />
                   <span>401, 67 W Street, Brooklyn, NY 11222</span>
                </div>
                <div className="flex gap-4">
                   <Phone className="text-lime-400 shrink-0" size={24} />
                   <span>+1 718 673 3942</span>
                </div>
             </div>
          </div>
        </div>
        
        <div className="container mx-auto pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">&copy; 2026 GREEN MENTORS. ALL RIGHTS RESERVED. ECO-DESIGNED BY ANTIGRAVITY.</p>
           <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-white/20 italic">
              <a href="#" className="hover:text-lime-400">Privacy Protocol</a>
              <a href="#" className="hover:text-lime-400">Terms of Existence</a>
           </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Playfair+Display:ital,wght@0,900;1,900&display=swap');
        
        body {
          cursor: none;
        }

        .font-display {
          font-family: 'Playfair Display', serif;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}

function Quote({ size, className }: any) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H5c-1.25 0-2 .75-2 2v3c0 1.25.75 2 2 2h3c0 1.5-1 4-4 4" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-3c-1.25 0-2 .75-2 2v3c0 1.25.75 2 2 2h3c0 1.5-1 4-4 4" />
    </svg>
  );
}
