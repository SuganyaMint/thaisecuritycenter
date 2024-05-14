/*
  Warnings:

  - A unique constraint covering the columns `[article_id]` on the table `article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `article_id` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `article_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `article_article_id_key` ON `article`(`article_id`);
