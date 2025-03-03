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
              {contact}
            </a>
          ) : (
            <p className="text-gray-300">{contact}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset the submission status after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <>
      <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-lg text-gray-300">
              Have questions about navNote or need assistance? Our team is here to help you.
              Feel free to reach out to us through any of the channels below.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <ContactCard
              title="Email Us"
              contact="contact@navnote.com"
              type="email"
              icon={<Mail size={24} />}
              description="For general inquiries and support"
              index={0}
            />
            
            <ContactCard
              title="Call Us"
              contact="+1 (555) 123-4567"
              type="phone"
              icon={<Phone size={24} />}
              description="Mon-Fri from 9am to 5pm EST"
              index={1}
            />
            
            <ContactCard
              title="Visit Us"
              contact="123 Innovation Drive, Tech City, CA 94043"
              type="location"
              icon={<MapPin size={24} />}
              description="Our headquarters location"
              index={2}
            />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-dark/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10 shadow-blue-glow">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Send Us a Message</h2>
                <p className="text-gray-400">
                  Fill out the form below and our team will get back to you as soon as possible.
                </p>
              </motion.div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="John Doe"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="you@example.com"
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="mb-6"
                >
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="How can we help you?"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="mb-8"
                >
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg focus:outline-none focus:border-secondary resize-none"
                    placeholder="Tell us what you need..."
                  ></textarea>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex flex-col items-center"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center justify-center min-w-[180px] ${
                      isSubmitted 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : isSubmitted ? (
                      <span className="flex items-center">
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Message Sent!
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send size={18} className="mr-2" />
                        Send Message
                      </span>
                    )}
                  </button>
                  
                  {isSubmitted && (
                    <p className="text-green-400 text-sm mt-3">
                      Thank you for your message. We'll get back to you shortly!
                    </p>
                  )}
                </motion.div>
              </form>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mt-20"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-accent/20 p-4 rounded-full">
                <Building size={32} className="text-accent" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">For Business Inquiries</h2>
            <p className="text-lg text-gray-300 mb-6">
              Interested in partnering with navNote or exploring enterprise solutions?
              Contact our business development team at:
            </p>
            <a 
              href="mailto:business@navnote.com" 
              className="inline-flex items-center text-secondary hover:text-accent transition-colors text-lg"
            >
              <Mail size={20} className="mr-2" />
              business@navnote.com
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactPage; 