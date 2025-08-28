// components/Profile.tsx
"use client";

import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <p>Logged in as: {user.email}</p>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
