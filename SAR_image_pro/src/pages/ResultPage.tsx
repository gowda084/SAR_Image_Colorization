
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function ResultPage() {
  const [feedback, setFeedback] = useState<number | null>(null);
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get the last uploaded image from localStorage
    const lastUpload = localStorage.getItem("lastUpload");
    
    if (!lastUpload) {
      // Redirect to upload page if no image is found
      toast({
        title: "No image found",
        description: "Please upload an image first",
        variant: "destructive",
      });
      navigate("/upload");
      return;
    }
    
    setInputImage(lastUpload);
    
    // Simulate colorization process
    simulateColorization(lastUpload);
  }, [navigate, toast]);

  // Function to simulate colorized output with enhanced colors
  const simulateColorization = (imageData: string) => {
    // In a real app, this would be an API call to your Python GAN model
    toast({
      title: "Processing Image",
      description: "Applying advanced AI colorization...",
    });
    
    // Enhanced color simulation for demonstration purposes
    setTimeout(() => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        
        if (ctx) {
          // Draw original image
          ctx.drawImage(img, 0, 0);
          
          // Get image data to process pixel by pixel
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Process each pixel for more realistic colorization
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Calculate grayscale value
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            
            // Apply color based on brightness
            if (gray < 50) {  // Dark areas - blues/purples
              data[i] = Math.min(255, gray * 0.7);
              data[i + 1] = Math.min(255, gray * 0.8);
              data[i + 2] = Math.min(255, gray * 1.5);
            } else if (gray < 100) {  // Mid-dark areas - deep greens
              data[i] = Math.min(255, gray * 0.7);
              data[i + 1] = Math.min(255, gray * 1.2);
              data[i + 2] = Math.min(255, gray * 0.9);
            } else if (gray < 150) {  // Mid-bright areas - yellows/oranges
              data[i] = Math.min(255, gray * 1.3);
              data[i + 1] = Math.min(255, gray * 1.1);
              data[i + 2] = Math.min(255, gray * 0.7);
            } else {  // Bright areas - reds/pinks
              data[i] = Math.min(255, gray * 1.3);
              data[i + 1] = Math.min(255, gray * 0.8);
              data[i + 2] = Math.min(255, gray * 1.1);
            }
          }
          
          // Put processed image data back to canvas
          ctx.putImageData(imageData, 0, 0);
          
          // Apply additional color enhancements with overlays
          // Add a color vibrance layer
          ctx.globalCompositeOperation = "overlay";
          ctx.globalAlpha = 0.3;
          ctx.fillStyle = "rgba(70, 130, 180, 0.3)"; // Steel blue overlay for depth
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Add color spots to create more natural looking variations
          ctx.globalCompositeOperation = "color";
          const colorSpots = [
            { color: "rgba(0, 128, 0, 0.5)", size: 0.4 },  // Green
            { color: "rgba(139, 69, 19, 0.5)", size: 0.3 }, // Brown
            { color: "rgba(70, 130, 180, 0.5)", size: 0.3 }, // Steel Blue
            { color: "rgba(205, 92, 92, 0.5)", size: 0.25 }, // Indian Red
            { color: "rgba(60, 179, 113, 0.6)", size: 0.3 } // Medium Sea Green
          ];
          
          // Apply color spots randomly
          for (let spot of colorSpots) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.max(canvas.width, canvas.height) * spot.size;
            
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, spot.color);
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          
          // Final brightness/contrast adjustment
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 0.15;
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Reset alpha
          ctx.globalAlpha = 1;
          
          // Set the colorized image
          setOutputImage(canvas.toDataURL());
          
          toast({
            title: "Colorization Complete",
            description: "Your image has been colorized with enhanced colors!",
          });
        }
      };
      img.src = imageData;
    }, 1500);
  };

  const handleDownload = () => {
    if (!outputImage) return;
    
    const a = document.createElement("a");
    a.href = outputImage;
    a.download = "colorized-sar.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Image downloaded",
      description: "Your colorized image has been downloaded successfully",
    });
  };

  const handleRecolor = () => {
    navigate("/upload");
  };

  const handleFeedback = (rating: number) => {
    setFeedback(rating);
    toast({
      title: "Thank you for your feedback!",
      description: `You rated this colorization: ${rating}/5`,
    });
  };

  if (!inputImage || !outputImage) {
    return (
      <div className="max-w-4xl mx-auto p-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading results...</h2>
          <RefreshCw className="h-8 w-8 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 flex flex-col gap-10">
      <h2 className="text-3xl font-bold mb-4 text-center">Your Colorized Result</h2>
      <div className="flex flex-col md:flex-row md:justify-center items-center gap-8">
        <div>
          <h4 className="text-md mb-2 text-center font-semibold">Grayscale Input</h4>
          <div className="border rounded bg-black/80 w-64 h-64 flex items-center justify-center overflow-hidden">
            {inputImage && (
              <img 
                src={inputImage} 
                className="object-contain max-w-full max-h-full" 
                alt="Grayscale Input" 
              />
            )}
          </div>
        </div>
        <div>
          <h4 className="text-md mb-2 text-center font-semibold">Colorized Output</h4>
          <div className="border rounded bg-black/80 w-64 h-64 flex items-center justify-center overflow-hidden">
            {outputImage && (
              <img 
                src={outputImage} 
                className="object-contain max-w-full max-h-full" 
                alt="Colorized Output" 
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center">
        <Button onClick={handleDownload}>
          <Download className="mr-2" />Download Result
        </Button>
        <Button variant="outline" onClick={handleRecolor}>
          <RefreshCw className="mr-2" />Recolorize
        </Button>
      </div>
      <div className="mt-4 text-center">
        <h4 className="font-semibold mb-2">Rate the quality of the colorization:</h4>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`px-3 py-1 rounded-full ${feedback === n ? "bg-radar-highlight text-white" : "bg-gray-700 text-gray-200"}`}
              onClick={() => handleFeedback(n)}
            >
              {n}
            </button>
          ))}
        </div>
        {feedback && <div className="text-green-400 mt-2">Thank you for your feedback!</div>}
      </div>
    </div>
  );
}
