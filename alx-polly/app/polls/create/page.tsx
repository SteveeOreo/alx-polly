"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const CreatePollPage = () => {
  const [pollTitle, setPollTitle] = useState("");
  const [pollOptions, setPollOptions] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const optionsArray = pollOptions
      .split("\n")
      .map((option) => option.trim())
      .filter((option) => option !== "");

    if (!pollTitle || optionsArray.length < 2) {
      setError("Please provide a poll title and at least two options.");
      setLoading(false);
      return;
    }

    try {
      // Get the current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("You must be logged in to create a poll.");
        setLoading(false);
        router.push("/auth/login"); // Redirect to login if not authenticated
        return;
      }

      // 1. Insert the new poll into the 'polls' table
      const { data: poll, error: pollError } = await supabase
        .from("polls")
        .insert([{ question: pollTitle, user_id: user.id }])
        .select()
        .single(); // Use .single() to get the inserted row

      if (pollError) {
        setError(pollError.message);
        setLoading(false);
        return;
      }

      // 2. Insert poll options into the 'options' table, linked to the new poll
      const optionsToInsert = optionsArray.map((optionText) => ({
        poll_id: poll.id,
        text: optionText,
        votes: 0, // Initialize votes to 0
      }));

      const { error: optionsError } = await supabase
        .from("options")
        .insert(optionsToInsert);

      if (optionsError) {
        setError(optionsError.message);
        // Consider rolling back the poll creation here if needed, or handle this as a partial success
        setLoading(false);
        return;
      }

      alert("Poll created successfully!");
      router.push(`/polls/${poll.id}`); // Redirect to the newly created poll page
    } catch (err: any) {
      setError("An unexpected error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Poll</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {error && (
          <p className="text-red-500 text-sm mt-2 mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              htmlFor="pollTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Poll Question
            </label>
            <input
              type="text"
              id="pollTitle"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Favorite Ice Cream Flavor?"
              value={pollTitle}
              onChange={(e) => setPollTitle(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="pollOptions"
              className="block text-sm font-medium text-gray-700"
            >
              Poll Options (one per line)
            </label>
            <textarea
              id="pollOptions"
              rows={5}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Option 1\nOption 2\nOption 3"
              value={pollOptions}
              onChange={(e) => setPollOptions(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating Poll..." : "Submit Poll"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePollPage;
