/*
  Warnings:

  - You are about to drop the column `fieldNumber` on the `BusLocationChannel` table. All the data in the column will be lost.
  - Added the required column `latFieldNumber` to the `BusLocationChannel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longFieldNumber` to the `BusLocationChannel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BusLocationChannel` DROP COLUMN `fieldNumber`,
    ADD COLUMN `latFieldNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `longFieldNumber` VARCHAR(191) NOT NULL;
