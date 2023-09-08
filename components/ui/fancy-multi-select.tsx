"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Color } from "@prisma/client";



interface FancyMultiSelectProps {
  colors: Color[] | null
  value: string[]
  onChange: (value: string[]) => void;
  onRemove: (value: string[]) => void;
  isLoading: boolean
}

export function FancyMultiSelect({ colors, onChange, onRemove, value, isLoading }: FancyMultiSelectProps) {

  const selectedColors = colors!.filter(color => value.includes(color.name));

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(selectedColors);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((color: any) => {
    setSelected(prev => {
      const newSelected = prev.filter(s => s.id !== color.id)
      onRemove(newSelected.map(s => s.name))
      return prev.filter(s => s.id !== color.id)

    });
  }, [onRemove]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected(prev => {
            const newSelected = [...prev];
            newSelected.pop();
            onRemove(newSelected.map((s) => s.name))
            return newSelected;
          })
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, [onRemove]);

  const selectables = colors!.filter(color => !selected.includes(color));

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent relative z-20 max-h-16">
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 "
      >
        <div className="flex gap-1 flex-wrap ">
          {selected.map((color) => {
            return (
              <Badge key={color.id} variant="secondary">
                {color.name}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(color);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(color)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            disabled={isLoading}
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Renk seçiniz..."
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ?
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((color) => {
                return (
                  <CommandItem
                    key={color.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue("")
                      setSelected(prev => {
                        const newSelected = [...prev, color]
                        onChange(newSelected.map(s => s.name))
                        return [...prev, color]
                      })
                    }}
                    className={"cursor-pointer"}
                  >
                    {color.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
          : null}
      </div>
    </Command >
  )
}