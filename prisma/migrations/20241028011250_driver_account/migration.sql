/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `driver` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `driver` MODIFY `status` VARCHAR(191) NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Driver_userId_key` ON `Driver`(`userId`);

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
