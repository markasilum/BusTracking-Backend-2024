/*
  Warnings:

  - A unique constraint covering the columns `[busId]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - Made the column `busId` on table `Driver` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Driver` DROP FOREIGN KEY `Driver_busId_fkey`;

-- AlterTable
ALTER TABLE `Driver` MODIFY `busId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Driver_busId_key` ON `Driver`(`busId`);

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_busId_fkey` FOREIGN KEY (`busId`) REFERENCES `Bus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
