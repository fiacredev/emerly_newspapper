"use client";

import { useEffect, useState } from "react";
import { ImageIcon, X, ExternalLink } from "lucide-react";

import type { ArticleImage } from "../../../src/types/article2";

interface Props {
  value: ArticleImage | null;
  onChange: (image: ArticleImage | null) => void;
}

export default function ImageUrlInput({
  value,
  onChange,
}: Props) {
  const [url, setUrl] = useState(value?.url ?? "");
  const [publicId, setPublicId] = useState(value?.publicId ?? "");
  const [altText, setAltText] = useState(value?.altText ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    setUrl(value?.url ?? "");
    setPublicId(value?.publicId ?? "");
    setAltText(value?.altText ?? "");
  }, [value]);

  const applyImage = () => {
    setError("");

    try {
      const parsed = new URL(url.trim());

      if (
        parsed.protocol !== "https:" ||
        parsed.hostname !== "res.cloudinary.com"
      ) {
        setError("Enter a valid Cloudinary HTTPS image URL.");
        return;
      }

      if (!publicId.trim()) {
        setError("Cloudinary public ID is required.");
        return;
      }

      onChange({
        url: parsed.href,
        publicId: publicId.trim(),
        altText: altText.trim(),
      });
    } catch {
      setError("Please enter a valid image URL.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">
          Featured image
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          Paste your Cloudinary image URL and public ID.
        </p>
      </div>

      {value ? (
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={value.url}
              alt={value.altText || "Article image"}
              className="h-52 w-full object-cover"
            />

            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute right-3 top-3 rounded-lg bg-white p-2 text-red-600 shadow"
            >
              <X size={17} />
            </button>
          </div>

          <p className="break-all text-xs text-slate-400">
            {value.publicId}
          </p>

          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-sm text-red-600"
          >
            Remove image
          </button>

          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-blue-600"
          >
            View image <ExternalLink size={13} />
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex h-32 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">
            <ImageIcon size={28} className="text-slate-400" />
            <p className="mt-2 text-xs text-slate-500">
              No featured image selected
            </p>
          </div>

          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Cloudinary image URL"
            className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
          />

          <input
            value={publicId}
            onChange={(e) => setPublicId(e.target.value)}
            placeholder="Cloudinary public ID"
            className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
          />

          <input
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Image alternative text"
            className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={applyImage}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Apply image
          </button>

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}