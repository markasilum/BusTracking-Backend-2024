-- AlterTable
ALTER TABLE `bus` MODIFY `driverId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Bus` ADD CONSTRAINT `Bus_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
