/*
  Warnings:

  - You are about to drop the column `driverId` on the `Bus` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[busId]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,busId]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `busId` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Bus` DROP FOREIGN KEY `Bus_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_driverId_fkey`;

-- AlterTable
ALTER TABLE `Bus` DROP COLUMN `driverId`;

-- AlterTable
ALTER TABLE `Driver` ADD COLUMN `busId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `driverId`;

-- CreateIndex
CREATE UNIQUE INDEX `Driver_userId_key` ON `Driver`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Driver_busId_key` ON `Driver`(`busId`);

-- CreateIndex
CREATE UNIQUE INDEX `Driver_userId_busId_key` ON `Driver`(`userId`, `busId`);

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_busId_fkey` FOREIGN KEY (`busId`) REFERENCES `Bus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
