
import { Users, MessageSquare, FileText, Edit } from "lucide-react";
import { DataCard } from "@/components/ui/data-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProjectTeamProps {
  team: Array<{
    id: string;
    name: string;
    role: string;
    avatar: string;
  }>;
}

export const ProjectTeam = ({ team }: ProjectTeamProps) => {
  return (
    <DataCard title="Project Team">
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {team.map(member => (
            <div key={member.id} className="border rounded-lg p-4 flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
                <div className="flex gap-2 mt-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DataCard>
  );
};
