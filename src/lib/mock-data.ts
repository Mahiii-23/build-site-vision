import { 
  Truck, 
  Wrench, 
  PackageOpen, 
  Shield, 
  Factory, 
  Hammer, 
  Forklift, 
  HardHat, 
  Thermometer, 
  Radiation, 
  Lightbulb, 
  Waves
} from 'lucide-react';

// Types
export interface IoTDevice {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'active' | 'inactive' | 'warning' | 'alert';
  batteryLevel: number;
  lastUpdate: string;
  readings: { 
    [key: string]: number | string;
  };
  icon: typeof Truck;
  geofence?: {
    enabled: boolean;
    radius: number;
    coordinates: [number, number];
  };
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  timestamp: string;
  deviceId?: string;
  read: boolean;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'active' | 'paused' | 'completed';
  description: string;
  manager: string;
  images?: string[];
}

// Mock data generators
export const generateMockDevices = (): IoTDevice[] => {
  const deviceTypes = [
    { type: 'Excavator', icon: Truck },
    { type: 'Crane', icon: Hammer },
    { type: 'Cement Mixer', icon: Factory },
    { type: 'Forklift', icon: Forklift },
    { type: 'Security System', icon: Shield },
    { type: 'Tool Tracker', icon: Wrench },
    { type: 'Material Sensor', icon: PackageOpen },
    { type: 'Safety Equipment', icon: HardHat },
    { type: 'Temperature Sensor', icon: Thermometer },
    { type: 'Noise Sensor', icon: Waves },
    { type: 'Air Quality Sensor', icon: Radiation },
    { type: 'Light Sensor', icon: Lightbulb },
  ];

  return Array.from({ length: 18 }, (_, i) => {
    const typeData = deviceTypes[i % deviceTypes.length];
    const status = ['active', 'active', 'active', 'inactive', 'warning', 'alert'][
      Math.floor(Math.random() * 6)
    ] as IoTDevice['status'];
    
    const batteryLevel = Math.floor(Math.random() * 100);
    const now = new Date();
    
    // Set the last update time from 0 minutes to 3 days ago
    const lastUpdateOffset = Math.floor(Math.random() * 60 * 24 * 3);
    const lastUpdate = new Date(now.getTime() - lastUpdateOffset * 60000).toISOString();
    
    return {
      id: `DEV-${(i + 1).toString().padStart(4, '0')}`,
      name: `${typeData.type} ${String.fromCharCode(65 + (i % 26))}`,
      type: typeData.type,
      location: ['Site A', 'Site B', 'Site C', 'Warehouse', 'Office'][Math.floor(Math.random() * 5)],
      status,
      batteryLevel,
      lastUpdate,
      readings: (() => {
        switch (typeData.type) {
          case 'Temperature Sensor':
            return { temperature: Math.floor(Math.random() * 35) + 10, humidity: Math.floor(Math.random() * 100) };
          case 'Air Quality Sensor':
            return { aqi: Math.floor(Math.random() * 300), co2: Math.floor(Math.random() * 1000) + 400 };
          case 'Noise Sensor':
            return { decibels: Math.floor(Math.random() * 110) + 40 };
          case 'Light Sensor':
            return { lux: Math.floor(Math.random() * 10000) };
          case 'Excavator':
          case 'Crane':
          case 'Cement Mixer':
          case 'Forklift':
            return { 
              engineHours: Math.floor(Math.random() * 10000), 
              fuelLevel: Math.floor(Math.random() * 100),
              engineTemp: Math.floor(Math.random() * 100) + 50,
              utilization: Math.floor(Math.random() * 100)
            };
          case 'Security System':
            return { 
              motionDetected: Math.random() > 0.8 ? 'Yes' : 'No',
              doorStatus: Math.random() > 0.7 ? 'Open' : 'Closed',
              lastTrigger: Math.random() > 0.7 ? new Date().toISOString() : null
            };
          default:
            return {};
        }
      })(),
      icon: typeData.icon,
      geofence: Math.random() > 0.5 ? {
        enabled: Math.random() > 0.3,
        radius: Math.floor(Math.random() * 500) + 100,
        coordinates: [
          35.6895 + (Math.random() - 0.5) * 0.1,
          139.6917 + (Math.random() - 0.5) * 0.1
        ],
      } : undefined,
    };
  });
};

export const generateMockAlerts = (devices: IoTDevice[]): Alert[] => {
  const alertTemplates = [
    { title: "Low Battery", message: "Device battery level is below 20%", severity: "warning" },
    { title: "Device Offline", message: "Device has not reported for more than 24 hours", severity: "error" },
    { title: "Geofence Breach", message: "Device has left the designated area", severity: "error" },
    { title: "High Temperature", message: "Temperature reading is above normal range", severity: "warning" },
    { title: "Maintenance Due", message: "Scheduled maintenance is due for this device", severity: "info" },
    { title: "Battery Replaced", message: "Device battery has been successfully replaced", severity: "info" },
    { title: "Fuel Level Low", message: "Vehicle fuel level is below 15%", severity: "warning" },
    { title: "Unauthorized Access", message: "Unauthorized access attempt detected", severity: "error" },
    { title: "Sensor Calibration", message: "Sensor requires calibration", severity: "info" },
    { title: "Connectivity Issues", message: "Device experiencing intermittent connectivity", severity: "warning" },
  ];

  return Array.from({ length: 15 }, (_, i) => {
    const device = devices[Math.floor(Math.random() * devices.length)];
    const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
    const now = new Date();
    const alertTime = new Date(now.getTime() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000));

    return {
      id: `ALERT-${(i + 1).toString().padStart(4, '0')}`,
      title: template.title,
      message: `${template.message} (${device.name})`,
      severity: template.severity as Alert['severity'],
      timestamp: alertTime.toISOString(),
      deviceId: device.id,
      read: Math.random() > 0.5,
    };
  });
};

