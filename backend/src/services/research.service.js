import prisma from "../config/db.js";
import { runResearchAgent } from "./researchAgent.js";
import { getCache, deleteCache, setCache } from "../utils/cache.js";

// Create research for the authenticated user
export const createResearch = async (question, userId) => {
  const research = await prisma.research.create({
    data: {
      question,
      status: "processing",
      userId,
    },
  });

  try {
    const result = await runResearchAgent(question);

    if (!result.answer) {
      throw new Error("AI agent returned an empty research report");
    }

    const updatedResearch = await prisma.$transaction(async (tx) => {
      return tx.research.update({
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

    await deleteCache(`research:all:${userId}`);

    return updatedResearch;
  } catch (error) {
    await prisma.research.update({
      where: {
        id: research.id,
      },
      data: {
        status: "failed",
      },
    });

    await deleteCache(`research:all:${userId}`);

    throw error;
  }
};

// Fetch research belonging to one user
export const getAllResearches = async (userId) => {
  const cacheKey = `research:all:${userId}`;

  const cachedResearches = await getCache(cacheKey);

  if (cachedResearches !== null) {
    console.log(`Research history for user ${userId}: Redis cache HIT`);
    return cachedResearches;
  }

  console.log(`Research history for user ${userId}: Redis cache MISS`);

  const researches = await prisma.research.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sources: true,
    },
  });

  await setCache(cacheKey, researches);

  return researches;
};

// Fetch a research record only if it belongs to the user
export const getResearchById = async (id, userId) => {
  const researchId = Number(id);
  const cacheKey = `research:${userId}:${researchId}`;

  const cachedResearch = await getCache(cacheKey);

  if (cachedResearch !== null) {
    console.log(`Research ${researchId}: Redis cache HIT`);
    return cachedResearch;
  }

  console.log(`Research ${researchId}: Redis cache MISS`);

  const research = await prisma.research.findFirst({
    where: {
      id: researchId,
      userId,
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

// Delete only a research record owned by the user
export const deleteResearch = async (id, userId) => {
  const researchId = Number(id);

  const result = await prisma.research.deleteMany({
    where: {
      id: researchId,
      userId,
    },
  });

  if (result.count === 0) {
    return false;
  }

  await Promise.all([
    deleteCache(`research:all:${userId}`),
    deleteCache(`research:${userId}:${researchId}`),
  ]);

  return true;
};
