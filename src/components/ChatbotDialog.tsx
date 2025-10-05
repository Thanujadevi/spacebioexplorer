import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { loadResearchPapers, ResearchPaper } from "@/lib/dataParser";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatbotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatbotDialog = ({ open, onOpenChange }: ChatbotDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Space Biology Research Assistant. I can help you explore research papers about microgravity, space adaptation, and life sciences in space. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    loadResearchPapers().then(setPapers);
  }, []);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  
  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Search for relevant papers
    const relevantPapers = papers.filter(paper => 
      paper.title.toLowerCase().includes(lowerQuery) ||
      paper.keywords.toLowerCase().includes(lowerQuery) ||
      paper.abstract.toLowerCase().includes(lowerQuery) ||
      paper.summary.toLowerCase().includes(lowerQuery)
    );
    
    // Topic-based responses
    if (lowerQuery.includes('microgravity') || lowerQuery.includes('weightless')) {
      const microgravityPapers = papers.filter(p => 
        p.keywords.toLowerCase().includes('microgravity')
      );
      if (microgravityPapers.length > 0) {
        return `I found ${microgravityPapers.length} studies related to microgravity:\n\n${microgravityPapers.slice(0, 3).map(p => `• "${p.title}" (${p.year}) - ${p.summary.slice(0, 150)}...`).join('\n\n')}\n\nMicrogravity significantly impacts various biological systems including muscle atrophy, bone density loss, and cellular adaptations.`;
      }
    }
    
    if (lowerQuery.includes('muscle') || lowerQuery.includes('atrophy')) {
      return `Muscle atrophy in space is a critical concern. Research shows that microgravity causes significant muscle mass loss due to reduced mechanical loading. Studies indicate that astronauts can lose up to 20% of muscle mass during long-duration missions. Countermeasures include resistance exercise and pharmaceutical interventions being actively researched.`;
    }
    
    if (lowerQuery.includes('plant') || lowerQuery.includes('growth')) {
      return `Plant growth in space environments presents unique challenges and opportunities. Research has shown that plants can adapt to microgravity, though their growth patterns differ from Earth. Key findings include altered root orientation (gravitropism), changes in cell wall structure, and modified gene expression. This research is crucial for long-duration space missions and potential extraterrestrial agriculture.`;
    }
    
    if (lowerQuery.includes('radiation')) {
      return `Space radiation is one of the most significant health risks for astronauts. Cosmic radiation and solar particle events can cause DNA damage, increase cancer risk, and affect the central nervous system. Current research focuses on radiation shielding, biological countermeasures, and understanding cellular repair mechanisms in space environments.`;
    }
    
    if (lowerQuery.includes('author') || lowerQuery.includes('researcher')) {
      const authorList = new Set<string>();
      papers.forEach(p => {
        p.authors.split(',').slice(0, 2).forEach(author => {
          authorList.add(author.trim());
        });
      });
      return `Our database includes work from ${authorList.size}+ researchers. Some key contributors include: ${Array.from(authorList).slice(0, 5).join(', ')}, and many others advancing our understanding of space biology.`;
    }
    
    if (lowerQuery.includes('year') || lowerQuery.includes('recent') || lowerQuery.includes('latest')) {
      const years = papers.map(p => p.year).filter(y => y > 0);
      const latestYear = Math.max(...years);
      const recentPapers = papers.filter(p => p.year >= latestYear - 2);
      return `Our database includes research from ${Math.min(...years)} to ${latestYear}. Recent publications (${latestYear - 2}-${latestYear}) focus on: ${recentPapers.slice(0, 3).map(p => `"${p.title}"`).join(', ')}.`;
    }
    
    // If we found relevant papers
    if (relevantPapers.length > 0) {
      const topPaper = relevantPapers[0];
      return `I found ${relevantPapers.length} relevant ${relevantPapers.length === 1 ? 'paper' : 'papers'}:\n\n"${topPaper.title}" (${topPaper.year})\n\n${topPaper.summary}\n\n${relevantPapers.length > 1 ? `There are ${relevantPapers.length - 1} more related papers in our database.` : ''}`;
    }
    
    // General responses
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      return `Hello! I'm here to help you explore space biology research. Our database contains studies on microgravity effects, cellular adaptations, physiological changes, and much more. What specific topic interests you?`;
    }
    
    if (lowerQuery.includes('help') || lowerQuery.includes('what can you')) {
      return `I can help you with:\n• Finding research papers on specific topics (microgravity, radiation, muscle atrophy, etc.)\n• Summarizing key findings from studies\n• Comparing research across different years\n• Identifying top researchers in the field\n• Explaining space biology concepts\n\nJust ask me anything about space biology!`;
    }
    
    return `I found ${papers.length} research papers in our database covering topics like microgravity effects, cellular adaptation, muscle atrophy, radiation impacts, and physiological changes in space. Could you be more specific about what aspect of space biology you'd like to explore? For example, you could ask about specific organisms, research topics, or time periods.`;
  };
  
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate thinking time
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = { role: "assistant", content: response };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col bg-gradient-to-br from-card to-card/80 border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-glow-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            AI Research Assistant
          </DialogTitle>
          <DialogDescription>
            Ask me anything about space biology research
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-3 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 border border-border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="rounded-lg px-4 py-3 bg-muted/50 border border-border">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2 pt-4 border-t border-border">
          <Input
            placeholder="Ask about space biology research..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;
