import { BookOpen, Compass, KeyRound, ShieldCheck, type LucideIcon } from "lucide-react";

export type Tool = "salesforce" | "n8n" | "ai";

export const workflows: { title: string; description: string; path: string; tools: Tool[] }[] = [
  {
    title: "Inbound lead routing",
    description:
      "Web and ad leads are de-duplicated, enriched and scored, then created in Salesforce with the right owner — and the rep gets a ping.",
    path: "Form → enrich → score → Lead → alert",
    tools: ["salesforce", "n8n", "ai"],
  },
  {
    title: "Closed-won to cash",
    description:
      "A won Opportunity creates the invoice in your accounting system, opens the onboarding project and sends the welcome email.",
    path: "Opportunity won → invoice → onboarding",
    tools: ["salesforce", "n8n"],
  },
  {
    title: "Support inbox triage",
    description:
      "Incoming emails are classified by intent and urgency, turned into Cases, and given a suggested reply for an agent to approve.",
    path: "Email → classify → Case → draft reply",
    tools: ["salesforce", "n8n", "ai"],
  },
  {
    title: "Call notes to CRM",
    description:
      "Meeting transcripts become next steps, risks and updated fields on the Opportunity — no more typing notes after every call.",
    path: "Transcript → summarize → Opportunity",
    tools: ["salesforce", "ai"],
  },
  {
    title: "Document intake",
    description:
      "Invoices, contracts and forms are read by AI, checked against your rules and pushed to the right system. Exceptions go to a person.",
    path: "Upload → extract → validate → sync",
    tools: ["n8n", "ai"],
  },
  {
    title: "Team knowledge assistant",
    description:
      "An assistant in Slack or Teams answers questions from your SOPs, product docs and CRM data, with sources and permission checks.",
    path: "Question → retrieve → answer + sources",
    tools: ["n8n", "ai"],
  },
];

export const processSteps: { title: string; description: string; outcome: string }[] = [
  {
    title: "Discover",
    description:
      "We map your processes, data and systems with the people who use them, and find where time and revenue leak.",
    outcome: "Findings & prioritized roadmap",
  },
  {
    title: "Design",
    description:
      "A solution blueprint — data model, automations, integrations and AI guardrails — agreed before anything is built.",
    outcome: "Blueprint & written proposal",
  },
  {
    title: "Build",
    description:
      "Iterative delivery in a sandbox with regular demos, so you see progress and can steer early.",
    outcome: "Working, tested solution",
  },
  {
    title: "Launch & support",
    description:
      "Go-live, training and documentation, then monitoring and improvements as your team grows.",
    outcome: "Runbooks, training & hypercare",
  },
];

export const principles: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Compass,
    title: "Process before platform",
    description:
      "We start from how your team actually works, then configure the tools to fit — not the other way around.",
  },
  {
    icon: BookOpen,
    title: "No black boxes",
    description:
      "Every field, flow and prompt is documented and version-controlled, and lives in accounts you own.",
  },
  {
    icon: ShieldCheck,
    title: "AI with guardrails",
    description:
      "Grounded answers, human approval where it matters, and logging and evaluation before anything reaches a customer.",
  },
  {
    icon: KeyRound,
    title: "Built to hand over",
    description:
      "Your admins get training and runbooks, so you can run everything in-house — you're never locked in to us.",
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "Do we need both services?",
    answer:
      "No. Many teams start with a Salesforce implementation or a single automation and add the other later. They're designed to work together: Salesforce as the system of record, with n8n flows and AI working around it.",
  },
  {
    question: "We already use Salesforce. Can you still help?",
    answer:
      "Yes — most of our Salesforce work starts with an existing org. We run a health check on data quality, automation, security and adoption, fix what matters most, then build on top of it.",
  },
  {
    question: "Which AI models do you work with?",
    answer:
      "We're model-agnostic: OpenAI, Anthropic Claude, Google Gemini or open-source models, chosen per use case for quality, cost, speed and data-residency needs.",
  },
  {
    question: "How do you keep our data safe?",
    answer:
      "Integrations get only the access they need, credentials live in your own vault or n8n credential store, and AI runs through business-grade APIs that don't train on your data by default — or inside your own environment when required.",
  },
  {
    question: "How does a project start, and what does it cost?",
    answer:
      "With a short discovery call. If there's a fit, you'll get a written proposal with scope, timeline and price before any work begins.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. Every project ends with documentation, training and a hypercare period. After that, you can keep us on a monthly plan for improvements and new automations, or run everything in-house.",
  },
];
