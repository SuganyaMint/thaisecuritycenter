-- AlterTable
ALTER TABLE `company` MODIFY `description` LONGTEXT NOT NULL,
    MODIFY `address` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `contact_log` MODIFY `ip` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `register_log` MODIFY `detail` LONGTEXT NOT NULL;
