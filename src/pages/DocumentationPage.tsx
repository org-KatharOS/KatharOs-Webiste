// src/pages/DocumentationPage.tsx
import { useState, useEffect } from "react";

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative">
      <pre className="bg-black/50 text-green-400 p-4 rounded-md overflow-x-auto pr-12">
        <code>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-gray-700/50 rounded"
        title="Copy code"
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
      {copied && (
        <div className="absolute top-12 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg animate-fade-in">
          Code copied!
        </div>
      )}
    </div>
  );
};

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    subsections: [
      { id: "installation", title: "Installation" },
      { id: "quick-start", title: "Quick Start" },
      { id: "first-wipe", title: "Your First Wipe" },
    ],
  },
  {
    id: "features",
    title: "Features",
    subsections: [
      { id: "secure-deletion", title: "Secure Deletion" },
      { id: "multiple-algorithms", title: "Multiple Algorithms" },
      { id: "verification", title: "Verification" },
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    subsections: [
      { id: "custom-patterns", title: "Custom Patterns" },
      { id: "batch-operations", title: "Batch Operations" },
      { id: "logging", title: "Logging" },
    ],
  },
  {
    id: "api",
    title: "API Reference",
    subsections: [
      { id: "cli-commands", title: "CLI Commands" },
      { id: "configuration", title: "Configuration" },
      { id: "exit-codes", title: "Exit Codes" },
    ],
  },
];

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState<string>("installation");
  const [expandedSections, setExpandedSections] = useState<string[]>(["getting-started"]);

  useEffect(() => {
    const handleScroll = () => {
      const allSubsections = sections.flatMap(s => s.subsections);
      let current = activeSection;
      
      for (const subsection of allSubsections) {
        const el = document.getElementById(subsection.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = subsection.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
      <div className="min-h-screen bg-[#070715] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 h-screen fixed left-0 top-0 bg-gray-900/50 backdrop-blur-xl border-r border-gray-700 overflow-y-auto scrollbar-hide">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-white mb-2 font-playfair">Katharos Docs</h1>
            <p className="text-sm text-gray-400">Secure disk wiping made simple</p>
          </div>
          
          <nav className="space-y-1">
            {sections.map((section) => {
              const isExpanded = expandedSections.includes(section.id);
              return (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                  >
                    <span>{section.title}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-1">
                      {section.subsections.map((subsection) => (
                        <button
                          key={subsection.id}
                          onClick={() => scrollToSection(subsection.id)}
                          className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            activeSection === subsection.id
                              ? "text-[#9E4AF2] font-medium border-l-2 border-[#9E4AF2]"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {subsection.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-72 px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {sections.map((section) =>
            section.subsections.map((subsection) => (
              <section key={subsection.id} id={subsection.id} className="scroll-mt-24">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-white mb-4 font-playfair">
                    {subsection.title}
                  </h1>
                  <div className="w-12 h-1 bg-gradient-to-r from-[#9E4AF2] to-[#b19eef] rounded-full mb-6"></div>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mb-4 mt-8">Overview</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-medium text-white mb-3">Code Example</h4>
                    <CodeBlock code="katharos --algorithm dod --verify /dev/sdb1" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4 mt-8">Key Features</h3>
                  <ul className="space-y-2 text-gray-300 mb-6">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#9E4AF2] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Secure deletion with multiple industry-standard algorithms
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#9E4AF2] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Real-time progress monitoring and verification
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#9E4AF2] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Cross-platform compatibility and easy installation
                    </li>
                  </ul>
                  
                  <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6 mb-6">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-sm font-bold">i</span>
                      </div>
                      <div>
                        <h4 className="text-blue-300 font-medium mb-2">Important Note</h4>
                        <p className="text-blue-200 text-sm">
                          Always ensure you have proper backups before performing secure deletion operations. 
                          This process is irreversible and will permanently destroy data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
