/*
  Warnings:

  - Added the required column `order` to the `companyImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `companyImage` ADD COLUMN `order` INTEGER NOT NULL;