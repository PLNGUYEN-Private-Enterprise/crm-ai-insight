import {
  Bot,
  ChartColumn,
  Cloud,
  DatabaseZap,
  FileText,
  LibraryBig,
  Plug,
  ShieldCheck,
  Sparkles,
  Webhook,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Accent = "sf" | "ai";

export type Service = {
  slug: string;
  accent: Accent;
  number: string;
  icon: LucideIcon;
  name: string;
  navLabel: string;
  tagline: string;
  summary: string;
  metaDescription: string;
  /** Four short points for the home page card. */
  highlights: string[];
  bestFor: string;
  problems: string[];
  capabilities: { icon: LucideIcon; title: string; description: string }[];
  deliverables: string[];
  steps: { title: string; description: string }[];
  tools: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "salesforce-implementation",
    accent: "sf",
    number: "01",
    icon: Cloud,
    name: "Salesforce Implementation",
    navLabel: "Salesforce",
    tagline: "A CRM your team actually uses.",
    summary:
      "We set up, clean up and automate Salesforce around how you sell and serve — then make sure your team adopts it, with the data and structure AI features need.",
    metaDescription:
      "Salesforce implementation for growing teams: Sales and Service Cloud setup, data migration, Flow automation, reporting and Agentforce readiness.",
    highlights: [
      "Sales Cloud & Service Cloud setup",
      "Data migration, cleanup and de-duplication",
      "Flow automation, reports and dashboards",
      "Agentforce and AI readiness",
    ],
    bestFor: "Teams moving off spreadsheets or another CRM, and orgs that need a reset.",
    problems: [
      "Your pipeline lives in spreadsheets and inboxes, so every forecast is a guess.",
      "Salesforce was set up years ago, and nobody trusts the data anymore.",
      "Reps spend more time updating records than talking to customers.",
      "Leadership reports take days of exporting and pasting to put together.",
    ],
    capabilities: [
      {
        icon: Cloud,
        title: "Org setup & configuration",
        description:
          "Sales Cloud and Service Cloud configured around your process: objects, fields, page layouts, record types and a security model that fits your team.",
      },
      {
        icon: DatabaseZap,
        title: "Data migration & cleanup",
        description:
          "Move from spreadsheets or a legacy CRM with de-duplication, validation and a reconciliation report, so day one starts with data people trust.",
      },
      {
        icon: Workflow,
        title: "Flow automation",
        description:
          "Approvals, assignment rules, reminders and follow-ups built in Salesforce Flow — with Apex only where Flow isn't enough.",
      },
      {
        icon: ChartColumn,
        title: "Reports & dashboards",
        description:
          "Pipeline, forecast and service dashboards built on clear definitions, so every team reads the same numbers.",
      },
      {
        icon: Plug,
        title: "Integrations",
        description:
          "Email, calendar, ERP, billing and marketing tools connected natively or through n8n — no more double entry.",
      },
      {
        icon: Sparkles,
        title: "Agentforce & AI readiness",
        description:
          "A clean data model, permissions and knowledge base, so Agentforce and other AI features have something solid to work with.",
      },
    ],
    deliverables: [
      "A configured, production-ready Salesforce org",
      "Solution design document and data dictionary",
      "Migrated data with a reconciliation report",
      "Documented automations, each with a named owner",
      "Role-based training and recorded walkthroughs",
      "Post-launch hypercare and a full admin handover",
    ],
    steps: [
      {
        title: "Discovery workshops",
        description: "Map your sales and service process, data sources, reporting needs and users.",
      },
      {
        title: "Solution design",
        description:
          "Data model, automation plan, security model and migration approach — signed off before the build starts.",
      },
      {
        title: "Build in a sandbox",
        description: "Configure, automate and load test data, with regular demos so you can steer early.",
      },
      {
        title: "Test & train",
        description: "User acceptance testing with your team, followed by role-based training.",
      },
      {
        title: "Go-live & hypercare",
        description: "Cutover, final data migration and close support while the team settles in.",
      },
    ],
    tools: [
      "Sales Cloud",
      "Service Cloud",
      "Experience Cloud",
      "Salesforce Flow",
      "Apex",
      "Lightning Web Components",
      "Data Loader",
      "Agentforce",
    ],
    faqs: [
      {
        question: "We already have Salesforce. Can you fix what's there?",
        answer:
          "Yes. We start with an org health check covering data quality, automation, security and adoption, then fix issues in order of impact before building anything new.",
      },
      {
        question: "Which Salesforce edition do we need?",
        answer:
          "It depends on your users, processes and integrations. We'll recommend the edition that covers your requirements without paying for features you won't use.",
      },
      {
        question: "How long does an implementation take?",
        answer:
          "It depends on scope. A focused Sales Cloud rollout is measured in weeks; multi-cloud programs with migrations and integrations take longer. You'll get a timeline in the proposal, before any work starts.",
      },
      {
        question: "Can you work alongside our internal admin?",
        answer:
          "Absolutely. We pair with your admin during the build and hand over documentation and training, so they can own the org afterwards.",
      },
    ],
  },
  {
    slug: "n8n-and-ai",
    accent: "ai",
    number: "02",
    icon: Workflow,
    name: "n8n Flows & AI Services",
    navLabel: "n8n & AI",
    tagline: "Automations and AI that take the busywork off your team.",
    summary:
      "We design, build and run n8n workflows that connect your tools, and implement AI services — agents, assistants and document processing — that work on your real data, with guardrails.",
    metaDescription:
      "n8n workflow automation and AI services implementation: system integrations, AI agents, RAG knowledge assistants and document processing with guardrails.",
    highlights: [
      "n8n workflow design, build and hosting",
      "API and system integrations",
      "AI agents, assistants and RAG on your data",
      "Document and inbox automation",
    ],
    bestFor: "Ops-heavy teams with repetitive work, and anyone ready to use AI on their own data.",
    problems: [
      "Your team copies data between tools all day, and mistakes slip through.",
      "You've tried AI chatbots, but none of them know your business or your data.",
      "Per-task automation bills keep climbing as your workflows grow.",
      "Critical processes depend on one person remembering to do them.",
    ],
    capabilities: [
      {
        icon: Workflow,
        title: "n8n workflow automation",
        description:
          "Multi-step flows with branching, retries and error alerts that run reliably across your apps, databases and APIs.",
      },
      {
        icon: Webhook,
        title: "System integrations",
        description:
          "Webhooks, REST and GraphQL APIs and custom nodes connecting Salesforce, ERP, billing, support and messaging tools.",
      },
      {
        icon: Bot,
        title: "AI agents & assistants",
        description:
          "LLM-powered agents that research, draft, classify and take action — using only the tools and permissions you choose.",
      },
      {
        icon: LibraryBig,
        title: "Knowledge assistants (RAG)",
        description:
          "Ask questions of your documents, SOPs and CRM data and get answers with cited sources and access controls.",
      },
      {
        icon: FileText,
        title: "Document & inbox processing",
        description:
          "Pull structured data out of invoices, contracts, forms and emails, and route the exceptions to a person.",
      },
      {
        icon: ShieldCheck,
        title: "Hosting, monitoring & guardrails",
        description:
          "n8n Cloud or self-hosted, with logging, evaluations, human approval steps and cost controls built in.",
      },
    ],
    deliverables: [
      "Production n8n workflows in your own instance",
      "Version-controlled workflow exports and credential setup",
      "Architecture diagram and runbook for every flow",
      "Prompt library and evaluation set for each AI use case",
      "Monitoring and failure alerts routed to your team",
      "Handover session and team training",
    ],
    steps: [
      {
        title: "Opportunity mapping",
        description: "Find the repetitive, high-volume work where automation or AI pays back fastest.",
      },
      {
        title: "Prototype on real data",
        description: "Prove the flow or AI use case end-to-end before committing to a full build.",
      },
      {
        title: "Harden",
        description: "Error handling, security review, evaluations and human-in-the-loop steps.",
      },
      {
        title: "Launch & monitor",
        description: "Deploy, document and watch the first runs closely, then tune what we learn.",
      },
    ],
    tools: [
      "n8n Cloud & self-hosted",
      "OpenAI",
      "Anthropic Claude",
      "Google Gemini",
      "Open-source LLMs",
      "Postgres & pgvector",
      "Qdrant",
      "Microsoft 365",
      "Google Workspace",
      "Docker",
    ],
    faqs: [
      {
        question: "Why n8n instead of Zapier or Make?",
        answer:
          "n8n can be self-hosted so your data stays in your infrastructure, lets us drop into code when a no-code step isn't enough, and its execution-based pricing tends to scale better for multi-step workflows. If another tool suits you better, we'll tell you.",
      },
      {
        question: "Do we have to self-host n8n?",
        answer:
          "No. n8n Cloud works well for many teams. We'll recommend cloud or self-hosted based on data sensitivity, volume and your IT preferences — and set up whichever you choose.",
      },
      {
        question: "How do you stop AI from making things up?",
        answer:
          "We ground answers in your own data, constrain outputs to defined formats, add confidence thresholds and human review for anything customer-facing, and test against an evaluation set before launch.",
      },
      {
        question: "Is our data used to train AI models?",
        answer:
          "We use business-grade AI APIs that don't train on your data by default, and we can run open-source models inside your own environment when data must not leave it.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
