CREATE TABLE IF NOT EXISTS "product" (
	"id" serial NOT NULL,
	"name" text,
	"description" text,
	"price" numeric,
	"created_at" timestamp,
	"updated_at" timestamp
);
