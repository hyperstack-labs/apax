'use client'

import React, { useEffect, useState, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuditLog } from '@/lib/store'


const ScanningBeam = () => (
  <div className="w-full h-37.5 relative">
    <div className="absolute inset-x-0 bottom-0 h-full bg-linear-to-t from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent" />
    
    <div className="absolute bottom-0 w-full h-0.5 bg-[#D4AF37] shadow-[0_0_20px_2px_#D4AF37]">
      <div className="absolute inset-0 bg-white/40 blur-[0.5px]" />
      <div className="absolute left-1/2 -translate-x-1/2 w-[120%] h-px bg-[#D4AF37] opacity-20 blur-[3px]" />
    </div>

    <div className="absolute top-full inset-x-0 h-10 bg-linear-to-b from-[#D4AF37]/15 to-transparent blur-md" />
  </div>
)

const AuditLogCard = memo(({ 
  log, 
  index, 
  isLast, 
  totalLogs,
  beamDuration 
}: { 
  log: AuditLog; 
  index: number; 
  isLast: boolean;
  totalLogs: number;
  beamDuration: number;
}) => {
  const revealDelay = (index / totalLogs) * beamDuration;

  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: revealDelay, 
        ease: "easeOut" 
      }}
      className="flex items-start gap-4 p-4 rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] hover:border-[#D4AF37]/20 transition-colors"
    >
      <div className="relative">
        <div className="h-3 w-3 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
        {!isLast && (
          <div className="absolute top-4 left-1/2 w-px h-10 -translate-x-1/2 bg-[#2A2A2A]" />
        )}
      </div>
      <div className="flex-1 min-w-0 font-vault">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm text-[#E8E8E8] tracking-wide font-bold uppercase">
            [{log.event}]
          </h4>
          <span className="text-[10px] text-[#666666] font-mono tabular-nums">
            T+{(index * 0.8).toFixed(1)}s
          </span>
        </div>
        <p className="text-xs text-[#888888] mb-2 tracking-tight leading-relaxed">
          {log.details}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#444444] font-bold">TX_SIG</span>
          <code className="text-xs text-[#D4AF37] bg-[#1A1A1A] px-1.5 py-0.5 rounded-sm border border-[#2A2A2A] font-mono truncate">
            {log.txHash}
          </code>
        </div>
      </div>
    </motion.div>
  )
})

AuditLogCard.displayName = 'AuditLogCard'

export function LiveSecurityTerminal({ logs }: { logs: AuditLog[] }) {
  const [isBeamVisible, setIsBeamVisible] = useState(false)
  const [beamKey, setBeamKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const BEAM_DURATION = 5.0 

  useEffect(() => {
    if (logs.length > 0) {
      setIsBeamVisible(true)
      setBeamKey(prev => prev + 1)
    }
  }, [logs.length])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-auto overflow-hidden bg-transparent"
    >
      <AnimatePresence>
        {isBeamVisible && (
          <motion.div
            key={`beam-wrapper-${beamKey}`}
            initial={{ y: "-10%" }}
            animate={{ y: "100%" }}
            transition={{ duration: BEAM_DURATION, ease: "linear" }}
            onAnimationComplete={() => setIsBeamVisible(false)}
            className="absolute inset-x-0 z-30 pointer-events-none"
            style={{ height: '100%', willChange: 'transform' }}
          >
             <div className="sticky top-0 w-full">
               <ScanningBeam />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="space-y-3 relative z-10 pb-10">
        {logs.map((log, i) => (
          <AuditLogCard 
            key={`${log.id}-${i}`} 
            log={log} 
            index={i} 
            isLast={i === logs.length - 1}
            totalLogs={logs.length}
            beamDuration={BEAM_DURATION}
          />
        ))}
      </div>
    </div>
  )
}