import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    console.error("GOOGLE_SCRIPT_URL environment variable is not set");
    return NextResponse.json(
      { error: "Form submission is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    // Google Apps Script returns a redirect, then the final response
    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      // If we can't parse the response but got a 200, treat as success
      // Google Apps Script sometimes returns HTML on redirect
      if (response.ok) {
        result = { result: "success" };
      } else {
        throw new Error("Unexpected response from form handler");
      }
    }

    if (result.result === "success") {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: result.message || "Submission failed" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
}
