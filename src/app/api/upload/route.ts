import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxFileSize = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return NextResponse.json({ message: "Authentication is required" }, { status: 401 });

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) return NextResponse.json({ message: "Image upload is not configured" }, { status: 503 });

  const requestData = await request.formData();
  const image = requestData.get("image");
  if (!(image instanceof File) || !allowedTypes.has(image.type) || image.size > maxFileSize) {
    return NextResponse.json({ message: "Choose a JPG, PNG, or WebP image under 5 MB" }, { status: 400 });
  }

  const uploadData = new FormData();
  uploadData.set("image", image);
  const uploadResponse = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    body: uploadData,
  });
  const payload = await uploadResponse.json();

  if (!uploadResponse.ok || !payload.success || !payload.data?.url) {
    return NextResponse.json({ message: "Image upload failed" }, { status: 502 });
  }

  return NextResponse.json({ url: payload.data.url });
}
