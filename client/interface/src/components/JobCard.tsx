import { MapPin, Calendar, ExternalLink, Trash2 } from "lucide-react";
import { Job, statusConfig } from "@/types/job";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  job: Job;
  onDelete: (id: string) => void;
  delay?: number;
}

export const JobCard = ({ job, onDelete, delay = 0 }: JobCardProps) => {
  const status = statusConfig[job.status];

  return (
    <div
      className="glass rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all duration-300 group animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
            {job.position}
          </h3>
          <p className="text-muted-foreground text-sm">{job.company}</p>
        </div>
        <div className="flex items-center gap-1 ml-2">
          {job.url && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => window.open(job.url, "_blank")}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            onClick={() => onDelete(job.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date(job.appliedDate).toLocaleDateString()}</span>
        </div>
      </div>

      {job.notes && (
        <p className="mt-3 text-xs text-muted-foreground/80 line-clamp-2 italic">
          "{job.notes}"
        </p>
      )}

      <div className="mt-3 pt-3 border-t border-border/50">
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
            status.bgColor,
            status.color
          )}
        >
          {status.label}
        </span>
      </div>
    </div>
  );
};
