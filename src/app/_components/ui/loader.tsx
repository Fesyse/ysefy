import { LoaderIcon } from "lucide-react"
import type { FC } from "react"

import { cn } from "@/lib/utils"

export const Loader: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("relative h-full w-full animate-spin", className)}>
      <LoaderIcon className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ' />
    </div>
  )
}
