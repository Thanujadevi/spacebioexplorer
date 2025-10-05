import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ResearchPaper } from "@/lib/dataParser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Users, Lightbulb, AlertCircle } from "lucide-react";

interface PaperDetailsModalProps {
  paper: ResearchPaper | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaperDetailsModal = ({ paper, open, onOpenChange }: PaperDetailsModalProps) => {
  if (!paper) return null;
  
  const keywords = paper.keywords.split(',').map(k => k.trim());
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gradient-to-br from-card to-card/80 border-primary/20">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-secondary/20">
              {paper.organism}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Calendar className="w-3 h-3" />
              {paper.year}
            </Badge>
          </div>
          <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {paper.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {paper.authors}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Keywords */}
            <div>
              <h3 className="text-sm font-semibold mb-2 text-accent">Keywords</h3>
              <div className="flex flex-wrap gap-1">
                {keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Abstract */}
            <div>
              <h3 className="text-sm font-semibold mb-2 text-primary flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Abstract
              </h3>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {paper.abstract}
              </p>
            </div>
            
            {/* Summary */}
            {paper.summary && (
              <div>
                <h3 className="text-sm font-semibold mb-2 text-secondary flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Key Insights
                </h3>
                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                  {paper.summary}
                </p>
              </div>
            )}
            
            {/* Research Focus */}
            {paper.researchFocus && (
              <div>
                <h3 className="text-sm font-semibold mb-2 text-accent flex items-center gap-2">
                  🔬 Research Focus
                </h3>
                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                  {paper.researchFocus}
                </p>
              </div>
            )}
            
            {/* Limitations */}
            {paper.limitations && (
              <div>
                <h3 className="text-sm font-semibold mb-2 text-destructive flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Limitations
                </h3>
                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                  {paper.limitations}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PaperDetailsModal;
