import React, { useState, useEffect, useCallback, KeyboardEvent } from "react"
import { CheckIcon, XCircle, ChevronDown, XIcon } from "lucide-react"
import { Badge } from "@/app/_components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/app/_components/ui/command"
import { cn } from "@/lib/utils"
import { Separator } from "@/app/_components/ui/separator"
import { Button } from "./button"

export interface MultiSelectFormFieldProps {
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
    image?: JSX.Element
  }[]
  defaultValue?: any[]
  onValueChange: (value: string[]) => void
  onInput?: (event: KeyboardEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder: string
  className?: string
}

const MultiSelectFormField = React.forwardRef<
  HTMLButtonElement,
  MultiSelectFormFieldProps
>(
  (
    {
      options,
      defaultValue,
      onValueChange,
      disabled,
      placeholder,
      className,
      onInput,
      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] = useState(
      new Set(defaultValue || []),
    )
    const [values, setValues] = useState(options)

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    useEffect(() => {
      setSelectedValues(new Set(defaultValue))
    }, [defaultValue])

    useEffect(() => {
      setValues(options)
    }, [options])

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true)
        // @ts-expect-error
      } else if (event.key === "Backspace" && !event.target.value) {
        const values = Array.from(selectedValues)
        values.pop()
        setSelectedValues(new Set(values))
        onValueChange(values)
      }

      if (onInput) onInput(event)
    }

    const toggleOption = useCallback(
      (value: string) => {
        const newSelectedValues = new Set(selectedValues)
        if (newSelectedValues.has(value)) {
          newSelectedValues.delete(value)
        } else {
          newSelectedValues.add(value)
        }
        setSelectedValues(newSelectedValues)
        onValueChange(Array.from(newSelectedValues))
      },
      [selectedValues, onValueChange],
    )

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className='flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit hover:bg-card'
          >
            {Array.from(selectedValues).length > 0 ? (
              <div className='flex w-full items-center justify-between'>
                <div className='flex flex-wrap items-center'>
                  {Array.from(selectedValues).map(value => {
                    const option = values.find(o => o.value === value)
                    return (
                      <Badge
                        key={value}
                        variant='outline'
                        className='m-1 bg-card'
                      >
                        {!option?.icon ? (
                          option?.image
                        ) : (
                          <option.icon className='mr-2 h-4 w-4' />
                        )}
                        {option?.label}
                        <XCircle
                          className='ml-2 h-4 w-4 cursor-pointer'
                          onClick={event => {
                            toggleOption(value)
                            event.stopPropagation()
                          }}
                        />
                      </Badge>
                    )
                  })}
                </div>
                <div className='flex items-center justify-between'>
                  <XIcon
                    className='mx-2 h-4 cursor-pointer text-muted-foreground'
                    onClick={event => {
                      setSelectedValues(new Set([]))
                      onValueChange(Array.from(new Set([])))
                      event.stopPropagation()
                    }}
                  />
                  <Separator
                    orientation='vertical'
                    className='flex h-full min-h-6'
                  />
                  <ChevronDown className='mx-2 h-4 cursor-pointer text-muted-foreground' />
                </div>
              </div>
            ) : (
              <div className='mx-auto flex w-full items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  {placeholder}
                </span>
                <ChevronDown className='mx-2 h-4 cursor-pointer text-muted-foreground' />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-[200px] p-0'
          align='start'
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          onInteractOutside={(event: any) => {
            if (!event.defaultPrevented) {
              setIsPopoverOpen(false)
            }
          }}
        >
          <Command>
            <CommandInput
              placeholder={placeholder}
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {values.map(option => {
                  const isSelected = selectedValues.has(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        toggleOption(option.value)
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <CheckIcon className={cn("h-4 w-4")} />
                      </div>
                      {!option.icon ? (
                        option.image
                      ) : (
                        <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setSelectedValues(new Set([]))
                        onValueChange(Array.from(new Set([])))
                      }}
                      className='justify-center text-center'
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
)

MultiSelectFormField.displayName = "MultiSelectFormField"

export default MultiSelectFormField
