CREATE TABLE `device_status` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `device_status_id` PRIMARY KEY(`id`)
);
