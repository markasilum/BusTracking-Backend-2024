/*
  Warnings:

  - You are about to drop the column `name` on the `driver` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `driver` DROP COLUMN `name`,
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL,
    ADD COLUMN `middleName` VARCHAR(191) NULL;
