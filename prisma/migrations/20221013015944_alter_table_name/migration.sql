/*
  Warnings:

  - You are about to drop the `technologies_projects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "technologies_projects" DROP CONSTRAINT "technologies_projects_projectId_fkey";

-- DropForeignKey
ALTER TABLE "technologies_projects" DROP CONSTRAINT "technologies_projects_technologyId_fkey";

-- DropTable
DROP TABLE "technologies_projects";

-- CreateTable
CREATE TABLE "technology-project" (
    "id" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "technology-project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "technology-project" ADD CONSTRAINT "technology-project_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technology-project" ADD CONSTRAINT "technology-project_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
