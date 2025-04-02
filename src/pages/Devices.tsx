
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataCard } from "@/components/ui/data-card";
import { StatusFilter } from "@/components/StatusFilter";
import { DeviceStatusCard } from "@/components/DeviceStatusCard";
import { 
  Cpu,
  Plus,
  Search,
  SlidersHorizontal,
  ChevronRight
} from "lucide-react";
import { mockDevices } from "@/lib/mock-data";

const Devices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const deviceStatusCounts = {
    all: mockDevices.length,
    active: mockDevices.filter(d => d.status === 'active').length,
    warning: mockDevices.filter(d => d.status === 'warning').length,
    error: mockDevices.filter(d => d.status === 'error').length,
    inactive: mockDevices.filter(d => d.status === 'inactive').length,
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold">IoT Devices</h1>
          <div className="mt-4 md:mt-0">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Device
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <DataCard>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search devices..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center">
                <StatusFilter 
                  statusCounts={deviceStatusCounts}
                  activeStatus={statusFilter}
                  onStatusChange={setStatusFilter}
                />
                
                <Button variant="outline" size="sm" className="ml-2">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
          </DataCard>

          <div>
            <h2 className="text-lg font-medium mb-4">Device Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDevices.length > 0 ? (
                filteredDevices.map(device => (
                  <DeviceStatusCard key={device.id} device={device} />
                ))
              ) : (
                <div className="col-span-full bg-card rounded-lg border p-8 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Cpu className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No devices found</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {searchQuery ? "Try adjusting your search or filters." : "Add a new device to get started."}
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Device
                  </Button>
                </div>
              )}
            </div>
          </div>

          {filteredDevices.length > 0 && (
            <div className="flex justify-center">
              <Button variant="outline">
                View All Devices
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Devices;
