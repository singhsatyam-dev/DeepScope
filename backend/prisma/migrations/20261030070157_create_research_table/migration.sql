-- CreateTable
CREATE TABLE "researches" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(1000) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "report" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "researches_pkey" PRIMARY KEY ("id")
);
