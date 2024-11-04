-- DropForeignKey
ALTER TABLE `Driver` DROP FOREIGN KEY `Driver_busId_fkey`;

-- AlterTable
ALTER TABLE `Driver` MODIFY `busId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_busId_fkey` FOREIGN KEY (`busId`) REFERENCES `Bus`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
