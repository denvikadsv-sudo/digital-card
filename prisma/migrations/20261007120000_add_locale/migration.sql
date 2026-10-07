-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('EN', 'RU');

-- DropIndex
DROP INDEX "Profile_slug_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "locale" "Locale" NOT NULL DEFAULT 'EN';

-- CreateIndex
CREATE UNIQUE INDEX "Profile_slug_locale_key" ON "Profile"("slug", "locale");

