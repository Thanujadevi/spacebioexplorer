import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Home, Search, BarChart3, Info } from "lucide-react";
import { useState } from "react";
import ChatbotDialog from "./ChatbotDialog";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [chatOpen, setChatOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/explore", label: "Explore Papers", icon: Search },
    { path: "/insights", label: "Visual Insights", icon: BarChart3 },
    { path: "/about", label: "About", icon: Info },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-lg bg-background/80 sticky top-0 z-40">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow-pulse">
                <span className="text-2xl">🔬</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  SpaceBioExplorer
                </h1>
                <p className="text-xs text-muted-foreground">Space Biology Research Portal</p>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={isActive(item.path) ? "shadow-[var(--shadow-elevated)]" : ""}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Button
                onClick={() => setChatOpen(true)}
                className="ml-2 shadow-[var(--shadow-elevated)] bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
            </div>
            
            <div className="md:hidden">
              <Button
                onClick={() => setChatOpen(true)}
                size="icon"
                className="shadow-[var(--shadow-elevated)]"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              SpaceBioExplorer © 2025 • Advancing Space Biology Research
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              "Exploration knows no boundaries — not even gravity."
            </p>
          </div>
        </div>
      </footer>
      
      {/* Chatbot Dialog */}
      <ChatbotDialog open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default Layout;
