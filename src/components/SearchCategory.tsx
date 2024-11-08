"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronsUpDown } from "lucide-react"
import productsData from '@/data/products.json'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

interface SearchCategoryProps {
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchCategory({ selectedCategory, setSelectedCategory }: SearchCategoryProps) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(productsData.products.map(product => product.category)))
        return [{ value: "All" }, ...uniqueCategories.map(category => ({ value: category }))]
    }, [])

    const handleCategoryChange = (category: string) => {
        // setSelectedCategory(category)
        setOpen(false)
        router.push(category === "All" ? '/products' : `/products?category=${category}`)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedCategory === "All" ? "Select category..." : selectedCategory}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category.value}
                                    value={category.value}
                                    onSelect={() => handleCategoryChange(category.value)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedCategory === category.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {category.value}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
