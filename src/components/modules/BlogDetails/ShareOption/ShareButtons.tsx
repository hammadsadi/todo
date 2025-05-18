"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Copy,
  Check,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [canShare, setCanShare] = useState(false); // ✅ fix

  // Check if navigator.share is supported
  useEffect(() => {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function"
    ) {
      setCanShare(true);
    }
  }, []);

  // Construct the full URL for the blog post
  const getFullUrl = () => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/blogs/${slug}`;
  };

  // Handle copy to clipboard
  const handleCopyLink = async () => {
    const url = getFullUrl();

    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {}
  };

  // Handle native share if available
  const handleNativeShare = async () => {
    const url = getFullUrl();

    try {
      await navigator.share({
        title,
        text: `Check out this blog: ${title}`,
        url,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // Share to Twitter
  const shareToTwitter = () => {
    const url = getFullUrl();
    const text = encodeURIComponent(`${title} ${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  // Share to Facebook
  const shareToFacebook = () => {
    const url = getFullUrl();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  // Share to LinkedIn
  const shareToLinkedIn = () => {
    const url = getFullUrl();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };

  // Share via Email
  const shareViaEmail = () => {
    const url = getFullUrl();
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`Check out this blog: ${title}\n\n${url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  // Share via WhatsApp
  const shareViaWhatsApp = () => {
    const url = getFullUrl();
    const text = encodeURIComponent(`${title} ${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="flex items-center gap-2">
      {/* Copy URL Button */}
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={handleCopyLink}
      >
        {isCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">
          {isCopied ? "Copied!" : "Copy Link"}
        </span>
      </Button>

      {/* Share Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {canShare && (
            <>
              <DropdownMenuItem onClick={handleNativeShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={shareToTwitter}>
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareToFacebook}>
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareToLinkedIn}>
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareViaWhatsApp}>
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareViaEmail}>
            <Mail className="h-4 w-4 mr-2" />
            Email
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