export const generateMockProjects = (): Project[] => {
  const projectNames = [
    "Harbor Bridge Expansion",
    "Downtown Office Tower",
    "Memorial Hospital Wing",
    "Riverside Apartments",
    "Central Metro Station",
    "Solar Farm Installation",
    "Highway 95 Extension",
    "State University Dormitory",
    "Shopping Mall Renovation",
    "Industrial Park Development"
  ];

  const locations = [
    "North Harbor, Seattle",
    "Financial District, New York",
    "Medical Center, Houston",
    "Riverside Drive, Chicago",
    "Central City, Los Angeles",
    "Desert Valley, Phoenix",
    "Northwest County, Portland",
    "University Park, Boston",
    "Commercial Zone, Miami",
    "Industrial District, Detroit"
  ];

  const descriptions = [
    "Major infrastructure project expanding the harbor's capacity with new docking facilities.",
    "Construction of a 50-story office building with LEED certification.",
    "Adding a new specialized medical wing to the existing hospital.",
    "Luxury apartment complex with river views and eco-friendly design.",
    "Underground metro station with commercial retail space above ground.",
    "Installation of 200-acre solar panel farm with battery storage facility.",
    "Highway extension project including six bridges and four interchanges.",
    "Six-building dormitory complex housing 1,200 students.",
    "Complete renovation of existing shopping mall with expansion.",
    "Development of industrial park with 15 manufacturing facilities."
  ];

  return Array.from({ length: 10 }, (_, i) => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - Math.floor(Math.random() * 12));
    
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + Math.floor(Math.random() * 24) + 6);
    
    const progress = Math.min(
      100,
      Math.floor(
        ((new Date().getTime() - startDate.getTime()) /
          (endDate.getTime() - startDate.getTime())) *
          100
      )
    );
    
    const status = progress === 100 
      ? 'completed' 
      : (Math.random() > 0.8 ? 'paused' : 'active');

    return {
      id: `PRJ-${(i + 1).toString().padStart(4, '0')}`,
      name: projectNames[i],
      location: locations[i],
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      progress,
      status: status as Project['status'],
      description: descriptions[i],
      manager: i % 3 === 0 ? "Admin User" : "Manager User",
    };
  });
};

// Create mock data sets
export const mockDevices = generateMockDevices();
export const mockAlerts = generateMockAlerts(mockDevices);
export const mockProjects = generateMockProjects();

// Device statistics
export const getDeviceStatistics = () => {
  const totalDevices = mockDevices.length;
  const activeDevices = mockDevices.filter(d => d.status === 'active').length;
  const inactiveDevices = mockDevices.filter(d => d.status === 'inactive').length;
  const alertDevices = mockDevices.filter(d => d.status === 'alert').length;
  const warningDevices = mockDevices.filter(d => d.status === 'warning').length;
  
  const devicesByType = mockDevices.reduce((acc, device) => {
    acc[device.type] = (acc[device.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const devicesByLocation = mockDevices.reduce((acc, device) => {
    acc[device.location] = (acc[device.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalDevices,
    activeDevices,
    inactiveDevices,
    alertDevices,
    warningDevices,
    devicesByType,
    devicesByLocation
  };
};

// Project statistics
export const getProjectStatistics = () => {
  const totalProjects = mockProjects.length;
  const activeProjects = mockProjects.filter(p => p.status === 'active').length;
  const pausedProjects = mockProjects.filter(p => p.status === 'paused').length;
  const completedProjects = mockProjects.filter(p => p.status === 'completed').length;
  
  const averageProgress = mockProjects.reduce((sum, project) => sum + project.progress, 0) / totalProjects;
  
  return {
    totalProjects,
    activeProjects,
    pausedProjects,
    completedProjects,
    averageProgress
  };
};

// Alert statistics
export const getAlertStatistics = () => {
  const totalAlerts = mockAlerts.length;
  const unreadAlerts = mockAlerts.filter(a => !a.read).length;
  const errorAlerts = mockAlerts.filter(a => a.severity === 'error').length;
  const warningAlerts = mockAlerts.filter(a => a.severity === 'warning').length;
  const infoAlerts = mockAlerts.filter(a => a.severity === 'info').length;
  
  return {
    totalAlerts,
    unreadAlerts,
    errorAlerts,
    warningAlerts,
    infoAlerts
  };
};

// Project-specific data functions
export const getProjectDevices = (projectId: string) => {
  // For demo purposes, just return a subset of devices
  return mockDevices.slice(0, 8).map(device => ({
    ...device,
    lastReading: new Date().toISOString(),
    status: ['active', 'active', 'warning', 'error', 'inactive'][Math.floor(Math.random() * 5)],
    batteryLevel: Math.floor(Math.random() * 100),
    location: mockProjects.find(p => p.id === projectId)?.location || device.location
  }));
};

export const getProjectAlerts = (projectId: string) => {
  // For demo purposes, return a subset of alerts with project-specific modifications
  return mockAlerts.slice(0, 7).map(alert => ({
    ...alert,
    severity: ['critical', 'warning', 'info'][Math.floor(Math.random() * 3)],
    resolved: Math.random() > 0.7,
    deviceId: mockDevices[Math.floor(Math.random() * mockDevices.length)].id,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString()
  }));
};
