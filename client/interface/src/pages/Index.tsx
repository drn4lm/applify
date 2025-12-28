import { useState } from "react";
import {
  Briefcase,
  MessageSquare,
  Trophy,
  XCircle,
} from "lucide-react";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { JobListItem } from "@/components/JobListItem";
import { useJobs } from "@/hooks/useJobs";

const Index = () => {
  const { jobs, addJob, deleteJob, stats, sortedJobs } = useJobs();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedJobId(selectedJobId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAddJob={addJob} />

      <main className="container mx-auto px-6 py-8">
        {/* Stats Section */}
        <section className="mb-10">
          <h2 className="text-lg font-medium mb-4 text-muted-foreground">
            Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              label="Total Applications"
              value={stats.total}
              icon={Briefcase}
              variant="default"
              delay={0}
            />
            <StatCard
              label="Applied"
              value={stats.applied}
              icon={Briefcase}
              variant="primary"
              delay={50}
            />
            <StatCard
              label="Interviewing"
              value={stats.interviewing}
              icon={MessageSquare}
              variant="warning"
              delay={100}
            />
            <StatCard
              label="Offers"
              value={stats.offers}
              icon={Trophy}
              variant="success"
              delay={150}
            />
            <StatCard
              label="Rejected"
              value={stats.rejected}
              icon={XCircle}
              variant="destructive"
              delay={200}
            />
          </div>
        </section>

        {/* Applications List */}
        <section>
          <h2 className="text-lg font-medium mb-4 text-muted-foreground">
            Applications
          </h2>
          <div className="space-y-3">
            {sortedJobs.map((job, index) => (
              <JobListItem
                key={job.id}
                job={job}
                onDelete={deleteJob}
                isSelected={selectedJobId === job.id}
                onSelect={handleSelect}
                delay={index * 50}
              />
            ))}
            {sortedJobs.length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                No applications yet. Add your first one!
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
