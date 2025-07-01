-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_blocked_slots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    "reason" TEXT,
    "is_recurring" BOOLEAN NOT NULL DEFAULT false,
    "rrule" TEXT,
    "recurrence_end_date" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "blocked_slots_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_blocked_slots" ("created_at", "end_time", "id", "is_recurring", "reason", "recurrence_end_date", "rrule", "start_time", "updated_at", "user_id") SELECT "created_at", "end_time", "id", "is_recurring", "reason", "recurrence_end_date", "rrule", "start_time", "updated_at", "user_id" FROM "blocked_slots";
DROP TABLE "blocked_slots";
ALTER TABLE "new_blocked_slots" RENAME TO "blocked_slots";
CREATE INDEX "blocked_slots_user_id_start_time_end_time_idx" ON "blocked_slots"("user_id", "start_time", "end_time");
CREATE INDEX "blocked_slots_user_id_is_recurring_idx" ON "blocked_slots"("user_id", "is_recurring");
CREATE TABLE "new_calendar_export_tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "scope" TEXT NOT NULL DEFAULT 'MEETINGS_ONLY',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_accessed_at" DATETIME,
    CONSTRAINT "calendar_export_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_calendar_export_tokens" ("created_at", "id", "is_active", "last_accessed_at", "scope", "token", "user_id") SELECT "created_at", "id", "is_active", "last_accessed_at", "scope", "token", "user_id" FROM "calendar_export_tokens";
DROP TABLE "calendar_export_tokens";
ALTER TABLE "new_calendar_export_tokens" RENAME TO "calendar_export_tokens";
CREATE UNIQUE INDEX "calendar_export_tokens_token_key" ON "calendar_export_tokens"("token");
CREATE INDEX "calendar_export_tokens_user_id_idx" ON "calendar_export_tokens"("user_id");
CREATE TABLE "new_calendar_subscriptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "feed_url" TEXT NOT NULL,
    "name" TEXT,
    "color" TEXT,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "last_synced_at" DATETIME,
    "last_sync_error" TEXT,
    "sync_frequency_minutes" INTEGER DEFAULT 60,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "calendar_subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_calendar_subscriptions" ("color", "created_at", "feed_url", "id", "is_enabled", "last_sync_error", "last_synced_at", "name", "sync_frequency_minutes", "updated_at", "user_id") SELECT "color", "created_at", "feed_url", "id", "is_enabled", "last_sync_error", "last_synced_at", "name", "sync_frequency_minutes", "updated_at", "user_id" FROM "calendar_subscriptions";
DROP TABLE "calendar_subscriptions";
ALTER TABLE "new_calendar_subscriptions" RENAME TO "calendar_subscriptions";
CREATE INDEX "calendar_subscriptions_user_id_is_enabled_idx" ON "calendar_subscriptions"("user_id", "is_enabled");
CREATE TABLE "new_email_queue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body_html" TEXT NOT NULL,
    "body_text" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "scheduled_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "last_attempt_at" DATETIME,
    "sent_at" DATETIME,
    "error_message" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "email_queue_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_email_queue" ("attempts", "body_html", "body_text", "created_at", "error_message", "id", "last_attempt_at", "scheduled_at", "sent_at", "status", "subject", "updated_at", "user_id") SELECT "attempts", "body_html", "body_text", "created_at", "error_message", "id", "last_attempt_at", "scheduled_at", "sent_at", "status", "subject", "updated_at", "user_id" FROM "email_queue";
DROP TABLE "email_queue";
ALTER TABLE "new_email_queue" RENAME TO "email_queue";
CREATE INDEX "idx_email_queue_pending_jobs" ON "email_queue"("status", "scheduled_at");
CREATE INDEX "idx_email_queue_user_history" ON "email_queue"("user_id", "created_at");
CREATE TABLE "new_external_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subscription_id" TEXT NOT NULL,
    "ical_uid" TEXT NOT NULL,
    "summary" TEXT,
    "description" TEXT,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    "is_all_day" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "rrule" TEXT,
    "dtstamp" DATETIME,
    "sequence" INTEGER,
    "show_as_free" BOOLEAN NOT NULL DEFAULT false,
    "last_fetched_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "external_events_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "calendar_subscriptions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_external_events" ("description", "dtstamp", "end_time", "ical_uid", "id", "is_all_day", "last_fetched_at", "location", "rrule", "sequence", "show_as_free", "start_time", "subscription_id", "summary") SELECT "description", "dtstamp", "end_time", "ical_uid", "id", "is_all_day", "last_fetched_at", "location", "rrule", "sequence", "show_as_free", "start_time", "subscription_id", "summary" FROM "external_events";
