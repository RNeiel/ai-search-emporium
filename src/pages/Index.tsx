import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { CategoryCard } from "@/components/CategoryCard";
import { Laptop, Smartphone, Shirt, WashingMachine } from "lucide-react";

const categories = [
  {
    title: "Laptops",
    description: "High-performance computing for work and gaming",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    icon: <Laptop className="h-6 w-6" />,
    productCount: 1248
  },
  {
    title: "Mobiles",
    description: "Latest smartphones with cutting-edge technology",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    icon: <Smartphone className="h-6 w-6" />,
    productCount: 2156
  },
  {
    title: "Women's Dresses",
    description: "Elegant fashion for every occasion",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
    icon: <Shirt className="h-6 w-6" />,
    productCount: 3420
  },
  {
    title: "Washing Machines",
    description: "Smart appliances for modern homes",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    icon: <WashingMachine className="h-6 w-6" />,
    productCount: 892
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-ai-primary to-ai-secondary bg-clip-text text-transparent">
            Future of Shopping
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience next-generation e-commerce with AI-powered recommendations and intelligent search
          </p>
          
          <div className="mb-12">
            <SearchBar />
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                description={category.description}
                image={category.image}
                icon={category.icon}
                productCount={category.productCount}
              />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-muted">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-ai-primary rounded-full flex items-center justify-center">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Search</h3>
            <p className="text-muted-foreground">
              Describe what you need in natural language and get personalized results
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-muted">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-full flex items-center justify-center">
              <Laptop className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-muted-foreground">
              Get confidence scores and detailed explanations for every product match
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-muted">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-ai-secondary to-primary rounded-full flex items-center justify-center">
              <WashingMachine className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-World Scenarios</h3>
            <p className="text-muted-foreground">
              See how products perform in actual use cases that matter to you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
