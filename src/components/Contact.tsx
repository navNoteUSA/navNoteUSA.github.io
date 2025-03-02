import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Building } from 'lucide-react';

const ContactCard: React.FC<{
  title: string;
  contact: string;
  type: 'email' | 'phone' | 'location';
  icon: React.ReactNode;
  description: string;
  index: number;
}> = ({ title, contact, type, icon, description, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getContactLink = () => {
    switch (type) {
      case 'email':
        return `mailto:${contact}`;
      case 'phone':
        return `tel:${contact.replace(/[^0-9+]/g, '')}`;
      default:
        return '#';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass p-6 rounded-xl hover:shadow-lg hover:shadow-accent/10 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg text-secondary">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-gray-400 text-sm mb-3">{description}</p>
          {type !== 'location' ? (
            <a 
              href={getContactLink()}
              className="inline-flex items-center text-secondary hover:text-accent transition-colors"
            >
              {type === 'email' && <Mail size={16} className="mr-2" />}
              {type === 'phone' && <Phone size={16} className="mr-2" />}
              {contact}
            </a>
          ) : (
            <span className="text-gray-400">{contact}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [email, setEmail] = useState('');

  const contactCards = [
    {
      title: "General Inquiries",
      contact: "contact@navNote.net",
      type: 'email' as const,
      icon: <Mail size={24} />,
      description: "For general questions about navNote and our services."
    },
    {
      title: "Customer Support",
      contact: "(385) 288-0722",
      type: 'phone' as const,
      icon: <Phone size={24} />,
      description: "Call us directly for immediate assistance with any issues."
    },
    {
      title: "Headquarters",
      contact: "Ogden, Utah, USA",
      type: 'location' as const,
      icon: <Building size={24} />,
      description: "Our main office location where our team is based."
    },
    {
      title: "Technical Support",
      contact: "support@navNote.net",
      type: 'email' as const,
      icon: <Mail size={24} />,
      description: "For technical assistance and product support."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would submit to a backend
    alert(`Thank you for your interest! We'll contact you at ${email} to schedule a demo.`);
    setEmail('');
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-primary opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Contact Information</h2>
          <p className="section-subheading">
            Get in touch with our team for any inquiries or support needs.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {contactCards.map((card, index) => (
            <ContactCard
              key={index}
              title={card.title}
              contact={card.contact}
              type={card.type}
              icon={card.icon}
              description={card.description}
              index={index}
            />
          ))}
        </div>
        
        {/* Demo Request Section */}
        <div id="demo" className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">Ready to See navNote in Action?</h3>
            <p className="text-center text-gray-300 mb-8">
              Request a personalized demo to experience the future of intelligent task management.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-5 py-3 pr-12 bg-white/10 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bg-gradient-to-r from-secondary to-accent p-2 rounded-full hover:shadow-lg hover:shadow-accent/20 transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-center text-gray-400 text-sm mt-4">
                We respect your privacy. No spam, just information about your demo request.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;