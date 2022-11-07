/*
  Warnings:

  - Added the required column `updateAt` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "profile_technology" (
    "id" TEXT NOT NULL,
    "yoe" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,

    CONSTRAINT "profile_technology_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "profile_technology" ADD CONSTRAINT "profile_technology_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_technology" ADD CONSTRAINT "profile_technology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
