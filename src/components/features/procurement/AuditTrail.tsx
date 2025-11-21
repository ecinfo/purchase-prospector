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
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Project Initiated",
    tag: "Input",
    tagColor: "bg-blue-100 text-blue-600",
    desc: 'Requirement: "30,000 sq.ft residential building in Pune"',
    date: "2024-11-20 10:15:00",
    actor: "System",
    icon: Monitor,
  },
  {
    id: 2,
    title: "AI Qualification Complete",
    tag: "Qualification",
    tagColor: "bg-purple-100 text-purple-600",
    desc: "6 qualification questions answered, project parameters defined",
    date: "2024-11-20 10:18:30",
    actor: "AI Agent",
    icon: Bot,
  },
  {
    id: 3,
    title: "Quantification Approved",
    tag: "Quantification",
    tagColor: "bg-yellow-100 text-yellow-700",
    desc: "Total buildable area: 28,500 sq.ft, 40 units across 10 floors",
    date: "2024-11-20 10:22:15",
    actor: "Purchase Manager",
    icon: User,
  },
  {
    id: 4,
    title: "BoM Generated",
    tag: "BoM Generation",
    tagColor: "bg-orange-100 text-orange-600",
    desc: "24 line items across 4 categories generated",
    date: "2024-11-20 10:25:00",
    actor: "AI Agent",
    icon: Bot,
  },
  {
    id: 5,
    title: "Vendor Discovery Criteria Set",
    tag: "Vendor Search",
    tagColor: "bg-red-100 text-red-500",
    desc: "ISO 9001:2015, BIS Approved, Min rating: 4.0, Location: Pune & Mumbai",
    date: "2024-11-20 10:30:45",
    actor: "Purchase Manager",
    icon: User,
  },
  {
    id: 6,
    title: "Vendor Discovery Complete",
    tag: "Vendor Search",
    tagColor: "bg-red-100 text-red-500",
    desc: "6 qualified vendors identified from IndiaMART, TradeIndia, JustDial, Google Business",
    date: "2024-11-20 10:35:20",
    actor: "AI Agent",
    icon: Bot,
  },
  {
    id: 7,
    title: "RFP Packages Generated",
    tag: "RFP Generation",
    tagColor: "bg-pink-100 text-pink-600",
    desc: "4 RFP packages created with technical specifications and evaluation criteria",
    date: "2024-11-20 10:40:00",
    actor: "AI Agent",
    icon: Bot,
  },
  {
    id: 8,
    title: "Vendor Outreach Initiated",
    tag: "Vendor Outreach",
    tagColor: "bg-rose-100 text-rose-500",
    desc: "6 automated voice calls made, 5 vendors confirmed interest",
    date: "2024-11-20 10:45:30",
    actor: "AI Agent",
    icon: Bot,
  },
  {
    id: 9,
    title: "RFPs Distributed",
    tag: "RFP Distribution",
    tagColor: "bg-green-100 text-green-600",
    desc: "12 emails sent to vendors with 5-day deadline (Due: Nov 25, 2024)",
    date: "2024-11-20 10:50:00",
    actor: "System",
    icon: Monitor,
  },
  {
    id: 10,
    title: "First Bid Received",
    tag: "Bid Collection",
    tagColor: "bg-cyan-100 text-cyan-700",
    desc: "RFP-001: ₹2.3 Cr",
    date: "2024-11-22 14:20:00",
    actor: "Mumbai Cement Suppliers",
    icon: Building,
  },
  {
    id: 11,
    title: "Multiple Bids Received",
    tag: "Bid Collection",
    tagColor: "bg-cyan-100 text-cyan-700",
    desc: "4 bids received across different packages",
    date: "2024-11-23 11:15:00",
    actor: "Various Vendors",
    icon: Users,
  },
  {
    id: 12,
    title: "Bid Collection Closed",
    tag: "Bid Collection",
    tagColor: "bg-cyan-100 text-cyan-700",
    desc: "11 total bids received (91.7% response rate)",
    date: "2024-11-25 17:00:00",
    actor: "System",
    icon: Monitor,
  },
  {
    id: 13,
    title: "AI Analysis Complete",
    tag: "Bid Analysis",
    tagColor: "bg-amber-100 text-amber-600",
    desc: "Multi-dimensional analysis performed: Cost optimization, Quality scoring, Delivery assessment",
    date: "2024-11-25 17:05:00",
    actor: "AI Agent",
    icon: Bot,
  },
  {
    id: 14,
    title: "Purchase Recommendations Generated",
    tag: "Bid Analysis",
    tagColor: "bg-amber-100 text-amber-600",
    desc: "Optimal strategy: L1 awards across all categories, Total savings: ₹90 Lakhs (10%)",
    date: "2024-11-25 17:30:00",
    actor: "AI Agent",
    icon: Bot,
  },
];

