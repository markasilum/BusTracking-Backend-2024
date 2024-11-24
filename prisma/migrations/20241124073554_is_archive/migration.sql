/*
  Warnings:

  - Added the required column `busName` to the `Bus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bus` ADD COLUMN `busName` VARCHAR(191) NOT NULL,
    ADD COLUMN `isArchived` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Route` ADD COLUMN `isArchived` BOOLEAN NOT NULL DEFAULT false;
