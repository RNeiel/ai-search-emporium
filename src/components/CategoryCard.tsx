import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  productCount: number;
}

export const CategoryCard = ({ title, description, image, icon, productCount }: CategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="group cursor-pointer overflow-hidden bg-card/50 backdrop-blur-sm border-muted hover:border-primary transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
      onClick={() => navigate(`/category/${title.toLowerCase().replace(/\s+/g, '-')}`)}
    >
      <CardContent className="p-0">
        <div className="relative h-48 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-ai-primary/20 group-hover:from-primary/30 group-hover:to-ai-primary/30 transition-all duration-500"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                {icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-white/80 mb-2">{description}</p>
            <div className="text-xs text-primary font-medium">
              {productCount.toLocaleString()} products
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};