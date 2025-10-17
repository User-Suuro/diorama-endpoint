import { mysqlTable, int, timestamp } from "drizzle-orm/mysql-core";

export const deviceStatus = mysqlTable("device_status", {
  id: int("id").autoincrement().primaryKey(),
  date: timestamp("date").defaultNow().notNull(),
});
