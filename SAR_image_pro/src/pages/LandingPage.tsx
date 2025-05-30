
import { Link } from "react-router-dom";
import { Palette } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-radar-purple via-radar-blue to-radar-dark">
      <div className="text-center max-w-2xl px-6 py-16 rounded-lg bg-black/60 shadow-lg space-y-8">
        <div className="flex justify-center">
          <Palette className="h-12 w-12 text-radar-highlight" />
        </div>
        <h1 className="text-4xl font-extrabold text-white">
          AI-Powered SAR Image Colorization
        </h1>
        <p className="text-xl text-gray-200">
          Convert grayscale Synthetic Aperture Radar (SAR) images into realistic, color-enhanced versions using deep learning (CNN, GAN).
        </p>
        <Link
          to="/upload"
          className="inline-block px-8 py-3 rounded-full bg-radar-highlight text-xl font-semibold shadow hover:bg-radar-blue transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
