/*
  Warnings:

  - You are about to drop the column `language` on the `article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `article` DROP COLUMN `language`,
    MODIFY `detail` LONGTEXT NOT NULL,
    MODIFY `keywords` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `contact_log` MODIFY `detail` LONGTEXT NOT NULL,
    MODIFY `ip` VARCHAR(191) NOT NULL;
