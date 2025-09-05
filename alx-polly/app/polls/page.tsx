import React from 'react';
import Link from 'next/link';

const PollsPage = () => {
  const polls = [
    { id: '1', title: 'Favorite Programming Language?' },
    { id: '2', title: 'Best AI Framework?' },
    { id: '3', title: 'Preferred Cloud Provider?' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Polls</h1>
      <Link href="/polls/create" className="mb-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors">
          Create New Poll
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map((poll) => (
          <div key={poll.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{poll.title}</h2>
            <Link href={`/polls/${poll.id}`} className="text-blue-500 hover:underline">
                View Poll
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollsPage;
