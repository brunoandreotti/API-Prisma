/*
  Warnings:

  - You are about to drop the column `gamesId` on the `comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_gamesId_fkey`;

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `gamesId`,
    ADD COLUMN `gameId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `games`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
