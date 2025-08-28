// app/polls/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Poll from "@/components/Poll";
import { supabase } from "@/lib/supabase";
import Profile from "@/components/Profile"; // Import the Profile component

interface PollType {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  creator_id: string;
}

const PollsPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [polls, setPolls] = useState<PollType[]>([]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/choose"); // Redirect to choose auth page
      } else {
        const fetchPolls = async () => {
          try {
            const { data, error } = await supabase.from("polls").select(`
                *,
                options (
                  id,
                  text
                )
              `);
            if (error) {
              console.error("Error fetching polls:", error);
            } else {
              setPolls(data);
            }
          } catch (error) {
            console.error("Unexpected error fetching polls:", error);
          }
        };
        fetchPolls();
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Polls</h1>
      <Profile /> {/* Include the Profile component */}
      {polls && polls.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4">
          {polls.map((poll) => (
            <Poll key={poll.id} {...poll} />
          ))}
        </ul>
      ) : (
        <p>No polls available.</p>
      )}
    </div>
  );
};

export default PollsPage;
