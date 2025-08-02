import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY!;

if (!GOOGLE_SERVICE_ACCOUNT_KEY) {
  console.error("GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set.");
  throw new Error("Google service account key not found");
}
const credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT_KEY);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Missing name or email" },
      { status: 400 }
    );
  }
  if (!SHEET_ID) {
    return NextResponse.json(
      { error: "Sheet ID not configured." },
      { status: 500 }
    );
  }

  try {
    const sheets = google.sheets({ version: "v4", auth });
    // const getRes = await sheets.spreadsheets.values.get({
    //   spreadsheetId: SHEET_ID,
    //   range: "A2:B",
    // });

    // const rows = getRes.data.values || [];
    // const exists = rows.some((row) => row[1] === email);

    // if (exists) {
    //   return NextResponse.json({ message: "Already joined" });
    // }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, name, message || "", new Date().toISOString()]],
      },
    });

    return NextResponse.json({ message: "Successfully added to waitlist" });
  } catch (err) {
    console.error("Sheets error:", err);
    return NextResponse.json(
      { error: err || "Internal Server Error" },
      { status: 500 }
    );
  }
}
