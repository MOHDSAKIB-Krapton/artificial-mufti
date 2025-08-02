"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageCircle,
  Users,
  Heart,
  BookOpen,
  Building2,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  AlertCircle,
  HelpCircle,
  Handshake,
  Briefcase,
  GraduationCap,
  MailQuestion,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { MOBILE_NUMBER } from "@/constants";

export default function ContactPage() {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   greeting: "",
  //   category: "",
  //   message: "",
  // });
  // const [loading, setLoading] = useState(false);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     setLoading(true);

  //     // MAKE API REQUEST TO SEND EMAIL>
  //   } catch (err: any) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }

  //   // Handle form submission
  // };

  // const handleChange = (field: string, value: string) => {
  //   setFormData((prev) => ({ ...prev, [field]: value }));
  // };

  const contactCategories = [
    {
      id: "technical",
      label: "Technical Support",
      icon: <HelpCircle className="w-4 h-4" />,
    },
    {
      id: "islamic",
      label: "Islamic Questions",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: "partnership",
      label: "Partnership Opportunities",
      icon: <Handshake className="w-4 h-4" />,
    },
    {
      id: "investment",
      label: "Investment Inquiries",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: "academic",
      label: "Academic Collaboration",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      id: "media",
      label: "Media Inquiries",
      icon: <MailQuestion className="w-4 h-4" />,
    },
  ];

  const departmentContacts = [
    {
      name: "Islamic Guidance",
      email: "mufti@artificialmufti.com",
      delay: "Response within 12-24 hours",
    },
    {
      name: "Technical Support",
      email: "support@artificialmufti.com",
      delay: "Response within 4-8 business hours",
    },
    {
      name: "Partnerships",
      email: "partnerships@artificialmufti.com",
      delay: "Response within 24-48 hours",
    },
    {
      name: "Media Relations",
      email: "media@artificialmufti.com",
      delay: "Response within 24 hours",
    },
    {
      name: "Investment & Funding",
      email: "invest@artificialmufti.com",
      delay: "Response within 48-72 hours",
    },
  ];

  return (
    <div className="min-h-screen bg-background ">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            We'd Love to Hear From You
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            As the Prophet (ﷺ) said,{" "}
            <em>
              "The believer who mixes with people and is patient with their harm
              is better than the one who does not mix with people and is not
              patient."
            </em>{" "}
            We welcome your questions, feedback, and partnership opportunities.
          </p>
          <p className="text-lg text-secondary font-medium">
            Your journey to knowledge begins with a simple conversation.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          {/* <Card className="lg:col-span-2 border-2 hover:border-primary/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Send className="w-6 h-6 text-primary" />
                Send us a message
              </CardTitle>
              <CardDescription>
                Reach out with your questions, and we'll respond with wisdom and
                patience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="As was traditionally written: Your humble servant"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="example@mail.com"
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="greeting" className="font-medium">
                    Islamic Greeting Tradition
                  </Label>
                  <Select
                    value={formData.greeting}
                    onValueChange={(value) => handleChange("greeting", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose your greeting style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assalamualaikum">
                        Assalamu Alaikum wa Rahmatullah
                      </SelectItem>
                      <SelectItem value="salam">Salam Alaikum</SelectItem>
                      <SelectItem value="peace">Peace be upon you</SelectItem>
                      <SelectItem value="custom">Custom greeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category" className="font-medium">
                    Select Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="What would you like to discuss?" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          <div className="flex items-center gap-2">
                            {cat.icon}
                            {cat.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="font-medium">
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Bismillah... Begin your message with the remembrance of Allah, then share your thoughts, questions, or concerns. We read every message with care and attention."
                    className="mt-2 min-h-32"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Response within 24 hours, in sha' Allah
                  </p>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Send With Blessings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card> */}

          {/* Contact Methods */}
          <div className="space-y-6">
            {/* Office Hours */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-secondary" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monday - Thursday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Friday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <Separator className="my-2" />
                <Badge variant="secondary" className="text-xs">
                  <Sun className="w-3 h-3 mr-1" />
                  Closed during prayer times
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Moon className="w-3 h-3 mr-1" />
                  Jumu'ah prayer observed
                </Badge>
              </CardContent>
            </Card> */}

            {/* WhatsApp Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  WhatsApp Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href={`https://wa.me/${MOBILE_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />+{MOBILE_NUMBER}
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  International support available 24/7
                </p>
              </CardContent>
            </Card>

            {/* Emergency Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Emergency Guidance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  asChild
                >
                  <a href="/emergency" className="hover:text-primary">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Emergency Islamic guidance
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  asChild
                >
                  <a href="/community" className="hover:text-primary">
                    <Users className="w-4 h-4 mr-2" />
                    Global Islamic scholar network
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Departments */}
        {/* <section className="mt-12">
          <h2 className="text-3xl font-serif text-center mb-8">
            Contact Our Departments
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            "Seeking knowledge is an obligation upon every Muslim. Seek
            knowledge from the cradle to the grave."
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentContacts.map((dept) => (
              <Card
                key={dept.email}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      variant="secondary"
                      className="w-full justify-start"
                      asChild
                    >
                      <a
                        href={`mailto:${dept.email}`}
                        className="group-hover:text-primary"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        {dept.email}
                      </a>
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      {dept.delay}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}

        {/* Physical Locations */}
        {/* <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">
              Global Islamic Center Locations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              "The best of people are those who are most beneficial to others."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Main Office
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium">
                      Islamic Center for AI Research
                    </p>
                    <p className="text-sm text-muted-foreground">
                      123 Al-Faruq Road
                      <br />
                      Knowledge Valley, Islamic Republic
                      <br />
                      P.O. Box 1357 - Peace Be Upon Him
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="text-sm text-muted-foreground">
                  <Map className="inline w-4 h-4 mr-1" />
                  Available for in-person consultation by appointment
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Interactive Mosque Locations
                </CardTitle>
                <CardDescription>
                  Find your nearest Islamic center for community support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <Button variant="outline" className="text-sm">
                      View Global Locations
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section> */}

        {/* Support Categories */}
        {/* <section className="mt-12">
          <h3 className="text-2xl font-serif text-center mb-6">
            Specialized Support Categories
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {contactCategories.map((cat) => (
              <Badge key={cat.id} variant="secondary" className="px-4 py-2">
                <div className="flex items-center gap-2">
                  {cat.icon}
                  {cat.label}
                </div>
              </Badge>
            ))}
          </div>
        </section> */}
      </div>
    </div>
  );
}
