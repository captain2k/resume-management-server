-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "duration" INTEGER NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technology-project" (
    "id" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "technology-project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "technology-project_technologyId_projectId_key" ON "technology-project"("technologyId", "projectId");

-- AddForeignKey
ALTER TABLE "technology-project" ADD CONSTRAINT "technology-project_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technology-project" ADD CONSTRAINT "technology-project_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
