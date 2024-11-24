/*
  Warnings:

  - Added the required column `busName` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Made the column `isArchived` on table `Route` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Bus` ADD COLUMN `busName` VARCHAR(191) NOT NULL,
    ADD COLUMN `isArchived` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Route` MODIFY `isArchived` BOOLEAN NOT NULL DEFAULT false;
