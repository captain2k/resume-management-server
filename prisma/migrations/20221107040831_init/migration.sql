-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'HR', 'DEV');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'HR',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "working_history" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "responsibilities" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "working_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "introduction" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technology-project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "technologyId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "technology-project_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "technology_name_key" ON "technology"("name");

-- CreateIndex
CREATE UNIQUE INDEX "technology-project_technologyId_projectId_key" ON "technology-project"("technologyId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "working_history-technology_technologyId_workingHistoryId_key" ON "working_history-technology"("technologyId", "workingHistoryId");

-- AddForeignKey
ALTER TABLE "working_history" ADD CONSTRAINT "working_history_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "working_history" ADD CONSTRAINT "working_history_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technology-project" ADD CONSTRAINT "technology-project_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technology-project" ADD CONSTRAINT "technology-project_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "working_history-technology" ADD CONSTRAINT "working_history-technology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "working_history-technology" ADD CONSTRAINT "working_history-technology_workingHistoryId_fkey" FOREIGN KEY ("workingHistoryId") REFERENCES "working_history"("id") ON DELETE CASCADE ON UPDATE CASCADE;
