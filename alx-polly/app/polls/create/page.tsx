import React from 'react';

const CreatePollPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Poll</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p>Form for creating a new poll goes here.</p>
        {/* Placeholder for Shadcn components */}
        <div className="mt-4">
          <label htmlFor="pollTitle" className="block text-sm font-medium text-gray-700">Poll Title</label>
          <input
            type="text"
            id="pollTitle"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Favorite Ice Cream Flavor?"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="pollOptions" className="block text-sm font-medium text-gray-700">Poll Options (one per line)</label>
          <textarea
            id="pollOptions"
            rows={5}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Option 1\nOption 2\nOption 3"
          ></textarea>
        </div>
        <button className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 transition-colors">
          Submit Poll
        </button>
      </div>
    </div>
  );
};

export default CreatePollPage;
