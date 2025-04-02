
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, MapPin, Calendar, Edit, MoreHorizontal, Users, FileText, Play, PauseCircle, CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { StatusBadge } from "./StatusBadges";

interface ProjectHeaderProps {
  project: {
    id: string;
    name: string;
    location: string;
    startDate: string;
    status: string;
  };
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Link to="/projects">
          <Button variant="ghost" size="icon" className="h-8 w-8 mr-1">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(new Date(project.startDate), "MMM d, yyyy")}</span>
            </div>
            <StatusBadge status={project.status} />
          </div>
        </div>
      </div>
      
      <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" className="h-8">
          <FileText className="h-4 w-4 mr-1" />
          Generate Report
        </Button>
        
        <Button variant="outline" size="sm" className="h-8">
          <Users className="h-4 w-4 mr-1" />
          Manage Team
        </Button>
        
        <Button size="sm" className="h-8">
          <Edit className="h-4 w-4 mr-1" />
          Edit Project
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Play className="h-4 w-4 mr-2" />
              Resume Project
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PauseCircle className="h-4 w-4 mr-2" />
              Pause Project
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark as Completed
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
