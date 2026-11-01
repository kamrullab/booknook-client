"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api-client";
import { useSession } from "@/lib/auth-client";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export function AddBookForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [imageName, setImageName] = useState("No cover selected");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const image = form.get("image");
    if (!(image instanceof File) || image.size === 0) {
      toast.error("Please select a book cover.");
      return;
    }

    setSubmitting(true);
    try {
      const imageData = new FormData();
      imageData.set("image", image);
      const uploadResponse = await fetch("/api/upload", { method: "POST", body: imageData });
      const uploadPayload = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(uploadPayload.message ?? "Image upload failed");

      await apiRequest("/books", {
        method: "POST",
        authenticated: true,
        body: JSON.stringify({
          title: String(form.get("title") ?? ""),
          author: String(form.get("author") ?? ""),
          category: String(form.get("category") ?? ""),
          image: uploadPayload.url,
          description: String(form.get("description") ?? ""),
          totalCopies: Number(form.get("totalCopies")),
        }),
      });

      toast.success("Book added to the BookNook shelf.");
      formElement.reset();
      router.push("/my-books");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The book could not be added.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field-group"><label htmlFor="title">Book title</label><input className="input" id="title" name="title" minLength={2} maxLength={150} required /></div>
        <div className="field-group"><label htmlFor="author">Author name</label><input className="input" id="author" name="author" minLength={2} maxLength={100} required /></div>
        <div className="field-group"><label htmlFor="category">Category</label><select className="select" id="category" name="category" defaultValue="" required><option value="" disabled>Select a category</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></div>
        <div className="field-group"><label htmlFor="totalCopies">Total copies</label><input className="input" id="totalCopies" name="totalCopies" type="number" min={1} max={1000} defaultValue={1} required /></div>
        <div className="field-group full-field"><label htmlFor="image">Book cover</label><label className="file-input" htmlFor="image"><span>Choose image</span><small>{imageName}</small></label><input className="hidden-file" id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp" required onChange={(event) => setImageName(event.target.files?.[0]?.name ?? "No cover selected")} /><p className="field-help">JPG, PNG, or WebP. Maximum 5 MB.</p></div>
        <div className="field-group full-field"><label htmlFor="description">Short description</label><textarea className="textarea" id="description" name="description" minLength={20} maxLength={2000} rows={6} required /></div>
        <div className="field-group"><label htmlFor="userName">Added by</label><input className="input" id="userName" value={session?.user.name ?? "Loading…"} readOnly /></div>
        <div className="field-group"><label htmlFor="userEmail">Email</label><input className="input" id="userEmail" value={session?.user.email ?? "Loading…"} readOnly /></div>
      </div>
      <button className="button btn form-submit" type="submit" disabled={submitting || !session}>{submitting ? "Uploading and saving…" : "Add Book"}</button>
    </form>
  );
}
