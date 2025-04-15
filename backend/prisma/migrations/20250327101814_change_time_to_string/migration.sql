/*
  Warnings:

  - A unique constraint covering the columns `[otp]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `otp` MODIFY `time` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `OTP_otp_key` ON `OTP`(`otp`);
