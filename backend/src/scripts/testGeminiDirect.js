import "dotenv/config";

const url = `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;

const testGemini = async () => {
  try {
    console.log("Sending direct request to Gemini...");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Reply with exactly: Gemini is working!",
              },
            ],
          },
        ],
      }),
      signal: AbortSignal.timeout(20000),
    });

    console.log("HTTP Status:", response.status);

    const data = await response.json();

    console.log("API Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Request failed:", error);
  }
};

testGemini();
