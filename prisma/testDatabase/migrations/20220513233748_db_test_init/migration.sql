-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "game_score" INTEGER NOT NULL,
    "gamesId" TEXT,
    CONSTRAINT "comments_gamesId_fkey" FOREIGN KEY ("gamesId") REFERENCES "games" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
