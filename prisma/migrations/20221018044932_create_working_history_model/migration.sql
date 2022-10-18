/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updateAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `technology-project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "technology" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "technology-project" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "working_history" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "responsibilities" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "working_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "working_history-technology" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "technologyId" TEXT NOT NULL,
    "workingHistoryId" TEXT NOT NULL,

    CONSTRAINT "working_history-technology_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "working_history-technology_technologyId_workingHistoryId_key" ON "working_history-technology"("technologyId", "workingHistoryId");

-- AddForeignKey
ALTER TABLE "working_history" ADD CONSTRAINT "working_history_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "working_history" ADD CONSTRAINT "working_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "working_history-technology" ADD CONSTRAINT "working_history-technology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "working_history-technology" ADD CONSTRAINT "working_history-technology_workingHistoryId_fkey" FOREIGN KEY ("workingHistoryId") REFERENCES "working_history"("id") ON DELETE CASCADE ON UPDATE CASCADE;
