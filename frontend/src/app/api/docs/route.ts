import initialDocuments from "@/data/initialDocuments";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
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
  } catch (error: any) {
    return new NextResponse("Error updating document" + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (req: Request) => {
  try {
    const cookieStore = cookies();
    const body = await req.json();

    cookieStore.set("docs", JSON.stringify(body));
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

export const POST = async (req: Request) => {
  try {
    const cookieStore = cookies();
    const body = await req.json();

    const currentDocs = JSON.parse(cookieStore.get("docs")?.value || "[]");

    const newDoc = body;

    const updatedDocs = [...currentDocs, newDoc];

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

export const DELETE = async (req: Request) => {
  try {
    const cookieStore = cookies();
    const { searchParams } = new URL(req.url);
    const Id = searchParams.get("id");

    const currentDocs = JSON.parse(cookieStore.get("docs")?.value || "[]");

    const updatedDocs = currentDocs.filter((doc: any) => doc.id !== Id);

    cookieStore.set("docs", JSON.stringify(updatedDocs));
    cookieStore.set("lastUpdated", new Date()?.toISOString());

    return new NextResponse(JSON.stringify({ data: updatedDocs }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error updating document" + error.message, {
      status: 500,
    });
  }
};
