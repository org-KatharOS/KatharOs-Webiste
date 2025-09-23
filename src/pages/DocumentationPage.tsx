import { useState, useEffect, useMemo } from "react";
import { loadDocumentation } from "../utils/markdownLoader";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { Link } from "react-router-dom";

const SkeletonLoader = () => {
  const generateLines = (count: number) =>
    Array.from({ length: count }).map((_, i) => {
      const width = 80 + Math.random() * 20; // 80% to 100%
      return (
        <div
          key={i}
          className="h-4 bg-gray-800 rounded"
          style={{ width: `${width}%` }}
        ></div>
      );
    });

  return (
    <div className="animate-pulse w-full">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header placeholder */}
        <div className="w-48 h-6 bg-gray-700 rounded-full mb-8"></div>

        {/* Paragraphs */}
        {Array.from({ length: 6 }).map((_, sectionIdx) => (
          <div key={sectionIdx} className="space-y-4">
            {generateLines(4)}
            <div
              className="h-6 bg-gray-800 rounded"
              style={{ width: "100%" }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DocumentationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const sections = useMemo(() => {
    const docs = loadDocumentation();
    setIsLoading(false);
    return docs;
  }, []);
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.subsections[0]?.metadata.id || ""
  );
  const [expandedSections, setExpandedSections] = useState<string[]>([
    sections[0]?.id || "",
  ]);
  const [contentLoading, setContentLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || contentLoading) return;

      const allSubsections = sections.flatMap((s) => s.subsections);
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
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, sections, isLoading, contentLoading]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false); // Close mobile sidebar
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="min-h-screen bg-[#070715] text-white flex font-jetbrains">
      {/* Mobile menu button */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`w-72 h-full min-h-screen fixed left-0 top-0 bg-gray-900/50 backdrop-blur-xl border-r border-gray-700 overflow-y-auto scrollbar-hide z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white mb-2 font-playfair">
                  <Link to="/">KatharOS</Link>
                </h1>
                <p className="text-sm text-gray-400">
                  Secure disk wiping made simple
                </p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 text-gray-400 hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
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
                        isExpanded ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-1">
                      {section.subsections.map((subsection) => (
                        <button
                          key={subsection.metadata.id}
                          onClick={() =>
                            scrollToSection(subsection.metadata.id)
                          }
                          className={`flex items-center w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            activeSection === subsection.metadata.id
                              ? "text-[#9E4AF2] font-medium"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {activeSection === subsection.metadata.id && (
                            <div
                              className="w-0 h-0 mr-2 flex-shrink-0"
                              style={{
                                borderLeft: "6px solid #9E4AF2",
                                borderTop: "4px solid transparent",
                                borderBottom: "4px solid transparent",
                              }}
                            ></div>
                          )}
                          <span>{subsection.metadata.title}</span>
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
      <main className="flex-1 lg:ml-72 px-2 sm:px-4 lg:px-8 py-12 pt-20 lg:pt-12 bg-[#070715]">
        <div className="max-w-full sm:max-w-3xl lg:max-w-4xl mx-auto space-y-16 w-full overflow-x-hidden">
          {isLoading ? (
            <div className="w-full min-w-full">
              <SkeletonLoader />
            </div>
          ) : (
            sections.map((section) =>
              section.subsections.map((subsection) => (
                <section
                  key={subsection.metadata.id}
                  id={subsection.metadata.id}
                  className="scroll-mt-24"
                >
                  <div className="mb-8">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#9E4AF2] to-[#b19eef] rounded-full mb-6"></div>
                  </div>

                  <MarkdownRenderer content={subsection.content} />
                </section>
              ))
            )
          )}
        </div>
      </main>
    </div>
  );
}