-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" DATETIME,
    "password_hash" TEXT,
    "image" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "authenticators" (
    "user_id" TEXT NOT NULL,
    "credential_id" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "credential_public_key" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credential_device_type" TEXT NOT NULL,
    "credential_backed_up" BOOLEAN NOT NULL,
    "transports" TEXT,

    PRIMARY KEY ("user_id", "credential_id"),
    CONSTRAINT "authenticators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "friendships" (
    "user_id_1" TEXT NOT NULL,
    "user_id_2" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "requested_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accepted_at" DATETIME,

    PRIMARY KEY ("user_id_1", "user_id_2"),
    CONSTRAINT "friendships_user_id_1_fkey" FOREIGN KEY ("user_id_1") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "friendships_user_id_2_fkey" FOREIGN KEY ("user_id_2") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "creator_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "groups_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "group_members" (
    "group_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'MEMBER',
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("group_id", "user_id"),
    CONSTRAINT "group_members_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "group_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "blocked_slots" (
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
    CONSTRAINT "blocked_slots_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "meetings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    "organizer_id" TEXT NOT NULL,
    "location" TEXT,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "meetings_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "meeting_participants" (
    "meeting_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("meeting_id", "user_id"),
    CONSTRAINT "meeting_participants_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "meetings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "meeting_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "related_entity_type" TEXT,
    "related_entity_id" TEXT,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_notification_preferences" (
    "user_id" TEXT NOT NULL,
    "notification_type" TEXT NOT NULL,
    "email_enabled" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("user_id", "notification_type"),
    CONSTRAINT "user_notification_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "email_queue" (
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
    CONSTRAINT "email_queue_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "calendar_export_tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "scope" TEXT NOT NULL DEFAULT 'MEETINGS_ONLY',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_accessed_at" DATETIME,
    CONSTRAINT "calendar_export_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "calendar_subscriptions" (
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
    CONSTRAINT "calendar_subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "external_events" (
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
    CONSTRAINT "external_events_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "calendar_subscriptions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE INDEX "idx_friendships_user2_status" ON "friendships"("user_id_2", "status");

-- CreateIndex
CREATE INDEX "groups_creator_id_idx" ON "groups"("creator_id");

-- CreateIndex
CREATE INDEX "group_members_user_id_idx" ON "group_members"("user_id");

-- CreateIndex
CREATE INDEX "blocked_slots_user_id_start_time_end_time_idx" ON "blocked_slots"("user_id", "start_time", "end_time");

-- CreateIndex
CREATE INDEX "blocked_slots_user_id_is_recurring_idx" ON "blocked_slots"("user_id", "is_recurring");

-- CreateIndex
CREATE INDEX "meetings_start_time_end_time_idx" ON "meetings"("start_time", "end_time");

-- CreateIndex
CREATE INDEX "meetings_organizer_id_idx" ON "meetings"("organizer_id");

-- CreateIndex
CREATE INDEX "meetings_status_idx" ON "meetings"("status");

-- CreateIndex
CREATE INDEX "idx_participants_user_status" ON "meeting_participants"("user_id", "status");

-- CreateIndex
CREATE INDEX "idx_notifications_user_read_time" ON "notifications"("user_id", "is_read", "created_at");

-- CreateIndex
CREATE INDEX "idx_email_queue_pending_jobs" ON "email_queue"("status", "scheduled_at");

-- CreateIndex
CREATE INDEX "idx_email_queue_user_history" ON "email_queue"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "calendar_export_tokens_token_key" ON "calendar_export_tokens"("token");

-- CreateIndex
CREATE INDEX "calendar_export_tokens_user_id_idx" ON "calendar_export_tokens"("user_id");

-- CreateIndex
CREATE INDEX "calendar_subscriptions_user_id_is_enabled_idx" ON "calendar_subscriptions"("user_id", "is_enabled");

-- CreateIndex
CREATE INDEX "external_events_subscription_id_start_time_end_time_idx" ON "external_events"("subscription_id", "start_time", "end_time");

-- CreateIndex
CREATE INDEX "external_events_subscription_id_show_as_free_idx" ON "external_events"("subscription_id", "show_as_free");

-- CreateIndex
CREATE UNIQUE INDEX "external_events_subscription_id_ical_uid_key" ON "external_events"("subscription_id", "ical_uid");
