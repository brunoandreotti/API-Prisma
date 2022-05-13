-- CreateTable
CREATE TABLE `comments` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `game_score` INTEGER NOT NULL,
    `gamesId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_gamesId_fkey` FOREIGN KEY (`gamesId`) REFERENCES `games`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
