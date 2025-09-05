import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PollViewPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Poll ID: {params.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for viewing an individual poll.</p>
          <Separator className="my-4" />
          <p>Poll details, options, and voting functionality will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
