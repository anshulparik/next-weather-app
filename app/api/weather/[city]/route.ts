import { NextRequest, NextResponse } from "next/server";
import { Weather } from "@/db/models/Weather";
import { dbConnect } from "@/db/db";

export const DELETE = async (request: NextRequest, response: NextResponse) => {
  try {
    await dbConnect();
    const city = response?.params?.city;
    await Weather.findOneAndDelete({ city });
    return NextResponse.json(
      {
        message: "Card successfully deleted!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.message || "Failed to delete the card in DB!",
        ok: false,
      },
      { status: 500 }
    );
  }
};
