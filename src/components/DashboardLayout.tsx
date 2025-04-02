import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { 
  Bell, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Menu, 
  Cpu, 
  FolderKanban,
  BarChart3,
  AlertTriangle,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { mockAlerts } from "@/lib/mock-data";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ to, icon, label, active, onClick }: SidebarLinkProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(to);
    if (onClick) onClick();
  };
  
  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium w-full transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const unreadAlerts = mockAlerts.filter(alert => !alert.read).length;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const nav = [
    { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/devices", icon: <Cpu size={20} />, label: "IoT Devices" },
    { to: "/projects", icon: <FolderKanban size={20} />, label: "Projects" },
    { to: "/alerts", icon: <AlertTriangle size={20} />, label: "Alerts" },
    { to: "/analytics", icon: <BarChart3 size={20} />, label: "Analytics" },
  ];

  if (isAdmin) {
    nav.push({ to: "/settings", icon: <Settings size={20} />, label: "Settings" });
  }

  const renderSidebar = () => (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-sidebar text-sidebar-foreground border-r">
      <div className="p-4 flex items-center gap-2 h-16 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground">
          <Cpu size={20} />
        </div>
        <h1 className="text-xl font-bold">ConstructIoT</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-auto">
        {nav.map((item) => (
          <SidebarLink
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.to}
          />
        ))}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>
              <User size={16} />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/70 truncate">{user?.role}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            title="Logout"
          >
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </aside>
  );

  const renderMobileMenu = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetContent side="left" className="p-0 bg-sidebar text-sidebar-foreground w-64">
        <div className="p-4 flex items-center gap-2 h-16 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground">
            <Cpu size={20} />
          </div>
          <h1 className="text-xl font-bold">ConstructIoT</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => (
            <SidebarLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.to}
              onClick={closeMobileMenu}
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>
                <User size={16} />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">{user?.role}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              title="Logout"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="flex h-screen w-full bg-background">
      {renderSidebar()}
      {renderMobileMenu()}
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b flex items-center px-4">
          <div className="flex items-center gap-3 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
            </Sheet>
            <h1 className="text-xl font-semibold">ConstructIoT</h1>
          </div>
          
          <div className="ml-auto flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <a href="/alerts">
                <Bell size={20} />
                {unreadAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                    {unreadAlerts}
                  </span>
                )}
              </a>
            </Button>
            
            <div className="md:flex items-center gap-2 hidden">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  <User size={16} />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
