import { cn } from "~/lib/utils";
import { StarIcon } from "./ui/star-icon";

export const StarRating = ({ rating, className }: { rating: string; className?: string }) => {
  const ratingNumber = parseInt(rating);
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`h-5 w-5 ${i < ratingNumber ? "fill-primary" : "stroke-muted-foreground"}`}
        />
      ))}
    </div>
  );
};
