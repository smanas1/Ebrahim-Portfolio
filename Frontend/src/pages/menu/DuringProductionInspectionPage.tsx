import { Button } from "@/components/ui/button";

const DuringProductionInspectionPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">During Production Inspection</h1>
          <p className="text-lg text-muted-foreground">
            Monitor production progress to ensure quality standards are maintained throughout manufacturing
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-md border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Inspection Approach</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Regular Monitoring</h3>
                <p className="text-muted-foreground">Schedule periodic inspections throughout the production process.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Random Sampling</h3>
                <p className="text-muted-foreground">Test random samples to ensure consistency and quality.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Process Verification</h3>
                <p className="text-muted-foreground">Ensure manufacturing processes follow established standards.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Real-Time Reporting</h3>
                <p className="text-muted-foreground">Receive immediate feedback and reports during the inspection.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Quality Maintenance</h3>
            <p className="text-muted-foreground">Keep quality standards throughout production process.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Issue Prevention</h3>
            <p className="text-muted-foreground">Address problems as they occur to prevent waste.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Process Optimization</h3>
            <p className="text-muted-foreground">Identify opportunities for production improvements.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Maintain Production Excellence</h2>
          <p className="text-muted-foreground mb-4">
            Our during production inspection service ensures quality is maintained throughout manufacturing, 
            so you receive products that consistently meet your standards.
          </p>
          <Button variant="default">Book Inspection</Button>
        </div>
      </div>
    </div>
  );
};

export default DuringProductionInspectionPage;