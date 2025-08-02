"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  Heart,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Plane,
  Share2,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";

// interface CountdownTime {
//   days: number;
//   hours: number;
//   minutes: number;
//   seconds: number;
// }

// const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
//   const [timeLeft, setTimeLeft] = useState<CountdownTime>({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date();
//       const difference = targetDate.getTime() - now.getTime();

//       if (difference > 0) {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60),
//         });
//       } else {
//         clearInterval(timer);
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [targetDate]);

//   return (
//     <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
//       {Object.entries(timeLeft).map(([unit, value]) => (
//         <motion.div
//           key={unit}
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: Object.keys(timeLeft).indexOf(unit) * 0.1 }}
//           className="text-center"
//         >
//           <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg p-4 border border-primary/30">
//             <div className="text-3xl font-bold text-primary font-mono">
//               {String(value).padStart(2, "0")}
//             </div>
//             <div className="text-sm text-muted-foreground uppercase tracking-wider">
//               {unit}
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const FeatureCard = ({
//   title,
//   description,
//   icon: Icon,
//   status = "coming",
// }: {
//   title: string;
//   description: string;
//   icon: React.ElementType;
//   status?: "coming" | "beta" | "ready";
// }) => {
//   const statusColors = {
//     coming: "bg-amber-100 text-amber-800",
//     beta: "bg-green-100 text-green-800",
//     ready: "bg-emerald-100 text-emerald-800",
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//     >
//       <Card className="group hover:shadow-lg transition-all duration-300 bg-card/50 border-primary/20">
//         <CardContent className="p-6">
//           <div className="flex items-start justify-between mb-4">
//             <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
//               <Icon className="h-6 w-6 text-primary" />
//             </div>
//             <Badge className={cn("capitalize", statusColors[status])}>
//               {status}
//             </Badge>
//           </div>
//           <h4 className="font-semibold text-lg mb-2">{title}</h4>
//           <p className="text-muted-foreground">{description}</p>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

const ProgressBar = ({ label, value }: { label: string; value: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span className="text-muted-foreground">{value}%</span>
    </div>
    <Progress value={value} className="h-2" />
  </div>
);

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // const [activeTab, setActiveTab] = useState("web");

  // const launchDate = new Date();
  // launchDate.setDate(launchDate.getDate() + 30);

  const submitWaitlist = async (
    name: string,
    email: string,
    message?: string
  ) => {
    try {
      setLoading(true);
      const res = await fetch("/api/waitinglist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error || "Failed to join the waitlist");
      }

      setSubmitted(true);
      setEmail("");
      setName("");
      setMessage("");

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);

      return await res.json();
    } catch (err: any) {
      alert(err || "Could not add you in the list, Please try again Later.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      title: "AI-Powered Islamic Insights",
      description:
        "Get personalized guidance powered by advanced Islamic AI, trained on authentic sources.",
      icon: Sparkles,
      status: "beta" as const,
    },
    {
      title: "Community Stories",
      description:
        "Share and read inspiring halal love stories from our growing community.",
      icon: Heart,
      status: "coming" as const,
    },
    {
      title: "Live Q&A Sessions",
      description:
        "Weekly sessions with Islamic scholars to answer your questions in real-time.",
      icon: MessageCircle,
      status: "beta" as const,
    },
    {
      title: "Halal Travel Matchmaker",
      description:
        "Find compatible partners for your next halal travel adventure.",
      icon: Plane,
      status: "coming" as const,
    },
  ];

  const team = [
    { name: "Maha Ali", role: "Islamic Scholar & Advisor", image: "👳‍♀️" },
    { name: "Hassan Khan", role: "Product Designer", image: "👨‍💻" },
    { name: "Amina Rahman", role: "Community Architect", image: "👩‍🤝‍👩" },
    { name: "Yusuf Patel", role: "AI Engineer", image: "👨‍🔬" },
  ];

  const faqs = [
    {
      question: "When exactly will the new features launch?",
      answer:
        "We expect to launch by the end of next month, in shā’ Allāh. Stay tuned for exact date announcements!",
    },
    {
      question: "How do I join the beta testing program?",
      answer:
        "Simply sign up with your email above and select the 'Beta Tester' option. We'll contact you with instructions.",
    },
    {
      question: "Will these be available on mobile?",
      answer:
        "Yes! Our new features will work seamlessly across web, iOS, and Android apps.",
    },
    {
      question: "Is there a cost for early access?",
      answer:
        "Early access is completely free for our supportive community members!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background pt-10">
      {/* Islamic Pattern Background */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(194,155,97,0.1) 35px, rgba(194,155,97,0.1) 70px),
            repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(194,155,97,0.1) 35px, rgba(194,155,97,0.1) 70px)
          `,
        }}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            أَخْرِقُ شَيْئاً جَمِيلًا قَادِمًا
            <br />
            Something beautiful is coming
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            "Patience is the key to every door. The patient person will see
            great rewards."
            {/* <br />- Hadith */}
          </p>

          {/* <CountdownTimer targetDate={launchDate} /> */}
        </section>

        {/* Features Preview */}
        {/* <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
            Exciting New Features Coming Your Way
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section> */}

        <section className="mb-20">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-card to-card/50 border-primary/30">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Be Among the First</CardTitle>
              <CardDescription>
                Join our exclusive early access list
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold">
                    Jazāk Allāh khayran! Welcome to our family.
                  </p>
                  <p className="text-muted-foreground">
                    We'll notify you soon.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await submitWaitlist(name, email, message);
                  }}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="border-primary/30 focus:border-primary"
                    />
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-primary/30 focus:border-primary"
                    />
                    <Input
                      type="message"
                      placeholder="Any message for us? (Optional)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {loading ? "Processing..." : "Get Early Access"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Development Progress */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif text-center mb-12">
            Behind the Scenes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Feature Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ProgressBar label="AI Algorithm Development" value={85} />
                <ProgressBar label="Community Features" value={70} />
                <ProgressBar label="Mobile App Updates" value={95} />
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Testing Phase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-muted-foreground">
                    Beta testers already onboarded
                  </p>
                  <Badge variant="secondary" className="cursor-pointer">
                    Join them! <ArrowRight className="ml-1 h-3 w-3" />
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Launch Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-32 h-32 mx-auto">
                  <Progress value={90} className="h-32 w-32 rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl text-white">90%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="mb-20">
          <h2 className="text-3xl font-serif text-center mb-12">
            Meet the Team
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center text-4xl">
                  {member.image}
                </div>
                <h4 className="font-bold text-lg">{member.name}</h4>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section> */}

        {/* Preview Tabs */}
        {/* <section className="mb-20">
          <h2 className="text-3xl font-serif text-center mb-12">
            Exclusive Previews
          </h2>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="max-w-4xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="web">Web App</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="tablet">Tablet</TabsTrigger>
            </TabsList>
            <TabsContent value="web" className="mt-6">
              <Card>
                <CardContent className="p-8">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                    <p className="text-primary text-lg">
                      Web App Preview - Coming Soon
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="mobile" className="mt-6">
              <Card>
                <CardContent className="p-8">
                  <div className="aspect-[9/16] max-w-sm mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                    <p className="text-primary text-lg">Mobile App Preview</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tablet" className="mt-6">
              <Card>
                <CardContent className="p-8">
                  <div className="aspect-[4/3] max-w-md mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                    <p className="text-primary text-lg">Tablet Experience</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section> */}

        {/* Social Sharing */}
        {/* <section className="mb-20 text-center">
          <h3 className="text-2xl font-serif mb-6">Share Your Excitement</h3>
          <div className="flex justify-center gap-4">
            {[Twitter, Facebook, Instagram, Linkedin].map((Icon, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </section> */}

        {/* Referral Program */}
        {/* <section className="mb-20">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/30">
            <CardHeader className="text-center">
              <CardTitle>
                <Gift className="mr-2 h-6 w-6 inline" />
                Refer & Earn
              </CardTitle>
              <CardDescription>
                Invite friends and earn exclusive rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground">
                    Friends joined
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">
                    Months premium
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">50%</div>
                  <div className="text-sm text-muted-foreground">
                    Bonus perks
                  </div>
                </div>
              </div>
              <Button variant="outline" className="border-primary/30">
                <Share2 className="mr-2 h-4 w-4" />
                Share Referral Link
              </Button>
            </CardContent>
          </Card>
        </section> */}
      </main>
    </div>
  );
}
