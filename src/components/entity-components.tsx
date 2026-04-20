"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { AlertCircle, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"

// Entity Header
interface EntityHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

export function EntityHeader({ title, description, actions }: EntityHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

// Entity Container
interface EntityContainerProps {
  children: React.ReactNode
  className?: string
}

export function EntityContainer({ children, className }: EntityContainerProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  )
}

// Entity Search
interface EntitySearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function EntitySearch({ value, onChange, placeholder = "Search..." }: EntitySearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="pl-9"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

// Entity Pagination
interface EntityPaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function EntityPagination({ page, totalPages, onPageChange }: EntityPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, page - 1))}
            aria-disabled={page <= 1}
            className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="px-4 text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            aria-disabled={page >= totalPages}
            className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

// Entity Loading
interface EntityLoadingProps {
  count?: number
}

export function EntityLoading({ count = 5 }: EntityLoadingProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-lg" />
      ))}
    </div>
  )
}

// Entity Error
interface EntityErrorProps {
  message?: string
  onRetry?: () => void
}

export function EntityError({ message = "Something went wrong", onRetry }: EntityErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <AlertCircle className="h-8 w-8 text-destructive" />
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}

// Entity Empty
interface EntityEmptyProps {
  title?: string
  description?: string
  action?: React.ReactNode
}

export function EntityEmpty({
  title = "Nothing here yet",
  description,
  action,
}: EntityEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <p className="text-lg font-medium">{title}</p>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {action}
    </div>
  )
}

// Entity List
interface EntityListProps {
  children: React.ReactNode
  className?: string
}

export function EntityList({ children, className }: EntityListProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  )
}

// Entity Item
interface EntityItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function EntityItem({ children, className, onClick }: EntityItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors",
        onClick && "cursor-pointer hover:bg-accent",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
