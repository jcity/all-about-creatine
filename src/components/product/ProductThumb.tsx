import Image from "next/image";
import { Icon } from "@/components/ui/Icons";

interface ProductThumbProps {
  image?: string;
  name: string;
  /** Rendered pixel size (the .pthumb wrapper sizing comes from CSS context). */
  size?: number;
}

/**
 * Product image with a clinical gradient/jar placeholder fallback (D9 — real
 * product photography swaps in for production). Lives inside a `.pthumb` box.
 */
export function ProductThumb({ image, name, size = 48 }: ProductThumbProps) {
  const hasRealImage = image && !image.includes("placeholder");

  if (hasRealImage) {
    return (
      <Image
        src={image}
        alt={name}
        width={size}
        height={size}
        className="object-contain"
        style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
        loading="lazy"
      />
    );
  }
  return <Icon name="jar" />;
}
