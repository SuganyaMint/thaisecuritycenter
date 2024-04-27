/*
  Warnings:

  - You are about to drop the column `DistrictEng` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `DistrictID` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `DistrictThai` on the `address` table. All the data in the column will be lost.
  - Added the required column `AmphoeEng` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AmphoeID` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AmphoeThai` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` DROP COLUMN `DistrictEng`,
    DROP COLUMN `DistrictID`,
    DROP COLUMN `DistrictThai`,
    ADD COLUMN `AmphoeEng` VARCHAR(255) NOT NULL,
    ADD COLUMN `AmphoeID` VARCHAR(255) NOT NULL,
    ADD COLUMN `AmphoeThai` VARCHAR(255) NOT NULL;
