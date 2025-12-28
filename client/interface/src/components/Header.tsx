import { Briefcase } from "lucide-react";
import { AddJobDialog } from "./AddJobDialog";
import { Job } from "@/types/job";

interface HeaderProps {
  onAddJob: (job: Omit<Job, "id">) => void;
}

export const Header = ({ onAddJob }: HeaderProps) => {
  return (
    <header className="border-b border-border/50 glass sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">JobTracker</h1>
              <p className="text-xs text-muted-foreground">
                Track your job applications
              </p>
            </div>
          </div>

          <AddJobDialog onAddJob={onAddJob} />
        </div>
      </div>
    </header>
  );
};
