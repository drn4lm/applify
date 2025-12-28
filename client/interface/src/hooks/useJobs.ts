import { useState, useMemo } from "react";
import { Job, JobStatus } from "@/types/job";

const initialJobs: Job[] = [
  {
    id: "1",
    company: "Stripe",
    position: "Senior Frontend Engineer",
    location: "San Francisco, CA",
    status: "interviewing",
    appliedDate: "2024-12-15",
    notes: "Technical interview scheduled for next week",
  },
  {
    id: "2",
    company: "Vercel",
    position: "Full Stack Developer",
    location: "Remote",
    status: "applied",
    appliedDate: "2024-12-20",
  },
  {
    id: "3",
    company: "Linear",
    position: "Product Engineer",
    location: "Remote",
    status: "applied",
    appliedDate: "2024-12-22",
  },
  {
    id: "4",
    company: "Figma",
    position: "Design Engineer",
    location: "San Francisco, CA",
    status: "offer",
    appliedDate: "2024-12-01",
    notes: "Offer received! Negotiating",
  },
  {
    id: "5",
    company: "Netflix",
    position: "Senior React Developer",
    location: "Los Gatos, CA",
    status: "rejected",
    appliedDate: "2024-11-28",
  },
];

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const addJob = (job: Omit<Job, "id">) => {
    const newJob: Job = {
      ...job,
      id: crypto.randomUUID(),
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const updateJobStatus = (id: string, status: JobStatus) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status } : job))
    );
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const getJobsByStatus = (status: JobStatus) => {
    return jobs.filter((job) => job.status === status);
  };

  const sortedJobs = useMemo(() => {
    return [...jobs].sort(
      (a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
    );
  }, [jobs]);

  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "applied").length,
    interviewing: jobs.filter((j) => j.status === "interviewing").length,
    offers: jobs.filter((j) => j.status === "offer").length,
    rejected: jobs.filter((j) => j.status === "rejected").length,
  };

  return {
    jobs,
    addJob,
    updateJobStatus,
    deleteJob,
    getJobsByStatus,
    sortedJobs,
    stats,
  };
};
