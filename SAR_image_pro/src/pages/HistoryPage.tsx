
import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function HistoryPage() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    // This is just a placeholder -- in real app, history should be fetched from backend/user's space
    const last = localStorage.getItem("lastUpload");
    setHistory(last ? [last] : []);
  }, []);

  const handleDownload = (img: string) => {
    const a = document.createElement("a");
    a.href = img;
    a.download = "sar-result.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {history.length === 0 && (
          <div className="text-muted-foreground col-span-3 text-center">No history yet.</div>
        )}
        {history.map((img, idx) => (
          <div key={idx} className="p-2 border rounded flex flex-col items-center bg-black/60">
            <img src={img} className="w-full max-w-xs h-52 object-contain mb-2 rounded" alt="History" />
            <button className="inline-flex items-center gap-1 text-sm bg-radar-highlight hover:bg-radar-blue text-white px-3 py-1 rounded" onClick={() => handleDownload(img)}>
              <Download className="h-4 w-4" /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
