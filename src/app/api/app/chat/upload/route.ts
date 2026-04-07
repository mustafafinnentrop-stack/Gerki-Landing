import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/getAuthUser";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const MAX_TEXT_CHARS = 12_000; // ~3k tokens — enough for most documents

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS });

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400, headers: CORS });
  }

  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400, headers: CORS });

  const name = file.name;
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    // ── PDF ──────────────────────────────────────────────
    if (ext === "pdf") {
      const pdfParse = (await import("pdf-parse")).default;
      const data = await pdfParse(buffer);
      const text = data.text.slice(0, MAX_TEXT_CHARS);
      const pages = data.numpages;
      return NextResponse.json({ name, type: "document", ext: "pdf", text, pages }, { headers: CORS });
    }

    // ── Word (.docx) ─────────────────────────────────────
    if (ext === "docx" || ext === "doc") {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value.slice(0, MAX_TEXT_CHARS);
      return NextResponse.json({ name, type: "document", ext, text }, { headers: CORS });
    }

    // ── Excel (.xlsx / .xls) ─────────────────────────────
    if (ext === "xlsx" || ext === "xls") {
      const XLSX = await import("xlsx");
      const wb = XLSX.read(buffer, { type: "buffer" });
      const text = wb.SheetNames.map((sheetName) => {
        const ws = wb.Sheets[sheetName];
        return `[Tabellenblatt: ${sheetName}]\n${XLSX.utils.sheet_to_csv(ws)}`;
      }).join("\n\n").slice(0, MAX_TEXT_CHARS);
      return NextResponse.json({ name, type: "document", ext, text, sheets: wb.SheetNames.length }, { headers: CORS });
    }

    // ── Images ────────────────────────────────────────────
    if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) {
      const base64 = buffer.toString("base64");
      const mimeType = file.type || `image/${ext === "jpg" ? "jpeg" : ext}`;
      return NextResponse.json({ name, type: "image", ext, base64, mimeType }, { headers: CORS });
    }

    // ── Plain text ────────────────────────────────────────
    if (["txt", "csv", "md"].includes(ext)) {
      const text = buffer.toString("utf-8").slice(0, MAX_TEXT_CHARS);
      return NextResponse.json({ name, type: "document", ext, text }, { headers: CORS });
    }

    return NextResponse.json(
      { error: `Nicht unterstütztes Format: .${ext}. Unterstützt: PDF, Word, Excel, PNG, JPG, TXT` },
      { status: 415, headers: CORS }
    );
  } catch (err) {
    console.error("Upload parse error:", err);
    return NextResponse.json({ error: "Datei konnte nicht gelesen werden." }, { status: 500, headers: CORS });
  }
}
