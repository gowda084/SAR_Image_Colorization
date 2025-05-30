
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AboutContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-5">
      <h2 className="text-3xl font-bold mb-6 text-center">About SAR Colorizer</h2>
      <section className="mb-10">
        <h4 className="font-semibold mb-3">What is SAR Imaging?</h4>
        <p className="text-gray-200">
          Synthetic Aperture Radar (SAR) is an advanced imaging technique providing detailed images regardless of lighting or weather.
        </p>
        <h4 className="font-semibold mt-6 mb-3">Our AI Model</h4>
        <p className="text-gray-200">
          This tool leverages deep learning, using CNNs and GANs, for high-resolution SAR colorization. Models are trained on curated datasets for best results.
        </p>
      </section>
      <section>
        <h4 className="font-semibold mb-3">Contact & Feedback</h4>
        <form onSubmit={handleSubmit} className="space-y-4 bg-black/50 p-6 rounded-md">
          <input className="w-full p-2 rounded text-black" type="text" name="name" placeholder="Your Name" required value={form.name} onChange={handleChange} />
          <input className="w-full p-2 rounded text-black" type="email" name="email" placeholder="Your Email" required value={form.email} onChange={handleChange} />
          <textarea className="w-full p-2 rounded text-black" rows={4} name="message" placeholder="Your Message" required value={form.message} onChange={handleChange} />
          <Button type="submit" className="w-full">Send</Button>
        </form>
        {sent && <div className="mt-2 text-green-400 text-center">Thank you! Message sent.</div>}
      </section>
    </div>
  );
}
