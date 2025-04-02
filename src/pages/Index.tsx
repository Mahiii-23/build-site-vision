
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Cpu, BarChart3, Factory, Shield, Layers, ArrowRight } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground">
              <Cpu size={20} />
            </div>
            <h1 className="text-xl font-bold">ConstructIoT</h1>
          </div>
          <Button onClick={handleGetStarted}>Login</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Smart Factory & Process Automation
                <span className="text-primary block mt-2">for Construction</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Revolutionize your construction projects with IoT integration, real-time monitoring, and AI-driven insights. Enhance safety, efficiency, and resource management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={handleGetStarted}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={handleGetStarted}>
                  Book a Demo
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <div className="bg-muted rounded-lg p-8 relative z-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-background rounded-md p-4 shadow-sm">
                      <Cpu className="h-8 w-8 text-primary mb-3" />
                      <h3 className="font-medium mb-1">IoT Integration</h3>
                      <p className="text-sm text-muted-foreground">Connect sensors to monitor equipment & materials</p>
                    </div>
                    <div className="bg-background rounded-md p-4 shadow-sm">
                      <Shield className="h-8 w-8 text-accent mb-3" />
                      <h3 className="font-medium mb-1">Enhanced Security</h3>
                      <p className="text-sm text-muted-foreground">Geo-fencing & automated security alerts</p>
                    </div>
                    <div className="bg-background rounded-md p-4 shadow-sm">
                      <BarChart3 className="h-8 w-8 text-info mb-3" />
                      <h3 className="font-medium mb-1">AI Analytics</h3>
                      <p className="text-sm text-muted-foreground">Predictive maintenance & resource optimization</p>
                    </div>
                    <div className="bg-background rounded-md p-4 shadow-sm">
                      <Factory className="h-8 w-8 text-warning mb-3" />
                      <h3 className="font-medium mb-1">Real-time Monitoring</h3>
                      <p className="text-sm text-muted-foreground">Track operations with interactive dashboards</p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/10 rounded-lg transform translate-x-4 translate-y-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers comprehensive solutions for construction management with advanced IoT capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">IoT Device Integration</h3>
              <p className="text-muted-foreground">
                Connect GPS, RFID, and telematics to monitor equipment, materials, and security in real time.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Live tracking of resources & workers</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Geo-fencing capabilities</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Automated security alerts</span>
                </li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-medium mb-2">Role-Based Access</h3>
              <p className="text-muted-foreground">
                Custom dashboards and permissions for administrators and managers to effectively oversee operations.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  <span>Admin device management</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  <span>Manager resource tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  <span>Customizable permissions</span>
                </li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-md bg-info/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-info" />
              </div>
              <h3 className="text-xl font-medium mb-2">AI-Driven Analytics</h3>
              <p className="text-muted-foreground">
                Leverage AI to predict maintenance needs, optimize resources, and improve operational efficiency.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-info"></div>
                  <span>Predictive maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-info"></div>
                  <span>Resource utilization insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-info"></div>
                  <span>OEE calculations & reporting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Construction Operations?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join leading construction companies already using our platform to enhance safety, efficiency, and profitability.
          </p>
          <Button size="lg" onClick={handleGetStarted}>
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground">
                <Cpu size={20} />
              </div>
              <h1 className="text-xl font-bold">ConstructIoT</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2023 ConstructIoT. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
