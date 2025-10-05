import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Target, Zap, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          About SpaceBioExplorer
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your intelligent gateway to space biology research
        </p>
      </div>
      
      {/* Mission Statement */}
      <Card className="border-primary/20 animate-fade-in">
        <CardContent className="pt-6">
          <p className="text-lg leading-relaxed text-foreground/90">
            SpaceBioExplorer is a cutting-edge research portal designed to make space biology 
            research accessible, searchable, and understandable. We bridge the gap between 
            complex scientific literature and researchers, educators, and enthusiasts by 
            providing intelligent tools to explore, analyze, and discover insights from 
            groundbreaking studies in microgravity, space adaptation, and life sciences beyond Earth.
          </p>
        </CardContent>
      </Card>
      
      {/* Core Values */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="group hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:border-primary/50 animate-fade-in">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6" />
              </div>
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Leveraging cutting-edge AI technology to transform how researchers access 
                and understand space biology literature.
              </p>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:border-primary/50 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <CardTitle>Accessibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Making complex scientific research understandable and discoverable for everyone, 
                from students to seasoned researchers.
              </p>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:border-primary/50 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <CardTitle>Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Smart search and AI-powered insights save researchers valuable time in 
                literature review and discovery.
              </p>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:border-primary/50 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
              <CardTitle>Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fostering a community of curious minds exploring the frontiers of space 
                biology together.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Features Overview */}
      <Card className="border-primary/20 animate-fade-in">
        <CardHeader>
          <CardTitle>What We Offer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xs font-bold text-primary">✓</span>
              </div>
              <div>
                <h4 className="font-semibold">Comprehensive Research Database</h4>
                <p className="text-sm text-muted-foreground">
                  Curated collection of space biology research papers with detailed metadata
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xs font-bold text-primary">✓</span>
              </div>
              <div>
                <h4 className="font-semibold">Intelligent Search & Filtering</h4>
                <p className="text-sm text-muted-foreground">
                  Natural language search with smart filters for precise discovery
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xs font-bold text-primary">✓</span>
              </div>
              <div>
                <h4 className="font-semibold">AI Research Assistant</h4>
                <p className="text-sm text-muted-foreground">
                  Conversational AI that understands context and provides intelligent answers
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xs font-bold text-primary">✓</span>
              </div>
              <div>
                <h4 className="font-semibold">Visual Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Interactive charts and visualizations revealing research trends and patterns
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xs font-bold text-primary">✓</span>
              </div>
              <div>
                <h4 className="font-semibold">AI-Generated Insights</h4>
                <p className="text-sm text-muted-foreground">
                  Instant summaries and comparative analysis powered by artificial intelligence
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Closing Quote */}
      <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-primary/20 animate-fade-in">
        <CardContent className="pt-6 text-center space-y-4">
          <blockquote className="text-xl italic text-foreground/90">
            "Exploration knows no boundaries — not even gravity."
          </blockquote>
          <p className="text-sm text-muted-foreground">
            Join us in exploring the fascinating world of space biology research
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
