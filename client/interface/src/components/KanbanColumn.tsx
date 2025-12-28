import { Job, JobStatus, statusConfig } from "@/types/job";
import { JobCard } from "./JobCard";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  status: JobStatus;
  jobs: Job[];
  onDeleteJob: (id: string) => void;
}

export const KanbanColumn = ({ status, jobs, onDeleteJob }: KanbanColumnProps) => {
  const config = statusConfig[status];

  return (
    <div className="flex-1 min-w-[300px] max-w-[350px]">
      <div className="flex items-center gap-2 mb-4">
        <div
          className={cn(
            "w-2 h-2 rounded-full",
            status === "applied" && "bg-primary",
            status === "interviewing" && "bg-warning",
            status === "offer" && "bg-success",
            status === "rejected" && "bg-destructive"
          )}
        />
        <h3 className="font-medium text-sm">{config.label}</h3>
        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
          {jobs.length}
        </span>
      </div>

      <div className="space-y-3">
        {jobs.map((job, index) => (
          <JobCard
            key={job.id}
            job={job}
            onDelete={onDeleteJob}
            delay={index * 50}
          />
        ))}
        {jobs.length === 0 && (
          <div className="glass rounded-xl p-8 border border-dashed border-border/50 text-center">
            <p className="text-sm text-muted-foreground">No applications</p>
          </div>
        )}
      </div>
    </div>
  );
};
