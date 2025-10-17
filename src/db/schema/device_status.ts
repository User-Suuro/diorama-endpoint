import { mysqlTable, int, timestamp, boolean } from "drizzle-orm/mysql-core";

export const deviceStatus = mysqlTable("device_status", {
  id: int("id").autoincrement().primaryKey(),
  switch_01: boolean("switch_01").notNull(),
  switch_02: boolean("switch_02").notNull(),
  switch_03: boolean("switch_03").notNull(),
  switch_04: boolean("switch_04").notNull(),
  visitors_val: int("visitors_val").notNull(),
  claps_val: int("claps_val").notNull(),
  lums_val: int("lums_val").notNull(),
  date: timestamp("date").defaultNow().notNull(),
});
