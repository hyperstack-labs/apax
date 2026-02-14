"use client";

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PortfolioOverview } from '@/components/portfolio-overview'
import { AssetAllocationChart } from '@/components/asset-allocation-chart'
import { ShariaCertificationHub } from '@/components/sharia-certification-hub'
import { MetalPriceHistoryChart } from '@/components/charts/metal-price-history'
import BullionCard, { BullionCardSkeleton } from '@/components/ui/bullion-card'
import { HoverCard, HoverCardContent, HoverCardTrigger, HoverCardSkeleton} from "@/components/ui/hover-card"

export function DashboardView() {
  const showroomItems = [
    { type: "gold" as const, weight: "100 g", purity: "999.9", price: "$7,450.00" },
    { type: "silver" as const, weight: "100 oz", purity: "999.0", price: "$2,450.00" },
    { type: "platinum" as const, weight: "500 g", purity: "999.5", price: "$14,800.00" },
    { type: "gold" as const, weight: "100 g", purity: "999.9", price: "$7,450.00" },
  ];
  
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* Live Ledger Ticker */}
      <div className="group w-full bg-[#1A1A1A]/50 border-y border-[#2A2A2A] overflow-hidden py-1.5 relative">
        <div className="flex animate-ticker whitespace-nowrap gap-12 items-center group-hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-terminal-sm">
                  Network Connectivity: 100%
                </span>
              </div>

              <span className="text-terminal-sm">Latest Block: #8,421,093</span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <span className="text-terminal-sm text-[#D4AF37] cursor-help underline decoration-dotted underline-offset-4 decoration-[#D4AF37]/30 hover:text-[#FFD700] transition-colors">
                    
                Vault A1-X: Re-verified by Lead Auditor
                  
              </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 border-[#D4AF37]/30 bg-[#1A1A1A] text-left whitespace-normal">
                   <div className="space-y-2">
                     <h4 className="text-sm font-semibold text-[#D4AF37] font-serif">Audit Certificate #8921</h4>
                     <p className="text-xs text-muted-foreground leading-relaxed">
                       Verified by <strong>Deloitte</strong> on Oct 14, 2024.
                       Gold purity confirmed via ultrasonic testing (ASTM E114).
                     </p>
                     <div className="flex items-center pt-2 border-t border-white/5 mt-2">
                       <div className="text-[10px] uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                         <span className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                         </span>
                         Verification Passed
                       </div>
                     </div>
                   </div>
                </HoverCardContent>
              </HoverCard>
             

              <span className="text-terminal-sm">Last Synced: 2s ago</span>
            </div>
          ))}
        </div>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-[#E8E8E8]">
            Welcome back, John!
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-lg gold-glow">
            <Image
              src="/apax-logo.png"
              alt="APAX Emblem"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Metal price history chart */}
      <MetalPriceHistoryChart />
      
      {/* Portfolio Overview Stats */}
      <PortfolioOverview />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 items-start">
        {/* Asset Allocation Charts */}
        <AssetAllocationChart />

        {/* Sharia Certification Hub */}
        <ShariaCertificationHub />
      </div>

      {/* Bullion Showroom & Testing Area */}
      <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between px-4 sm:px-0">
           <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#E8E8E8]">
              Bullion Showroom
            </h2>
            {/* Toggle Button for Skeleton Test */}
            <button 
              onClick={() => setIsLoading(!isLoading)}
              className="text-[10px] border border-white/20 px-2 py-1 rounded hover:bg-white/10 text-muted-foreground transition-colors"
            >
              {isLoading ? "Status: Loading (Skeleton Active)" : "Status: Loaded (Data Active)"}
            </button>
           </div>

           <button className="text-xs text-[#D4AF37] hover:underline uppercase tracking-widest font-bold transition-colors hover:text-[#FCE798]">
             View Vault Inventory →
           </button>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <BullionCardSkeleton key={idx} />
            ))
          ) : (
            showroomItems.map((item, idx) => (
              <BullionCard 
                key={idx}
                type={item.type}
                weight={item.weight}
                purity={item.purity}
                price={item.price}
                className="w-full"
              />
            ))
          )}
        </div>
      </div>
      
    </div>
  );
}