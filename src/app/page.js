"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Header from "@/components/ui/Header";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

// 1. Hero Section
function HeroSection() {
  return (
    <section className="bg-white text-black py-12 sm:py-20 px-2 sm:px-6 text-center">
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4">
        Take Control of Your Finances
      </h1>
      <p className="text-base sm:text-lg md:text-2xl max-w-2xl mx-auto mb-8">
        Visualize, analyze, and optimize your spending in seconds with AI-powered insights.
      </p>
      <div className="flex justify-center">
        <Link href="/login">
          <Button size="lg" className="flex items-center gap-2 cursor-pointer w-full max-w-xs sm:max-w-none justify-center">
            Get Started <ChevronRight size={20} />
          </Button>
        </Link>
      </div>
    </section>
  );
}

// 2. Features Section
const features = [
  { title: "Add & Track", desc: "Easily log income and expenses.", icon: "📝" },
  { title: "Expense Breakdown", desc: "See spending by category.", icon: "📊" },
  { title: "AI Insights", desc: "One-liner & detailed reports.", icon: "🤖" },
  { title: "Time Filters", desc: "View day/week/month/year.", icon: "⏰" },
];

function FeaturesSection() {
  return (
    <section className="py-10 sm:py-16 px-2 sm:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {features.map((f) => (
          <Card key={f.title} className="text-center p-4 sm:p-6">
            <CardHeader>
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-4">{f.icon}</div>
              <CardTitle>{f.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{f.desc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// 4. Testimonials Section
const testimonials = [
  { name: "Ravi K.", role: "Freelance Designer", quote: "This tool helped me identify I was overspending on takeout—saved ₹2,000 last month!" },
  { name: "Priya S.", role: "Startup Founder", quote: "The AI insights are spot on. I reallocated my budget and boosted savings by 15%." },
];

function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-10 sm:py-16 px-2 sm:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">What Our Users Say</h2>
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 px-2">
        {testimonials.map((t) => (
          <blockquote key={t.name} className="border-l-4 border-blue-500 pl-4 sm:pl-6 italic text-sm sm:text-base">
            "{t.quote}"
            <footer className="mt-2 font-semibold">— {t.name}, {t.role}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

// 5. How It Works Section
const steps = [
  { number: 1, title: "Connect & Add", desc: "Make your account and add transactions." },
  { number: 2, title: "Visualize", desc: "See your spending breakdown in charts." },
  { number: 3, title: "Act", desc: "Follow AI recommendations to save more." },
];

function HowItWorksSection() {
  return (
    <section className="py-10 sm:py-16 px-2 sm:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-center items-start gap-6 sm:gap-8">
        {steps.map((s) => (
          <div key={s.number} className="text-center max-w-xs w-full mx-auto">
            <div className="text-3xl sm:text-5xl font-bold text-blue-600 mb-2 sm:mb-4">{s.number}</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{s.title}</h3>
            <p className="text-gray-600 text-sm sm:text-base">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// 7. Footer Section
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-2 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-between md:flex-row gap-4">
        <p className="text-xs sm:text-sm">
          Made by <span className="font-semibold text-white">Dhruvdeep Chakravorty</span>
        </p>

        <div className="flex gap-4 text-lg sm:text-xl">
          <Link
            href="https://github.com/dhruvdeepChakravorty"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaGithub />
          </Link>
          <Link
            href="https://www.linkedin.com/in/dhruvdeep-chakravorty-405772331/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaLinkedin />
          </Link>
          
        </div>
      </div>
    </footer>
  );
}

//PS Header is in componenets

// Main Home Page
export default function Page() {
  return (
    <main className="flex flex-col">
      <Header/>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <Footer />
    </main>
  );
}
