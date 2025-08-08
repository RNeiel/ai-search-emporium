import { ShoppingCart, User, Heart, Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-ai-primary bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate('/')}
          >
            FutureShop
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" onClick={() => navigate('/categories')}>Categories</Button>
          <Button variant="ghost" onClick={() => navigate('/deals')}>Deals</Button>
          <Button variant="ghost" onClick={() => navigate('/new-arrivals')}>New Arrivals</Button>
          <Button variant="ghost" onClick={() => navigate('/brands')}>Brands</Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/wishlist')}>
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/cart')} className="relative">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">2</Badge>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};