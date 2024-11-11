-- AlterTable
ALTER TABLE `BusChannel` ADD COLUMN `apiKey` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `BusLocationChannel` ADD COLUMN `apiKey` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `RouteSection` ADD COLUMN `apiKey` VARCHAR(191) NULL;
