import { sql } from "drizzle-orm";
export { eq, and } from "drizzle-orm";
import { pgTable, text, varchar, pgEnum, timestamp, integer, jsonb, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const roleEnum = pgEnum("role", ["admin", "anfitriao", "convidado"]);
export const eventModuleEnum = pgEnum("event_module", ["screen", "feed"]);
export const mediaTypeEnum = pgEnum("media_type", ["image", "video", "audio"]);
export const mediaStatusEnum = pgEnum("media_status", ["pending", "approved", "rejected"]);
export const txnProviderEnum = pgEnum("txn_provider", ["stripe_card", "stripe_pix"]);
export const txnStatusEnum = pgEnum("txn_status", ["pending", "confirmed", "refunded"]);
export const ownerTypeEnum = pgEnum("owner_type", ["user", "guest"]);
export const planTypeEnum = pgEnum("plan_type", ["standard", "whitelabel"]);
export const billingModelEnum = pgEnum("billing_model", ["monthly", "per_event"]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role").notNull().default("anfitriao"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hostId: varchar("host_id").notNull().references(() => users.id),
  orgId: varchar("org_id"),
  name: text("name").notNull(),
  coverUrl: text("cover_url"),
  date: timestamp("date", { withTimezone: false }).notNull(),
  feedPrice: numeric("feed_price", { precision: 12, scale: 2 }).default('0'),
  screenPrice: numeric("screen_price", { precision: 12, scale: 2 }).default('0'),
  createdAt: timestamp("created_at", { withTimezone: false }).default(sql`now()`),
});

export const eventModules = pgTable("event_modules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull().references(() => events.id),
  module: eventModuleEnum("module").notNull(),
});

export const guests = pgTable("guests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull().references(() => events.id),
  displayName: text("display_name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: false }).default(sql`now()`),
});

export const mediaAssets = pgTable("media_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull().references(() => events.id),
  guestId: varchar("guest_id").references(() => guests.id),
  type: mediaTypeEnum("type").notNull(),
  url: text("url").notNull(),
  status: mediaStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: false }).default(sql`now()`),
});

export const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull().references(() => events.id),
  guestId: varchar("guest_id").notNull().references(() => guests.id),
  content: text("content"),
  mediaId: varchar("media_id").references(() => mediaAssets.id),
  likes: integer("likes").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: false }).default(sql`now()`),
});

export const creditsWallets = pgTable("credits_wallets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ownerType: ownerTypeEnum("owner_type").notNull(),
  ownerId: varchar("owner_id").notNull(),
  balance: integer("balance").notNull().default(0),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull().references(() => events.id),
  walletId: varchar("wallet_id").notNull().references(() => creditsWallets.id),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("BRL"),
  provider: txnProviderEnum("provider").notNull(),
  status: txnStatusEnum("status").notNull().default("pending"),
  module: text("module"),
  createdAt: timestamp("created_at", { withTimezone: false }).default(sql`now()`),
});

export const moderationLogs = pgTable("moderation_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull().references(() => events.id),
  mediaId: varchar("media_id").notNull().references(() => mediaAssets.id),
  decision: mediaStatusEnum("decision").notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at", { withTimezone: false }).default(sql`now()`),
});

export const broadcastSessions = pgTable("broadcast_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull().references(() => events.id),
  state: jsonb("state"),
  createdAt: timestamp("created_at", { withTimezone: false }).default(sql`now()`),
});

export const plans = pgTable("plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull().default('0'),
  currency: text("currency").notNull().default("BRL"),
  modules: eventModuleEnum("modules").array().notNull().default(sql`ARRAY[]::event_module[]`),
  features: jsonb("features"),
  planType: planTypeEnum("plan_type").notNull().default("standard"),
  billingModel: billingModelEnum("billing_model"),
  monthlyPrice: numeric("monthly_price", { precision: 12, scale: 2 }),
  perEventPrice: numeric("per_event_price", { precision: 12, scale: 2 }),
  bundledEvents: integer("bundled_events").default(1),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export const organizations = pgTable("organizations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  domain: text("domain"),
  logoUrl: text("logo_url"),
  primaryColor: text("primary_color"),
  planType: planTypeEnum("plan_type").notNull().default("whitelabel"),
  billingModel: billingModelEnum("billing_model").notNull(),
  monthlyPrice: numeric("monthly_price", { precision: 12, scale: 2 }),
  perEventPrice: numeric("per_event_price", { precision: 12, scale: 2 }),
});

export const organizationUsers = pgTable("organization_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().references(() => organizations.id),
  userId: varchar("user_id").notNull().references(() => users.id),
});

export const hostQuotas = pgTable("host_quotas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  remainingEvents: integer("remaining_events").notNull().default(0),
});
