import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PollCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Poll Title</CardTitle>
        <CardDescription>A brief description of the poll.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          {/* Placeholder for poll options */}
          <p>Option 1: 50 votes</p>
          <p>Option 2: 30 votes</p>
          <p>Option 3: 20 votes</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button>Vote</Button>
      </CardFooter>
    </Card>
  );
}
