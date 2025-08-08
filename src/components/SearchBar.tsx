import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleRegularSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}&type=regular`);
    }
  };

  const handleAISearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}&type=ai`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRegularSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <div className="relative group">
        <Input
          placeholder="Search for products, brands, or describe what you need..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="h-14 pl-6 pr-32 text-lg border-2 border-muted focus:border-primary transition-all duration-300 bg-card/50 backdrop-blur-sm"
          autoFocus
        />
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
          <Button
            onClick={handleRegularSearch}
            size="sm"
            variant="ghost"
            className="h-10 px-3 hover:bg-primary/10"
            title="Regular Search"
          >
            <Search className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={handleAISearch}
            size="sm"
            className="h-10 px-3 bg-gradient-to-r from-ai-primary to-ai-secondary hover:from-ai-primary/80 hover:to-ai-secondary/80 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            title="AI-Powered Search"
          >
            <div className="relative">
              <Search className="h-4 w-4" />
              <Sparkles className="h-2 w-2 absolute -top-0.5 -right-0.5 text-white" />
            </div>
          </Button>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-ai-primary/5 rounded-lg -z-10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
    </div>
  );
};