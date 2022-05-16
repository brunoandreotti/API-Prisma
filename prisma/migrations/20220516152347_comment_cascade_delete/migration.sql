-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_gameId_fkey`;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `games`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
