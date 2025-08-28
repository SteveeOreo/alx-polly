// app/api/polls/route.ts
import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: polls, error } = await supabase.from("polls").select(`
        *,
        options (
            id,
            text
        )
      `);

    if (error) {
      console.error("Error fetching polls:", error);
      return NextResponse.json(
        { message: "Failed to fetch polls" },
        { status: 500 },
      );
    }

    return NextResponse.json(polls);
  } catch (error) {
    console.error("Unexpected error fetching polls:", error);
    return NextResponse.json(
      { message: "Failed to fetch polls" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { question, options } = await request.json();

    // Get the user's session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized: You must be logged in to create a poll" },
        { status: 401 },
      );
    }

    if (!question || !options || options.length < 2) {
      return NextResponse.json(
        { message: "Invalid poll data" },
        { status: 400 },
      );
    }

    const { data: pollData, error: pollError } = await supabase
      .from("polls")
      .insert([
        {
          creator_id: user.id,
          question: question,
        },
      ])
      .select()
      .single();

    if (pollError) {
      console.error("Error creating poll:", pollError);
      return NextResponse.json(
        { message: "Failed to create poll" },
        { status: 500 },
      );
    }

    // Insert the options
    const optionsToInsert = options.map((optionText: string) => ({
      poll_id: pollData.id,
      text: optionText,
    }));

    const { error: optionsError } = await supabase
      .from("options")
      .insert(optionsToInsert);

    if (optionsError) {
      console.error("Error creating options:", optionsError);

      // Optionally, you might want to delete the poll if options creation fails
      await supabase.from("polls").delete().eq("id", pollData.id);

      return NextResponse.json(
        { message: "Failed to create poll options" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Poll created successfully" });
  } catch (error) {
    console.error("Error creating poll:", error);
    return NextResponse.json(
      { message: "Failed to create poll" },
      { status: 500 },
    );
  }
}
