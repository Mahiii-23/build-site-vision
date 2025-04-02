
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoTDevice } from "@/lib/mock-data";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Battery, BatteryLow, BatteryFull, BatteryMedium, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const BatteryIcon = ({ level }: { level: number }) => {
  if (level <= 20) return <BatteryLow className="text-destructive" size={16} />;
  if (level <= 50) return <BatteryMedium className="text-warning" size={16} />;
  return <BatteryFull className="text-success" size={16} />;
};

export function DeviceStatusCard({ device }: { device: IoTDevice }) {
  const navigate = useNavigate();
  const Icon = device.icon;
  const lastUpdateDate = new Date(device.lastUpdate);
  
  return (
    <Card className="device-card overflow-hidden h-full">
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center",
                  device.status === 'active' ? "bg-success/10 text-success" : 
                  device.status === 'warning' ? "bg-warning/10 text-warning" : 
                  device.status === 'alert' ? "bg-destructive/10 text-destructive" : 
                  "bg-muted/10 text-muted-foreground"
                )}>
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-medium line-clamp-1">{device.name}</h3>
                  <p className="text-xs text-muted-foreground">{device.type}</p>
                </div>
              </div>
              <span className={cn(
                "status-pill",
                `status-${device.status}`
              )}>
                {capitalizeFirstLetter(device.status)}
              </span>
            </div>
            
            <div className="mt-3 text-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">{device.location}</span>
              </div>
              
              <div className="flex items-center justify-between mb-1">
                <span className="text-muted-foreground">Battery:</span>
                <div className="flex items-center">
                  <BatteryIcon level={device.batteryLevel} />
                  <span className="ml-1 font-medium">{device.batteryLevel}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Update:</span>
                <div className="flex items-center">
                  <Clock size={14} className="text-muted-foreground mr-1" />
                  <span className="text-sm">
                    {formatDistanceToNow(lastUpdateDate, { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
            
            {Object.keys(device.readings).length > 0 && (
              <div className="mt-3 p-3 bg-muted/20 rounded-md">
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(device.readings).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="sensor-value">{value}</div>
                      <div className="sensor-label">{capitalizeFirstLetter(key)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-auto p-3 pt-0">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate(`/devices/${device.id}`)}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
