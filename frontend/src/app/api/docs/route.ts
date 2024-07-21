import initialDocuments from "@/data/initialDocuments";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const cookieStore = cookies();

  if (cookieStore.get("docs")) {
    return new NextResponse(
      JSON.stringify({
        data: cookieStore.get("docs")?.value,
        lastUpdated: cookieStore.get("lastUpdated")?.value,
      }),
      {
        status: 200,
      }
    );
  } else {
    cookieStore.set("docs", JSON.stringify(initialDocuments));
    return new NextResponse(
      JSON.stringify({ data: JSON.stringify(initialDocuments) }),
      {
        status: 200,
      }
    );
  }
};

export const PATCH = async (req: Request) => {
  const cookieStore = cookies();
  const body = await req.json();

  cookieStore.set("docs", JSON.stringify(body));
  cookieStore.set("lastUpdated", new Date()?.toISOString());
  return new NextResponse(JSON.stringify({ data: body }), {
    status: 200,
  });
};
