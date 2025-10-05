import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { loadResearchPapers, ResearchPaper } from "@/lib/dataParser";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, Calendar, Tags, Microscope } from "lucide-react";

const COLORS = ['hsl(271 81% 56%)', 'hsl(174 72% 40%)', 'hsl(271 91% 65%)', 'hsl(174 82% 50%)', 'hsl(222 47% 60%)'];

const Insights = () => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [yearData, setYearData] = useState<any[]>([]);
  const [organismData, setOrganismData] = useState<any[]>([]);
  const [keywordData, setKeywordData] = useState<any[]>([]);
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    const data = await loadResearchPapers();
    setPapers(data);
    processData(data);
  };
  
  const processData = (data: ResearchPaper[]) => {
    // Year distribution
    const yearCounts = data.reduce((acc, paper) => {
      if (paper.year > 0) {
        acc[paper.year] = (acc[paper.year] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);
    
    const yearChartData = Object.entries(yearCounts)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year);
    
    setYearData(yearChartData);
    
    // Organism distribution
    const organismCounts = data.reduce((acc, paper) => {
      const organism = paper.organism || 'Other';
      acc[organism] = (acc[organism] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const organismChartData = Object.entries(organismCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
    
    setOrganismData(organismChartData);
    
    // Top keywords
    const allKeywords = data.flatMap(p => 
      p.keywords.split(',').map(k => k.trim().toLowerCase())
    ).filter(k => k.length > 3);
    
    const keywordCounts = allKeywords.reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topKeywords = Object.entries(keywordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([keyword, count]) => ({ keyword, count }));
    
    setKeywordData(topKeywords);
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Visual Insights
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore research trends, patterns, and distributions across our database
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Papers</p>
                <p className="text-3xl font-bold text-primary">{papers.length}</p>
              </div>
              <Microscope className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: '50ms' }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Research Areas</p>
                <p className="text-3xl font-bold text-accent">{organismData.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Time Span</p>
                <p className="text-3xl font-bold text-secondary">
                  {yearData.length > 0 ? `${yearData[0].year}-${yearData[yearData.length - 1].year}` : '-'}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-secondary/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: '150ms' }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unique Topics</p>
                <p className="text-3xl font-bold text-primary">{keywordData.length}+</p>
              </div>
              <Tags className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Publications by Year */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Publications Timeline
            </CardTitle>
            <CardDescription>Research papers published by year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Organism Distribution */}
        <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="w-5 h-5 text-accent" />
              Research by Subject
            </CardTitle>
            <CardDescription>Distribution of research organisms and subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={organismData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name} (${(entry.percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {organismData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Top Keywords */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tags className="w-5 h-5 text-secondary" />
            Top Research Keywords
          </CardTitle>
          <CardDescription>Most frequently occurring topics in research papers</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={keywordData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="keyword" type="category" stroke="hsl(var(--muted-foreground))" width={150} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--secondary))" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Quote */}
      <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-primary/20 animate-fade-in">
        <CardContent className="pt-6 text-center">
          <blockquote className="text-lg italic text-foreground/80">
            "Space biology helps us understand life beyond Earth — and within ourselves."
          </blockquote>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;
