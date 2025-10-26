import { mysqlTable, int, timestamp, boolean } from "drizzle-orm/mysql-core";

// Arduino <--> Mobapp

export const controllers = mysqlTable("controllers", {
  id: int("id").autoincrement().primaryKey(),
  front_switch: boolean("front_switch").notNull(),
  back_switch: boolean("back_switch").notNull(),
  left_switch: boolean("left_switch").notNull(),
  inside_switch: boolean("inside_switch").notNull(),
  is_arduino: boolean("is_arduino").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
