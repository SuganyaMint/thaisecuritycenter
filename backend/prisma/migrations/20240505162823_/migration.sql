/*
  Warnings:

  - Added the required column `nearBKK` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` ADD COLUMN `nearBKK` VARCHAR(255) NOT NULL;
