-- DropForeignKey
ALTER TABLE `song` DROP FOREIGN KEY `Song_artistId_fkey`;

-- DropIndex
DROP INDEX `Song_artistId_fkey` ON `song`;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
