// app/new-poll/page.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const NewPollPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]); // Start with two options
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/choose");
      }
    }
  }, [user, loading, router]);

  const addOption = () => {
    if (options.length < 5) {
      // Limit to 5 options
      setOptions([...options, ""]);
    } else {
      setError("Maximum 5 options allowed.");
    }
  };

  const removeOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
    setError("");
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question) {
      setError("Question is required.");
      return;
    }

    const validOptions = options.filter((option) => option.trim() !== "");
    if (validOptions.length < 2) {
      setError("At least two options are required.");
      return;
    }

    // Create new poll object
    const newPoll = {
      question: question,
      options: validOptions,
    };

    // TODO: Send to the server to save in the database
    console.log("New Poll:", newPoll);

    // Reset the form
    setQuestion("");
    setOptions(["", ""]);
    setError("");
    router.push("/polls");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // Or a loading indicator, or a message
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Create a New Poll
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="question"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Question:
          </label>
          <Input
            type="text"
            id="question"
            placeholder="Enter your poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Options:
          </label>
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 mb-3 last:mb-0"
            >
              <Input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {options.length > 2 && (
                <Button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline transition-colors"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          {options.length < 5 && (
            <Button
              type="button"
              onClick={addOption}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              Add Option
            </Button>
          )}
        </div>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors w-full sm:w-auto"
        >
          Create Poll
        </Button>
      </form>
    </div>
  );
};

export default NewPollPage;
