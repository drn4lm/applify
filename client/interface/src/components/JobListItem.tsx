import { MapPin, Calendar, ExternalLink, Trash2 } from "lucide-react";
import { Job, statusConfig } from "@/types/job";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface JobListItemProps {
  job: Job;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
  delay?: number;
}

export const JobListItem = ({ job, onDelete, isSelected, onSelect, delay = 0 }: JobListItemProps) => {
  const status = statusConfig[job.status];

  return (
    <div
      className={cn(
        "glass rounded-xl p-4 border transition-all duration-300 group animate-fade-in cursor-pointer",
        isSelected ? "border-primary/50 bg-primary/5" : "border-border/50 hover:border-primary/30"
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onSelect(job.id)}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Company & Position */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
              {job.position}
            </h3>
            <p className="text-muted-foreground text-sm">{job.company}</p>
          </div>

          {/* Location */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground min-w-[140px]">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>

          {/* Date */}
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground min-w-[120px]">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{new Date(job.appliedDate).toLocaleDateString()}</span>
          </div>

          {/* Status Badge */}
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium min-w-[100px] justify-center",
              status.bgColor,
              status.color
            )}
          >
            {status.label}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {job.url && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                window.open(job.url, "_blank");
              }}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(job.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isSelected && job.notes && (
        <p className="mt-3 pt-3 border-t border-border/50 text-sm text-muted-foreground">
          {job.notes}
        </p>
      )}
    </div>
  );
};
