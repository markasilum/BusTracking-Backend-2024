/*
  Warnings:

  - You are about to drop the column `busId` on the `Driver` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[driverId]` on the table `Bus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `driverId` to the `Bus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Driver` DROP FOREIGN KEY `Driver_busId_fkey`;

-- AlterTable
ALTER TABLE `Bus` ADD COLUMN `driverId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Driver` DROP COLUMN `busId`;

-- CreateIndex
CREATE UNIQUE INDEX `Bus_driverId_key` ON `Bus`(`driverId`);

-- AddForeignKey
ALTER TABLE `Bus` ADD CONSTRAINT `Bus_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
