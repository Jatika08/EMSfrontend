import { useToast } from "../contexts/CustomToast";
import { useEffect, useRef } from "react";

export const About = () => {
  const showToast = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gradients = [
    ["#003a60ff", "#4783b3ff", "#dee3e0ff"],
    ["#012b4eff", "#0a4f7aff", "#bbced3ff"],
    ["#012646ff", "#487da8ff", "#b8b8b4ff"],
    ["#011e37ff", "#32628aff", "#a6a9a6ff"],
    ["#011731ff", "#1a3b5fff", "#8d8b88ff"],
    ["#021935ff", "#2f446cff", "#8a8594ff"],
    ["#01030bff", "#0b142eff", "#40394eff"],
    ["#000105ff", "#050a1dff", "#18192bff"],
    ["#010005ff", "#010102ff", "#06050bff"],
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);
      const stars = Array.from({ length: 120 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1 + 0.3,
        opacity: Math.random() * 0.8 + 0.2,
      }));

      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#010005] to-[#06050b] px-4 py-12 text-stone-200 relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-100"
        style={{ pointerEvents: "none" }}
      />

      <div className="w-full max-w-4xl relative border border-stone-700/30 rounded-xl bg-gradient-to-br from-stone-800/60 to-stone-900/60 shadow-[inset_0_0_24px_rgba(0,0,0,0.4)] backdrop-blur-lg px-6 md:px-16 py-20 overflow-hidden z-10">
        {/* Gradient Columns */}
        <div
          className="absolute inset-0 flex justify-center gap-0 opacity-100 pointer-events-none z-0"
          
        >
          {gradients.map(([from, via, to], i) => (
            <div
              key={i}
              className="w-full h-full"
              style={{
                background: `linear-gradient(to bottom, ${from}, ${via}, ${to})`,
              }}
            />
          ))}
        </div>

        {/* Text Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6" onClick={() => showToast("You have applied for leave on date 2023-10-01.")}>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-100 drop-shadow-xl">
            Beneath the Evening Sky
          </h1>
          <p className="text-lg sm:text-xl text-stone-300 font-light leading-relaxed">
            This space is a quiet reflection—where code meets calm.
            <br />
            Inspired by twilight gradients, it's a digital pause between dusk
            and dawn.
          </p>
        </div>
      </div>
    </div>
  );
};
