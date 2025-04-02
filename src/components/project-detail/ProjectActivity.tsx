
import { format } from "date-fns";
import { CheckCircle2, AlertTriangle, Info, File } from "lucide-react";
import { DataCard } from "@/components/ui/data-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProjectActivityProps {
  activities: Array<{
    id: string;
    type: string;
    user: string;
    content: string;
    date: string;
    avatar?: string;
    files?: string[];
  }>;
}

export const ProjectActivity = ({ activities }: ProjectActivityProps) => {
  return (
    <DataCard title="Project Activity">
      <div className="p-4">
        <div className="space-y-8">
          {activities.map(activity => (
            <div key={activity.id} className="flex gap-4">
              {activity.type === "system" || activity.type === "milestone" || activity.type === "alert" ? (
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {activity.type === "milestone" && <CheckCircle2 className="h-5 w-5 text-success" />}
                  {activity.type === "alert" && <AlertTriangle className="h-5 w-5 text-warning" />}
                  {activity.type === "system" && <Info className="h-5 w-5 text-info" />}
                </div>
              ) : (
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.avatar} alt={activity.user} />
                  <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              )}
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-muted-foreground ml-2 text-sm">
                      {activity.type === "comment" ? "commented" : 
                       activity.type === "upload" ? "uploaded files" : 
                       activity.type === "milestone" ? "updated milestone" : 
                       activity.type === "alert" ? "system alert" : "updated"}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(activity.date), "MMM d, HH:mm")}
                  </div>
                </div>
                
                <div className="mt-2">{activity.content}</div>
                
                {activity.type === "upload" && activity.files && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activity.files.map((file, idx) => (
                      <Badge key={idx} variant="outline" className="flex items-center gap-1">
                        <File className="h-3 w-3" />
                        {file}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DataCard>
  );
};
