
import { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { RefreshCw, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleColorize = () => {
    if (!uploadedImage) return;
    setIsProcessing(true);

    // Simulate API call delay, then navigate to results
    setTimeout(() => {
      setIsProcessing(false);
      localStorage.setItem("lastUpload", uploadedImage); // For demo history/results
      navigate("/results");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold mb-6">Upload & Colorize SAR Image</h2>
      <ImageUploader onImageUploaded={setUploadedImage} />
      {uploadedImage && (
        <div className="mt-8 w-full max-w-lg flex flex-col items-center space-y-4">
          <div className="w-64 h-64 border rounded bg-black/70 flex items-center justify-center">
            <img src={uploadedImage} alt="SAR Upload" className="object-contain max-h-full max-w-full" />
          </div>
          <Button
            className="w-full"
            disabled={isProcessing}
            onClick={handleColorize}
          >
            {isProcessing ? (
              <>
                <RefreshCw className="mr-2 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <Wand2 className="mr-2" /> Colorize
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
