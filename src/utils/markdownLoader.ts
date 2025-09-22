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
  order: number;
}

// Import all markdown files and section config
const markdownModules = import.meta.glob('../docs/*.md', { as: 'raw', eager: true });
const sectionConfig = import.meta.glob('../docs/sections.json', { eager: true });

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

  // Load section configuration
  const configData = Object.values(sectionConfig)[0] as any;
  const sectionConfigMap = new Map<string, { title: string; order: number }>();
  
  configData.sections.forEach((section: any) => {
    sectionConfigMap.set(section.id, { title: section.title, order: section.order });
  });

  // Convert to section objects with ordering
  const sections: DocSection[] = [];
  
  sectionsMap.forEach((subsections, sectionId) => {
    const config = sectionConfigMap.get(sectionId) || { title: sectionId, order: 999 };
    sections.push({
      id: sectionId,
      title: config.title,
      subsections,
      order: config.order
    });
  });

  // Sort sections by order
  sections.sort((a, b) => a.order - b.order);

  return sections;
};