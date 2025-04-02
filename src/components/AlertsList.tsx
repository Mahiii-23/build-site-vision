
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Alert } from "@/lib/mock-data";
import { Check, Info, AlertTriangle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlertsListProps {
  alerts: Alert[];
  limit?: number;
  showActions?: boolean;
}

export function AlertsList({ alerts, limit, showActions = true }: AlertsListProps) {
  const [displayedAlerts, setDisplayedAlerts] = useState<Alert[]>(alerts);
  
  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'error':
        return <AlertCircle className="text-destructive" size={18} />;
      case 'warning':
        return <AlertTriangle className="text-warning" size={18} />;
      case 'info':
        return <Info className="text-info" size={18} />;
      default:
        return <Info className="text-info" size={18} />;
    }
  };
  
  const markAsRead = (alertId: string) => {
    setDisplayedAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };
  
  const displayAlerts = limit ? displayedAlerts.slice(0, limit) : displayedAlerts;
  
  return (
    <div className="space-y-3">
      {displayAlerts.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No alerts to display
        </div>
      ) : (
        displayAlerts.map((alert) => (
          <div 
            key={alert.id}
            className={cn(
              "p-3 border rounded-lg flex items-start gap-3 transition-colors",
              !alert.read && "bg-muted/20 border-primary/20"
            )}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getSeverityIcon(alert.severity)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className={cn(
                "font-medium",
                !alert.read && "text-foreground",
                alert.read && "text-muted-foreground"
              )}>
                {alert.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
              <div className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
              </div>
            </div>
            
            {showActions && !alert.read && (
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 h-8 w-8"
                onClick={() => markAsRead(alert.id)}
              >
                <Check size={16} />
              </Button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
