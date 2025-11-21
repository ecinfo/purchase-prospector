// src/pages/HelpSupport.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Search,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Video,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  Zap,
  Users,
  Settings,
  BarChart3,
  Building,
} from "lucide-react";

// FAQ Data
const faqs = [
  {
    category: "Getting Started",
    icon: Zap,
    questions: [
      {
        q: "How do I create my first procurement request?",
        a: "Navigate to the Procurement page and click 'New Procurement'. Fill in the project details, materials required, and timeline. Our AI will automatically suggest vendors and help create RFPs.",
      },
      {
        q: "How does the AI vendor matching work?",
        a: "Our AI analyzes your procurement requirements, budget, timeline, and location to match you with the most suitable vendors from our database of 2,000+ verified suppliers.",
      },
      {
        q: "What file formats are supported for BOQ uploads?",
        a: "We support Excel (.xlsx, .xls), CSV, and PDF formats for Bill of Quantities uploads. The system will automatically parse and extract material requirements.",
      },
    ],
  },
  {
    category: "Vendors",
    icon: Users,
    questions: [
      {
        q: "How are vendors verified?",
        a: "All vendors go through a verification process including GST validation, business registration checks, and quality certifications verification. We also collect ratings from past transactions.",
      },
      {
        q: "Can I add my own vendors to the platform?",
        a: "Yes, you can invite your existing vendors to join the platform. Go to Vendors > Add Vendor and enter their details. They'll receive an invitation to complete their profile.",
      },
    ],
  },
  {
    category: "Analytics & Reports",
    icon: BarChart3,
    questions: [
      {
        q: "How is cost savings calculated?",
        a: "Cost savings are calculated by comparing the final negotiated prices with initial vendor quotes and market benchmarks. The system tracks savings at both project and aggregate levels.",
      },
      {
        q: "Can I export reports?",
        a: "Yes, all reports can be exported in PDF, Excel, or CSV formats. Go to Analytics > select the report > click Export in the top right corner.",
      },
    ],
  },
  {
    category: "Account & Settings",
    icon: Settings,
    questions: [
      {
        q: "How do I add team members?",
        a: "Go to Settings > Team Management > Invite Member. Enter their email and assign a role (Admin, Manager, or Viewer). They'll receive an invitation to join your organization.",
      },
      {
        q: "How do I enable two-factor authentication?",
        a: "Navigate to Settings > Security > Two-Factor Authentication and click 'Enable 2FA'. You can use an authenticator app or SMS verification.",
      },
    ],
  },
];

// Resource Links
const resources = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides and API docs",
    link: "#",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video walkthroughs",
    link: "#",
  },
  {
    icon: FileText,
    title: "Case Studies",
    description: "Success stories from customers",
    link: "#",
  },
  {
    icon: Building,
    title: "Best Practices",
    description: "Procurement optimization tips",
    link: "#",
  },
];

// FAQ Accordion Item
const FAQItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-2 py-4 -mx-2 text-left transition-colors rounded-lg hover:bg-gray-50"
      >
        <span className="pr-4 text-sm font-medium text-gray-900">
          {question}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 pr-8">
          <p className="text-sm leading-relaxed text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

export const HelpSupport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter FAQs based on search
  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.a.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="w-full p-4 mx-auto space-y-6 sm:p-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 mb-2 bg-blue-100 rounded-full">
          <HelpCircle className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Help & Support
        </h1>
        <p className="max-w-xl mx-auto text-sm text-gray-600 sm:text-base">
          Find answers to common questions or get in touch with our support team
        </p>
      </div>

      {/* Search */}
      <Card className="border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-4 sm:p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 shadow-sm rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-4 transition-shadow cursor-pointer hover:shadow-md group">
          <div className="flex items-center gap-4">
            <div className="p-3 transition-colors bg-green-100 rounded-lg group-hover:bg-green-200">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900">Live Chat</h3>
              <p className="text-sm text-gray-500">Available 24/7</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </div>
        </Card>

        <Card className="p-4 transition-shadow cursor-pointer hover:shadow-md group">
          <div className="flex items-center gap-4">
            <div className="p-3 transition-colors bg-blue-100 rounded-lg group-hover:bg-blue-200">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900">Call Us</h3>
              <p className="text-sm text-gray-500">+91 1800-123-4567</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </div>
        </Card>

        <Card className="p-4 transition-shadow cursor-pointer hover:shadow-md group">
          <div className="flex items-center gap-4">
            <div className="p-3 transition-colors bg-purple-100 rounded-lg group-hover:bg-purple-200">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900">Email Support</h3>
              <p className="text-sm text-gray-500 truncate">
                support@agentprocure.com
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* FAQs */}
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>

          {filteredFaqs.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="mb-2 text-gray-400">
                <Search className="w-8 h-8 mx-auto" />
              </div>
              <p className="text-gray-600">
                No results found for "{searchTerm}"
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Try a different search term or browse categories
              </p>
            </Card>
          ) : (
            filteredFaqs.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.category;

              return (
                <Card key={category.category} className="overflow-hidden">
                  <button
                    onClick={() =>
                      setActiveCategory(isActive ? null : category.category)
                    }
                    className="flex items-center justify-between w-full p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">
                          {category.category}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {category.questions.length} articles
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isActive && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <div className="pt-2">
                        {category.questions.map((q, idx) => (
                          <FAQItem key={idx} question={q.q} answer={q.a} />
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })
          )}
        </div>

        {/* Resources Sidebar */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Resources</h2>

          <Card>
            <CardContent className="p-0">
              {resources.map((resource, idx) => {
                const Icon = resource.icon;
                return (
                  <a
                    key={idx}
                    href={resource.link}
                    className={`flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors group ${
                      idx !== resources.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <div className="p-2 transition-colors bg-gray-100 rounded-lg group-hover:bg-blue-100">
                      <Icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">
                        {resource.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {resource.description}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  </a>
                );
              })}
            </CardContent>
          </Card>

          {/* Contact Form Card */}
          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-gray-900">
                Still need help?
              </h3>
              <p className="text-xs text-gray-500">
                Send us a message and we'll respond within 24 hours
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Input placeholder="Brief description of your issue" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your issue in detail..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
