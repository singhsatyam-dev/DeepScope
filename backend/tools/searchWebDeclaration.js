export const searchWebDeclaration = {
  type: "function",

  name: "search_web",

  description:
    "Searches the internet for up-to-date information. " +
    "Use this tool when answering research questions " +
    "that require current facts, news, or reliable sources.",

  parameters: {
    type: "object",

    properties: {
      query: {
        type: "string",
        description:
          "A specific web search query relevant to the user's question.",
      },
    },

    required: ["query"],
  },
};
