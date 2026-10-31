import prisma from "../config/db.js";
import { runResearchAgent } from "./researchAgent.js";
import { getCache, deleteCache, setCache } from "../utils/cache.js";

// Create research and generate its report
export const createResearch = async (question) => {
  // 1. Create initial research record
  const research = await prisma.research.create({
    data: {
      question,
      status: "processing",
    },
  });

  try {
    // 2. Run the AI research agent
    const result = await runResearchAgent(question);

    if (!result.answer) {
      throw new Error("AI agent returned an empty research report");
    }

    // 3. Save report and sources together
    const updatedResearch = await prisma.$transaction(async (tx) => {
      return await tx.research.update({
        where: {
          id: research.id,
        },

        data: {
          report: result.answer,
          searchesPerformed: result.searchesPerformed,
          status: "completed",

          sources: {
            create: result.sources.map((source) => ({
              title: source.title || "Untitled source",
              url: source.url,
              content: source.content || null,
              relevanceScore: source.score ?? null,
            })),
          },
        },

        include: {
          sources: true,
        },
      });
    });

    await deleteCache("research:all");

    return updatedResearch;
  } catch (error) {
    // 4. Mark the research as failed
    await prisma.research.update({
      where: {
        id: research.id,
      },
      data: {
        status: "failed",
      },
    });

    throw error;
  }
};

// Fetch all research records
export const getAllResearches = async () => {
  const cacheKey = "research:all";

  // Check Redis first
  const cachedResearches = await getCache(cacheKey);

  if (cachedResearches !== null) {
    console.log("Research history: Redis cache HIT");
    return cachedResearches;
  }

  console.log("Research history: Redis cache MISS");

  // Fetch from PostgreSQL
  const researches = await prisma.research.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sources: true,
    },
  });

  // Store in Redis for 2 minutes
  await setCache(cacheKey, researches);

  return researches;
};

// Fetch a single research record
export const getResearchById = async (id) => {
  const researchId = Number(id);
  const cacheKey = `research:${researchId}`;

  // Check Redis first
  const cachedResearch = await getCache(cacheKey);

  if (cachedResearch !== null) {
    console.log(`Research ${researchId}: Redis cache HIT`);
    return cachedResearch;
  }

  console.log(`Research ${researchId}: Redis cache MISS`);

  // Fetch from PostgreSQL
  const research = await prisma.research.findUnique({
    where: {
      id: researchId,
    },
    include: {
      sources: true,
    },
  });

  if (research) {
    await setCache(cacheKey, research);
  }

  return research;
};

// Delete a research record
export const deleteResearch = async (id) => {
  const researchId = Number(id);

  const deletedResearch = await prisma.research.delete({
    where: {
      id: researchId,
    },
  });

  // Invalidate related cache entries
  await deleteCache("research:all");
  await deleteCache(`research:${researchId}`);

  return deletedResearch;
};
