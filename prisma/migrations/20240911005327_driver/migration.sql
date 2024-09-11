/*
  Warnings:

  - Added the required column `busName` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driverId` to the `Bus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bus` ADD COLUMN `busName` VARCHAR(191) NOT NULL,
    ADD COLUMN `driverId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Driver` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bus` ADD CONSTRAINT `Bus_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
