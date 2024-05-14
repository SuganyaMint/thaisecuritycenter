-- CreateTable
CREATE TABLE `article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `language` VARCHAR(191) NOT NULL,
    `module` VARCHAR(191) NOT NULL,
    `module_cat` VARCHAR(191) NOT NULL,
    `topic` VARCHAR(191) NOT NULL,
    `page_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `keywords` VARCHAR(191) NOT NULL,
    `sender` VARCHAR(191) NOT NULL,
    `member_id` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `visited` INTEGER NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `published` INTEGER NOT NULL,
    `hilight` INTEGER NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
