/*
  Warnings:

  - The primary key for the `otp` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX `otp_key_key` ON `otp`;

-- AlterTable
ALTER TABLE `otp` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `time` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);
