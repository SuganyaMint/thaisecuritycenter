/*
  Warnings:

  - Added the required column `company` to the `register_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `register_log` ADD COLUMN `company` VARCHAR(191) NOT NULL;
