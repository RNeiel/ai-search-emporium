import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Zap, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  confidence?: number;
  isAIRecommended?: boolean;
  benefits?: string[];
}

export const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviews, 
  confidence,
  isAIRecommended,
  benefits = []
}: ProductCardProps) => {
  const navigate = useNavigate();
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return "confidence-high";
    if (score >= 60) return "confidence-medium";
    return "confidence-low";
  };

  return (
    <Card className="group cursor-pointer overflow-hidden bg-card/50 backdrop-blur-sm border-muted hover:border-primary transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {isAIRecommended && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-ai-primary to-ai-secondary text-white border-0">
              <Zap className="h-3 w-3 mr-1" />
              AI Pick
            </Badge>
          )}
          
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
              -{discount}%
            </Badge>
          )}

          {confidence && (
            <Badge 
              className={`absolute bottom-2 left-2 bg-${getConfidenceColor(confidence)} text-white border-0`}
            >
              {confidence}% Match
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          <h3 
            className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
            onClick={() => navigate(`/product/${id}`)}
          >
            {name}
          </h3>

          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">{rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({reviews})</span>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl font-bold text-primary">${price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
            )}
          </div>

          {benefits.length > 0 && (
            <div className="mb-3">
              <div className="text-xs text-muted-foreground mb-1">AI Benefits:</div>
              <div className="flex flex-wrap gap-1">
                {benefits.slice(0, 2).map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {benefit}
                  </Badge>
                ))}
                {benefits.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{benefits.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex space-x-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            // Add to cart logic
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-primary to-ai-primary hover:from-primary/80 hover:to-ai-primary/80"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/checkout?product=${id}`);
          }}
        >
          <Zap className="h-4 w-4 mr-2" />
          Quick Buy
        </Button>
      </CardFooter>
    </Card>
  );
};