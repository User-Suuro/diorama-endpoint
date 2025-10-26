import { mysqlTable, int, timestamp, boolean } from "drizzle-orm/mysql-core";

// Arduino <--> Mobapp

export const controllers = mysqlTable("controllers", {
  id: int("id").autoincrement().primaryKey(),
  switch_01: boolean("switch_01").notNull(),
  switch_02: boolean("switch_02").notNull(),
  switch_03: boolean("switch_03").notNull(),
  switch_04: boolean("switch_04").notNull(),
  is_arduino: boolean("is_arduino").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
