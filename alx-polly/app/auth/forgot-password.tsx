import React from 'react';

const ForgotPasswordPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <p>Forgot password form goes here.</p>
        {/* Placeholder for Shadcn components */}
        <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded">Reset Password</button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
