
import { useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { mockProjects, getProjectDevices, getProjectAlerts } from "@/lib/mock-data";
import { ProjectHeader } from "@/components/project-detail/ProjectHeader";
import { ProjectStats } from "@/components/project-detail/ProjectStats";
import { ProjectOverview } from "@/components/project-detail/ProjectOverview";
import { ProjectDevices } from "@/components/project-detail/ProjectDevices";
import { ProjectTeam } from "@/components/project-detail/ProjectTeam";
import { ProjectDocuments } from "@/components/project-detail/ProjectDocuments";
import { ProjectActivity } from "@/components/project-detail/ProjectActivity";
import { ProjectNotFound } from "@/components/project-detail/ProjectNotFound";

const ProjectDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the project by id
  const project = mockProjects.find(p => p.id === id);
  
  if (!project) {
    return <ProjectNotFound />;
  }
  
  // Project devices
  const devices = getProjectDevices(project.id);
  
  // Project alerts
  const alerts = getProjectAlerts(project.id);
  
  // Mock project documents
  const documents = [
    { id: "doc1", name: "Project Specifications", type: "pdf", size: "2.4 MB", date: "2023-10-15" },
    { id: "doc2", name: "Site Survey Report", type: "docx", size: "1.8 MB", date: "2023-10-18" },
    { id: "doc3", name: "Environmental Assessment", type: "pdf", size: "4.1 MB", date: "2023-10-20" },
    { id: "doc4", name: "Budget Proposal", type: "xlsx", size: "945 KB", date: "2023-10-25" },
    { id: "doc5", name: "Team Assignments", type: "pdf", size: "1.2 MB", date: "2023-11-01" },
    { id: "doc6", name: "Client Requirements", type: "docx", size: "822 KB", date: "2023-11-05" },
  ];
  
  // Mock project milestones
  const milestones = [
    { 
      id: "ms1", 
      name: "Planning Phase Completion", 
      status: "completed", 
      date: "2023-10-20",
      description: "Complete all planning documents and get client approval."
    },
    { 
      id: "ms2", 
      name: "Foundation Work", 
      status: "completed", 
      date: "2023-11-15",
      description: "Complete the foundation laying and structural support."
    },
    { 
      id: "ms3", 
      name: "Structural Framework", 
      status: "in-progress", 
      date: "2023-12-10",
      description: "Erect the structural framework and complete initial inspections."
    },
    { 
      id: "ms4", 
      name: "Electrical and Plumbing", 
      status: "upcoming", 
      date: "2024-01-20",
      description: "Install all electrical wiring, plumbing, and related infrastructure."
    },
    { 
      id: "ms5", 
      name: "Interior Work", 
      status: "upcoming", 
      date: "2024-02-15",
      description: "Complete all interior finishing work including walls, floors, and ceilings."
    },
    { 
      id: "ms6", 
      name: "Final Inspection", 
      status: "upcoming", 
      date: "2024-03-10",
      description: "Conduct final inspections and obtain necessary certificates."
    },
  ];
  
  // Mock project team members
  const team = [
    { id: "tm1", name: "Alex Johnson", role: "Project Manager", avatar: "/avatar-1.jpg" },
    { id: "tm2", name: "Sarah Chen", role: "Lead Engineer", avatar: "/avatar-2.jpg" },
    { id: "tm3", name: "Mohammed Al-Fahim", role: "Structural Engineer", avatar: "/avatar-3.jpg" },
    { id: "tm4", name: "Elena Rodriguez", role: "Electrical Engineer", avatar: "/avatar-4.jpg" },
    { id: "tm5", name: "Thomas Williams", role: "Safety Inspector", avatar: "/avatar-5.jpg" },
    { id: "tm6", name: "Priya Sharma", role: "Quality Assurance", avatar: "/avatar-6.jpg" },
  ];
  
  // Mock project comments/activity
  const activities = [
    { 
      id: "act1", 
      type: "comment", 
      user: "Alex Johnson", 
      content: "Updated the project timeline to account for the weather delays.", 
      date: "2023-11-20T14:35:00",
      avatar: "/avatar-1.jpg"
    },
    { 
      id: "act2", 
      type: "upload", 
      user: "Sarah Chen", 
      content: "Uploaded the revised structural drawings.", 
      date: "2023-11-19T10:22:00",
      avatar: "/avatar-2.jpg",
      files: ["Structural_Rev2.pdf"]
    },
    { 
      id: "act3", 
      type: "milestone", 
      user: "System", 
      content: "Milestone completed: Planning Phase Completion", 
      date: "2023-11-18T16:45:00"
    },
    { 
      id: "act4", 
      type: "comment", 
      user: "Elena Rodriguez", 
      content: "The electrical plan needs to be revised to accommodate the new equipment specifications.", 
      date: "2023-11-17T09:15:00",
      avatar: "/avatar-4.jpg"
    },
    { 
      id: "act5", 
      type: "alert", 
      user: "System", 
      content: "Alert: Temperature sensor SD-103 reported high temperature.", 
      date: "2023-11-16T11:30:00"
    },
  ];
  
  // Weekly progress data
  const weeklyProgressData = [
    { week: "Week 1", planned: 5, actual: 4 },
    { week: "Week 2", planned: 10, actual: 9 },
    { week: "Week 3", planned: 15, actual: 12 },
    { week: "Week 4", planned: 25, actual: 20 },
    { week: "Week 5", planned: 40, actual: 32 },
    { week: "Week 6", planned: 55, actual: 48 },
    { week: "Week 7", planned: 70, actual: 65 },
    { week: "Week 8", planned: 80, actual: 78 },
  ];
  
  // Resource allocation data
  const resourceAllocationData = [
    { name: "Labor", planned: 45, actual: 48 },
    { name: "Materials", planned: 30, actual: 32 },
    { name: "Equipment", planned: 15, actual: 12 },
    { name: "Services", planned: 10, actual: 8 },
  ];
  
  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header / Back Navigation */}
        <ProjectHeader project={project} />
        
        {/* Project overview stats */}
        <ProjectStats 
          project={project} 
          devices={devices} 
          alerts={alerts} 
        />
        
        {/* Tabs for different project views */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <ProjectOverview 
              project={project}
              milestones={milestones}
              alerts={alerts}
              weeklyProgressData={weeklyProgressData}
              resourceAllocationData={resourceAllocationData}
              setActiveTab={setActiveTab}
            />
          </TabsContent>
          
          {/* Devices Tab */}
          <TabsContent value="devices">
            <ProjectDevices devices={devices} />
          </TabsContent>
          
          {/* Team Tab */}
          <TabsContent value="team">
            <ProjectTeam team={team} />
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents">
            <ProjectDocuments documents={documents} />
          </TabsContent>
          
          {/* Activity Tab */}
          <TabsContent value="activity">
            <ProjectActivity activities={activities} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;
