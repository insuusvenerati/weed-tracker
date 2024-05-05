import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";

type TrackerProps = {
  strain: string;
  effects: string[];
  rating: number;
  createdAt: string;
};

export function Tracker({ effects, rating, strain, createdAt }: TrackerProps) {
  return (
    <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Marijuana Experience Tracker
          </h1>
          <p className="text-gray-500 dark:text-gray-400 md:text-lg">
            Keep track of your marijuana experiences with this handy tracker.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Strain</TableHead>
                <TableHead className="hidden md:table-cell">Effects</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="w-[100px]">
                  <Button size="sm">Add</Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="hidden md:table-cell">{createdAt}</TableCell>
                <TableCell>{strain}</TableCell>
                <TableCell className="hidden md:table-cell">{effects.join(", ")}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {[...Array(rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 fill-primary" />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hidden md:table-cell">2023-04-15</TableCell>
                <TableCell>Blue Dream</TableCell>
                <TableCell className="hidden md:table-cell">Relaxing, Euphoric</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hidden md:table-cell">2023-04-10</TableCell>
                <TableCell>Gorilla Glue</TableCell>
                <TableCell className="hidden md:table-cell">Sedating, Couch-Locking</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
