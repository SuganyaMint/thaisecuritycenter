-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TambonID` VARCHAR(255) NOT NULL,
    `TambonThai` VARCHAR(255) NOT NULL,
    `TambonEng` VARCHAR(255) NOT NULL,
    `DistrictID` VARCHAR(255) NOT NULL,
    `DistrictThai` VARCHAR(255) NOT NULL,
    `DistrictEng` VARCHAR(255) NOT NULL,
    `ProvinceID` VARCHAR(255) NOT NULL,
    `ProvinceThai` VARCHAR(255) NOT NULL,
    `ProvinceEng` VARCHAR(255) NOT NULL,
    `Region` VARCHAR(255) NOT NULL,
    `PostCodeMain` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
