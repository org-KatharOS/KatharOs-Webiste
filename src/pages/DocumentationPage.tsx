import { useState, useEffect, useMemo } from "react";
import { loadDocumentation } from "../utils/markdownLoader";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

export default function DocumentationPage() {
  const sections = useMemo(() => loadDocumentation(), []);
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.subsections[0]?.metadata.id || "");
  const [expandedSections, setExpandedSections] = useState<string[]>([sections[0]?.id || ""]);

  useEffect(() => {
    const handleScroll = () => {
      const allSubsections = sections.flatMap(s => s.subsections);
      let current = activeSection;
      
      for (const subsection of allSubsections) {
        const el = document.getElementById(subsection.metadata.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = subsection.metadata.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, sections]);

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
                          key={subsection.metadata.id}
                          onClick={() => scrollToSection(subsection.metadata.id)}
                          className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            activeSection === subsection.metadata.id
                              ? "text-[#9E4AF2] font-medium border-l-2 border-[#9E4AF2]"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {subsection.metadata.title}
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
              <section key={subsection.metadata.id} id={subsection.metadata.id} className="scroll-mt-24">
                <div className="mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#9E4AF2] to-[#b19eef] rounded-full mb-6"></div>
                </div>
                
                <MarkdownRenderer content={subsection.content} />
              </section>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
