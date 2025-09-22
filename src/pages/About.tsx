import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { TypeAnimation } from 'react-type-animation';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as Progress from '@radix-ui/react-progress';
import { 
  Shield, Zap, Monitor, Server, Mail, CheckCircle, ArrowRight, Cpu, HardDrive, Lock,
  Globe, Users, Award, Eye, Layers, Settings, Play, X, ChevronRight, Star,
  Database, Wifi, Terminal, Code, Smartphone, Laptop, Activity, BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [expandedStep, setExpandedStep] = useState(-1);
  
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.3 });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.5 });
  const { ref: timelineRef, inView: timelineInView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (statsInView) {
      const timer = setTimeout(() => setProgress(85), 500);
      return () => clearTimeout(timer);
    }
  }, [statsInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0,
        delayChildren: 0
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const stats = [
    { label: 'Devices Secured', value: 50000, suffix: '+', icon: <Shield className="w-6 h-6" /> },
    { label: 'Data Wiped', value: 2.5, suffix: 'PB', icon: <Database className="w-6 h-6" /> },
    { label: 'Success Rate', value: 99.9, suffix: '%', icon: <CheckCircle className="w-6 h-6" /> },
    { label: 'Organizations', value: 500, suffix: '+', icon: <Users className="w-6 h-6" /> }
  ];

  const demoSlides = [
    {
      title: 'Boot & Launch',
      description: 'Custom Debian ISO boots directly into Katharos interface',
      image: '/api/placeholder/600/400',
      tech: ['Debian', 'Electron', 'Auto-launch']
    },
    {
      title: 'Device Detection',
      description: 'Smart scanning identifies all connected storage devices',
      image: '/api/placeholder/600/400',
      tech: ['psutil', 'Real-time', 'Multi-device']
    },
    {
      title: 'Secure Wiping',
      description: 'Multiple algorithms ensure complete data destruction',
      image: '/api/placeholder/600/400',
      tech: ['dd', 'nwipe', 'ATA Secure Erase']
    }
  ];

  const features = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Bootable ISO Application",
      description: "Custom Debian ISO with pre-installed Electron app featuring modern React interface and dark noir theme."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Smart Device Detection", 
      description: "Auto-detects and lists all connected drives with detailed information (model, type, size, mount status, device path)."
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Dynamic Wipe Methods",
      description: "Method selection based on drive type and encryption status - cryptographic erase for encrypted drives, secure erase for SSDs."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Progress Tracking",
      description: "Live progress updates via WebSocket with actual bytes written, percentage calculation, and animated progress bar."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Tamper-proof Certificates",
      description: "Signed certificates stored locally with optional email delivery and SHA-256 hash verification."
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Integration",
      description: "Gmail API-based certificate delivery with OAuth2, automatic latest certificate detection, and success confirmation."
    }
  ];

  const techStack = [
    { category: "Frontend", items: ["React 18.2.0", "TypeScript", "Tailwind CSS", "Electron 30.0.1"] },
    { category: "Backend", items: ["Python 3.13+", "WebSocket", "AsyncIO", "psutil"] },
    { category: "Wiping Tools", items: ["dd", "nwipe", "hdparm", "nvme-cli", "cryptsetup"] },
    { category: "Platform", items: ["Custom Debian ISO", "Live-build", "Gmail API", "WeasyPrint"] }
  ];

  const wipingMethods = [
    {
      type: "USB/External Drives",
      icon: <HardDrive className="w-4 h-4" />,
      method: "dd zero fill or random data with real-time progress tracking",
      verify: "Process exit codes (0 or 1 for ENOSPC), device full detection",
      progress: "Actual bytes written parsed from dd stderr output",
      color: "from-blue-500 to-cyan-500"
    },
    {
      type: "HDD (Rotational)",
      icon: <Cpu className="w-4 h-4" />,
      method: "Multi-pass overwrite with dd, configurable pass count",
      verify: "dd exit codes, bytes written verification, filesystem sync",
      progress: "Per-pass tracking with total progress calculation",
      color: "from-green-500 to-emerald-500"
    },
    {
      type: "SATA SSD",
      icon: <Server className="w-4 h-4" />,
      method: "ATA Secure Erase via hdparm OR dd overwrite as fallback",
      verify: "hdparm success codes, dd completion verification",
      progress: "Command completion status, estimated progress for secure erase",
      color: "from-purple-500 to-violet-500"
    },
    {
      type: "NVMe SSD",
      icon: <Zap className="w-4 h-4" />,
      method: "NVMe sanitize commands via nvme-cli OR dd overwrite",
      verify: "nvme-cli exit codes, sanitize completion status",
      progress: "Command status monitoring, completion detection",
      color: "from-orange-500 to-red-500"
    },
    {
      type: "Encrypted Drives (All Types)",
      icon: <Lock className="w-4 h-4" />,
      method: "Cryptographic erase via key destruction - detects LUKS encryption and destroys encryption keys",
      verify: "LUKS header destruction verification, cryptsetup status checks",
      progress: "Key destruction and header overwrite completion",
      advantage: "Instant secure erase regardless of drive size - renders all data unrecoverable",
      color: "from-red-500 to-pink-500"
    }
  ];

  const safetyMeasures = [
    {
      title: "Device Detection",
      description: "Automatic drive type detection via lsblk and device paths",
      icon: <Eye className="w-6 h-6" />
    },
    {
      title: "Unmount Safety",
      description: "All partitions unmounted before wiping begins",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Process Monitoring",
      description: "Real-time progress with stuck detection and cleanup",
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: "Error Recovery",
      description: "Graceful handling of device busy, permission, and hardware errors",
      icon: <Settings className="w-6 h-6" />
    }
  ];

  const timelineSteps = [
    {
      step: 1,
      title: "Boot from ISO",
      userFlow: "The process begins when the user boots their computer from the Katharos Debian-based ISO. The Katharos application auto-launches without requiring installation.",
      icon: <Laptop className="w-6 h-6" />,
      behindScenes: [
        "Bootable Debian ISO built with live-build",
        "Auto-starts the Electron desktop application on launch"
      ],
      techStack: ["Debian ISO build", "Electron 30.0.1", "React 18.2.0", "TypeScript", "TailwindCSS"]
    },
    {
      step: 2,
      title: "Real-Time Connection",
      userFlow: "Katharos establishes a live connection to its backend, enabling seamless communication.",
      icon: <Wifi className="w-6 h-6" />,
      behindScenes: [
        "Electron frontend connects to Python WebSocket server at localhost:8080",
        "Maintains two-way JSON-based message protocol for control and updates"
      ],
      techStack: ["Python 3.13+", "asyncio", "websockets 11.0.3", "JSON protocol", "ApiResponse format"]
    },
    {
      step: 3,
      title: "Scan Drives",
      userFlow: "User clicks 'Scan Drives →' to enumerate all connected storage devices.",
      icon: <Eye className="w-6 h-6" />,
      behindScenes: [
        "Python backend calls psutil + Linux utilities (lsblk, fdisk, blockdev)",
        "Drive info (size, type, status) is sent to the frontend"
      ],
      techStack: ["psutil 5.9.6", "blockdev", "lsblk", "fdisk", "React Table", "Tailwind"]
    },
    {
      step: 4,
      title: "Select Drive",
      userFlow: "User selects the desired drive from an interactive data table with keyboard/mouse navigation.",
      icon: <HardDrive className="w-6 h-6" />,
      behindScenes: [
        "Device selection triggers get_drive_methods WebSocket command",
        "Backend responds with available wiping methods for that device"
      ],
      techStack: ["React Table", "Custom grid", "WebSocket JSON API", "Method retrieval"]
    },
    {
      step: 5,
      title: "Configure Wipe",
      userFlow: "User configures wiping preferences—method (e.g., DoD, Gutmann, Zero-fill), number of passes, and certificate options.",
      icon: <Settings className="w-6 h-6" />,
      behindScenes: [
        "Configuration is passed to backend for execution planning",
        "Supports multiple wipe engines including dd, nwipe, secure erase, and cryptographic erase"
      ],
      techStack: ["DDWrapper", "NwipeWrapper", "hdparm", "nvme-cli", "cryptsetup"]
    },
    {
      step: 6,
      title: "Safety Confirmations",
      userFlow: "User must confirm their intent through sequential warnings and confirmations before wiping starts.",
      icon: <Shield className="w-6 h-6" />,
      behindScenes: [
        "React modals with confirmation logic prevent accidental wipes",
        "Backend validates device state before execution"
      ],
      techStack: ["Framer Motion", "Animated modals", "React state", "Backend validation"]
    },
    {
      step: 7,
      title: "Real-Time Wiping",
      userFlow: "The wipe process begins with live progress updates and an animated progress bar.",
      icon: <Activity className="w-6 h-6" />,
      behindScenes: [
        "Backend executes wipe using chosen engine (dd/nwipe/etc.)",
        "dd stderr parsing provides bytes written and percentage",
        "WebSocket streams progress to frontend"
      ],
      techStack: ["dd status=progress", "nwipe", "Hardware erase", "WebSocket", "TailwindCSS"]
    },
    {
      step: 8,
      title: "Certificate Generation",
      userFlow: "Once the wipe completes, Katharos generates a signed certificate of erasure in multiple formats.",
      icon: <Award className="w-6 h-6" />,
      behindScenes: [
        "Certificates (HTML, PDF, JSON) stored at /tmp/katharos/certificates",
        "Optional email delivery via Gmail API"
      ],
      techStack: ["WeasyPrint", "HTML templates", "JSON metadata", "Gmail API", "OAuth2"]
    },
    {
      step: 9,
      title: "Completion",
      userFlow: "A success screen shows the certificate location and confirms email delivery (if enabled).",
      icon: <CheckCircle className="w-6 h-6" />,
      behindScenes: [
        "Certificate logs stored locally",
        "Wipe process cleanup ensures device unmounting and sync"
      ],
      techStack: ["Process cleanup", "sync command", "React UI", "Success screen"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#070715] text-white overflow-x-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-[#9E4AF2]/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 bg-[#b19eef]/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-[#422A83]/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
        />
      </div>

      {/* Hero Section with Interactive Elements */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <motion.div 
                className="inline-block mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to="/" className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-playfair mb-4 bg-gradient-to-r from-[#9E4AF2] via-[#b19eef] to-[#422A83] bg-clip-text text-transparent">
                  Katharos
                </Link>
                <div className="w-32 h-1 bg-gradient-to-r from-[#9E4AF2] to-[#b19eef] mx-auto lg:mx-0 mb-6"></div>
              </motion.div>
              
              <TypeAnimation
                sequence={[
                  'Secure Data Sanitization',
                  2000,
                  'Bootable ISO Solution',
                  2000,
                  'Enterprise-Grade Security',
                  2000,
                  'Tamper-Proof Certificates',
                  2000,
                ]}
                wrapper="h2"
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#b19eef] mb-6 font-medium"
                repeat={Infinity}
              />
              
              <motion.p 
                variants={itemVariants} 
                className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8"
              >
                A revolutionary secure data-sanitization solution distributed as a bootable custom Debian ISO, 
                designed to help individuals, businesses and recyclers safely dispose or resale IT assets 
                without fear of data recovery.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <Dialog.Trigger asChild>
                    <motion.button 
                      className="group relative px-8 py-4 bg-gradient-to-r from-[#9E4AF2] to-[#b19eef] rounded-xl font-semibold overflow-hidden"
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(158, 74, 242, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center">
                        <Play className="w-5 h-5 mr-2" />
                        Watch Demo
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </Dialog.Trigger>
                  
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl bg-gray-900/95 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-8">
                      <Dialog.Title className="text-2xl font-bold mb-6 text-center">Katharos Demo</Dialog.Title>
                      
                      <div className="relative">
                        <div className="bg-black/50 rounded-xl p-6 mb-6">
                          <div className="aspect-video bg-gradient-to-br from-[#422A83]/20 to-[#9E4AF2]/20 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <Play className="w-16 h-16 text-[#9E4AF2] mx-auto mb-4" />
                              <h3 className="text-xl font-semibold mb-2">{demoSlides[currentSlide].title}</h3>
                              <p className="text-gray-300 mb-4">{demoSlides[currentSlide].description}</p>
                              <div className="flex gap-2 justify-center">
                                {demoSlides[currentSlide].tech.map((tech, i) => (
                                  <span key={i} className="px-3 py-1 bg-[#9E4AF2]/20 rounded-full text-sm">{tech}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center gap-2 mb-4">
                          {demoSlides.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentSlide(i)}
                              className={`w-3 h-3 rounded-full transition-all ${
                                i === currentSlide ? 'bg-[#9E4AF2]' : 'bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <Dialog.Close asChild>
                        <button className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>

                <motion.button 
                  className="rainbow-border px-8 py-4 bg-white/5 backdrop-blur-xl font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download ISO
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="relative "
            >
              <div className="relative bg-gradient-to-br from-[#422A83]/20 to-[#9E4AF2]/20 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9E4AF2]/5 to-[#b19eef]/5 rounded-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-400">katharos-terminal</span>
                  </div>
                  
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-center">
                      <span className="text-[#9E4AF2] mr-2">$</span>
                      <TypeAnimation
                        sequence={[
                          'sudo katharos --scan-drives',
                          1000,
                          'sudo katharos --scan-drives\n> Detected 3 storage devices',
                          2000,
                          'sudo katharos --scan-drives\n> Detected 3 storage devices\n> /dev/sda: 500GB SSD (SATA)',
                          1000,
                        ]}
                        wrapper="span"
                        className="text-green-400"
                        cursor={true}
                        repeat={Infinity}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      

      {/* Interactive Timeline */}
      <motion.section 
        ref={timelineRef}
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={timelineInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair mb-6">How Katharos Works</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#9E4AF2] to-[#b19eef] mx-auto"></div>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#9E4AF2] to-[#b19eef] hidden sm:block"></div>
            
            {timelineSteps.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative mb-6 sm:mb-8 last:mb-0"
              >
                <div className="flex items-start">
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#9E4AF2] to-[#b19eef] rounded-full flex items-center justify-center text-white font-bold mr-4 sm:mr-8 relative z-10 text-sm sm:text-base"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.step}
                  </motion.div>
                  
                  <motion.div className="flex-1 min-w-0">
                  <motion.button
                    onClick={() => setExpandedStep(expandedStep === index ? -1 : index)}
                    className="w-full bg-gray-900/50 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-6 hover:border-[#9E4AF2]/60 transition-all duration-300 text-left"
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-[#9E4AF2] mr-2 sm:mr-3">{item.icon}</span>
                        <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedStep === index ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="w-5 h-5 text-[#9E4AF2]" />
                      </motion.div>
                    </div>
                    <p className="text-gray-300 mt-2">{item.userFlow}</p>
                  </motion.button>
                  
                  <AnimatePresence>
                    {expandedStep === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 bg-gray-800/50 backdrop-blur-xl border border-[#9E4AF2]/20 rounded-xl p-6"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-[#b19eef] mb-3">Behind the Scenes</h4>
                            <ul className="space-y-2 text-gray-300 text-sm">
                              {item.behindScenes.map((point, i) => (
                                <li key={i} className="flex items-start">
                                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-[#b19eef] mb-3">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                              {item.techStack.map((tech, i) => (
                                <span key={i} className="px-3 py-1 bg-[#9E4AF2]/20 text-[#9E4AF2] rounded-full text-sm border border-[#9E4AF2]/30">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Interactive Tabs Section */}
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#422A83]/10 to-transparent"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair mb-6">Explore Katharos</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#9E4AF2] to-[#b19eef] mx-auto"></div>
          </motion.div>
          
          <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
            <Tabs.List className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 bg-gray-900/50 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-xl p-2">
              {[
                { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
                { id: 'features', label: 'Features', icon: <Star className="w-4 h-4" /> },
                { id: 'wiping', label: 'Wiping', icon: <HardDrive className="w-4 h-4" /> },
                { id: 'tech', label: 'Tech', icon: <Code className="w-4 h-4" /> },
                { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> }
              ].map((tab) => (
                <Tabs.Trigger
                  key={tab.id}
                  value={tab.id}
                  className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-[#9E4AF2] to-[#b19eef] text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline lg:inline">{tab.label}</span>
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <Tabs.Content value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-8">
                      <h3 className="text-2xl font-semibold mb-4 flex items-center">
                        <Monitor className="w-8 h-8 text-[#9E4AF2] mr-3" />
                        What is Katharos?
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        Katharos is a secure data-sanitization solution distributed as a bootable custom Debian ISO containing 
                        an Electron application with React + TypeScript for a responsive, user-friendly interface, 
                        Python backend engine with WebSocket-based real-time communication, and multiple wiping methods.
                      </p>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-8">
                      <h3 className="text-2xl font-semibold mb-4 flex items-center">
                        <Globe className="w-8 h-8 text-[#9E4AF2] mr-3" />
                        Why Katharos?
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        Millions of devices are hoarded because users fear data breaches from discarded drives. 
                        Existing tools are complex or lack tamper-proof certificates. Katharos makes secure wiping 
                        accessible, auditable, and trustworthy.
                      </p>
                    </div>
                  </div>
                </Tabs.Content>

                <Tabs.Content value="features">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-900/50 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-6 hover:border-[#9E4AF2]/60 transition-all duration-300 group hover:scale-105"
                      >
                        <div className="text-[#9E4AF2] mb-4 group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                        <p className="text-gray-300 text-sm">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </Tabs.Content>

                <Tabs.Content value="wiping">
                  <div className="space-y-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {wipingMethods.map((method, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-900/50 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-6 hover:border-[#9E4AF2]/60 transition-all duration-300 group hover:scale-105"
                        >
                          <div className="flex items-center mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                              <div className="text-white">
                                {method.icon}
                              </div>
                            </div>
                            <h3 className="text-lg font-semibold">{method.type}</h3>
                          </div>
                          
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="text-[#b19eef] font-medium">Method: </span>
                              <span className="text-gray-300">{method.method}</span>
                            </div>
                            <div>
                              <span className="text-[#b19eef] font-medium">Verify: </span>
                              <span className="text-gray-300">{method.verify}</span>
                            </div>
                            <div>
                              <span className="text-[#b19eef] font-medium">Progress: </span>
                              <span className="text-gray-300">{method.progress}</span>
                            </div>
                            {method.advantage && (
                              <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                                <span className="text-green-400 font-medium">Advantage: </span>
                                <span className="text-green-300 text-xs">{method.advantage}</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="bg-gradient-to-r from-[#422A83]/20 to-[#9E4AF2]/20 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-8">
                      <h3 className="text-2xl font-semibold mb-6 flex items-center">
                        <Shield className="w-8 h-8 text-[#9E4AF2] mr-3" />
                        Safety Measures
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        {safetyMeasures.map((measure, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-4"
                          >
                            <div className="text-[#9E4AF2] mt-1">
                              {measure.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">{measure.title}</h4>
                              <p className="text-gray-300 text-sm">{measure.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tabs.Content>

                <Tabs.Content value="tech">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {techStack.map((stack, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-900/50 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-6"
                      >
                        <h3 className="text-lg font-semibold mb-4 text-[#b19eef]">{stack.category}</h3>
                        <ul className="space-y-2">
                          {stack.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center text-gray-300 text-sm">
                              <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </Tabs.Content>

                <Tabs.Content value="security">
                  <div className="space-y-8">
                    <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8">
                      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                        <div>
                          <h3 className="text-2xl font-semibold mb-4 flex items-center">
                            <Shield className="w-8 h-8 text-green-400 mr-3" />
                            Tamper-Proof Verification
                          </h3>
                          <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start">
                              <ArrowRight className="w-5 h-5 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                              SHA-256 hash generation for certificate data integrity
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="w-5 h-5 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                              HTML/PDF/JSON certificate generation with unique IDs
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="w-5 h-5 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                              Complete audit trail with timestamps and wipe parameters
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold mb-4 flex items-center">
                            <Mail className="w-8 h-8 text-blue-400 mr-3" />
                            Automated Delivery
                          </h3>
                          <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start">
                              <ArrowRight className="w-5 h-5 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                              Gmail API integration with OAuth2 authentication
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="w-5 h-5 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                              Automatic latest certificate detection and sending
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="w-5 h-5 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                              Local storage at /tmp/katheros/certificates for backup
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tabs.Content>
              </motion.div>
            </AnimatePresence>
          </Tabs.Root>
        </div>
      </motion.section>

      {/* Implementation Details Section  */}
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#422A83]/5 to-transparent" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair mb-6">Implementation Details</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#9E4AF2] to-[#b19eef] mx-auto mb-4"></div>
            <p className="text-xl text-gray-300">Current Status & Technical Architecture</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
            {/* Backend Engine */}
            <div
              variants={itemVariants}
              className="bg-gray-900/50 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-6 hover:border-[#9E4AF2]/60 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Server className="w-6 h-6 mr-3 text-[#9E4AF2]" />
                Backend Engine (Python)
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  WebSocket Server: localhost with JSON protocol
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  DD Wrapper: Parses stderr for bytes written
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  Device Safety: Auto-unmounting via lsblk
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  Process Management: Graceful termination
                </li>
              </ul>
            </div>

            {/* Certificate System */}
            <div
              variants={itemVariants}
              className="bg-gray-900/50 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-6 hover:border-[#9E4AF2]/60 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Award className="w-6 h-6 mr-3 text-[#9E4AF2]" />
                Certificate System
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  Storage: /tmp/katheros/certificates/
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  Formats: HTML, PDF, JSON
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  Email: Gmail API with OAuth2
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  Auto-detection by modification time
                </li>
              </ul>
            </div>

            {/* Wipe Methods */}
            <div
              variants={itemVariants}
              className="bg-gray-900/50 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-6 hover:border-[#9E4AF2]/60 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-[#9E4AF2]" />
                Wipe Methods Supported
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  Zero Fill: dd if=/dev/zero with progress
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  Random Data: dd if=/dev/urandom
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  ATA Secure Erase: hdparm for SATA SSDs
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  Cryptographic Erase: LUKS key destruction
                </li>
              </ul>
            </div>

            {/* Safety Features */}
            <div
              variants={itemVariants}
              className="bg-gray-900/50 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-6 hover:border-[#9E4AF2]/60 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-[#9E4AF2]" />
                Safety Features
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  Device unmounting checks
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  Process cleanup & sync
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  Graceful error handling
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-[#9E4AF2] mr-2 mt-0.5 flex-shrink-0" />
                  Test mode for development
                </li>
              </ul>
            </div>
          </div>

          {/* Frontend Integration */}
          <div
            variants={itemVariants}
            className="bg-gradient-to-r from-[#422A83]/20 to-[#9E4AF2]/20 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-8 mb-12"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Monitor className="w-8 h-8 mr-3 text-[#9E4AF2]" />
              Frontend Integration
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="text-lg font-semibold text-[#b19eef] mb-3">Real-time Communication</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• WebSocket Client: Connects to localhost:8080</li>
                  <li>• Progress Display: Shows actual progress percentage</li>
                  <li>• Type Safety: Proper TypeScript interfaces</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#b19eef] mb-3">User Interface</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Email Form: Input validation for certificates</li>
                  <li>• Progress Tracking: Current/total passes, bytes written</li>
                  <li>• API Responses: Consistent format handling</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Deployment & Distribution */}
          <div
            variants={itemVariants}
            className="bg-gray-900/50 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Globe className="w-8 h-8 mr-3 text-[#9E4AF2]" />
              Deployment & Distribution
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <h4 className="text-lg font-semibold text-[#b19eef] mb-3">Development Setup</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Python 3.13+ with asyncio, websockets</li>
                  <li>• Node.js with Electron, React, TypeScript</li>
                  <li>• Gmail API credentials (OAuth2)</li>
                  <li>• Test mode for safe development</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#b19eef] mb-3">Production Distribution</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Custom Debian-based live system</li>
                  <li>• Auto-launch on boot with backend services</li>
                  <li>• Single ISO file download</li>
                  <li>• No installation required</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#b19eef] mb-3">Security Considerations</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• OAuth2 tokens embedded in ISO</li>
                  <li>• Pre-configured sudo access</li>
                  <li>• Process isolation & cleanup</li>
                  <li>• Live environment security</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Competitive Comparison Section */}
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair mb-6">How Katharos Is Different</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#9E4AF2] to-[#b19eef] mx-auto mb-4"></div>
            <p className="text-xl text-gray-300">Competitive Positioning</p>
          </div>
          
          <div className="overflow-x-auto">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-4 sm:p-6 lg:p-8">
              <table className="w-full min-w-[600px] sm:min-w-[800px]">
                <thead className=''>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-lg font-semibold text-[#b19eef]">Feature</th>
                    <th className="text-center py-3 sm:py-4 px-2 sm:px-6">
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-lg font-bold text-white">Katharos</span>
                      </div>
                    </th>
                    <th className="text-center py-3 sm:py-4 px-2 sm:px-6">
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-lg font-semibold text-gray-300">DBAN</span>
                      </div>
                    </th>
                    <th className="text-center py-3 sm:py-4 px-2 sm:px-6">
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-lg font-semibold text-gray-300">Vendor</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Bootable Solution",
                      icon: <Laptop className="w-5 h-5" />,
                      katharos: "Custom Debian ISO + Modern GUI",
                      dban: "Basic bootable",
                      vendor: "Linux Varies"
                    },
                    {
                      feature: "Real-time Progress",
                      icon: <Activity className="w-5 h-5" />,
                      katharos: "WebSocket + cli parsing",
                      dban: "Basic text output",
                      vendor: "Limited"
                    },
                    {
                      feature: "Email Certificates",
                      icon: <Mail className="w-5 h-5" />,
                      katharos: "Gmail API integration",
                      dban: "No certificates",
                      vendor: "Local only"
                    },
                    {
                      feature: "Multi-platform",
                      icon: <Globe className="w-5 h-5" />,
                      katharos: "Bootable on any system",
                      dban: "Linux bootable",
                      vendor: "Vendor specific"
                    },
                    {
                      feature: "Safety Features",
                      icon: <Shield className="w-5 h-5" />,
                      katharos: "Auto-unmount + cleanup",
                      dban: "Basic",
                      vendor: "Varies"
                    },
                    {
                      feature: "UI/UX",
                      icon: <Monitor className="w-5 h-5" />,
                      katharos: "React + TypeScript",
                      dban: "CLI/ncurses",
                      vendor: "Vendor GUIs"
                    }
                  ].map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors duration-300"
                    >
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center">
                          <div className="text-[#9E4AF2] mr-2 sm:mr-3">
                            {row.icon}
                          </div>
                          <span className="font-medium text-white text-sm sm:text-base">{row.feature}</span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-6 text-center">
                        <div className="px-1 sm:px-4 py-2">
                          <span className="text-white font-medium text-xs sm:text-sm">{row.katharos}</span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-6 text-center">
                        <div className="px-1 sm:px-4 py-2">
                          <span className="text-gray-300 text-xs sm:text-sm">{row.dban}</span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-6 text-center">
                        <div className="px-1 sm:px-4 py-2">
                          <span className="text-gray-300 text-xs sm:text-sm">{row.vendor}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div variants={itemVariants} className="mt-8 text-center">
            <div className="bg-gradient-to-r from-[#422A83]/20 to-[#9E4AF2]/20 backdrop-blur-xl border border-[#9E4AF2]/30 rounded-2xl p-8">
              <p className="text-lg text-gray-300 leading-relaxed">
                <span className="text-[#b19eef] font-semibold">Katharos combines</span> the power of professional wiping tools 
                with modern desktop UX and automated certificate delivery — making secure data destruction 
                <span className="text-[#9E4AF2] font-semibold"> accessible to everyone</span>.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#422A83]/20 to-[#9E4AF2]/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair mb-6">Ready for SIH 2025</h2>
            <p className="text-xl text-gray-300 mb-8">
              Katharos represents the future of secure data sanitization - accessible, trustworthy, and environmentally conscious.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="rainbow-border px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Documentation
              </motion.button>
              <motion.button 
                className="px-8 py-4 bg-gradient-to-r from-[#9E4AF2] to-[#b19eef] text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download ISO
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;