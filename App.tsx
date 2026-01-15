
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroScene } from './components/AutoScene';
import { StepsFlow, ObjectionCard, GoalTracker } from './components/SalesComponents';
import { ScriptModal } from './components/ScriptModal';
import { BookOpen, Map, Phone, MousePointer2, TrendingUp, Award, UserCheck, ShieldCheck, ChevronDown, Menu, X, CheckCircle2, Zap } from 'lucide-react';

const ChapterCard = ({ title, subtitle, icon: Icon, delay }: { title: string, subtitle: string, icon: any, delay: string }) => (
  <div 
    className="group animate-fade-in-up bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
    style={{ animationDelay: delay }}
  >
    <div className="w-12 h-12 rounded-lg gradient-blue flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="font-heading font-bold text-hyundai-blue text-lg mb-1">{title}</h3>
    <p className="text-stone-500 text-sm">{subtitle}</p>
  </div>
);

const Section = ({ id, title, children, bg = "bg-white" }: { id: string, title: string, children?: React.ReactNode, bg?: string }) => (
  <section id={id} className={`py-20 ${bg} border-b border-stone-100`}>
    <div className="container mx-auto px-6">
      <div className="mb-12">
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-hyundai-light block mb-2">{id.replace('-', ' ')}</span>
        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-hyundai-blue uppercase">{title}</h2>
        <div className="w-20 h-2 bg-hyundai-light mt-4"></div>
      </div>
      {children}
    </div>
  </section>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeScript, setActiveScript] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openScript = (id: string) => {
    setActiveScript(id);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-hyundai-bg font-sans selection:bg-hyundai-light selection:text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-hyundai-blue shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center font-bold text-hyundai-blue text-xl">H</div>
            <div className={`transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              <h1 className="text-white font-heading font-black tracking-tighter text-lg leading-none uppercase">Crossroads</h1>
              <p className="text-hyundai-light text-[10px] font-bold tracking-[0.2em] uppercase leading-none mt-1">Sales Playbook</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold tracking-widest text-white/80">
            <button onClick={() => scrollTo('philosophy')} className="hover:text-hyundai-light uppercase transition-colors">Philosophy</button>
            <button onClick={() => scrollTo('inventory')} className="hover:text-hyundai-light uppercase transition-colors">Inventory</button>
            <button onClick={() => scrollTo('why-hyundai')} className="hover:text-hyundai-light uppercase transition-colors">Why Hyundai</button>
            <button onClick={() => scrollTo('the-process')} className="hover:text-hyundai-light uppercase transition-colors">The Process</button>
            <button onClick={() => scrollTo('objections')} className="hover:text-hyundai-light uppercase transition-colors">Objections</button>
          </div>

          <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden gradient-blue">
        <HeroScene />
        <div className="relative z-10 container mx-auto px-6 pt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <span className="inline-block px-4 py-1 border border-hyundai-light text-hyundai-light text-xs font-bold tracking-[0.4em] uppercase mb-8 backdrop-blur-sm">
              Success is Planned
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white uppercase leading-[0.9] mb-8 drop-shadow-2xl">
              Master the <br/><span className="text-hyundai-light italic">Art of Selling</span>
            </h1>
            <p className="max-w-xl text-white/70 text-lg md:text-xl font-light leading-relaxed mb-12">
              Transform from an order taker to a closing superstar with the Crossroads Hyundai Sales Masterclass.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <button onClick={() => scrollTo('the-process')} className="bg-white text-hyundai-blue px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-hyundai-light hover:text-white transition-all shadow-xl">
                Start Playbook
              </button>
              <button onClick={() => scrollTo('goals')} className="bg-hyundai-light/20 text-white border border-hyundai-light/40 px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-hyundai-light/40 transition-all">
                My Daily Goals
              </button>
            </div>
          </motion.div>

          {/* Daily Drill Card in Hero as indicated by user's screenshot placement */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.4 }}
            className="hidden lg:block relative z-20"
          >
            <div className="mb-4 flex items-center gap-2">
              <Zap className="text-hyundai-light" size={20} />
              <span className="text-xs font-bold text-white/60 uppercase tracking-[0.3em]">Daily Objection Drill</span>
            </div>
            <ObjectionCard />
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ChevronDown size={32} />
        </div>
      </header>

      {/* Philosophy Section */}
      <Section id="philosophy" title="The Three Pillars" bg="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-hyundai-bg rounded-2xl border-t-4 border-hyundai-blue">
            <UserCheck className="text-hyundai-blue mb-6" size={48} />
            <h3 className="text-2xl font-heading font-bold mb-4">Selling Yourself</h3>
            <p className="text-stone-600 leading-relaxed">
              Build trust and connection through genuine enthusiasm and professional grooming. Share personal stories to create rapport. Customers buy you before they buy the car.
            </p>
          </div>
          <div className="p-8 bg-hyundai-bg rounded-2xl border-t-4 border-hyundai-light">
            <Award className="text-hyundai-light mb-6" size={48} />
            <h3 className="text-2xl font-heading font-bold mb-4">The Dealership</h3>
            <p className="text-stone-600 leading-relaxed">
              Tell our story of volume pricing and customer loyalty. We prioritize long-term relationships over short-term profits. "Friends and family first."
            </p>
          </div>
          <div className="p-8 bg-hyundai-bg rounded-2xl border-t-4 border-hyundai-silver">
            <ShieldCheck className="text-hyundai-silver mb-6" size={48} />
            <h3 className="text-2xl font-heading font-bold mb-4">The Product</h3>
            <p className="text-stone-600 leading-relaxed">
              Convey passion for the vehicle's safety, warranty, and features. Focus on what makes Hyundai a smarter choice without bashing competitors.
            </p>
          </div>
        </div>
      </Section>

      {/* Inventory Knowledge */}
      <Section id="inventory" title="Know Your Product" bg="bg-[#001A3D] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xl text-white/80 italic mb-8 border-l-4 border-hyundai-light pl-6">
              "Your ability to sell is based on how well you know your product." — Brian Tracy
            </p>
            <h4 className="text-2xl font-bold mb-6">Daily Lot Walk (15 Min)</h4>
            <ul className="space-y-4">
              {[
                "Note specific models, trims, and colors locations.",
                "Check condition and cleanliness (Room-ready?).",
                "Identify 'Turn Pieces' (High-demand models).",
                "Spot 'Fresh Trade-Ins' with unique value.",
                "Note special features (Premium audio, safety tech)."
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-hyundai-light flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <TrendingUp className="text-hyundai-light mb-4" />
                <h5 className="font-bold mb-2">Speeds Up Sales</h5>
                <p className="text-xs text-white/50">Reduces hesitation by suggesting high-turnover vehicles instantly.</p>
             </div>
             <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <ShieldCheck className="text-hyundai-light mb-4" />
                <h5 className="font-bold mb-2">Builds Trust</h5>
                <p className="text-xs text-white/50">Shows professionalism and deep product knowledge.</p>
             </div>
             <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <Zap className="text-hyundai-light mb-4" />
                <h5 className="font-bold mb-2">Enables Persuasion</h5>
                <p className="text-xs text-white/50">Use inventory scarcity to create urgency and closes.</p>
             </div>
             <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <UserCheck className="text-hyundai-light mb-4" />
                <h5 className="font-bold mb-2">Fresh Trades</h5>
                <p className="text-xs text-white/50">Capitalize on higher profit potential of one-of-a-kind used cars.</p>
             </div>
          </div>
        </div>
      </Section>

      {/* Why Hyundai */}
      <Section id="why-hyundai" title="Why Buy Hyundai?" bg="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ChapterCard title="Best Warranty" subtitle="10-Year/100,000-mile powertrain limited warranty." icon={ShieldCheck} delay="0s" />
          <ChapterCard title="Reliability" subtitle="Top marks from J.D. Power and Consumer Reports." icon={TrendingUp} delay="0.1s" />
          <ChapterCard title="Safety Leader" subtitle="More total IIHS awards than any other brand." icon={ShieldCheck} delay="0.2s" />
          <ChapterCard title="Loyalty" subtitle="#1 ranked for customer loyalty for 11 years." icon={Award} delay="0.3s" />
        </div>
        <div className="mt-12 p-8 bg-hyundai-bg rounded-3xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
             <h4 className="font-heading font-black text-hyundai-blue uppercase">EV Leadership</h4>
             <p className="text-sm text-stone-600">Ioniq 5 & 6: 80% charge in under 20 minutes. $400 charging credits available.</p>
          </div>
          <div className="flex flex-col gap-4 border-x border-stone-200 px-8">
             <h4 className="font-heading font-black text-hyundai-blue uppercase">Smart Tech</h4>
             <p className="text-sm text-stone-600">Bluelink remote start, vehicle tracking, and voice commands on most models.</p>
          </div>
          <div className="flex flex-col gap-4">
             <h4 className="font-heading font-black text-hyundai-blue uppercase">Resale Value</h4>
             <p className="text-sm text-stone-600">Consistently holds value better than rivals, offering a solid return.</p>
          </div>
        </div>
      </Section>

      {/* The Sales Process */}
      <Section id="the-process" title="Steps to the Sale" bg="bg-hyundai-bg">
        <p className="text-center text-stone-500 max-w-2xl mx-auto mb-16 uppercase tracking-widest text-sm font-bold">
          Follow the 9-step blueprint for a consistent closing rate and high customer satisfaction.
        </p>
        <StepsFlow />
      </Section>

      {/* Objections & Closing */}
      <Section id="objections" title="Handling Objections" bg="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h4 className="text-2xl font-bold text-hyundai-blue mb-6">The C.R.I.C. Method</h4>
            <div className="space-y-4 mb-8">
               <div className="flex items-center gap-4 bg-hyundai-bg p-4 rounded-lg">
                  <div className="w-8 h-8 rounded-full gradient-blue text-white flex items-center justify-center font-bold">C</div>
                  <div><span className="font-bold">Clarify:</span> "So when you say the price is too high..."</div>
               </div>
               <div className="flex items-center gap-4 bg-hyundai-bg p-4 rounded-lg">
                  <div className="w-8 h-8 rounded-full gradient-blue text-white flex items-center justify-center font-bold">R</div>
                  <div><span className="font-bold">Reiterate:</span> "Sounds like you're like me and everyone else..."</div>
               </div>
               <div className="flex items-center gap-4 bg-hyundai-bg p-4 rounded-lg">
                  <div className="w-8 h-8 rounded-full gradient-blue text-white flex items-center justify-center font-bold">I</div>
                  <div><span className="font-bold">Isolate:</span> "Other than that, is there anything else?"</div>
               </div>
               <div className="flex items-center gap-4 bg-hyundai-bg p-4 rounded-lg">
                  <div className="w-8 h-8 rounded-full gradient-blue text-white flex items-center justify-center font-bold">C</div>
                  <div><span className="font-bold">Close:</span> Ask for the sale again.</div>
               </div>
            </div>
            <div className="p-6 bg-red-50 border border-red-100 rounded-xl">
               <h5 className="font-bold text-red-700 flex items-center gap-2 mb-2">
                 <Zap size={16} /> SPEED KILLS SALES
               </h5>
               <p className="text-sm text-red-600 leading-relaxed">
                 Spend less than 60 minutes with a customer? 6% buy. Spend 100+ minutes? 57% deliver (6 out of 10). Persistence and time spent builds the deal.
               </p>
            </div>
          </div>
          <div>
            <ObjectionCard />
          </div>
        </div>
      </Section>

      {/* Goal Tracker */}
      <Section id="goals" title="Your Daily Success" bg="bg-hyundai-bg">
        <div className="max-w-4xl mx-auto">
          <GoalTracker />
          <div className="mt-12 text-center text-stone-400 text-sm italic">
            "Your income can grow only to the extent you do!" — T. Harv Eker
          </div>
        </div>
      </Section>

      {/* Script Modal */}
      <ScriptModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        scriptId={activeScript} 
      />

      {/* Footer */}
      <footer className="bg-hyundai-blue text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center font-bold text-hyundai-blue">H</div>
              <h2 className="font-heading font-black text-2xl uppercase tracking-tighter">Crossroads Hyundai</h2>
            </div>
            <p className="text-white/60 max-w-sm mb-6">
              This digital playbook is for Crossroads Hyundai internal training. All rights reserved. Success starts with preparation.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-hyundai-light">Quick Scripts</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li onClick={() => openScript('phone-up')} className="hover:text-hyundai-light cursor-pointer transition-colors">Phone-Up Script</li>
              <li onClick={() => openScript('internet-lead')} className="hover:text-hyundai-light cursor-pointer transition-colors">Internet Lead Process</li>
              <li onClick={() => openScript('trial-closes')} className="hover:text-hyundai-light cursor-pointer transition-colors">Trial Closes</li>
              <li onClick={() => openScript('negotiation')} className="hover:text-hyundai-light cursor-pointer transition-colors">Negotiation Worksheet</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-hyundai-light">Certification</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li onClick={() => openScript('performance-inst')} className="hover:text-hyundai-light cursor-pointer transition-colors">Hyundai Performance Inst.</li>
              <li onClick={() => openScript('csi-excellence')} className="hover:text-hyundai-light cursor-pointer transition-colors">CSI Excellence</li>
              <li onClick={() => openScript('star-money')} className="hover:text-hyundai-light cursor-pointer transition-colors">STAR Money Tracking</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Crossroads Hyundai of Loveland. Optimized for Sales Professionals.
        </div>
      </footer>
      
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-hyundai-blue flex flex-col items-center justify-center gap-8 text-2xl font-heading font-bold text-white uppercase tracking-widest">
           <button onClick={() => scrollTo('philosophy')}>Philosophy</button>
           <button onClick={() => scrollTo('inventory')}>Inventory</button>
           <button onClick={() => scrollTo('why-hyundai')}>Why Hyundai</button>
           <button onClick={() => scrollTo('the-process')}>The Process</button>
           <button onClick={() => scrollTo('objections')}>Objections</button>
           <button onClick={() => setMenuOpen(false)} className="mt-8 p-4 rounded-full border border-white/20"><X /></button>
        </div>
      )}
    </div>
  );
};

export default App;
