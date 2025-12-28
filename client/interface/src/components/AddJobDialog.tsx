import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Job, JobStatus } from "@/types/job";
import { toast } from "@/hooks/use-toast";

interface AddJobDialogProps {
  onAddJob: (job: Omit<Job, "id">) => void;
}

export const AddJobDialog = ({ onAddJob }: AddJobDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    status: "applied" as JobStatus,
    appliedDate: new Date().toISOString().split("T")[0],
    notes: "",
    url: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company.trim() || !formData.position.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please fill in company and position",
        variant: "destructive",
      });
      return;
    }

    onAddJob(formData);
    setFormData({
      company: "",
      position: "",
      location: "",
      status: "applied",
      appliedDate: new Date().toISOString().split("T")[0],
      notes: "",
      url: "",
    });
    setOpen(false);
    toast({
      title: "Application added",
      description: `Added ${formData.position} at ${formData.company}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Application
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] glass border-border/50">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                placeholder="e.g., Stripe"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                placeholder="e.g., Senior Engineer"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Remote"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: JobStatus) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interviewing">Interviewing</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="appliedDate">Applied Date</Label>
              <Input
                id="appliedDate"
                type="date"
                value={formData.appliedDate}
                onChange={(e) =>
                  setFormData({ ...formData, appliedDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Job URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://..."
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Application</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
