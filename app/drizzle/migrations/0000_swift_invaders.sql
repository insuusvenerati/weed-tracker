CREATE TABLE `experiences` (
	`id` integer PRIMARY KEY NOT NULL,
	`strain` text NOT NULL,
	`rating` text NOT NULL,
	`effects` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
