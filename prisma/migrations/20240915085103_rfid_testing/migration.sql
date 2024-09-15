/*
  Warnings:

  - You are about to drop the column `busId` on the `passenger` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `passenger` DROP FOREIGN KEY `Passenger_busId_fkey`;

-- AlterTable
ALTER TABLE `passenger` DROP COLUMN `busId`;
