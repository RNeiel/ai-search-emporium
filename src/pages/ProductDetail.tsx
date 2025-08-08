import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, ShoppingCart, Zap, CheckCircle, ArrowLeft, BarChart3 } from "lucide-react";

// Mock product data
const mockProduct = {
  id: "1",
  name: "MacBook Pro 16-inch M3 Max",
  price: 2499,
  originalPrice: 2799,
  images: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop"
  ],
  rating: 4.8,
  reviews: 1247,
  confidence: 95,
  whyChosen: "This MacBook Pro perfectly matches your need for high-performance computing with excellent battery life. Based on your query, it offers the best balance of power, portability, and professional features.",
  benefits: [
    "Unmatched performance for creative professionals",
    "All-day battery life for uninterrupted work",
    "Stunning Liquid Retina XDR display",
    "Advanced thermal design for sustained performance"
  ],
  specs: {
    "Processor": "Apple M3 Max chip with 12-core CPU",
    "Memory": "36GB unified memory",
    "Storage": "1TB SSD storage", 
    "Display": "16.2-inch Liquid Retina XDR",
    "Graphics": "38-core GPU",
    "Battery": "Up to 22 hours",
    "Weight": "4.7 pounds"
  },
  scenarios: [
    {
      title: "Video Editing",
      description: "Edit 8K ProRes video smoothly",
      performance: "95%",
      icon: "🎬"
    },
    {
      title: "3D Rendering", 
      description: "Complex 3D models render 3x faster",
      performance: "92%",
      icon: "🎨"
    },
    {
      title: "Programming",
      description: "Compile large codebases instantly",
      performance: "98%",
      icon: "💻"
    },
    {
      title: "Gaming",
      description: "Play AAA games at high settings",
      performance: "88%",
      icon: "🎮"
    }
  ]
};

const relatedProducts = [
  {
    id: "2",
    name: "MacBook Air M3",
    price: 1299,
    confidence: 78,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=150&fit=crop"
  },
  {
    id: "3", 
    name: "iMac 24-inch M3",
    price: 1899,
    confidence: 71,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=150&fit=crop"
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const product = mockProduct; // In real app, fetch by id

  const getPerformanceColor = (score: string) => {
    const num = parseInt(score);
    if (num >= 90) return "text-confidence-high";
    if (num >= 80) return "text-confidence-medium";
    return "text-confidence-low";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Results
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img 
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-primary' : 'border-muted'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-gradient-to-r from-ai-primary to-ai-secondary text-white">
                  {product.confidence}% AI Match
                </Badge>
                <Badge variant="outline">
                  <Zap className="h-3 w-3 mr-1" />
                  AI Recommended
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    Save ${product.originalPrice - product.price}
                  </Badge>
                )}
              </div>
            </div>

            {/* Why This Product */}
            <Card className="bg-gradient-to-r from-ai-primary/10 to-ai-secondary/10 border-ai-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-ai-primary">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Why AI Chose This Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{product.whyChosen}</p>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <div>
              <h3 className="font-semibold mb-3">Key Benefits for You</h3>
              <div className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-confidence-high" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button variant="outline" size="lg" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" className="flex-1 bg-gradient-to-r from-primary to-ai-primary">
                <Zap className="h-4 w-4 mr-2" />
                Quick Buy
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="scenarios" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scenarios">Real-World Performance</TabsTrigger>
            <TabsTrigger value="specs">Technical Specs</TabsTrigger>
            <TabsTrigger value="compare">Compare Similar</TabsTrigger>
          </TabsList>

          <TabsContent value="scenarios" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.scenarios.map((scenario, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{scenario.icon}</span>
                        <h3 className="font-semibold">{scenario.title}</h3>
                      </div>
                      <Badge className={`${getPerformanceColor(scenario.performance)} border-0 bg-muted`}>
                        {scenario.performance}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{scenario.description}</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-primary to-ai-primary"
                        style={{ width: scenario.performance }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-muted last:border-0">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compare" className="mt-6">
            <div>
              <h3 className="text-xl font-semibold mb-6">Other AI-Recommended Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex space-x-4">
                        <img 
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium mb-2">{relatedProduct.name}</h4>
                          <p className="text-lg font-bold text-primary mb-2">${relatedProduct.price}</p>
                          <Badge variant="secondary" className="text-xs">
                            {relatedProduct.confidence}% Match
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          Compare
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;