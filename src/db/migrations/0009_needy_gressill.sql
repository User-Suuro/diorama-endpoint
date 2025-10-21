ALTER TABLE `device_status` RENAME COLUMN `updatedAt` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `device_status` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT (now());