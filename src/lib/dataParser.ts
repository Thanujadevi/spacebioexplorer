import * as XLSX from 'xlsx';

export interface ResearchPaper {
  id: number;
  title: string;
  authors: string;
  year: number;
  keywords: string;
  abstract: string;
  researchFocus: string;
  limitations: string;
  summary: string;
  organism?: string;
}

let cachedPapers: ResearchPaper[] | null = null;

export async function loadResearchPapers(): Promise<ResearchPaper[]> {
  if (cachedPapers) {
    return cachedPapers;
  }

  try {
    const response = await fetch('/data/research-papers.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });
    
    cachedPapers = jsonData.map((row: any, index: number) => ({
      id: index + 1,
      title: row.TITLE || '',
      authors: row.AUTHORS || '',
      year: parseInt(row.YEAR) || 0,
      keywords: row.KEYWORDS || '',
      abstract: row.ABSTRACT || '',
      researchFocus: row['RESEARCH FOCUS'] || '',
      limitations: row.LIMITATIONS || '',
      summary: row.SUMARY || row.SUMMARY || '',
      organism: extractOrganism(row.KEYWORDS || '', row.TITLE || '')
    }));
    
    return cachedPapers;
  } catch (error) {
    console.error('Error loading research papers:', error);
    return [];
  }
}

function extractOrganism(keywords: string, title: string): string {
  const text = `${keywords} ${title}`.toLowerCase();
  
  if (text.includes('mice') || text.includes('mouse')) return 'Mice';
  if (text.includes('rat')) return 'Rats';
  if (text.includes('human')) return 'Humans';
  if (text.includes('cell')) return 'Cell Culture';
  if (text.includes('plant')) return 'Plants';
  if (text.includes('bacteria')) return 'Bacteria';
  if (text.includes('yeast')) return 'Yeast';
  if (text.includes('worm')) return 'Worms';
  if (text.includes('fly') || text.includes('drosophila')) return 'Fruit Flies';
  
  return 'Other';
}

export function searchPapers(papers: ResearchPaper[], query: string): ResearchPaper[] {
  if (!query.trim()) return papers;
  
  const lowerQuery = query.toLowerCase();
  
  return papers.filter(paper => 
    paper.title.toLowerCase().includes(lowerQuery) ||
    paper.keywords.toLowerCase().includes(lowerQuery) ||
    paper.abstract.toLowerCase().includes(lowerQuery) ||
    paper.authors.toLowerCase().includes(lowerQuery) ||
    paper.summary.toLowerCase().includes(lowerQuery) ||
    paper.researchFocus.toLowerCase().includes(lowerQuery)
  );
}

export function filterPapers(
  papers: ResearchPaper[],
  filters: {
    organism?: string;
    year?: number;
    keyword?: string;
  }
): ResearchPaper[] {
  let filtered = papers;
  
  if (filters.organism && filters.organism !== 'All') {
    filtered = filtered.filter(p => p.organism === filters.organism);
  }
  
  if (filters.year) {
    filtered = filtered.filter(p => p.year === filters.year);
  }
  
  if (filters.keyword) {
    const lowerKeyword = filters.keyword.toLowerCase();
    filtered = filtered.filter(p => 
      p.keywords.toLowerCase().includes(lowerKeyword)
    );
  }
  
  return filtered;
}

export function getUniqueYears(papers: ResearchPaper[]): number[] {
  const years = papers.map(p => p.year).filter(y => y > 0);
  return Array.from(new Set(years)).sort((a, b) => b - a);
}

export function getUniqueOrganisms(papers: ResearchPaper[]): string[] {
  const organisms = papers.map(p => p.organism || 'Other');
  return Array.from(new Set(organisms)).sort();
}

export function getKeywordsList(papers: ResearchPaper[]): string[] {
  const allKeywords = papers
    .flatMap(p => p.keywords.split(',').map(k => k.trim()))
    .filter(k => k.length > 0);
  
  const keywordCounts = allKeywords.reduce((acc, keyword) => {
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([keyword]) => keyword);
}
