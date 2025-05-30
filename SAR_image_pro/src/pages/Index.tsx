import { ImageProcessor } from "@/components/ImageProcessor";
import { ExampleGallery } from "@/components/ExampleGallery";
import { TechExplanation } from "@/components/TechExplanation";
import { Separator } from "@/components/ui/separator";
import { Satellite, Palette, Github } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-radar-dark text-white">
      {/* Header */}
      <header className="py-6 px-4 bg-gradient-to-r from-radar-blue to-radar-purple">
        <div className="container max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Satellite className="h-8 w-8 text-radar-highlight" />
              <h1 className="text-2xl font-bold">SAR Colorizer</h1>
            </div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center text-sm hover:text-radar-highlight transition-colors"
            >
              <Github className="h-5 w-5 mr-1" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto py-10 px-4 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-radar-purple/30 rounded-full px-4 py-1.5 text-sm font-medium">
            <Palette className="h-4 w-4 text-radar-highlight" />
            <span>Transform Grayscale SAR Images with Deep Learning</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Bring Your Radar Images to <span className="text-radar-highlight">Life</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload grayscale SAR (Synthetic Aperture Radar) images and transform them into 
            vibrant, color representations using advanced deep learning technology.
          </p>
        </section>

        {/* Image Processor Section */}
        <section>
          <ImageProcessor />
        </section>

        <Separator className="bg-radar-purple/20" />

        {/* Technology Explanation */}
        <section>
          <TechExplanation />
        </section>

        <Separator className="bg-radar-purple/20" />

        {/* Example Gallery */}
        <section>
          <ExampleGallery />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 bg-radar-blue/30 border-t border-radar-purple/20">
        <div className="container max-w-5xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            SAR Colorizer — Powered by Deep Learning and Advanced Neural Networks
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
