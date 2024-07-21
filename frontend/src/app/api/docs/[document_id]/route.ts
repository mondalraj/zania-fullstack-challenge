import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, context: { params: any }) => {
  const documentId = context.params.document_id;
  try {
    const cookieStore = cookies();
    const body = await request.json();

    const currentDocs = JSON.parse(cookieStore.get("docs")?.value || "[]");

    const updatedDocs = currentDocs.map((doc: any) => {
      if (doc.id === documentId) {
        return body;
      }
      return doc;
    });

    cookieStore.set("docs", JSON.stringify(updatedDocs));
    cookieStore.set("lastUpdated", new Date()?.toISOString());

    return new NextResponse(JSON.stringify({ data: body }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error updating document" + error.message, {
      status: 500,
    });
  }
};
