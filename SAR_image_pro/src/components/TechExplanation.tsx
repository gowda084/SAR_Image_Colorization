
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BrainCircuit, Image, Sparkles, Cpu } from "lucide-react";

export function TechExplanation() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-radar-purple/30 bg-gradient-to-br from-radar-dark to-radar-blue">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-radar-highlight" />
              <CardTitle>Deep Learning Technology</CardTitle>
            </div>
            <CardDescription>
              Powered by state-of-the-art neural networks
            </CardDescription>
          </CardHeader>
          <Separator className="mb-4" />
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our SAR image colorization uses advanced generative adversarial networks (GANs) 
              and convolutional neural networks (CNNs) trained on specialized datasets of 
              SAR imagery. The model learns the relationship between radar reflectivity 
              patterns and their real-world color representations.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-radar-purple/30 bg-gradient-to-br from-radar-dark to-radar-blue">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-radar-highlight" />
              <CardTitle>Image Processing</CardTitle>
            </div>
            <CardDescription>
              From grayscale to vibrant detail
            </CardDescription>
          </CardHeader>
          <Separator className="mb-4" />
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The colorization process preserves important radar signatures while 
              adding realistic color information. Our algorithm maintains the structural 
              integrity of the original SAR data while enhancing it with color that corresponds 
              to actual terrain features, vegetation, and man-made structures.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-radar-purple/30 bg-gradient-to-br from-radar-dark to-radar-blue">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-radar-highlight" />
              <CardTitle>High Resolution Output</CardTitle>
            </div>
            <CardDescription>
              Maintaining detail while adding color
            </CardDescription>
          </CardHeader>
          <Separator className="mb-4" />
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our model is designed to produce high-resolution outputs that maintain 
              the fine detail of the original SAR images. Through advanced upsampling 
              techniques, the colorized images preserve critical features while adding 
              natural-looking color to enhance interpretability.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-radar-purple/30 bg-gradient-to-br from-radar-dark to-radar-blue">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-radar-highlight" />
              <CardTitle>Browser-Based Processing</CardTitle>
            </div>
            <CardDescription>
              No server-side computation needed
            </CardDescription>
          </CardHeader>
          <Separator className="mb-4" />
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our application leverages WebGL acceleration and optimized TensorFlow.js models 
              to run directly in your browser. This means your SAR images never leave your 
              computer, ensuring privacy and security while still delivering professional-grade 
              colorization results.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
