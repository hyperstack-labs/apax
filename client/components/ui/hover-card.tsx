'use client'

import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

function HoverCardSkeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div 
      className={cn("flex justify-between space-x-4", className)} 
      {...props}
    >
      {/* Avatar Placeholder */}
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
      
      <div className="space-y-2 flex-1">
        {/* Title / Username */}
        <Skeleton className="h-4 w-3/4" />
        
        {/* Bio / Details */} 
        <div className="space-y-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>

        {/* Optional: Meta row (e.g., 'Joined Dec 2023') */}
        <div className="flex items-center pt-2">
          <Skeleton className="h-3 w-3 rounded-full mr-2" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardSkeleton}
