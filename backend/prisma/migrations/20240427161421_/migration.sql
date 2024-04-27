/*
  Warnings:

  - Added the required column `hire` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` ADD COLUMN `hire` VARCHAR(191) NOT NULL;
