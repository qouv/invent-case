CREATE TABLE "borrowed_books" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "borrowed_books_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"book_id" integer NOT NULL,
	"borrowed_at" timestamp NOT NULL,
	"returned_at" timestamp,
	"score" integer
);
--> statement-breakpoint
ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;