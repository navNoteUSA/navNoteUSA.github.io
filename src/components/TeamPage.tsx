import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Globe } from 'lucide-react';

const TeamPage: React.FC = () => {
  const founders = [
    {
      name: "Esmaeil Mousavi",
      title: "Founder",
      description: "Artificial Intelligence & Machine Learning Lead Researcher / Teaching Fellow @ Weber State, Collaborator@ Nvidia, MIT, Harvard, IBM, Perplexity, HPE, NCWQR",
      image: "/esmaeil-mousavi.jpg", 
      linkedin: "https://www.linkedin.com/in/mousavi-ai/",
      email: "Esmaeil@navNote.net",
      website: "www.weber.edu/east/mousavi"
    },
    {
      name: "Niklas Kennedy",
      title: "Co-Founder",
      description: "Mainframe System Engineer @ IBM , UX/UI Developer, President @ACM @Weber State",
      image: "/niklas-kennedy.jpg", 
      linkedin: "https://www.linkedin.com/in/niklas-kennedy-0a1a53198/",
      email: "Niklas@navNote.net",
      website: ""
    }
  ];
  
  const advisoryBoard = [
    {
      name: "Fadi Chehadé",
      title: "CEO & Founder",
      description: "Ethos Capital, ICANN, RosettaNet, Sr. Advisor: World Economic Forum, United Nations, Abry Partners, Microsoft, IBM, Oracle, HP and Nokia",
      image: "/advisor-placeholder.jpg"
    },
    {
      name: "Todd Kammeyer",
      title: "President",
      description: "Fred Meyer, Kroger Co.",
      image: "/advisor-placeholder.jpg"
    },
    {
      name: "Mohammad Ehteshami",
      title: "Founder, Chairman, CEO",
      description: "Beehive Industries, Ehteshami Construction, GE Aviation, Additive",
      image: "/advisor-placeholder.jpg"
    },
    {
      name: "Majid Samarghandi",
      title: "Chairman & CEO",
      description: "Triton Service Inc.",
      image: "/advisor-placeholder.jpg"
    },
    {
      name: "Cody Squadroni",
      title: "Business Owner, Professor",
      description: "Weber State University",
      image: "/advisor-placeholder.jpg"
    },
    {
      name: "Siavash Aa'rabi",
      title: "Tech Co-Founder & Entrepreneur",
      description: "University of Southern California",
      image: "/advisor-placeholder.jpg"
    },
    {
      name: "Tim Border",
      title: "Entrepreneur, Professor",
      description: "Fortune 500 Companies Consultant, Weber State University, TED X Special Speaker",
      image: "/advisor-placeholder.jpg"
    },
    {
      name: "Brent Warnock",
      title: "Founder, President, Business Owner & Professor",
      description: "Landvoice, Inc., Three Fountains, Weber State University",
      image: "/advisor-placeholder.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20 pb-20">
      <div className="container mx-auto px-4">
        {/* Founders Section */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the innovators behind navNote who are redefining task management with AI.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {founders.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl overflow-hidden shadow-xl"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden bg-blue-900/20">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/600x400/1e3a8a/ffffff?text=navNote';
                      }}
                    />
                  </div>
                  <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{member.name}</h2>
                      <p className="text-blue-400 font-medium mb-4">{member.title}</p>
                      <p className="text-gray-300">{member.description}</p>
                    </div>
                    <div className="flex space-x-4 mt-6">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                          <Linkedin size={20} />
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-gray-300 hover:text-blue-400 transition-colors">
                          <Mail size={20} />
                        </a>
                      )}
                      {member.website && (
                        <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                          <Globe size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Advisory Board Section */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 animate-gradient">Advisory Board</span>
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              ></motion.span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Special thanks to our distinguished advisory board members who provide invaluable guidance and expertise.
            </p>
          </motion.div>
          
          {/* Advisors Marquee - Row 1 */}
          <div className="relative overflow-hidden py-10 mb-1 bg-slate-900/20 backdrop-blur-sm border-t border-slate-800/50">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
            
            <motion.div 
              className="flex whitespace-nowrap"
              initial={{ x: 0 }}
              animate={{ x: [0, -2500] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear"
              }}
            >
              {/* Triple the advisory board to ensure continuous flow */}
              {[...advisoryBoard, ...advisoryBoard, ...advisoryBoard].map((advisor, index) => (
                <div key={index} className="inline-flex flex-col items-center mx-16 max-w-xs">
                  <h3 className="text-2xl md:text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-300">{advisor.name}</h3>
                  <p className="text-blue-400 text-sm font-medium">{advisor.title}</p>
                  <p className="text-gray-300 text-xs text-center mt-1 max-w-[200px] truncate">{advisor.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Advisors Marquee - Row 2 (Reverse Direction) */}
          <div className="relative overflow-hidden py-10 mb-4 bg-slate-900/30 backdrop-blur-sm border-b border-slate-800/50">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
            
            <motion.div 
              className="flex whitespace-nowrap"
              initial={{ x: -2500 }}
              animate={{ x: [-2500, 0] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear"
              }}
            >
              {/* Triple the advisory board to ensure continuous flow but reversed */}
              {[...advisoryBoard.slice().reverse(), ...advisoryBoard.slice().reverse(), ...advisoryBoard.slice().reverse()].map((advisor, index) => (
                <div key={index} className="inline-flex flex-col items-center mx-16 max-w-xs">
                  <h3 className="text-2xl md:text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-300">{advisor.name}</h3>
                  <p className="text-blue-400 text-sm font-medium">{advisor.title}</p>
                  <p className="text-gray-300 text-xs text-center mt-1 max-w-[200px] truncate">{advisor.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamPage; 