const compliance = [
  {
    title: "Human-in-the-Loop",
    desc: "All critical decisions approved",
    color: "bg-green-50 border-green-200",
  },
  {
    title: "Data Integrity",
    desc: "All records timestamped & verified",
    color: "bg-blue-50 border-blue-200",
  },
  {
    title: "Vendor Fairness",
    desc: "Transparent evaluation criteria",
    color: "bg-purple-50 border-purple-200",
  },
  {
    title: "Cost Accountability",
    desc: "Full bid comparison documented",
    color: "bg-teal-50 border-teal-200",
  },
];

export default function AuditTrail({
  onPrevious,
}: {
  onNext?: () => void;
  onPrevious?: () => void;
}) {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Complete Audit Trail
              </h1>
              <p className="text-sm text-gray-500">
                Comprehensive log of all actions and decisions throughout the
                procurement process
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export Audit Log
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 text-center border border-blue-100 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">14</div>
            <div className="text-sm text-gray-600">Total Events</div>
          </div>
          <div className="p-4 text-center border border-green-100 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600">10</div>
            <div className="text-sm text-gray-600">Workflow Phases</div>
          </div>
          <div className="p-4 text-center border bg-emerald-50 rounded-xl border-emerald-100">
            <div className="text-3xl font-bold text-emerald-500">100%</div>
            <div className="text-sm text-gray-600">Compliance</div>
          </div>
        </div>

        {/* Audit Compliance Banner */}
        <div className="flex items-start gap-3 p-4 mb-6 border border-green-200 bg-green-50 rounded-xl">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <span className="font-semibold text-gray-800">
              Audit Compliance:{" "}
            </span>
            <span className="text-gray-600">
              This trail meets enterprise governance requirements with complete
              traceability of all decisions, AI actions, and human approvals
              throughout the procurement lifecycle.
            </span>
          </div>
        </div>

        {/* Event Log */}
        <div className="p-6 mb-6 bg-white border border-gray-200 rounded-xl">
          <h2 className="mb-6 font-semibold text-gray-900">
            Chronological Event Log
          </h2>

          <div className="space-y-1">
            {events.map((event, idx) => (
              <div key={event.id} className="flex items-start gap-4 py-4">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  {idx < events.length - 1 && (
                    <div className="w-0.5 bg-gray-200 flex-1 min-h-12"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      {event.title}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${event.tagColor}`}
                    >
                      {event.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{event.desc}</p>
                </div>

                {/* Meta */}
                <div className="text-sm text-right shrink-0">
                  <div className="flex items-center justify-end gap-1 text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-1 text-gray-500">
                    <event.icon className="w-3.5 h-3.5" />
                    <span>{event.actor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Verification */}
        <div className="p-6 mb-6 bg-white border border-gray-200 rounded-xl">
          <h2 className="mb-4 font-semibold text-gray-900">
            Compliance Verification
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {compliance.map((item, idx) => (
              <div key={idx} className={`${item.color} border rounded-lg p-4`}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-gray-800">
                    {item.title}
                  </span>
                </div>
                <p className="text-sm text-gray-500 ml-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Return Button */}
        <div className="flex justify-center">
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            ← Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
