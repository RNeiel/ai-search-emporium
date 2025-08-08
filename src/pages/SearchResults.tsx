import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, SortAsc, Sparkles } from "lucide-react";
import { Product } from "@/types/product";

// Mock product data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 16-inch M3 Max",
    price: 2499,
    originalPrice: 2799,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 1247,
    confidence: 95,
    isAIRecommended: true,
    benefits: ["High Performance", "Long Battery Life", "Professional Grade"]
  },
  {
    id: "2", 
    name: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 892,
    confidence: 88,
    isAIRecommended: true,
    benefits: ["Advanced Camera", "5G Ready", "Premium Build"]
  },
  {
    id: "3",
    name: "Samsung Galaxy S24 Ultra",
    price: 1099,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 634,
    confidence: 82,
    benefits: ["S Pen Included", "AI Features", "Excellent Display"]
  },
  {
    id: "4",
    name: "Dell XPS 13 Plus",
    price: 1299,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 456,
    confidence: 76,
    benefits: ["Portable Design", "Touch Display", "Fast SSD"]
  }
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const searchType = searchParams.get('type') || 'regular';
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    // Simulate AI search with higher confidence scores and benefits
    if (searchType === 'ai') {
      const aiEnhancedProducts = mockProducts.map(product => ({
        ...product,
        confidence: Math.min(product.confidence || 70, 95),
        isAIRecommended: product.confidence && product.confidence > 80,
        benefits: product.benefits || ["Smart Match", "User Rated", "Quality Assured"]
      }));
      setProducts(aiEnhancedProducts.sort((a, b) => (b.confidence || 0) - (a.confidence || 0)));
    }
  }, [searchType]);

  const handleSort = (value: string) => {
    setSortBy(value);
    let sortedProducts = [...products];
    
    switch (value) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'confidence':
        if (searchType === 'ai') {
          sortedProducts.sort((a, b) => (b.confidence || 0) - (a.confidence || 0));
        }
        break;
      default:
        break;
    }
    
    setProducts(sortedProducts);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Results Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <h1 className="text-2xl font-bold">Search Results</h1>
            {searchType === 'ai' && (
              <Badge className="bg-gradient-to-r from-ai-primary to-ai-secondary text-white border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Enhanced
              </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground mb-4">
            {searchType === 'ai' ? 'AI-powered results' : 'Results'} for "{query}" • {products.length} products found
          </p>

          {searchType === 'ai' && (
            <div className="bg-gradient-to-r from-ai-primary/10 to-ai-secondary/10 border border-ai-primary/20 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-ai-primary mb-2">AI Search Insights</h3>
              <p className="text-sm text-muted-foreground">
                Products are ranked by confidence scores based on your query. Higher scores indicate better matches for your specific needs.
              </p>
            </div>
          )}
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex items-center space-x-2">
              <SortAsc className="h-4 w-4 text-muted-foreground" />
              <select 
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="bg-background border border-input rounded-md px-3 py-1 text-sm"
              >
                <option value="relevance">Relevance</option>
                {searchType === 'ai' && <option value="confidence">Confidence Score</option>}
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {products.length} of {products.length} products
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              confidence={searchType === 'ai' ? product.confidence : undefined}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;