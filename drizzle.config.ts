import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: [
		"./src/db/usersSchema.ts",
		"./src/db/booksSchema.ts",
		"./src/db/borrowedBooksSchema.ts",
	],
	out: "./drizzle",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
	verbose: true,
	strict: true
});