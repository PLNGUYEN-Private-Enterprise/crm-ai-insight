export const interestOptions = [
  { value: "salesforce", label: "Salesforce Implementation" },
  { value: "n8n-ai", label: "n8n Flows & AI Services" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export type Interest = (typeof interestOptions)[number]["value"];

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  message: string;
  interests: Interest[];
};

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: ContactValues;
};

export const initialContactState: ContactState = { status: "idle" };

export const limits = { name: 120, email: 254, company: 160, message: 4000, messageMin: 10 } as const;
