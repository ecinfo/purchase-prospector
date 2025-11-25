// src/components/features/procurement/AuditTrail.tsx
import {
  FileText,
  Download,
  CheckCircle,
  Clock,
  User,
  Bot,
  Monitor,
  Users,
  Building,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

/* ===========================
    EVENT TIMELINE DATA
=========================== */
const events = [
  {
    id: 1,
    title: "Project Initiated",
    tag: "Input",
    tagColor: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    desc: 'Requirement: "30,000 sq.ft residential building in Pune"',
    date: "2024-11-20 10:15:00",
    actor: "System",
    icon: Monitor,
  },
  {
    id: 2,
    title: "AI Qualification Complete",
    tag: "Qualification",
    tagColor:
      "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    desc: "6 qualification questions answered, project parameters defined",
    date: "2024-11-20 10:18:30",
    actor: "AI Agent",
    icon: Bot,
  },
  {
    id: 3,
    title: "Quantification Approved",
    tag: "Quantification",
    tagColor:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    desc: "Total buildable area: 28,500 sq.ft, 40 units across 10 floors",
    date: "2024-11-20 10:22:15",
    actor: "Purchase Manager",
    icon: User,
  },
  {
    id: 4,
    title: "BoM Generated",
    tag: "BoM Generation",
    tagColor:
      "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
    desc: "24 line items across 4 categories generated",
    date: "2024-11-20 10:25:00",
    actor: "AI Agent",
    icon: Bot,
  },
  {
    id: 5,
    title: "Vendor Discovery Criteria Set",
    tag: "Vendor Search",
    tagColor: "bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300",
    desc: "ISO 9001:2015, BIS Approved, Min rating: 4.0, Location: Pune & Mumbai",
    date: "2024-11-20 10:30:45",
    actor: "Purchase Manager",
    icon: User,
  },
  {
    id: 6,
    title: "Vendor Discovery Complete",
    tag: "Vendor Search",
    tagColor: "bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300",
    desc: "6 qualified vendors identified from IndiaMART, TradeIndia, JustDial, Google Business",
    date: "2024-11-20 10:35:20",
    actor: "AI Agent",
    icon: Bot,
  },
  {
    id: 7,
    title: "RFP Packages Generated",
    tag: "RFP Generation",
    tagColor: "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300",
    desc: "4 RFP packages created with technical specifications and evaluation criteria",
    date: "2024-11-20 10:40:00",
    actor: "AI Agent",
    icon: Bot,
  },
  {
    id: 8,
    title: "Vendor Outreach Initiated",
    tag: "Vendor Outreach",
    tagColor: "bg-rose-100 text-rose-500 dark:bg-rose-900 dark:text-rose-300",
    desc: "6 automated voice calls made, 5 vendors confirmed interest",
    date: "2024-11-20 10:45:30",
    actor: "AI Agent",
    icon: Bot,
  },
  {
    id: 9,
    title: "RFPs Distributed",
    tag: "RFP Distribution",
    tagColor:
      "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    desc: "12 emails sent to vendors with 5-day deadline (Due: Nov 25, 2024)",
    date: "2024-11-20 10:50:00",
    actor: "System",
    icon: Monitor,
  },
  {
    id: 10,
    title: "First Bid Received",
    tag: "Bid Collection",
    tagColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
    desc: "RFP-001: ₹2.3 Cr",
    date: "2024-11-22 14:20:00",
    actor: "Mumbai Cement Suppliers",
    icon: Building,
  },
  {
    id: 11,
    title: "Multiple Bids Received",
    tag: "Bid Collection",
    tagColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
    desc: "4 bids received across different packages",
    date: "2024-11-23 11:15:00",
    actor: "Various Vendors",
    icon: Users,
  },
  {
    id: 12,
    title: "Bid Collection Closed",
    tag: "Bid Collection",
    tagColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
    desc: "11 total bids received (91.7% response rate)",
    date: "2024-11-25 17:00:00",
    actor: "System",
    icon: Monitor,
  },
  {
    id: 13,
    title: "AI Analysis Complete",
    tag: "Bid Analysis",
    tagColor:
      "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300",
    desc: "Cost, Quality & Delivery assessment finalized",
    date: "2024-11-25 17:05:00",
    actor: "AI Agent",
    icon: Bot,
  },
  {
    id: 14,
    title: "Purchase Recommendations Generated",
    tag: "Bid Analysis",
    tagColor:
      "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300",
    desc: "Optimal strategy: L1 awards across all categories",
    date: "2024-11-25 17:30:00",
    actor: "AI Agent",
    icon: Bot,
  },
];

/* ===========================
        COMPLIANCE CARDS
=========================== */
const compliance = [
  {
    title: "Human-in-the-Loop",
    desc: "All critical decisions approved",
    color:
      "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700",
  },
  {
    title: "Data Integrity",
    desc: "All records timestamped & verified",
    color: "bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700",
  },
  {
    title: "Vendor Fairness",
    desc: "Transparent evaluation criteria",
    color:
      "bg-purple-50 dark:bg-purple-900 border-purple-200 dark:border-purple-700",
  },
  {
    title: "Cost Accountability",
    desc: "Full bid comparison documented",
    color: "bg-teal-50 dark:bg-teal-900 border-teal-200 dark:border-teal-700",
  },
];

/* ===========================
        COMPONENT UI
=========================== */
export default function AuditTrail({
  onPrevious,
  onNext,
}: {
  onPrevious?: () => void;
  onNext?: () => void;
}) {
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* -------- HEADER -------- */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900">
              <FileText className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Complete Audit Trail
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Comprehensive log of key actions, approvals, and AI decisions
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">
            <Download className="w-4 h-4" />
            Export Audit Log
          </button>
        </div>

        {/* -------- STATS -------- */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 text-center border border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-900 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">
              14
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Total Events
            </div>
          </div>
          <div className="p-4 text-center border border-green-100 dark:border-green-800 bg-green-50 dark:bg-green-900 rounded-xl">
            <div className="text-3xl font-bold text-green-600 dark:text-green-300">
              10
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Workflow Phases
            </div>
          </div>
          <div className="p-4 text-center border border-emerald-100 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900 rounded-xl">
            <div className="text-3xl font-bold text-emerald-500 dark:text-emerald-300">
              100%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Compliance
            </div>
          </div>
        </div>

        {/* -------- COMPLIANCE BANNER -------- */}
        <div className="flex items-start gap-3 p-4 mb-6 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900 rounded-xl">
          <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-300 mt-0.5" />
          <div>
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              Audit Compliance:{" "}
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              Full governance coverage with traceable actions and signed
              approvals.
            </span>
          </div>
        </div>

        {/* -------- EVENT TIMELINE -------- */}
        <div className="p-6 mb-6 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl">
          <h2 className="mb-6 font-semibold text-gray-900 dark:text-white">
            Chronological Event Log
          </h2>

          <div className="space-y-1">
            {events.map((event, idx) => (
              <div key={event.id} className="flex items-start gap-4 py-4">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full dark:bg-blue-400"></div>
                  {idx < events.length - 1 && (
                    <div className="w-0.5 bg-gray-300 dark:bg-gray-700 flex-1 min-h-12"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {event.title}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${event.tagColor}`}
                    >
                      {event.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {event.desc}
                  </p>
                </div>

                {/* Meta */}
                <div className="text-sm text-right shrink-0">
                  <div className="flex items-center justify-end gap-1 text-gray-400 dark:text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-1 text-gray-600 dark:text-gray-300">
                    <event.icon className="w-3.5 h-3.5" />
                    <span>{event.actor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -------- COMPLIANCE CARDS -------- */}
        <div className="p-6 mb-6 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl">
          <h2 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Compliance Verification
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {compliance.map((item, idx) => (
              <div key={idx} className={`${item.color} border rounded-lg p-4`}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-300" />
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {item.title}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300 ml-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* -------- NAVIGATION BUTTONS -------- */}
        <div className="flex items-center justify-between p-6 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl">
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 text-sm font-medium"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
