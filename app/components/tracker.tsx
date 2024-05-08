import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "./ui/input";

type TrackerProps = {
  strain: string;
  effects: string[];
  rating: string;
  createdAt: string;
  id: number;
};

function TrackerRow({ effects, rating, strain, createdAt }: TrackerProps) {
  const ratingNumber = parseInt(rating);
  return (
    <TableRow>
      <TableCell className="hidden md:table-cell">{createdAt}</TableCell>
      <TableCell>{strain}</TableCell>
      <TableCell className="hidden md:table-cell">{effects.join(", ")}</TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${i < ratingNumber ? "fill-primary" : "stroke-muted-foreground"}`}
            />
          ))}
        </div>
      </TableCell>
      <TableCell>
        <Button size="sm" variant="ghost">
          Edit
        </Button>
      </TableCell>
      <TableCell>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function Tracker({ rows }: { rows: TrackerProps[] | null }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState({});
  const fetcher = useFetcher();

  const handleClick = () => {
    setIsAdding((prev) => !prev);
  };

  const handleSaveClick = () => {
    fetcher.submit(newExperience, { method: "POST" });
    setIsAdding(false);
  };

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
                  <Button onClick={handleClick} size="sm">
                    Add
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows?.map((row) => <TrackerRow key={row.id} {...row} />)}
              {isAdding && (
                <TableRow>
                  <TableCell className="hidden md:table-cell">
                    <Input
                      onChange={(e) => setNewExperience({ ...newExperience, date: e.target.value })}
                      name="date"
                      type="date"
                      placeholder="Date"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      required
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, strain: e.target.value })
                      }
                      name="strain"
                      type="text"
                      placeholder="Strain"
                    />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Input
                      required
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, effects: e.target.value })
                      }
                      name="effects"
                      type="text"
                      placeholder="Effects"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      required
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, rating: e.target.value })
                      }
                      name="rating"
                      type="number"
                      placeholder="Rating"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={handleSaveClick} size="sm">
                      Save
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={handleClick} size="sm" variant="destructive">
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              )}
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
