import React from "react";
import { cn } from "@/lib/utils";

interface BullionCardProps {
  type: "gold" | "silver" | "platinum";
  weight: string;
  purity: string;
  price: string;
  className?: string;
}

const BullionCard: React.FC<BullionCardProps> = ({ 
  type, 
  weight, 
  purity, 
  price, 
  className 
}) => {
  
  // REFINED METAL GRADIENTS
  const metalStyles = {
    gold: {
      face: "linear-gradient(135deg, #B38728 0%, #FBF5B7 25%, #BF953F 50%, #FBF5B7 75%, #AA771C 100%)",
      border: "border-[#C69C48]",
      text: "text-[#7A5C18]",
      shadow: "shadow-[#5E430C]/50",
      glow: "from-[#FFED8A]/50"
    },
    silver: {
      face: "linear-gradient(135deg, #8E8E8E 0%, #FFFFFF 25%, #A8A8A8 50%, #FFFFFF 75%, #777777 100%)",
      border: "border-[#B0B0B0]",
      text: "text-[#555555]",
      shadow: "shadow-[#444444]/50",
      glow: "from-white/50"
    },
    platinum: {
      face: "linear-gradient(135deg, #6B7687 0%, #E6EDF5 25%, #8593A8 50%, #E6EDF5 75%, #5C687A 100%)",
      border: "border-[#7D8A9E]",
      text: "text-[#3D4859]",
      shadow: "shadow-[#2D3642]/50",
      glow: "from-[#CDD9E8]/50"
    },
  };

  const theme = metalStyles[type];

  return (
    <div
      className={cn(
        "group relative w-full h-[340px]",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {/* MAIN CARD SLAB */}
      <div 
        className={cn(
          "relative h-full w-full rounded-xl border transition-all duration-500 ease-out",
          "transform-gpu group-hover:-translate-y-3 shadow-xl group-hover:shadow-2xl overflow-hidden",
          theme.border,
          theme.shadow
        )}
        style={{
          background: theme.face,
          boxShadow: "0px 10px 20px -5px rgba(0,0,0,0.4)"
        }}
      >
        {/* Layer A: Glass Reflection (Static) */}
        <div className="absolute inset-0 z-20 rounded-xl bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-80 mix-blend-soft-light pointer-events-none" />
        
        {/* Layer B: Moving Sheen (Holographic effect on hover) */}
        <div 
          className={cn(
            "absolute inset-0 z-20 -translate-x-[150%] skew-x-[-25deg] transition-transform duration-1000 ease-in-out",
            "group-hover:translate-x-[150%] mix-blend-overlay bg-gradient-to-r via-white/30 to-transparent",
            theme.glow
          )}
        />

        {/* Layer C: Sharp Edge Highlights */}
        <div className="absolute inset-0 z-20 border-t border-l border-white/50 rounded-xl mix-blend-overlay pointer-events-none" />

        {/* INNER FACE (Minted Area) */}
        <div className="absolute inset-4 z-10 rounded-lg border border-white/10 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),_inset_-1px_-1px_2px_rgba(255,255,255,0.4)] flex flex-col items-center justify-between p-6">
            
          {/* Purity Mark */}
          <div className={cn("text-xs font-black tracking-[0.2em] uppercase flex flex-col items-center gap-1", theme.text)}>
            <span className="opacity-70 text-[10px]">Fine {type}</span>
            <span 
              className="text-lg drop-shadow-sm" 
              style={{ textShadow: "0px 1px 1px rgba(255,255,255,0.6)" }}
            >
              {purity}
            </span>
          </div>

          {/* Weight (Deep Engraving Effect) */}
          <div className="flex flex-col items-center">
            <div className={cn("w-12 h-12 rounded-full border-2 mb-4 opacity-40 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]", theme.border)} />
            
            <h3 
              className={cn("text-5xl font-serif font-bold italic tracking-tighter", theme.text)}
              style={{
                textShadow: "1px 1px 0px rgba(255,255,255,0.5), -1px -1px 2px rgba(0,0,0,0.6)"
              }}
            >
              {weight}
            </h3>
          </div>

          {/* Price Tag */}
          <div className="w-full pt-4 border-t border-black/10 flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-black/50 tracking-wider">
                Spot Price
              </span>
              <span className={cn("text-xl font-mono font-bold drop-shadow-sm", theme.text)}>
                {price}
              </span>
            </div>
            <div className={cn("h-6 w-6 rounded-full border flex items-center justify-center opacity-60", theme.border)}>
              <div className="h-1 w-1 bg-current rounded-full" />
            </div>
          </div>

        </div>

        {/* THICKNESS (Side Edge) */}
        <div className="absolute -bottom-1 left-1 right-1 h-2 rounded-b-lg bg-black/30 blur-md transition-all duration-300 group-hover:h-4 group-hover:blur-xl group-hover:opacity-70" />
        
      </div>
    </div>
  );
};

export default BullionCard;