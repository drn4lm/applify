export type JobStatus = "applied" | "interviewing" | "offer" | "rejected";

export interface Job {
  id: string;
  company: string;
  position: string;
  location: string;
  status: JobStatus;
  appliedDate: string;
  notes?: string;
  url?: string;
}

export const statusConfig: Record<JobStatus, { label: string; color: string; bgColor: string }> = {
  applied: {
    label: "Applied",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  interviewing: {
    label: "Interviewing",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  offer: {
    label: "Offer",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  rejected: {
    label: "Rejected",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
};
