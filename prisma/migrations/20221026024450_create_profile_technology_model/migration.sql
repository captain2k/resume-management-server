-- CreateTable
CREATE TABLE "ProfileTechnology" (
    "id" TEXT NOT NULL,
    "yoe" DECIMAL(65,30) NOT NULL,
    "profileId" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,

    CONSTRAINT "ProfileTechnology_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfileTechnology" ADD CONSTRAINT "ProfileTechnology_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileTechnology" ADD CONSTRAINT "ProfileTechnology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
