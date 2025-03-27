/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `otp` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `otp_key_key` ON `otp`(`key`);
