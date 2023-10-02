/*
  Warnings:

  - You are about to drop the column `image` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `ContentImg` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContentParagraph` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paragraph` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ContentImg` DROP FOREIGN KEY `ContentImg_blogId_fkey`;

-- DropForeignKey
ALTER TABLE `ContentParagraph` DROP FOREIGN KEY `ContentParagraph_blogId_fkey`;

-- AlterTable
ALTER TABLE `Blog` ADD COLUMN `paragraph` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `image`;

-- DropTable
DROP TABLE `ContentImg`;

-- DropTable
DROP TABLE `ContentParagraph`;

-- CreateTable
CREATE TABLE `ProjectImages` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` INTEGER NOT NULL,
    `filename` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ProjectImages_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogImages` (
    `id` VARCHAR(191) NOT NULL,
    `blogId` INTEGER NOT NULL,
    `filename` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BlogImages_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProjectImages` ADD CONSTRAINT `ProjectImages_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BlogImages` ADD CONSTRAINT `BlogImages_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