DROP TABLE "external_events";
ALTER TABLE "new_external_events" RENAME TO "external_events";
CREATE INDEX "external_events_subscription_id_start_time_end_time_idx" ON "external_events"("subscription_id", "start_time", "end_time");
CREATE INDEX "external_events_subscription_id_show_as_free_idx" ON "external_events"("subscription_id", "show_as_free");
CREATE UNIQUE INDEX "external_events_subscription_id_ical_uid_key" ON "external_events"("subscription_id", "ical_uid");
CREATE TABLE "new_friendships" (
    "user_id_1" TEXT NOT NULL,
    "user_id_2" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "requested_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accepted_at" DATETIME,

    PRIMARY KEY ("user_id_1", "user_id_2"),
    CONSTRAINT "friendships_user_id_1_fkey" FOREIGN KEY ("user_id_1") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "friendships_user_id_2_fkey" FOREIGN KEY ("user_id_2") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_friendships" ("accepted_at", "requested_at", "status", "user_id_1", "user_id_2") SELECT "accepted_at", "requested_at", "status", "user_id_1", "user_id_2" FROM "friendships";
DROP TABLE "friendships";
ALTER TABLE "new_friendships" RENAME TO "friendships";
CREATE INDEX "idx_friendships_user2_status" ON "friendships"("user_id_2", "status");
CREATE TABLE "new_group_members" (
    "group_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'MEMBER',
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("group_id", "user_id"),
    CONSTRAINT "group_members_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "group_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_group_members" ("added_at", "group_id", "role", "user_id") SELECT "added_at", "group_id", "role", "user_id" FROM "group_members";
DROP TABLE "group_members";
ALTER TABLE "new_group_members" RENAME TO "group_members";
CREATE INDEX "group_members_user_id_idx" ON "group_members"("user_id");
CREATE TABLE "new_meeting_participants" (
    "meeting_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("meeting_id", "user_id"),
    CONSTRAINT "meeting_participants_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "meetings" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "meeting_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_meeting_participants" ("added_at", "meeting_id", "status", "user_id") SELECT "added_at", "meeting_id", "status", "user_id" FROM "meeting_participants";
DROP TABLE "meeting_participants";
ALTER TABLE "new_meeting_participants" RENAME TO "meeting_participants";
CREATE INDEX "idx_participants_user_status" ON "meeting_participants"("user_id", "status");
CREATE TABLE "new_notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "related_entity_type" TEXT,
    "related_entity_id" TEXT,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_notifications" ("created_at", "id", "is_read", "message", "related_entity_id", "related_entity_type", "type", "user_id") SELECT "created_at", "id", "is_read", "message", "related_entity_id", "related_entity_type", "type", "user_id" FROM "notifications";
DROP TABLE "notifications";
ALTER TABLE "new_notifications" RENAME TO "notifications";
CREATE INDEX "idx_notifications_user_read_time" ON "notifications"("user_id", "is_read", "created_at");
CREATE TABLE "new_user_notification_preferences" (
    "user_id" TEXT NOT NULL,
    "notification_type" TEXT NOT NULL,
    "email_enabled" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("user_id", "notification_type"),
    CONSTRAINT "user_notification_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_user_notification_preferences" ("email_enabled", "notification_type", "updated_at", "user_id") SELECT "email_enabled", "notification_type", "updated_at", "user_id" FROM "user_notification_preferences";
DROP TABLE "user_notification_preferences";
ALTER TABLE "new_user_notification_preferences" RENAME TO "user_notification_preferences";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
