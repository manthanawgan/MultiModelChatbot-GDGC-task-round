"use client"
import { useState } from "react"

export function Popover({ children, open, onOpenChange }) {
  return <div className="relative">{children}</div>
}

export function PopoverTrigger({ children, asChild, ...props }) {
  return <div {...props}>{children}</div>
}

export function PopoverContent({ children, className = "", ...props }) {
  return (
    <div 
      className={`absolute z-50 bg-white border rounded-lg shadow-lg p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}