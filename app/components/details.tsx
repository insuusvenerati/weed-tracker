import { useAuth } from "@clerk/remix";
import { Link } from "@remix-run/react";
import { GripHorizontal } from "lucide-react";
import { StarRating } from "./star-rating";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type DetailsProps = {
  description?: string | null;
  strain: string;
  effects: string[];
  rating: "1" | "2" | "3" | "4" | "5";
  createdAt: string;
  id: number;
  image?: string | null;
  userId: string;
};

function Effect({ effect }: { effect: string }) {
  return (
    <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800">
      {effect}
    </div>
  );
}

export function Details({
  description,
  strain,
  effects,
  rating,
  createdAt,
  id,
  image,
  userId,
}: DetailsProps) {
  const { userId: signedInUserId } = useAuth();

  const formattedData = new Date(createdAt).toLocaleDateString();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h1 className="mb-2 text-3xl font-bold">{strain}</h1>
            {userId === signedInUserId && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <GripHorizontal className="h-5 w-5" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Button asChild className="w-full justify-start" variant="ghost">
                      <Link to={`/strains/${id}/update`}>Edit</Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button asChild className="w-full justify-start" variant="destructive">
                      <Link to={`/strains/${id}/delete`}>Delete</Link>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <p className="mb-4 text-gray-500">{description}</p>
          <div className="mb-4 flex items-center">
            <div className="mr-4 flex items-center">
              <FlameIcon className="mr-1 h-5 w-5 text-red-500" />
              <span className="font-medium">THC: 22%</span>
            </div>
            <div className="flex items-center">
              <LeafIcon className="mr-1 h-5 w-5 text-green-500" />
              <span className="font-medium">CBD: 1%</span>
            </div>
          </div>
          <StarRating rating={rating} className="mb-6" />
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-bold">Effects</h2>
            <div className="flex flex-wrap gap-2">
              {effects.map((effect) => (
                <Effect key={effect} effect={effect} />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-bold">Created At</h2>
            <p className="text-gray-500">{formattedData}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            alt={strain}
            className="rounded-lg shadow-lg"
            height={400}
            src={image ?? "/placeholder.svg"}
            style={{
              aspectRatio: "400/400",
              objectFit: "cover",
            }}
            width={400}
          />
        </div>
      </div>
    </div>
  );
}

function FlameIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}
