
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Phone, Globe, MessageSquare, Calculator, Award, Star, TrendingUp } from 'lucide-react';

interface ScriptContent {
  title: string;
  icon: any;
  sections: {
    heading?: string;
    content: string | string[];
    isScript?: boolean;
  }[];
}

const playbookContent: Record<string, ScriptContent> = {
  'phone-up': {
    title: 'Phone-Up Script',
    icon: Phone,
    sections: [
      { heading: 'Opening', content: 'Crossroads Hyundai this is [Your Name], how can I help you?', isScript: true },
      { content: 'I am familiar with that vehicle, we have had a lot of interest in it.' },
      { heading: 'Used Vehicle Probe', content: 'Are you looking for that exact vehicle or something similar style or price? You have great taste!', isScript: true },
      { heading: 'New Vehicle Probe', content: 'Are there certain features you are after? Model? Colors?', isScript: true },
      { heading: 'The "Hold" Technique', content: 'I’ll have to check that the vehicle is still available, it will only take me a few minutes. So I can call you back, what’s your first name? And last name? And the best phone number to reach you at? I just thought of something, do you mind holding for just a moment? [Hold...]', isScript: true },
      { heading: 'The Close (Appointment)', content: 'Great news, that vehicle is available! There has been some interest in that vehicle, is there anyway you can come down right now or later today? I can either do [Time A] or [Time B]. Which works best for you? Do you think we could do it at :15 or :45?', isScript: true },
    ]
  },
  'internet-lead': {
    title: 'Internet Lead Process',
    icon: Globe,
    sections: [
      { heading: 'Response Time', content: 'FAST! Within 5 minutes of the lead coming in.' },
      { heading: 'Initial Contact Script', content: 'Hi this is [Name], your [Lead Source] representative at Crossroads Hyundai of Loveland. I received your inquiry on the 2025 Hyundai Santa Fe! Great choice! ... Why buy from us??', isScript: true },
      { heading: 'Appointment Setting', content: 'ALWAYS offer appointments with initial contact. "Does morning or afternoon typically work better for your schedule? Great, I have a 2:30pm or a 4:15pm, which works best for you?"', isScript: true },
      { heading: 'The 72 Hour Rule', content: 'Follow up must happen every day. If no attempt is made within 72 hours, the lead is transferred. Use the VIN app and voice-to-text for immediate notes.' }
    ]
  },
  'trial-closes': {
    title: 'Trial Closes (S.P.A.C.E.D.)',
    icon: MessageSquare,
    sections: [
      { heading: 'Landmark Summary Close', content: 'During the test drive, as you return to the dealership, use a landmark to trigger yesses.' },
      { heading: 'S.P.A.C.E.D. Questions', content: [
        'Safety: "How was it having those blind spot indicators to help you?"',
        'Performance: "Does the vehicle have the acceleration you are looking for?"',
        'Appearance: "Is this the right color you were wanting? It looks good on you!"',
        'Comfort: "How is the comfort of the seats and the ease of getting in and out?"',
        'Economy/Dependability: "Does it have the features you are looking for?"'
      ], isScript: true },
      { heading: 'The "Sold Line" Close', content: 'As you pull back in: "Go ahead and pull into our sold line so no one takes your car. Do you want to register the vehicle in one name or two?"', isScript: true }
    ]
  },
  'negotiation': {
    title: 'Negotiation Worksheet',
    icon: Calculator,
    sections: [
      { heading: 'Steps to Presenting', content: [
        '1. Deliver numbers with enthusiasm: "Great news! The vehicle is available."',
        '2. "Let’s go over your pricing."',
        '3. Point with a pen, don’t just say the numbers.',
        '4. Sell the deal: "You are not going to believe this!"',
        '5. Highlight trade value and tax savings.',
        '6. Cover Protected options and ask: "Which one of those options works best for you?"',
        '7. BE SILENT.'
      ] },
      { heading: 'Removing Emotion', content: 'They are just numbers on a paper. Your job is to confidently present them. Trust that they will spend their money on something else if they don’t spend it here.' }
    ]
  },
  'performance-inst': {
    title: 'Hyundai Performance Institute',
    icon: Award,
    sections: [
      { heading: 'Certification Requirements', content: [
        'Register with HMA/DLR ID.',
        'Complete training modules on models and customer engagement.',
        'Maintain a CSI score of 900 or higher.'
      ]},
      { heading: 'The Impact', content: 'Certification is MANDATORY. It unlocks eligibility for bonuses and incentives. It ensures you represent Hyundai’s commitment to quality.' }
    ]
  },
  'csi-excellence': {
    title: 'CSI Excellence',
    icon: Star,
    sections: [
      { heading: 'The Score', content: 'A score of 9 or 10 is considered EXCELLENT. 8 or below is a FAIL.' },
      { heading: 'The Survey Script', content: '“In a few days you will be receiving a Survey... I am the only one impacted by that survey. And anything less than perfect is a Fail for me. Have I earned a perfect score today? If for any reason you feel like you cannot give me a 10, can you please call me so that I can make it right?”', isScript: true },
      { heading: 'Why It Matters', content: 'High CSI scores directly impact dealership inventory allocation and your personal bonuses.' }
    ]
  },
  'star-money': {
    title: 'STAR Money Tracking',
    icon: TrendingUp,
    sections: [
      { heading: 'Eligibility', content: 'Requires Hyundai Certification and a CSI score averaging 900 or above.' },
      { heading: 'Bonus Structure', content: 'Earn $50–$150 per 100% survey score. Payouts increase if the dealership exceeds target thresholds.' },
      { heading: 'Warning', content: 'You will lose your STAR money if you drop under 900. Surveys are critical to success!' }
    ]
  }
};

interface ScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  scriptId: string | null;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({ isOpen, onClose, scriptId }) => {
  const content = scriptId ? playbookContent[scriptId] : null;
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!content) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-hyundai-blue/90 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="gradient-blue p-6 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <content.icon size={24} className="text-hyundai-light" />
                </div>
                <h3 className="text-2xl font-heading font-bold">{content.title}</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto space-y-8">
              {content.sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  {section.heading && (
                    <h4 className="text-xs font-bold uppercase tracking-widest text-hyundai-light">
                      {section.heading}
                    </h4>
                  )}
                  {section.isScript ? (
                    <div className="relative group">
                      <div className="p-5 bg-hyundai-bg rounded-xl border-l-4 border-hyundai-blue italic text-lg leading-relaxed text-stone-700">
                        {Array.isArray(section.content) ? (
                          <ul className="space-y-3">
                            {section.content.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        ) : (
                          section.content
                        )}
                        <button 
                          onClick={() => handleCopy(Array.isArray(section.content) ? section.content.join('\n') : section.content)}
                          className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-stone-50"
                        >
                          {copied === (Array.isArray(section.content) ? section.content.join('\n') : section.content) ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-stone-400" />}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-stone-600 leading-relaxed">
                      {Array.isArray(section.content) ? (
                        <ul className="space-y-2 list-disc pl-5">
                          {section.content.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      ) : (
                        <p>{section.content}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-hyundai-bg border-t border-stone-200 text-center text-xs text-stone-400 font-bold uppercase tracking-widest">
              Crossroads Hyundai Sales Excellence Program
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
