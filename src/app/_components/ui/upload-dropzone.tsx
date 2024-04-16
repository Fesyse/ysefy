import { cn } from "@/lib/utils"
import { UploadDropzonePrimitive } from "@/utils/uploadthing"
import { UploadDropzonePrimitive as UploadDropzonePrimitiveType } from "@/utils/uploadthing"

export const UploadDropzone: typeof UploadDropzonePrimitiveType = ({
  className,
  ...props
}) => {
  return (
    // @ts-expect-error
    <UploadDropzonePrimitive
      className={cn(
        "ut-button:bg-primary ut-button:text-primary-foreground ut-button:shadow ut-button:hover:bg-primary/90 ut-button:inline-flex ut-button:items-center  ut-button:justify-center ut-button:whitespace-nowrap ut-button:rounded-md  ut-button:text-sm ut-button:font-medium ut-button:transition-colors  ut-button:focus-visible:outline-none ut-button:focus-visible:ring-1  ut-button:focus-visible:ring-ring ut-button:disabled:pointer-events-none  ut-button:disabled:opacity-50 ut-label:text-foreground",
        className,
      )}
      {...props}
    />
  )
}
