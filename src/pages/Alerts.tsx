
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  AlertCircle,
  Bell,
  CheckCircle,
  Clock,
  Info,
  MoreHorizontal,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAlerts } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

// Alert type definition for clarity
interface Alert {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  timestamp: string;
  read: boolean;
  device?: {
    id: string;
    name: string;
  };
}

const AlertItem = ({ alert, onMarkAsRead }: { alert: Alert; onMarkAsRead: (id: string) => void }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "info":
        return <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">Info</Badge>;
      case "warning":
        return <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">Warning</Badge>;
      case "error":
        return <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">Error</Badge>;
      case "success":
        return <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">Success</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className={`p-4 border-b ${!alert.read ? 'bg-muted/40' : ''}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {getAlertIcon(alert.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium">
              {alert.title}
            </h3>
            {getAlertBadge(alert.type)}
            {!alert.read && (
              <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {alert.message}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatDate(alert.timestamp)}</span>
            {alert.device && (
              <span>Device: {alert.device.name}</span>
            )}
          </div>
        </div>
        <div>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onMarkAsRead(alert.id)}>
                  Mark as {alert.read ? 'unread' : 'read'}
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{alert.title}</DialogTitle>
                <DialogDescription>
                  Alert details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Message</h4>
                  <p className="text-sm">{alert.message}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Type</h4>
                    <p className="text-sm capitalize">{alert.type}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Date & Time</h4>
                    <p className="text-sm">{formatDate(alert.timestamp)}</p>
                  </div>
                  {alert.device && (
                    <>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Device</h4>
                        <p className="text-sm">{alert.device.name}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Device ID</h4>
                        <p className="text-sm text-muted-foreground">{alert.device.id}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

const AlertsFilters = ({ activeFilter, setActiveFilter }: { 
  activeFilter: string; 
  setActiveFilter: (filter: string) => void 
}) => {
  const filters = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "error", label: "Error" },
    { id: "warning", label: "Warning" },
    { id: "info", label: "Info" },
    { id: "success", label: "Success" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter(filter.id)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

const Alerts = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState("all");

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true;
    if (filter === "unread") return !alert.read;
    return alert.type === filter;
  });

  const handleMarkAsRead = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, read: !alert.read } : alert
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, read: true })));
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold">Alerts</h1>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          </div>
        </div>

        <div className="bg-background border rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <AlertsFilters
              activeFilter={filter}
              setActiveFilter={setFilter}
            />
          </div>

          {filteredAlerts.length > 0 ? (
            <div className="divide-y">
              {filteredAlerts.map((alert) => (
                <AlertItem
                  key={alert.id}
                  alert={alert}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Bell className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No alerts found</h3>
              <p className="text-muted-foreground text-sm">
                {filter === "all"
                  ? "You don't have any alerts at the moment."
                  : `No ${filter} alerts found.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
