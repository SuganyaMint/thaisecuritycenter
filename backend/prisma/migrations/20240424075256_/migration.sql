/*
  Warnings:

  - Added the required column `approveDate` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` ADD COLUMN `approveDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `member_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `statusApprove` VARCHAR(191) NOT NULL DEFAULT 'wait';

-- CreateTable
CREATE TABLE `member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `memberType` VARCHAR(191) NOT NULL DEFAULT 'free',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `member_member_id_key`(`member_id`),
    UNIQUE INDEX `member_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
