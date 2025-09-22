import matter from 'gray-matter';

export interface DocMetadata {
  id: string;
  title: string;
  section: string;
  order: number;
}

export interface DocContent {
  metadata: DocMetadata;
  content: string;
}

export interface DocSection {
  id: string;
  title: string;
  subsections: DocContent[];
}

// Import all markdown files
const markdownModules = import.meta.glob('../docs/*.md', { as: 'raw', eager: true });

export const loadDocumentation = (): DocSection[] => {
  const docs: DocContent[] = [];

  // Process each markdown file
  Object.entries(markdownModules).forEach(([path, content]) => {
    const { data, content: markdownContent } = matter(content);
    
    docs.push({
      metadata: data as DocMetadata,
      content: markdownContent
    });
  });

  // Sort by section and order
  docs.sort((a, b) => {
    if (a.metadata.section !== b.metadata.section) {
      return a.metadata.section.localeCompare(b.metadata.section);
    }
    return a.metadata.order - b.metadata.order;
  });

  // Group by sections
  const sectionsMap = new Map<string, DocContent[]>();
  
  docs.forEach(doc => {
    const sectionId = doc.metadata.section;
    if (!sectionsMap.has(sectionId)) {
      sectionsMap.set(sectionId, []);
    }
    sectionsMap.get(sectionId)!.push(doc);
  });

  // Convert to section objects
  const sections: DocSection[] = [];
  const sectionTitles: Record<string, string> = {
    'getting-started': 'Getting Started',
    'features': 'Features',
    'advanced': 'Advanced',
    'api': 'API Reference'
  };

  sectionsMap.forEach((subsections, sectionId) => {
    sections.push({
      id: sectionId,
      title: sectionTitles[sectionId] || sectionId,
      subsections
    });
  });

  return sections;
};