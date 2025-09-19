"use client"
import { useState } from "react"
import { Paperclip, Bot, Search, Palette, BookOpen, MoreHorizontal, Globe, ChevronRight } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

export default function ComposerActionsPopover({ children }) {
  const [open, setOpen] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const mainActions = [
    {
      icon: Paperclip,
      label: "Add photos & files",
      action: () => console.log("Add photos & files"),
    },
    {
      icon: Bot,
      label: "Agent mode",
      badge: "NEW",
      action: () => console.log("Agent mode"),
    },
    {
      icon: Search,
      label: "Deep research",
      action: () => console.log("Deep research"),
    },
    {
      icon: Palette,
      label: "Create image",
      action: () => console.log("Create image"),
    },
    {
      icon: BookOpen,
      label: "Study and learn",
      action: () => console.log("Study and learn"),
    },
  ]

  const moreActions = [
    {
      icon: Globe,
      label: "Web search",
      action: () => console.log("Web search"),
    },
    {
      icon: Palette,
      label: "Canvas",
      action: () => console.log("Canvas"),
    },
    {
      icon: () => (
        <div className="h-4 w-4 rounded bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
          <div className="h-2 w-2 bg-white rounded-full" />
        </div>
      ),
      label: "Connect Google Drive",
      action: () => console.log("Connect Google Drive"),
    },
    {
      icon: () => (
        <div className="h-4 w-4 rounded bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
          <div className="h-2 w-2 bg-white rounded-full" />
        </div>
      ),
      label: "Connect OneDrive",
      action: () => console.log("Connect OneDrive"),
    },
    {
      icon: () => (
        <div className="h-4 w-4 rounded bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center">
          <div className="h-2 w-2 bg-white rounded-full" />
        </div>
      ),
      label: "Connect Sharepoint",
      action: () => console.log("Connect Sharepoint"),
    },
  ]

  const handleAction = (action) => {
    action()
    setOpen(false)
    setShowMore(false)
  }

  const handleMoreClick = () => {
    setShowMore(true)
  }

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen)
    if (!newOpen) {
      setShowMore(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start" side="top">
        {!showMore ? (
          // Main actions view
          <div className="p-4">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {mainActions.map((action, index) => {
                const IconComponent = action.icon
                return (
                  <button
                    key={index}
                    onClick={() => handleAction(action.action)}
                    className="relative flex flex-col items-center gap-2 p-4 text-sm text-center hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 transition-colors"
                  >
                    <IconComponent className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                    <span className="text-xs text-zinc-700 dark:text-zinc-200 leading-tight">
                      {action.label}
                    </span>
                    {action.badge && (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-full font-medium">
                        {action.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            
            <button
              onClick={handleMoreClick}
              className="flex items-center justify-center gap-2 w-full p-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span>More options</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          // More options view
          <div className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">
                All Actions
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {mainActions.map((action, index) => {
                  const IconComponent = action.icon
                  return (
                    <button
                      key={index}
                      onClick={() => handleAction(action.action)}
                      className="relative flex flex-col items-center gap-2 p-3 text-sm text-center hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 transition-colors"
                    >
                      <IconComponent className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                      <span className="text-xs text-zinc-700 dark:text-zinc-200 leading-tight">
                        {action.label}
                      </span>
                      {action.badge && (
                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-full font-medium">
                          {action.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">
                Integrations
              </h3>
              <div className="space-y-1">
                {moreActions.map((action, index) => {
                  const IconComponent = action.icon
                  return (
                    <button
                      key={index}
                      onClick={() => handleAction(action.action)}
                      className="flex items-center gap-3 w-full p-3 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      {typeof IconComponent === "function" ? <IconComponent /> : <IconComponent className="h-4 w-4" />}
                      <span className="text-zinc-700 dark:text-zinc-200">{action.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setShowMore(false)}
                className="flex items-center justify-center gap-2 w-full p-2 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                Show less
              </button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}