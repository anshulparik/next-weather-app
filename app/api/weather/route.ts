import { NextRequest, NextResponse } from "next/server";
import { Weather } from "@/db/models/Weather";
import { dbConnect } from "@/db/db";

export const GET = async () => {
  try {
    await dbConnect();
    const cards = await Weather.find();
    console?.log(cards);
    return NextResponse.json(
      {
        cards,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.message || "Failed to fetch from the DB!",
        ok: false,
      },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    let {
      city,
      tempC,
      tempF,
      conditionImg,
      conditionText,
      humidity,
      feelsLike,
    } = await request?.json();

    const entry = new Weather({
      city,
      tempC,
      tempF,
      conditionImg,
      conditionText,
      humidity,
      feelsLike,
    });

    await entry?.save();
    return NextResponse.json(
      {
        message: "Card successfully saved!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.message || "Failed to save to the DB!",
        ok: false,
      },
      { status: 500 }
    );
  }
};
