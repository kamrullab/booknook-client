import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BookNook - A Small Online Library",
    short_name: "BookNook",
    description: "Discover, share, borrow, and return books with the BookNook community.",
    start_url: "/",
    display: "standalone",
    background_color: "#101916",
    theme_color: "#18332b",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
