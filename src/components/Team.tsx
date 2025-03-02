import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Mail } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  email: string;
  description: string;
  image: string;
  index: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, email, description, image, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="relative rounded-lg overflow-hidden aspect-square gradient-border">
            <motion.div 
              className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-30"
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut" 
              }}
            ></motion.div>
            <motion.img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover rounded-lg relative"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <motion.h3 
            className="text-xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {name}
          </motion.h3>
          <motion.p 
            className="text-primary-400 font-medium mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {role}
          </motion.p>
          <motion.p 
            className="text-gray-400 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            {description}
          </motion.p>
          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <motion.a 
              href={`mailto:${email}`} 
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              aria-label={`Email ${name}`}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(14, 165, 233, 0.2)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="h-5 w-5 text-primary-400" />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/company/navnote" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              aria-label={`${name}'s LinkedIn`}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(14, 165, 233, 0.2)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="h-5 w-5 text-primary-400" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

interface AdvisorProps {
  name: string;
  role: string;
  companies: string;
  index: number;
}

const Advisor: React.FC<AdvisorProps> = ({ name, role, companies, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div 
        className="text-center"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        <motion.h4 
          className="text-lg font-bold"
          animate={inView ? { 
            color: ['#ffffff', '#38bdf8', '#ffffff'],
          } : {}}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
        >
          {name}
        </motion.h4>
        <p className="text-primary-400 text-sm">{role}</p>
        <p className="text-gray-400 text-xs">{companies}</p>
      </motion.div>
    </motion.div>
  );
};

const Team: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const teamMembers = [
    {
      name: "Esmaeil Mousavi",
      role: "Founder & Owner",
      email: "esmaeil@navNote.net",
      description: "Artificial Intelligence & Machine Learning Lead Researcher / Teaching Fellow at Weber State, MIT, Harvard, NCWQR",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Niklas Kennedy",
      role: "Co-Founder & CEO",
      email: "niklas@navNote.net",
      description: "Mainframe System Engineer, UX/UI Developer, Association for Computing Machinery President at IBM, ACM, Weber State",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const advisors = [
    { name: "Fadi Chehadé", role: "CEO, & Founder", companies: "Ethos Capital, ICANN, RosettaNet" },
    { name: "Todd Kammeyer", role: "President", companies: "Fred Meyer, Kroger Co." },
    { name: "Mohammad Ehteshami", role: "Founder, Chairman, CEO", companies: "Beehive Industries, GE Aviation" },
    { name: "Majid Samarghandi", role: "Chairman & CEO", companies: "Triton Service Inc." },
    { name: "Cody Squadroni", role: "Business Owner, Professor", companies: "Weber State University" },
    { name: "Siavash Aa'rabi", role: "Tech Co-Founder & Entrepreneur", companies: "University of Sothern California" },
    { name: "Tim Border", role: "Entrepreneur, Professor", companies: "Fortune 500 Companies Consultant" },
    { name: "Brent Warnock", role: "Founder, President", companies: "Landvoice, Inc., Weber State University" }
  ];

  return (
    <section id="team" ref={sectionRef} className="section bg-gray-900 relative">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ y, opacity }}
      >
        <motion.div 
          className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-primary-500/5 filter blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-secondary-500/5 filter blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our <motion.span 
              className="gradient-text inline-block"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Team
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Meet the innovators behind navNote's revolutionary technology.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              email={member.email}
              description={member.description}
              image={member.image}
              index={index}
            />
          ))}
        </div>

        <motion.div
          className="text-center max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h3 
            className="text-2xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Advisory Board
          </motion.h3>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Special thanks to our advisory board members who provide invaluable guidance.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {advisors.map((advisor, index) => (
            <Advisor
              key={index}
              name={advisor.name}
              role={advisor.role}
              companies={advisor.companies}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;