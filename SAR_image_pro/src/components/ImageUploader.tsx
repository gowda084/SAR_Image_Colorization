
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Image as ImageIcon, RefreshCw } from "lucide-react";

interface ImageUploaderProps {
  onImageUploaded: (image: string) => void;
}

export function ImageUploader({ onImageUploaded }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    setIsLoading(true);
    setProgress(0);
    
    const reader = new FileReader();
    
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percentLoaded = Math.round((e.loaded / e.total) * 100);
        setProgress(percentLoaded);
      }
    };
    
    reader.onload = (e) => {
      setTimeout(() => {
        setIsLoading(false);
        if (e.target && typeof e.target.result === 'string') {
          onImageUploaded(e.target.result);
        }
      }, 1000); // Simulating some processing time
    };
    
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card
      className={`p-6 w-full max-w-md mx-auto ${
        isDragging ? "border-radar-highlight border-2" : "border-border"
      } transition-colors`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-radar-blue flex items-center justify-center">
          {isLoading ? (
            <RefreshCw className="h-10 w-10 text-white animate-spin" />
          ) : (
            <Upload className="h-10 w-10 text-white" />
          )}
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium">Upload SAR Image</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Drag & drop your grayscale SAR image here or click to browse
          </p>
        </div>
        
        {isLoading && (
          <div className="w-full">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-center mt-1">Uploading: {progress}%</p>
          </div>
        )}
        
        {!isLoading && (
          <Button onClick={triggerFileInput} className="bg-radar-purple hover:bg-radar-blue">
            <ImageIcon className="mr-2 h-4 w-4" /> Select Image
          </Button>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />
      </div>
    </Card>
  );
}
