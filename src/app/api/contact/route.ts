import { NextResponse } from "next/server";

const SA_MOBILE = /^05\d{8}$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const lead = {
    name: str("name"),
    company: str("company"),
    phone: str("phone").replace(/\s+/g, ""),
    sector: str("sector"),
    message: str("message").slice(0, 2000),
  };

  if (!lead.name || !lead.company || !lead.sector || !SA_MOBILE.test(lead.phone)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  // TODO: forward the lead to the sales inbox or CRM (e.g. email to info@reup.sa). Logged only for now.
  console.info("[contact] demo request", { ...lead, phone: `${lead.phone.slice(0, 4)}******` });

  return NextResponse.json({ ok: true });
}
