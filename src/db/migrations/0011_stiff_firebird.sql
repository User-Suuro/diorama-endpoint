CREATE TABLE `controllers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`switch_01` boolean NOT NULL,
	`switch_02` boolean NOT NULL,
	`switch_03` boolean NOT NULL,
	`switch_04` boolean NOT NULL,
	`is_arduino` boolean NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `controllers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sensors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`visitors_val` int NOT NULL,
	`claps_val` int NOT NULL,
	`lums_val` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sensors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `device_status`;