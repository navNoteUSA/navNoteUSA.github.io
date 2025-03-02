import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Mail } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  email: string;
  credentials: string;
  index: number;
  linkedinUrl: string;
  isFounder?: boolean;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, email, credentials, index, linkedinUrl, isFounder = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass p-6 rounded-xl hover:shadow-lg transition-all ${
        isFounder ? 'border border-accent/30' : ''
      }`}
    >
      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl font-bold text-gradient">{name.charAt(0)}</span>
      </div>
      <h3 className="text-xl font-semibold text-center mb-1">{name}</h3>
      <p className="text-gray-400 text-center mb-3">{role}</p>
      <p className="text-sm text-gray-500 text-center mb-4">{credentials}</p>
      <div className="flex justify-center gap-3">
        <a 
          href={`mailto:${email}`} 
          className="p-2 glass rounded-full hover:bg-accent/20 transition-colors"
          aria-label={`Email ${name}`}
        >
          <Mail size={18} />
        </a>
        <a 
          href={linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 glass rounded-full hover:bg-accent/20 transition-colors"
          aria-label={`${name}'s LinkedIn`}
        >
          <Linkedin size={18} />
        </a>
      </div>
    </motion.div>
  );
};

interface AdvisorProps {
  name: string;
  role: string;
  credentials: string;
  index: number;
}

const Advisor: React.FC<AdvisorProps> = ({ name, role, credentials, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass p-4 rounded-lg hover:bg-white/10 transition-all"
    >
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm text-gray-400">{role}</p>
      <p className="text-xs text-gray-500">{credentials}</p>
    </motion.div>
  );
};

const Team: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const founders = [
    {
      name: "Esmaeil Mousavi",
      role: "Founder & Owner",
      email: "esmaeil@navNote.net",
      credentials: "Artificial Intelligence & Machine Learning Lead Researcher / Teaching Fellow, Weber State, MIT, Harvard, NCWQR",
      linkedinUrl: "https://www.linkedin.com/in/mousavi-ai/"
    },
    {
      name: "Niklas Kennedy",
      role: "Co-Founder & CEO",
      email: "niklas@navNote.net",
      credentials: "Mainframe System Engineer, UX/UI Developer, Association for Computing Machinery President, IBM, ACM, Weber State",
      linkedinUrl: "https://www.linkedin.com/in/niklas-kennedy-0a1a53198/"
    }
  ];

  const advisors = [
    {
      name: "Fadi Chehadé",
      role: "CEO, & Founder",
      credentials: "Ethos Capital, ICANN, RosettaNet, Sr. Advisor: World Economic Forum, United Nations, Abry Partners, Microsoft, IBM, Oracle, HP and Nokia."
    },
    {
      name: "Todd Kammeyer",
      role: "President",
      credentials: "Fred Meyer, Kroger Co."
    },
    {
      name: "Mohammad Ehteshami",
      role: "Founder, Chairman, CEO",
      credentials: "Beehive Industries, Ehteshami Construction, GE Aviation, Additive"
    },
    {
      name: "Majid Samarghandi",
      role: "Chairman & CEO",
      credentials: "Triton Service Inc."
    },
    {
      name: "Cody Squadroni",
      role: "Business Owner, Professor",
      credentials: "Weber State University"
    },
    {
      name: "Siavash Aa'rabi",
      role: "Tech Co-Founder & Entrepreneur",
      credentials: "University of Sothern California"
    },
    {
      name: "Tim Border",
      role: "Entrepreneur, Professor",
      credentials: "Fortune 500 Companies Consultant, Weber State University, Ted X Special Speaker"
    },
    {
      name: "Brent Warnock",
      role: "Founder, President, Business Owner & Professor",
      credentials: "Landvoice, Inc., Three Fountains, Weber State University"
    }
  ];

  return (
    <section id="team" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary to-dark opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Our Team</h2>
          <p className="section-subheading">
            Meet the visionaries behind navNote who are redefining task management with AI.
          </p>
        </motion.div>
        
        {/* Founders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {founders.map((founder, index) => (
            <TeamMember
              key={index}
              name={founder.name}
              role={founder.role}
              email={founder.email}
              credentials={founder.credentials}
              linkedinUrl={founder.linkedinUrl}
              index={index}
              isFounder={true}
            />
          ))}
        </div>
        
        {/* Advisory Board */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Special Thanks to the Advisory Board Members</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {advisors.map((advisor, index) => (
              <Advisor
                key={index}
                name={advisor.name}
                role={advisor.role}
                credentials={advisor.credentials}
                index={index}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <div className="glass p-6 rounded-xl inline-block">
            <h3 className="text-xl font-semibold mb-2">navNote LLC</h3>
            <p className="text-gray-400">Utah-based LLC</p>
            <p className="text-gray-400">Cell: (385) 288-0722</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;