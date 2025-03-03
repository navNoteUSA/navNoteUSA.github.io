import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Mail } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass p-5 rounded-xl hover:shadow-lg transition-all"
    >
      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple/20 to-accent/20 rounded-full flex items-center justify-center mb-3">
        <span className="text-xl font-bold">{name.charAt(0)}</span>
      </div>
      <h3 className="text-lg font-semibold text-center mb-1">{name}</h3>
      <p className="text-gray-400 text-sm text-center mb-2">{role}</p>
      <p className="text-xs text-gray-500 text-center">{credentials}</p>
    </motion.div>
  );
};

const TeamPage: React.FC = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      email: "sarah@navnote.com",
      credentials: "Former Product Lead at Google, Stanford MBA",
      linkedinUrl: "https://linkedin.com/",
      isFounder: true
    },
    {
      name: "Michael Chen",
      role: "CTO",
      email: "michael@navnote.com",
      credentials: "MIT Computer Science, Ex-Amazon",
      linkedinUrl: "https://linkedin.com/",
      isFounder: false
    },
    {
      name: "Aisha Patel",
      role: "Head of Design",
      email: "aisha@navnote.com",
      credentials: "RISD Graduate, 10+ years in UX/UI",
      linkedinUrl: "https://linkedin.com/",
      isFounder: false
    },
    {
      name: "David Williams",
      role: "VP of Engineering",
      email: "david@navnote.com",
      credentials: "Ex-Microsoft, 15+ years in software development",
      linkedinUrl: "https://linkedin.com/",
      isFounder: false
    },
    {
      name: "Elena Rodriguez",
      role: "Head of Marketing",
      email: "elena@navnote.com",
      credentials: "Harvard Business School, Former CMO at Trello",
      linkedinUrl: "https://linkedin.com/",
      isFounder: false
    },
    {
      name: "James Wilson",
      role: "Head of AI Research",
      email: "james@navnote.com",
      credentials: "PhD in Machine Learning, Published Researcher",
      linkedinUrl: "https://linkedin.com/",
      isFounder: false
    }
  ];

  // Advisory board data
  const advisors = [
    {
      name: "Dr. Robert Zhang",
      role: "AI Ethics Advisor",
      credentials: "Professor of AI Ethics at Stanford"
    },
    {
      name: "Maria Santos",
      role: "Business Strategy",
      credentials: "Partner at TechVentures Capital"
    },
    {
      name: "John Andersson",
      role: "Technical Advisor",
      credentials: "Former CTO at Dropbox"
    },
    {
      name: "Patricia Okonkwo",
      role: "UX Research Advisor",
      credentials: "Head of Research at Adobe"
    }
  ];

  return (
    <>
      <Navbar />
      
      <section id="team" className="py-20 md:py-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-hex-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-black/90"></div>
        <div className="absolute left-0 right-0 top-0 h-40 bg-gradient-to-b from-black to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h1>
            <p className="text-lg text-gray-300">
              Meet the passionate individuals behind navNote who are dedicated to creating a revolutionary 
              experience for organizing your digital life.
            </p>
          </motion.div>
          
          {/* Team members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={member.name}
                name={member.name}
                role={member.role}
                email={member.email}
                credentials={member.credentials}
                index={index}
                linkedinUrl={member.linkedinUrl}
                isFounder={member.isFounder}
              />
            ))}
          </div>
          
          {/* Advisory Board */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Advisory Board</h2>
            <p className="text-gray-300">
              Our advisory board consists of industry leaders who provide guidance and expertise 
              to help navNote achieve its mission.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {advisors.map((advisor, index) => (
              <Advisor
                key={advisor.name}
                name={advisor.name}
                role={advisor.role}
                credentials={advisor.credentials}
                index={index}
              />
            ))}
          </div>
          
          {/* Join the team section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto mt-24 text-center"
          >
            <div className="bg-dark/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-blue-glow">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Team</h2>
              <p className="text-gray-300 mb-6">
                We're always looking for talented individuals who are passionate about creating 
                intuitive, AI-powered solutions. Check out our open positions.
              </p>
              <a 
                href="mailto:careers@navnote.com" 
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary hover:bg-secondary/90 text-white rounded-lg transition-colors shadow-lg shadow-secondary/20"
              >
                View Open Positions
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer onOpenPrivacyPolicy={() => {}} />
    </>
  );
};

export default TeamPage; 