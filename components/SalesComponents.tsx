
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, HelpCircle, MessageSquare, Target, BookOpen, Zap } from 'lucide-react';

// --- STEPS TO THE SALE ---
const steps = [
  { id: 1, title: 'Meet & Greet', desc: 'Create a positive first impression to build trust.' },
  { id: 2, title: 'Trade Appraisal', desc: 'Devalue the trade tactfully with the customer.' },
  { id: 3, title: 'Discovery', desc: 'Find their "Why" and investigate layers deep.' },
  { id: 4, title: 'Vehicle Selection', desc: 'Narrow down inventory to 1 perfect car.' },
  { id: 5, title: 'Walkaround', desc: 'Showcase value using Feature-Advantage-Benefit.' },
  { id: 6, title: 'Demo Drive', desc: 'Highlight strengths and create mental ownership.' },
  { id: 7, title: 'Trial Closes', desc: 'Gauge readiness and address barriers early.' },
  { id: 8, title: 'Negotiate', desc: 'Agree on terms that satisfy both parties.' },
  { id: 9, title: 'Delivery', desc: 'Deliver a memorable experience and foster loyalty.' },
];

export const StepsFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-hyundai-blue/10 max-w-4xl mx-auto my-12">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {steps.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(idx)}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
              activeStep === idx 
                ? 'bg-hyundai-blue text-white scale-110 shadow-lg ring-4 ring-hyundai-light/20' 
                : 'bg-hyundai-bg text-hyundai-blue hover:bg-hyundai-blue/10'
            }`}
          >
            {step.id}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-center p-6 bg-hyundai-bg/50 rounded-xl border-l-4 border-hyundai-blue"
        >
          <h3 className="text-2xl font-heading font-bold text-hyundai-blue mb-2">{steps[activeStep].title}</h3>
          <p className="text-stone-600 text-lg leading-relaxed">{steps[activeStep].desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- COMPREHENSIVE FLASHCARD DATA FROM DOCUMENT ---
const flashcards = [
  // Page 28: Top Objections
  { category: "OBJECTION", q: "Not buying today / Just looking.", a: "I agree, it’s always good to make sure you’re making the right decision. With our volume pricing, now is a great time to buy. Let's go check it out." },
  { category: "OBJECTION", q: "Need to talk to Spouse/Partner/Family.", a: "Other than your spouse/partner, does everything else make sense? Is there anything about the vehicle they wouldn't approve of? Let's get the numbers for them to see." },
  { category: "OBJECTION", q: "Need to think about it.", a: "I understand. Usually when someone says they need to think about it, it's either the car, the dealership, or the numbers. Which one is it for you?" },
  { category: "OBJECTION", q: "Comparing different vehicles.", a: "That's smart. What other models are you considering? I'd love to show you how the Hyundai's warranty and safety features stack up against them." },
  { category: "OBJECTION", q: "Short on time.", a: "I respect your time. If we could get the numbers worked out in the next 15 minutes, would that help you make a decision today?" },
  { category: "OBJECTION", q: "This is our first stop / just started looking.", a: "I'm glad you started here! We volume price our vehicles so you get the absolute best deal without having to visit 5 other stores. Let's find your perfect car." },
  { category: "OBJECTION", q: "Price is too high.", a: "C.R.I.C: Clarify, Reiterate, Isolate, Close. 'Other than the price, is there anything else holding you back from taking this home?'" },
  { category: "OBJECTION", q: "Monthly payments are too expensive.", a: "Think about it as $3.30 a day—less than a coffee. Is the safety of your family and a 10-year warranty worth a coffee a day?" },
  { category: "OBJECTION", q: "Not sure about the car.", a: "Let's go back to the discovery. What features were most important to you? Maybe there's another model on the lot that fits your needs even better." },
  { category: "OBJECTION", q: "Trade-in value is too low.", a: "I understand. Other than the trade-in value, does everything else about the deal make sense? Let's see if we can close that gap for you." },
  { category: "OBJECTION", q: "Interest rate is too high.", a: "Rates are set by the banks, but we can look at stretching the term or more money down to hit your target payment. Does that make sense?" },
  { category: "OBJECTION", q: "I don’t want to finance the vehicle.", a: "We can definitely look at cash options. Other than the financing, is there anything else that would hold you back today?" },
  { category: "OBJECTION", q: "I don’t have to buy anything.", a: "You're 100% right! You're in control. Let's just make sure we find the perfect car that you actually *want* to have in your driveway." },
  
  // Page 23: Trial Closes
  { category: "TRIAL CLOSE", q: "How does it feel compared to your old vehicle?", a: "I knew you would like it! It's a massive step up in technology and comfort, isn't it?" },
  { category: "TRIAL CLOSE", q: "Is this the right color you were wanting?", a: "I think it looks good on you! It really makes the car stand out." },
  { category: "TRIAL CLOSE", q: "How was it having those blind spot indicators?", a: "Very nice! It's one of those safety features that makes driving so much more relaxing." },
  { category: "TRIAL CLOSE", q: "Does it have the cargo space you are wanting?", a: "Perfect! It's designed to handle everything from groceries to long road trips with ease." },
  { category: "TRIAL CLOSE", q: "Does the vehicle have the acceleration you need?", a: "Excellent! Hyundai's engineering really shines when you need that extra power on the highway." },
  { category: "TRIAL CLOSE", q: "Do you want to register in one name or two?", a: "Perfect. Let's go ahead and grab the keys to your new car and finalize the details inside." }
];

export const ObjectionCard: React.FC<{ hideControls?: boolean }> = ({ hideControls = false }) => {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setCurrent((prev) => (prev + 1) % flashcards.length);
    setFlipped(false);
  };

  const prevCard = () => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1));
    setFlipped(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div 
        onClick={() => setFlipped(!flipped)}
        className="relative h-80 w-full cursor-pointer perspective-1000"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          className="w-full h-full relative preserve-3d"
        >
          {/* Front: White Background with Blue Text */}
          <div className="absolute inset-0 backface-hidden bg-white text-hyundai-blue rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl border-2 border-hyundai-blue">
             <HelpCircle className="mb-4 text-hyundai-light" size={40} />
             <h4 className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-hyundai-light mb-2">
               {flashcards[current].category}
             </h4>
             <p className="text-2xl font-bold leading-tight italic">"{flashcards[current].q}"</p>
             <div className="mt-8 px-4 py-2 bg-hyundai-bg rounded-full text-[10px] font-black tracking-widest uppercase opacity-60">
               Click to see response
             </div>
          </div>
          
          {/* Back: Blue Background with White Text (Inverted as requested) */}
          <div className="absolute inset-0 backface-hidden bg-hyundai-blue text-white rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl rotate-y-180">
             <MessageSquare className="mb-4 text-hyundai-light" size={40} />
             <h4 className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-white/60 mb-2">PROVEN RESPONSE</h4>
             <p className="text-lg leading-relaxed font-medium italic">"{flashcards[current].a}"</p>
             <div className="mt-8 px-4 py-2 bg-white/10 rounded-full text-[10px] font-black tracking-widest uppercase opacity-60">
               Click to flip back
             </div>
          </div>
        </motion.div>
      </div>
      
      {!hideControls && (
        <div className="flex items-center justify-between mt-8">
          <button 
            onClick={(e) => { e.stopPropagation(); prevCard(); }}
            className="group flex items-center gap-2 px-6 py-3 bg-stone-200 rounded-full font-bold text-stone-600 hover:bg-stone-300 transition-all active:scale-95"
          >
            <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            PREV
          </button>
          <span className="text-xs font-bold text-stone-400">
            {current + 1} / {flashcards.length}
          </span>
          <button 
            onClick={(e) => { e.stopPropagation(); nextCard(); }}
            className="group flex items-center gap-2 px-6 py-3 bg-hyundai-blue text-white rounded-full font-bold hover:bg-hyundai-light transition-all shadow-lg active:scale-95"
          >
            NEXT
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

// --- GOAL TRACKER ---
export const GoalTracker: React.FC = () => {
  const [goals, setGoals] = useState(['', '', '', '']);

  const updateGoal = (idx: number, val: string) => {
    const newGoals = [...goals];
    newGoals[idx] = val;
    setGoals(newGoals);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200">
      <div className="gradient-blue p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Target size={32} className="text-hyundai-light" />
          <h3 className="text-3xl font-heading font-bold">My Personal Goals</h3>
        </div>
        <p className="opacity-80">"Rarely does a person's income exceed their personal development."</p>
      </div>
      
      <div className="p-8 space-y-6">
        {goals.map((goal, idx) => (
          <div key={idx} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Goal {idx + 1}</label>
            <input 
              value={goal}
              onChange={(e) => updateGoal(idx, e.target.value)}
              placeholder="What makes you stretch?"
              className="w-full bg-hyundai-bg border-b-2 border-stone-300 p-4 focus:border-hyundai-light outline-none transition-all text-xl font-medium"
            />
          </div>
        ))}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3 italic text-stone-700">
           <Zap className="text-yellow-600 flex-shrink-0" />
           <p>People who write down their goals are 42% more likely to achieve them. Visualization takes it to the next level.</p>
        </div>
      </div>
    </div>
  );
};
