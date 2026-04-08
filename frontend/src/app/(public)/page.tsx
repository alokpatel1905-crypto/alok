'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Users, 
  School, 
  BookOpen, 
  Star, 
  CheckCircle2, 
  ChevronRight,
  Target,
  Lightbulb,
  Zap,
  Quote
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function PublicHomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-50 via-white to-blue-50 -z-10" />
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-emerald-200/30 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-[-5%] w-[30%] h-[30%] bg-blue-200/20 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-emerald-100/80 backdrop-blur-sm border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              <ShieldCheck size={14} />
              UN ECOSOC Special Consultative Status
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Empowering <span className="text-emerald-600">Students</span> for a Better <span className="text-sky-500 text-glow-blue">Future</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
              Join the global force in greening education. We provide career guidance, institutional rankings, and sustainability insights to climatize global learning.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/programs" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 group transition-all hover:scale-105 active:scale-95"
              >
                Explore Programs
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/about" 
                className="bg-white border-2 border-slate-100 hover:border-emerald-600/20 hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
                alt="Students Collaboration" 
                className="w-full h-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
            </div>
            {/* Floating Card */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-slate-50 hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Star fill="currentColor" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">4.9/5</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Student Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-emerald-600 font-black text-sm uppercase tracking-[0.3em]">Core Features</h2>
            <h3 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Everything you need to lead the sustainable transition.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Target} 
              title="Career Guidance" 
              description="Personalized pathways for students to align their careers with global sustainability goals."
              color="emerald"
            />
            <FeatureCard 
              icon={Zap} 
              title="Institution Rankings" 
              description="Independent, data-driven rankings of the world's greenest schools and universities."
              color="sky"
            />
            <FeatureCard 
              icon={Users} 
              title="Events & Webinars" 
              description="Access to global conferences like NYC Green School and World Education Forum."
              color="indigo"
            />
            <FeatureCard 
              icon={Lightbulb} 
              title="Certifications" 
              description="Earn globally recognized credentials in Green Teaching and Sustainability Leadership."
              color="amber"
            />
          </div>
        </div>
      </section>

      {/* 3. STATISTICS SECTION */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-2">
              <div className="text-6xl lg:text-7xl font-black text-emerald-400 tracking-tighter">10,000+</div>
              <div className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">Empowered Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-6xl lg:text-7xl font-black text-sky-400 tracking-tighter">500+</div>
              <div className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">Partner Institutions</div>
            </div>
            <div className="space-y-2">
              <div className="text-6xl lg:text-7xl font-black text-teal-400 tracking-tighter">200+</div>
              <div className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">Global Programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TOP INSTITUTIONS GRID */}
      <section className="py-32 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-emerald-600 font-black text-sm uppercase tracking-[0.3em] mb-4">Our Network</h2>
              <h3 className="text-4xl font-black text-slate-900 leading-tight">Trusted by Leading Global Institutions</h3>
            </div>
            <Link href="/institutions" className="group flex items-center gap-2 text-emerald-600 font-bold hover:gap-4 transition-all">
              View All Partners <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
             {/* Mock Logos */}
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="h-20 bg-white rounded-2xl flex items-center justify-center p-6 shadow-sm border border-slate-100 font-black text-slate-300 text-xl tracking-tighter italic">
                 INSTITUTE {i}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <Quote size={60} className="text-emerald-100 fill-emerald-100" />
              <h3 className="text-5xl font-black text-slate-900 tracking-tight">Hear it from our <span className="text-emerald-600">Sustainability</span> Leaders.</h3>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Our students and partner institutions are at the forefront of the ecological revolution in global education.
              </p>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all"><ArrowRight className="rotate-180" size={20}/></button>
                <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all"><ArrowRight size={20}/></button>
              </div>
            </div>

            <div className="bg-emerald-600 rounded-[40px] p-12 text-white relative shadow-2xl shadow-emerald-600/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 -translate-y-20 blur-3xl" />
              <div className="space-y-8 relative z-10">
                <div className="flex gap-1 text-amber-300">
                  <Star fill="currentColor" size={18}/>
                  <Star fill="currentColor" size={18}/>
                  <Star fill="currentColor" size={18}/>
                  <Star fill="currentColor" size={18}/>
                  <Star fill="currentColor" size={18}/>
                </div>
                <p className="text-2xl font-bold leading-relaxed italic">
                  "Green Mentors transformed our curriculum into a powerful tool for climate action. Our students are now not just learners, but ecological stewards."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl" />
                  <div>
                    <div className="font-black text-lg">Dr. Sarah Jenkins</div>
                    <div className="text-emerald-100 text-sm font-bold uppercase tracking-widest">Director, Eco-University</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LATEST NEWS / BLOG PREVIEW */}
      <section className="py-32 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-emerald-600 font-black text-sm uppercase tracking-[0.3em]">Insights</h2>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Stay Updated with Global Education News</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <BlogCard 
              image="https://images.unsplash.com/photo-1544650039-202c5d259295?auto=format&fit=crop&q=80&w=600"
              category="Climate News"
              title="Green School Conference NYC: Key Takeaways for 2026"
              date="April 12, 2026"
            />
            <BlogCard 
              image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600"
              category="Career Tips"
              title="How to Build a Career in the Green Economy"
              date="April 08, 2026"
            />
            <BlogCard 
              image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600"
              category="Research"
              title="The Impact of Nature-Based Learning on Student Wellbeing"
              date="April 05, 2026"
            />
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-emerald-600 to-sky-600 rounded-[48px] p-16 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-emerald-600/30">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10 relative z-10"
          >
            <h2 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight">Start Your Journey <br />Towards a Sustainable Today.</h2>
            <p className="text-xl text-emerald-50 max-w-2xl mx-auto font-medium leading-relaxed">
              Join thousands of students and institutions in creating an ecologically neutral world through responsible education.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <button className="bg-white text-emerald-600 px-10 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-black/10 hover:scale-105 active:scale-95 transition-all">Join the Force</button>
              <button className="bg-transparent border-2 border-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/10 hover:border-white transition-all">Contact Us</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color }: any) {
  const colors: any = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-600/5",
    sky: "bg-sky-50 text-sky-600 border-sky-100 shadow-sky-600/5",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100 shadow-indigo-600/5",
    amber: "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-600/5",
  };

  return (
    <motion.div 
      variants={fadeIn}
      className="bg-white border border-slate-100 p-8 rounded-[32px] hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-2 group"
    >
      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-500 group-hover:scale-110", colors[color])}>
        <Icon size={32} />
      </div>
      <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
}

function BlogCard({ image, category, title, date }: any) {
  return (
    <div className="group cursor-pointer">
      <div className="relative h-64 rounded-[32px] overflow-hidden mb-6 shadow-lg">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 shadow-sm">
          {category}
        </div>
      </div>
      <div className="space-y-3 px-2">
        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">{date}</div>
        <h4 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">{title}</h4>
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
          Read Article <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
}