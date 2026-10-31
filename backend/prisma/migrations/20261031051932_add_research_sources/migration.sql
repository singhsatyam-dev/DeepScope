-- AlterTable
ALTER TABLE "researches" ADD COLUMN     "searchesPerformed" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "research_sources" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "content" TEXT,
    "relevanceScore" DOUBLE PRECISION,
    "researchId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "research_sources_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "research_sources_researchId_idx" ON "research_sources"("researchId");

-- CreateIndex
CREATE UNIQUE INDEX "research_sources_researchId_url_key" ON "research_sources"("researchId", "url");

-- AddForeignKey
ALTER TABLE "research_sources" ADD CONSTRAINT "research_sources_researchId_fkey" FOREIGN KEY ("researchId") REFERENCES "researches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
