CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE experiences ADD `user_id` text NOT NULL;