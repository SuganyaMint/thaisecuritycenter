/*
  Warnings:

  - Added the required column `IFrame_Google` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` ADD COLUMN `IFrame_Google` LONGTEXT NOT NULL;
