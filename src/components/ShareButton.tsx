"use client"

import React, { useState } from 'react'
import { Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

interface ShareButtonProps {
  url: string
  title: string
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleShare = async (platform: string) => {
    setIsOpen(false)

    if (navigator.share && platform === 'native') {
      try {
        await navigator.share({ url, title })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      let shareUrl = ''
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          break
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
          break
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
          break
        case 'copy':
          navigator.clipboard.writeText(url)
          toast({
            title: "Link copied to clipboard",
            description: "You can now paste the link anywhere.",
          })
          return
      }
      if (shareUrl) {
        window.open(shareUrl, '_blank')
      }
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4" />
          {/* Share */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onSelect={() => handleShare('native')} className="cursor-pointer">
          Share
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleShare('facebook')} className="cursor-pointer">
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleShare('twitter')} className="cursor-pointer">
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleShare('linkedin')} className="cursor-pointer">
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleShare('copy')} className="cursor-pointer">
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ShareButton