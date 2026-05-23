/*
  Warnings:

  - You are about to drop the column `cir` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `fsi` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `targetGlucose` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `carb_ratio` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `insulin_sensitivity` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_glucose` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "cir",
DROP COLUMN "fsi",
DROP COLUMN "targetGlucose",
ADD COLUMN     "carb_ratio" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "insulin_sensitivity" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "target_glucose" DECIMAL(65,30) NOT NULL;
