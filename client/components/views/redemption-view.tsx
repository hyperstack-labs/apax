'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Flame, Package, Truck, Clock, Info, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAPAXStore, formatCurrency } from '@/lib/store'
import { Skeleton } from '@/components/ui/skeleton'

const bullionOptions = [
  {
    id: 'gold-1g',
    metal: 'Gold',
    weight: '1g',
    weightGrams: 1,
    image: '/images/image.png',
    color: '#D4AF37',
    tokensRequired: 1
  },
  {
    id: 'gold-10g',
    metal: 'Gold',
    weight: '10g',
    weightGrams: 10,
    image: '/images/image.png',
    color: '#D4AF37',
    tokensRequired: 10
  },
  {
    id: 'gold-100g',
    metal: 'Gold',
    weight: '100g',
    weightGrams: 100,
    image: '/images/image.png',
    color: '#D4AF37',
    tokensRequired: 100
  },
  {
    id: 'silver-100g',
    metal: 'Silver',
    weight: '100g',
    weightGrams: 100,
    image: '/images/image.png',
    color: '#C0C0C0',
    tokensRequired: 100
  },
  {
    id: 'silver-1kg',
    metal: 'Silver',
    weight: '1kg',
    weightGrams: 1000,
    image: '/images/image.png',
    color: '#C0C0C0',
    tokensRequired: 1000
  },
  {
    id: 'platinum-50g',
    metal: 'Platinum',
    weight: '50g',
    weightGrams: 50,
    image: '/images/image.png',
    color: '#E5E4E2',
    tokensRequired: 50
  }
]

// For simultion of Loading. Will remove it once data fetching is implemented


export function RedemptionView() {
  const { userHoldings, metalPrices } = useAPAXStore()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)


  const [ isLoading, setIsLoading ] = useState(true)

useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return() => clearTimeout(timer)
  }, [])

  const calculatePrice = (metal: string, grams: number) => {
    const pricePerGram = metal === 'Gold' 
      ? metalPrices.gold / 31.1035
      : metal === 'Silver'
      ? metalPrices.silver / 31.1035
      : metalPrices.platinum / 31.1035
    return pricePerGram * grams
  }

  const canAfford = (metal: string, grams: number) => {
    if (metal === 'Gold') return userHoldings.goldGrams >= grams
    if (metal === 'Silver') return userHoldings.silverGrams >= grams
    return userHoldings.platinumGrams >= grams
  }

  if(isLoading) {
    return <RedemptionViewSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#E8E8E8]">
            Physical Redemption Portal
          </h1>
          <p className="text-sm text-[#888888] mt-1">
            Convert your tokens into physical bullion delivered to your door
          </p>
        </div>
        <Badge 
          variant="outline" 
          className="border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] gold-shimmer"
        >
          <Clock className="h-3 w-3 mr-1" />
          Coming Soon
        </Badge>
      </div>

      {/* Coming Soon Banner */}
      <Card className="border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 to-transparent">
        <CardContent className="py-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-[#D4AF37]/20 gold-glow">
              <Flame className="h-8 w-8 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#E8E8E8] mb-1">
                Burn-to-Ship Technology
              </h3>
              <p className="text-sm text-[#888888]">
                Soon you&apos;ll be able to &ldquo;burn&rdquo; your APX tokens and receive physical precious metal 
                bullion shipped directly to your address. Fully insured, tracked, and verified.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="glass border-[#2A2A2A] bg-[#111111]">
        <CardHeader>
          <CardTitle className="text-[#E8E8E8]">How Physical Redemption Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                <span className="text-[#D4AF37] font-bold">1</span>
              </div>
              <h4 className="text-sm font-medium text-[#E8E8E8] mb-1">Select Bullion</h4>
              <p className="text-xs text-[#888888]">Choose your desired metal type and weight</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                <span className="text-[#D4AF37] font-bold">2</span>
              </div>
              <h4 className="text-sm font-medium text-[#E8E8E8] mb-1">Burn Tokens</h4>
              <p className="text-xs text-[#888888]">Your APX tokens are burned on SidraChain</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                <span className="text-[#D4AF37] font-bold">3</span>
              </div>
              <h4 className="text-sm font-medium text-[#E8E8E8] mb-1">Verification</h4>
              <p className="text-xs text-[#888888]">Identity and address verification process</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                <span className="text-[#D4AF37] font-bold">4</span>
              </div>
              <h4 className="text-sm font-medium text-[#E8E8E8] mb-1">Delivery</h4>
              <p className="text-xs text-[#888888]">Insured shipping to your doorstep</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bullion Selection Grid */}
      <div>
        <h2 className="text-lg font-semibold text-[#E8E8E8] mb-4">Available Bullion Options</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bullionOptions.map((option) => {
            const price = calculatePrice(option.metal, option.weightGrams)
            const affordable = canAfford(option.metal, option.weightGrams)
            
            return (
              <Card
                key={option.id}
                className={`relative glass border-[#2A2A2A] bg-[#111111] transition-all duration-300 cursor-pointer hover:border-[#D4AF37]/30 ${
                  selectedOption === option.id ? 'border-[#D4AF37] gold-glow' : ''
                } ${!affordable ? 'opacity-50' : ''}`}
                onClick={() => setSelectedOption(option.id)}
              >
                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
                  <Badge className="bg-[#D4AF37] text-[#0A0A0A] px-4 py-2 gold-shimmer">
                    Coming Soon
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
                      <div 
                        className="h-12 w-16 rounded"
                        style={{ 
                          background: `linear-gradient(135deg, ${option.color} 0%, ${option.color}80 100%)` 
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-[#E8E8E8]">{option.metal}</h3>
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                          style={{ 
                            borderColor: `${option.color}40`,
                            color: option.color 
                          }}
                        >
                          {option.weight}
                        </Badge>
                      </div>
                      <p className="text-lg font-bold" style={{ color: option.color }}>
                        {formatCurrency(price)}
                      </p>
                      <p className="text-xs text-[#888888] mt-1">
                        Requires {option.tokensRequired} APX-{option.metal} tokens
                      </p>
                    </div>
                  </div>

                  {!affordable && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-red-500">
                      <AlertTriangle className="h-3 w-3" />
                      Insufficient balance
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass border-[#2A2A2A] bg-[#111111]">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-[#D4AF37] mt-0.5" />
              <div>
                <h4 className="font-medium text-[#E8E8E8] mb-1">Secure Packaging</h4>
                <p className="text-sm text-[#888888]">
                  All bullion is shipped in tamper-evident, insured packaging with 
                  real-time tracking throughout delivery.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-[#2A2A2A] bg-[#111111]">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-[#D4AF37] mt-0.5" />
              <div>
                <h4 className="font-medium text-[#E8E8E8] mb-1">Global Delivery</h4>
                <p className="text-sm text-[#888888]">
                  We ship to 100+ countries worldwide. Delivery times vary from 
                  5-15 business days depending on location.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Redemption Fee Notice */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-sm text-[#E8E8E8]">
                <span className="font-medium">Redemption Fee:</span>{' '}
                A 1% fee applies to all physical redemption requests to cover 
                minting, verification, and insured shipping costs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


function RedemptionViewSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 bg-[#1A1A1A]" />
          <Skeleton className="h-4 w-96 bg-[#1A1A1A]" />
        </div>
        <Skeleton className="h-6 w-32 rounded-full bg-[#1A1A1A]" />
      </div>
      {/* Coming Soon Banner Skeleton */}
      <Card className="border-[#D4AF37]/30 bg-[#1A1A1A]/50">
        <CardContent className="py-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-full bg-[#1A1A1A]" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-48 bg-[#1A1A1A]" />
              <Skeleton className="h-4 w-full max-w-2xl bg-[#1A1A1A]" />
            </div>
          </div>
        </CardContent>
      </Card>
      {/*  "How It Works" Skeleton */}
      <Card className="bg-[#111111] border-[#2A2A2A]">
        <CardHeader>
          <Skeleton className="h-6 w-64 bg-[#1A1A1A]" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            {/* Generate 4 Step Placeholders */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3">
                <Skeleton className="h-12 w-12 rounded-full bg-[#1A1A1A]" />
                <Skeleton className="h-4 w-24 bg-[#1A1A1A]" />
                <Skeleton className="h-3 w-32 bg-[#1A1A1A]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      
      {/* Bullion Selection Grid Skeleton */}
      <div>
        <Skeleton className="h-6 w-56 mb-4 bg-[#1A1A1A]" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-[#111111] border-[#2A2A2A]">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-20 w-20 rounded-lg bg-[#1A1A1A] shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Skeleton className="h-4 w-16 bg-[#1A1A1A]" />
                      <Skeleton className="h-4 w-12 rounded-full bg-[#1A1A1A]" />
                    </div>
                    <Skeleton className="h-7 w-24 bg-[#1A1A1A]" />
                    <Skeleton className="h-3 w-32 bg-[#1A1A1A]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="bg-[#111111] border-[#2A2A2A]">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Skeleton className="h-5 w-5 bg-[#1A1A1A]" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-40 bg-[#1A1A1A]" />
                  <Skeleton className="h-12 w-full bg-[#1A1A1A]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
       {/* Fee Notice Skeleton */}
      <Card className="border-[#2A2A2A] bg-[#1A1A1A]/30">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 bg-[#1A1A1A]" />
            <Skeleton className="h-4 w-full max-w-lg bg-[#1A1A1A]" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}