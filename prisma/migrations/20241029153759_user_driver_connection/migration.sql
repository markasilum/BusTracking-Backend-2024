/*
  Warnings:

  - You are about to drop the column `firstName` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Driver` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[driverId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Driver` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `middleName`,
    DROP COLUMN `phone`,
    DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `driverId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_driverId_key` ON `User`(`driverId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
