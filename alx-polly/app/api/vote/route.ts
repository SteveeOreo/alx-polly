// app/api/vote/route.ts
import { NextResponse } from 'next/server';

// Placeholder for poll data (replace with a database)
const polls = [
  { id: 1, question: 'What is your favorite color?', options: ['Red', 'Blue', 'Green'], votes: { 'Red': 0, 'Blue': 0, 'Green': 0 } },
  { id: 2, question: 'What is your favorite fruit?', options: ['Apple', 'Banana', 'Orange'], votes: { 'Apple': 0, 'Banana': 0, 'Orange': 0 } },
];

export async function POST(request: Request) {
  try {
    const { pollId, option } = await request.json();

    // Find the poll
    const poll = polls.find((p) => p.id === pollId);

    if (!poll) {
      return NextResponse.json({ message: 'Poll not found' }, { status: 404 });
    }

    if (!poll.options.includes(option)) {
      return NextResponse.json({ message: 'Invalid option' }, { status: 400 });
    }

    // Increment the vote count
    if (poll.votes && poll.votes[option] !== undefined) {
         poll.votes[option]++;
    } else {
        console.error("Votes object or option not initialized properly for poll:", poll);
        return NextResponse.json({ message: 'Voting failed due to data error' }, { status: 500 });
    }


    return NextResponse.json({ message: 'Vote submitted successfully' });
  } catch (error) {
    console.error('Error submitting vote:', error);
    return NextResponse.json({ message: 'Failed to submit vote' }, { status: 500 });
  }
}
