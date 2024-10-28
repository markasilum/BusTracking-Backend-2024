/*
  Warnings:

  - You are about to drop the column `firstName` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `driver` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `driver` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `middleName`,
    DROP COLUMN `phone`,
    ADD COLUMN `userId` VARCHAR(191) NULL;
