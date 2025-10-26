import { mysqlTable, int, timestamp } from "drizzle-orm/mysql-core";

// Arduino --> Mobapp

export const sensors = mysqlTable("sensors", {
  id: int("id").autoincrement().primaryKey(),
  visitors_val: int("visitors_val").notNull(),
  claps_val: int("claps_val").notNull(),
  lums_val: int("lums_val").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
