import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResearchPaper } from "@/lib/dataParser";
import { Users, Calendar, Sparkles, BookOpen } from "lucide-react";

interface PaperCardProps {
  paper: ResearchPaper;
  onViewDetails: () => void;
  onGenerateInsight: () => void;
}

const PaperCard = ({ paper, onViewDetails, onGenerateInsight }: PaperCardProps) => {
  const keywords = paper.keywords.split(',').slice(0, 3).map(k => k.trim());
  
  return (
    <Card className="group hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:border-primary/50 bg-gradient-to-br from-card to-card/80 animate-fade-in">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
            {paper.organism || 'Research'}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Calendar className="w-3 h-3" />
            {paper.year}
          </Badge>
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
          {paper.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
          <Users className="w-3 h-3" />
          {paper.authors.split(',')[0]} {paper.authors.split(',').length > 1 && `et al.`}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {paper.abstract}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {keywords.map((keyword, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewDetails}
            className="flex-1"
          >
            <BookOpen className="w-4 h-4 mr-1" />
            View Details
          </Button>
          <Button
            size="sm"
            onClick={onGenerateInsight}
            className="flex-1 bg-gradient-to-r from-accent to-primary hover:opacity-90"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            AI Insight
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaperCard;
