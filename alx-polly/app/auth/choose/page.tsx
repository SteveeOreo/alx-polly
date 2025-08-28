// app/auth/choose/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ChooseAuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
      <p className="mb-4">Choose an option below:</p>
      <div className="space-x-4">
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
        <Link href="/auth/register">
          <Button variant="secondary">Register</Button>
        </Link>
      </div>
    </div>
  );
}
