import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Link2, Mail, Facebook, Twitter } from "lucide-react";

interface ShareBarProps {
  title: string;
  slug: string;
}

export default function ShareBar({ title, slug }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://www.bballorbit.com/blog/${slug}`;
  const shareText = `${title} – via Basketball Orbit`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link", error);
    }
  };

  const handleNativeShare = async () => {
    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title,
          text: shareText,
          url: shareUrl,
        });
      } else {
        await handleCopyLink();
      }
    } catch {
      // User cancelled share, no issue
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mt-8 mb-6">
      <span className="text-sm text-muted-foreground">
        Share this article:
      </span>

      {/* Native Share */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleNativeShare}
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        {copied ? "Link copied!" : "Share"}
      </Button>

      {/* X / Twitter */}
      <Button
        asChild
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="h-4 w-4" />
          X
        </a>
      </Button>

      {/* Facebook */}
      <Button
        asChild
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className="h-4 w-4" />
          Facebook
        </a>
      </Button>

      {/* Email */}
      <Button
        asChild
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <a
          href={`mailto:?subject=${encodeURIComponent(
            title
          )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`}
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
      </Button>

      {/* Copy Link */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="flex items-center gap-2"
      >
        <Link2 className="h-4 w-4" />
        {copied ? "Copied!" : "Copy link"}
      </Button>
    </div>
  );
}
