-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "developer" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "games_name_key" ON "games"("name");
