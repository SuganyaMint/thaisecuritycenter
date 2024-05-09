/*
  Warnings:

  - Added the required column `geoName` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geocode` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` ADD COLUMN `geoName` VARCHAR(255) NOT NULL,
    ADD COLUMN `geocode` VARCHAR(255) NOT NULL;
