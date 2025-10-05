import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Search, BarChart3, MessageSquare, Sparkles, Rocket, Microscope } from "lucide-react";

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
            <Sparkles className="w-4 h-4 animate-pulse" />
            AI-Powered Research Portal
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              SpaceBioExplorer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your intelligent gateway to exploring groundbreaking research in space biology, 
            microgravity effects, and life sciences beyond Earth
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/explore">
              <Button size="lg" className="shadow-[var(--shadow-elevated)] bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6">
                <Search className="w-5 h-5 mr-2" />
                Explore Research
              </Button>
            </Link>
            <Link to="/insights">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Insights
              </Button>
            </Link>
          </div>
          
          <blockquote className="text-lg italic text-primary/80 pt-8 animate-fade-in">
            "Exploration knows no boundaries — not even gravity."
          </blockquote>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Advanced tools to discover, analyze, and understand space biology research
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="group hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:border-primary/50 animate-fade-in">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Smart Search</h3>
              <p className="text-muted-foreground">
                Natural language search with intelligent filters to find exactly what you're looking for
              </p>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:border-primary/50 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">AI Assistant</h3>
              <p className="text-muted-foreground">
                Conversational AI that understands context and provides intelligent insights from research
              </p>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:border-primary/50 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Visual Insights</h3>
              <p className="text-muted-foreground">
                Interactive charts and trends to understand research patterns at a glance
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Research Areas */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Research Areas
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore cutting-edge studies across multiple domains
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Rocket, label: "Microgravity Effects", color: "from-primary to-accent" },
            { icon: Microscope, label: "Cellular Adaptation", color: "from-accent to-secondary" },
            { icon: Sparkles, label: "Muscle Physiology", color: "from-secondary to-primary" },
            { icon: MessageSquare, label: "Radiation Biology", color: "from-primary to-secondary" },
          ].map((area, index) => (
            <Card
              key={index}
              className="group cursor-pointer hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:border-primary/50 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="pt-6 text-center space-y-3">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${area.color} flex items-center justify-center group-hover:scale-110 transition-transform animate-float`}>
                  <area.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold">{area.label}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-16 px-4 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10" />
        <div className="relative text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Explore Space Biology?
          </h2>
          <p className="text-lg text-muted-foreground">
            Dive into our comprehensive database of research papers and discover insights 
            that are shaping our understanding of life beyond Earth
          </p>
          <Link to="/explore">
            <Button size="lg" className="shadow-[var(--shadow-elevated)] bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6">
              Start Exploring Now
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm italic text-primary/60 pt-4">
            "Space biology helps us understand life beyond Earth — and within ourselves."
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
