import { Link } from "@remix-run/react";
import { useState } from "react";
import { ValidatedForm, useFormContext } from "remix-validated-form";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { validator } from "~/routes/_index";
import { StarRating } from "./star-rating";
import { Input } from "./ui/input";

type TrackerProps = {
  strain: string;
  effects: string[];
  rating: string;
  createdAt: string;
  id: number;
};

function TrackerRow({ effects, rating, strain, createdAt, id }: TrackerProps) {
  const formatedDate = new Date(createdAt);
  return (
    <TableRow>
      <TableCell className="hidden md:table-cell">{formatedDate.toLocaleDateString()}</TableCell>
      <TableCell>
        <Link to={`/strains/${id}`}>{strain}</Link>
      </TableCell>
      <TableCell className="hidden md:table-cell">{effects.join(", ")}</TableCell>
      <TableCell>
        <StarRating rating={rating} />
      </TableCell>
    </TableRow>
  );
}

export function Tracker({ rows }: { rows: TrackerProps[] | null }) {
  const [isAdding, setIsAdding] = useState(false);
  const { fieldErrors } = useFormContext("newExp");

  const handleClick = () => {
    setIsAdding((prev) => !prev);
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
          <ValidatedForm id="newExp" method="POST" validator={validator}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Strain</TableHead>
                  <TableHead className="hidden md:table-cell">Effects</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="w-[100px]">
                    <Button type="button" onClick={handleClick} size="sm">
                      Add
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows?.map((row) => {
                  return <TrackerRow key={row.id} {...row} />;
                })}
                {isAdding && (
                  <TableRow>
                    <TableCell className="hidden md:table-cell">
                      <Input name="date" type="date" placeholder="Date" />
                    </TableCell>
                    <TableCell>
                      <Input required name="strain" type="text" placeholder="Strain" />
                      {fieldErrors?.strain && <p className="text-red-500">{fieldErrors.strain}</p>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Input required name="effects" type="text" placeholder="Effects" />
                      {fieldErrors?.effects && (
                        <p className="text-red-500">{fieldErrors.effects}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Input
                        min={1}
                        max={5}
                        required
                        name="rating"
                        type="number"
                        placeholder="Rating"
                      />
                      {fieldErrors?.rating && <p className="text-red-500">{fieldErrors.rating}</p>}
                    </TableCell>
                    <TableCell>
                      <Button type="submit" size="sm">
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
          </ValidatedForm>
        </div>
      </div>
    </div>
  );
}
