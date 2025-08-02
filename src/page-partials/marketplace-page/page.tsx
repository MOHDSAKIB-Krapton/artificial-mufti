"use client";

import { useState } from "react";
import {
  Search,
  Star,
  Heart,
  BookOpen,
  Users,
  Calendar,
  DollarSign,
  Filter,
  ShoppingCart,
  BookMarked,
  Globe,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  category: string;
  title: string;
  description: string;
  price: {
    type: "free" | "pro" | "premium";
    amount: number;
  };
  rating: number;
  reviews: number;
  imageUrl?: string;
}

const marketplaceProducts: Product[] = [
  {
    id: "1",
    category: "Islamic courses and classes",
    title: "Classical Tafsir Mastery",
    description:
      "Deep dive into classical Quranic exegesis with Shaykh Abdullah Al-Mansouri. 12-week intensive course.",
    price: { type: "premium", amount: 299 },
    rating: 4.9,
    reviews: 284,
  },
  {
    id: "2",
    category: "Prayer tools and apps",
    title: "Daily Prayer Companion Pro",
    description:
      "Ad-free prayer times, Qibla compass, and Dua collection with audio pronunciations.",
    price: { type: "pro", amount: 19 },
    rating: 4.7,
    reviews: 1523,
  },
  {
    id: "3",
    category: "E-books and digital resources",
    title: "The Prophetic Biography: Illustrated Collection",
    description:
      "8-volume beautifully illustrated biography of Prophet Muhammad ﷺ with interactive features.",
    price: { type: "premium", amount: 89 },
    rating: 5.0,
    reviews: 567,
  },
  {
    id: "4",
    category: "Ramadan planners",
    title: "30-Day Ramadan Transformation Planner",
    description:
      "Daily duas, meal planning, goal tracking, and spiritual reflection prompts.",
    price: { type: "free", amount: 0 },
    rating: 4.8,
    reviews: 892,
  },
  {
    id: "5",
    category: "Islamic finance calculators",
    title: "Zakat Master Calculator",
    description:
      "Comprehensive Zakat calculator for all asset classes. Includes stocks, crypto, business, and gold.",
    price: { type: "pro", amount: 9.99 },
    rating: 4.6,
    reviews: 445,
  },
  {
    id: "6",
    category: "Scholar consultations",
    title: "One-on-One Guidance Session",
    description:
      "Personal consultation with certified Islamic scholars for questions on faith, family, and finance.",
    price: { type: "premium", amount: 150 },
    rating: 4.9,
    reviews: 198,
  },
];

const categories = [
  "All",
  "Islamic courses",
  "Prayer tools",
  "E-books",
  "Ramadan guides",
  "Finance tools",
  "Scholar sessions",
];

const pricingFilters = ["All prices", "Free", "Paid"];

const featuredScholars = [
  {
    name: "Ustadh Omar Suleiman",
    expertise: "Islamic law & contemporary issues",
    studentsTaught: 15000,
    image: "/api/placeholder/120/120",
    rating: 4.9,
  },
  {
    name: "Shaykh Yasir Qadhi",
    expertise: "Aqeedah & Quran studies",
    studentsTaught: 25000,
    image: "/api/placeholder/120/120",
    rating: 4.8,
  },
  {
    name: "Dr. Rania Awaad",
    expertise: "Islamic psychology & wellness",
    studentsTaught: 8000,
    image: "/api/placeholder/120/120",
    rating: 4.9,
  },
];

export default function IslamicMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All prices");
  const [cart, setCart] = useState<number>(0);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredProducts = marketplaceProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      product.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesPrice =
      selectedPrice === "All prices" ||
      (selectedPrice === "Free" && product.price.type === "free") ||
      (selectedPrice === "Paid" && product.price.type !== "free");

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => prev + 1);
    // Here you would typically make an API call
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Islamic geometric pattern background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #C29B61 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header with Cart */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Globe className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Baytul Ilm</h1>
            </div>
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cart > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs"
                >
                  {cart}
                </Badge>
              )}
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-b from-background via-neutral-50/50 to-background">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Your one-stop Islamic knowledge marketplace
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover transformative Islamic courses, tools, and guidance from
              the world's leading scholars
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Browse Courses
              </Button>
              <Button size="lg" variant="outline">
                Start Free Trial
              </Button>
            </div>
          </div>
        </section>

        {/* Search and Filter Bar */}
        <section className="py-6 bg-muted/50 border-t border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for courses, duas, or tools..."
                  className="w-full pl-10"
                />
              </div>

              <div className="flex gap-4 flex-wrap">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingFilters.map((price) => (
                      <SelectItem key={price} value={price}>
                        {price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" className="hidden lg:flex">
                  <Filter className="h-4 w-4 mr-2" />
                  More filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Browse All Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 flex items-center justify-center">
                      {product.category.includes("Prayer") && (
                        <Sparkles className="h-12 w-12 text-primary" />
                      )}
                      {product.category.includes("courses") && (
                        <BookOpen className="h-12 w-12 text-primary" />
                      )}
                      {product.category.includes("E-books") && (
                        <BookMarked className="h-12 w-12 text-primary" />
                      )}
                      {product.category.includes("Ramadan") && (
                        <Calendar className="h-12 w-12 text-primary" />
                      )}
                      {product.category.includes("calculator") && (
                        <DollarSign className="h-12 w-12 text-primary" />
                      )}
                      {product.category.includes("consultations") && (
                        <Users className="h-12 w-12 text-primary" />
                      )}
                    </div>
                    <div className="flex justify-between items-start">
                      <Badge
                        variant={
                          product.price.type === "free"
                            ? "default"
                            : "secondary"
                        }
                        className={`${
                          product.price.type === "free"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }`}
                      >
                        {product.price.type === "free"
                          ? "Free"
                          : product.price.type === "pro"
                          ? `$${product.price.amount}`
                          : `$$${product.price.amount}`}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWishlist(product.id)}
                        className={`${
                          wishlist.includes(product.id) ? "text-red-500" : ""
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            wishlist.includes(product.id) ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg mb-2">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="mb-4">
                      {product.description}
                    </CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-1">{product.rating}</span>
                      </div>
                      <span>({product.reviews} reviews)</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => addToCart(product)}
                    >
                      {product.price.type === "free"
                        ? "Download Free"
                        : "Add to Cart"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Scholars */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Learn from World-Class Scholars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredScholars.map((scholar) => (
                <Card key={scholar.name} className="text-center">
                  <CardContent className="pt-6">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src={scholar.image} />
                      <AvatarFallback>
                        {scholar.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{scholar.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {scholar.expertise}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {scholar.studentsTaught.toLocaleString()} students taught
                    </p>
                    <div className="flex justify-center items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{scholar.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              What Our Students Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-4">
                    "The Ramadan planner completely transformed my experience
                    this year. The daily structure and spiritual prompts helped
                    me achieve my goals for the first time ever."
                  </blockquote>
                  <p className="font-semibold">Amina Ahmed</p>
                  <p className="text-sm text-muted-foreground">
                    Manchester, UK
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-4">
                    "The Tafsir course was incredibly detailed. Shaykh
                    Abdullah's explanations made complex concepts accessible and
                    relevant to modern life."
                  </blockquote>
                  <p className="font-semibold">Ibrahim Rahman</p>
                  <p className="text-sm text-muted-foreground">Dearborn, MI</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
