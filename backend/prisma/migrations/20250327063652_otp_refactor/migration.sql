/*
  Warnings:

  - You are about to alter the column `time` on the `otp` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `otp` MODIFY `time` INTEGER NOT NULL;
