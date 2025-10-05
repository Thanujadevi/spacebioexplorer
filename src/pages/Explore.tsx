import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import PaperCard from "@/components/PaperCard";
import PaperDetailsModal from "@/components/PaperDetailsModal";
import {
  loadResearchPapers,
  searchPapers,
  filterPapers,
  getUniqueYears,
  getUniqueOrganisms,
  ResearchPaper
} from "@/lib/dataParser";
import { Search, Filter, Sparkles, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Explore = () => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [filteredPapers, setFilteredPapers] = useState<ResearchPaper[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrganism, setSelectedOrganism] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [organisms, setOrganisms] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    const data = await loadResearchPapers();
    setPapers(data);
    setFilteredPapers(data);
    setOrganisms(getUniqueOrganisms(data));
    setYears(getUniqueYears(data));
  };
  
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedOrganism, selectedYear, papers]);
  
  const applyFilters = () => {
    let result = papers;
    
    // Apply search
    if (searchQuery.trim()) {
      result = searchPapers(result, searchQuery);
    }
    
    // Apply filters
    result = filterPapers(result, {
      organism: selectedOrganism !== "All" ? selectedOrganism : undefined,
      year: selectedYear !== "All" ? parseInt(selectedYear) : undefined,
    });
    
    setFilteredPapers(result);
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedOrganism("All");
    setSelectedYear("All");
  };
  
  const hasActiveFilters = searchQuery || selectedOrganism !== "All" || selectedYear !== "All";
  
  const handleViewDetails = (paper: ResearchPaper) => {
    setSelectedPaper(paper);
    setDetailsOpen(true);
  };
  
  const handleGenerateInsight = (paper: ResearchPaper) => {
    toast({
      title: "AI Insight Generated",
      description: `Key insight: ${paper.summary.slice(0, 150)}...`,
      duration: 5000,
    });
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Explore Research Papers
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Search and filter through our comprehensive database of space biology research
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="space-y-4 bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border animate-fade-in">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by title, keywords, authors, or abstract..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            className="md:w-auto"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters {hasActiveFilters && `(${[searchQuery, selectedOrganism !== "All", selectedYear !== "All"].filter(Boolean).length})`}
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block text-muted-foreground">Organism / Subject</label>
            <Select value={selectedOrganism} onValueChange={setSelectedOrganism}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Organisms</SelectItem>
                {organisms.map((org) => (
                  <SelectItem key={org} value={org}>{org}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block text-muted-foreground">Publication Year</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {hasActiveFilters && (
            <div className="flex items-end">
              <Button variant="ghost" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <Badge variant="secondary" className="text-sm">
            {filteredPapers.length} {filteredPapers.length === 1 ? 'paper' : 'papers'} found
          </Badge>
        </div>
      </div>
      
      {/* Results Grid */}
      {filteredPapers.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper, index) => (
            <div key={paper.id} style={{ animationDelay: `${index * 50}ms` }}>
              <PaperCard
                paper={paper}
                onViewDetails={() => handleViewDetails(paper)}
                onGenerateInsight={() => handleGenerateInsight(paper)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">No papers found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
      
      {/* Paper Details Modal */}
      <PaperDetailsModal
        paper={selectedPaper}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
};

export default Explore;
