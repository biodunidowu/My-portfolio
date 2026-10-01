"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard permission denied — fail silently, link below still works.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-3 px-4 py-2 text-sm text-[#101828] transition-colors bg-[#F2F4F7] underline"
      aria-label="Copy email address"
    >
      {email}

      {copied ? (
        <Check className="h-4 w-4" strokeWidth={1.75} />
      ) : (
        <Copy className="h-4 w-4 cursor-pointer" strokeWidth={1.75} />
      )}
    </button>
  );
}
