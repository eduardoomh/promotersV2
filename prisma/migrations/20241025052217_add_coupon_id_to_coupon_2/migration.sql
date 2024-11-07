/*
  Warnings:

  - You are about to drop the column `oupon_id` on the `coupons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `coupons` DROP COLUMN `oupon_id`,
    ADD COLUMN `coupon_id` VARCHAR(191) NULL;
