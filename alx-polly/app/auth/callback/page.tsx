"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase'; // Adjust path as necessary

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    async function handleSupabaseAuth() {
      if (code) {
        try {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            console.error('Error exchanging code for session:', error);
            // Optionally, redirect to an error page or show a message
            router.push('/auth/login?error=auth_failed');
          } else {
            // User successfully authenticated, redirect to a protected page (e.g., polls dashboard)
            router.push('/polls');
          }
        } catch (err) {
          console.error('An unexpected error occurred during auth callback:', err);
          router.push('/auth/login?error=unexpected_error');
        }
      } else {
        // If no code is present, it might be an unhandled redirect or direct access
        console.warn('No code found in URL for auth callback.');
        router.push('/auth/login');
      }
    }

    handleSupabaseAuth();
  }, [code, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Processing authentication...</h1>
        <p>Please wait while we log you in.</p>
      </div>
    </div>
  );
}
