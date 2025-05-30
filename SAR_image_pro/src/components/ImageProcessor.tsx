
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Download, RefreshCw, Wand2 } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { pipeline } from "@huggingface/transformers";

export function ImageProcessor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [colorizedImage, setColorizedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("original");
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);

  // Simulate the model loading process
  useEffect(() => {
    if (originalImage && !modelLoaded && !modelLoading) {
      loadModel();
    }
  }, [originalImage, modelLoaded, modelLoading]);

  const loadModel = async () => {
    setModelLoading(true);
    
    // Simulating model loading time
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        setModelLoaded(true);
        setModelLoading(false);
      }
    }, 200);
    
    // In a real implementation, we would load the model like this:
    // try {
    //   const imageColorizer = await pipeline(
    //     "image-to-image",
    //     "huggingface/image-colorization-model"
    //   );
    //   setModelLoaded(true);
    // } catch (error) {
    //   console.error("Error loading model:", error);
    // } finally {
    //   setModelLoading(false);
    // }
  };

  const handleImageUploaded = (imageData: string) => {
    setOriginalImage(imageData);
    setColorizedImage(null);
    setActiveTab("original");
  };

  const processImage = () => {
    if (!originalImage || !modelLoaded) return;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate image processing
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setProcessingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // In a real implementation, we would use the model to colorize the image
          // For this demo, we'll just use the original image as a placeholder
          setColorizedImage(originalImage);
          setIsProcessing(false);
          setActiveTab("colorized");
        }, 500);
      }
    }, 100);
    
    // In a real implementation, we would process the image like this:
    // try {
    //   const colorizedResult = await imageColorizer(originalImage);
    //   setColorizedImage(colorizedResult);
    //   setActiveTab("colorized");
    // } catch (error) {
    //   console.error("Error processing image:", error);
    // } finally {
    //   setIsProcessing(false);
    // }
  };

  const downloadImage = () => {
    if (!colorizedImage) return;
    
    const a = document.createElement("a");
    a.href = colorizedImage;
    a.download = "colorized-sar-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <ImageUploader onImageUploaded={handleImageUploaded} />
          
          {originalImage && (
            <div className="mt-6 space-y-4">
              <Button
                onClick={processImage}
                disabled={isProcessing || !modelLoaded}
                className="w-full bg-radar-highlight hover:bg-blue-500"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing ({processingProgress}%)
                  </>
                ) : modelLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Loading Model...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Colorize Image
                  </>
                )}
              </Button>
              
              {colorizedImage && (
                <Button onClick={downloadImage} variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Result
                </Button>
              )}
            </div>
          )}
        </div>
        
        <div>
          {originalImage && (
            <Card className="overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-4 pt-4">
                  <TabsList className="w-full">
                    <TabsTrigger value="original" className="flex-1">Original</TabsTrigger>
                    <TabsTrigger 
                      value="colorized" 
                      className="flex-1"
                      disabled={!colorizedImage}
                    >
                      Colorized
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <Separator className="my-4" />
                
                <TabsContent value="original" className="m-0">
                  <div className="relative aspect-square">
                    <img
                      src={originalImage}
                      alt="Original SAR image"
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="colorized" className="m-0">
                  {colorizedImage ? (
                    <div className="relative aspect-square">
                      <img
                        src={colorizedImage}
                        alt="Colorized SAR image"
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64">
                      <p className="text-muted-foreground">Process the image to see results</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
