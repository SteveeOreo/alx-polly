"use client";

"use client";

import type { PageProps } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Poll {
  id: string;
  question: string;
  user_id: string;
  created_at: string;
}

interface Option {
  id: string;
  poll_id: string;
  text: string;
  votes: number;
  created_at?: string;
};
}

// ✅ Use async function with params typed
const PollViewPage = ({ params }: PageProps<{ id: string }>) => {
const { id } = params;
  const [poll, setPoll] = useState<Poll | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchPollData() {
      setLoading(true);
      setError(null);

      try {
        const { data: pollData, error: pollError } = await supabase
          .from("polls")
          .select("*")
          .eq("id", id)
          .single();

        if (pollError) throw new Error(pollError.message);
        if (!pollData) throw new Error("Poll not found.");
        setPoll(pollData);

        const { data: optionsData, error: optionsError } = await supabase
          .from("options")
          .select("*")
          .eq("poll_id", id)
          .order("created_at", { ascending: true });

        if (optionsError) throw new Error(optionsError.message);
        setOptions(optionsData || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch poll.");
        console.error("Error fetching poll data:", err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchPollData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent>
            <p>Loading poll details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent>
            <p className="text-red-500">Error: {error}</p>
            <button
              onClick={() => router.push("/polls")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Back to Polls
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent>
            <p>Poll not found.</p>
            <button
              onClick={() => router.push("/polls")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Back to Polls
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{poll.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Created on: {new Date(poll.created_at).toLocaleDateString()}
          </p>
          <Separator className="my-4" />
          <h4 className="text-lg font-semibold mb-2">Options:</h4>
          <ul className="space-y-2">
            {options.length > 0 ? (
              options.map((option) => (
                <li
                  key={option.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                >
                  <span>{option.text}</span>
                  <span className="font-bold">{option.votes} votes</span>
                  <button className="ml-4 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                    Vote
                  </button>
                </li>
              ))
            ) : (
              <p>No options found for this poll.</p>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
