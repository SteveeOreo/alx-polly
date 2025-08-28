// components/Poll.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

interface PollProps {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  creator_id: string;
}

const Poll: React.FC<PollProps> = ({ id, question, options, creator_id }) => {
  const [voteCounts, setVoteCounts] = useState<{ [optionId: string]: number }>(
    {},
  );
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const { data, error } = await supabase
          .from("votes")
          .select("option_id, count(*)")
          .eq("poll_id", id)
          .groupBy("option_id");

        if (error) {
          console.error("Error fetching vote counts:", error);
          setError("Failed to load vote counts.");
          return;
        }

        const counts: { [optionId: string]: number } = {};
        data.forEach((item) => {
          counts[item.option_id] = parseInt(item.count);
        });
        setVoteCounts(counts);
      } catch (err) {
        console.error("Unexpected error fetching vote counts:", err);
        setError("Failed to load vote counts.");
      }
    };

    const checkUserVoted = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();

        if (session?.session?.user?.id) {
          const { data, error } = await supabase
            .from("votes")
            .select("*", { count: "exact" })
            .eq("poll_id", id)
            .eq("user_id", session.session.user.id);

          if (error) {
            console.error("Error checking if user voted:", error);
            return;
          }

          if (data && data.length > 0) {
            setHasVoted(true);
          }
        }
      } catch (err) {
        console.error("Unexpected error checking if user voted:", err);
      }
    };

    fetchVoteCounts();
    checkUserVoted();
  }, [id]);

  const handleVote = async (optionId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data: session } = await supabase.auth.getSession();

      if (!session?.session?.user?.id) {
        setError("You must be logged in to vote.");
        return;
      }

      const { error } = await supabase.from("votes").insert([
        {
          poll_id: id,
          option_id: optionId,
          user_id: session.session.user.id,
        },
      ]);

      if (error) {
        console.error("Error submitting vote:", error);
        setError("Failed to submit vote.");
        return;
      }

      // Optimistically update vote counts and hasVoted
      setVoteCounts((prevCounts) => ({
        ...prevCounts,
        [optionId]: (prevCounts[optionId] || 0) + 1,
      }));
      setHasVoted(true);
    } catch (err) {
      console.error("Unexpected error submitting vote:", err);
      setError("Failed to submit vote.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="bg-white shadow-md rounded-lg p-6 transition-transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{question}</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul className="mt-2 space-y-3">
        {options.map((option) => (
          <li
            key={option.id}
            className="flex items-center justify-between py-2 px-4 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-700">
              {option.text}
              <span className="text-sm text-gray-500 ml-1">
                ({voteCounts[option.id] || 0} votes)
              </span>
            </span>
            {!hasVoted ? (
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors disabled:bg-blue-300"
                onClick={() => handleVote(option.id)}
                disabled={loading}
              >
                {loading ? "Voting..." : "Vote"}
              </Button>
            ) : (
              <span className="text-green-500 font-semibold">Voted</span>
            )}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Poll;
