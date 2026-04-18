import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return Response.json(
        {
          error:
            "Gemini API key not configured. Please add GEMINI_API_KEY to .env.local",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { skills, interests, strengths } = body;

    if (
      !skills?.length ||
      !interests?.length ||
      !strengths?.length
    ) {
      return Response.json(
        { error: "Please provide skills, interests, and strengths." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `You are an expert career counselor and job market analyst. Based on the following profile, suggest exactly 5 career paths that would be the best fit.

## User Profile
- **Skills**: ${skills.join(", ")}
- **Interests**: ${interests.join(", ")}
- **Strengths**: ${strengths.join(", ")}

## Instructions
For each career path, provide:
1. **title**: The career title (e.g., "Full Stack Developer", "Data Scientist")
2. **matchPercentage**: A realistic match percentage (60-98) based on how well their profile fits
3. **description**: A 2-3 sentence description of why this career suits them specifically
4. **requiredSkills**: An array of 4-6 key skills needed (include ones they already have AND ones to develop)
5. **salaryRange**: Realistic salary range in USD (e.g., "$80,000 - $130,000")
6. **growthOutlook**: One of "Very High", "High", "Moderate", or "Stable"
7. **roadmap**: An array of 4 actionable steps they should take to pursue this career

Sort by matchPercentage descending.

IMPORTANT: Return ONLY a valid JSON array. No markdown, no code fences, no explanation. Just the raw JSON array.

Example format:
[
  {
    "title": "Career Title",
    "matchPercentage": 92,
    "description": "Description here.",
    "requiredSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
    "salaryRange": "$X - $Y",
    "growthOutlook": "High",
    "roadmap": ["Step 1", "Step 2", "Step 3", "Step 4"]
  }
]`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the JSON from the response (handle potential markdown wrapping)
    let cleanJson = responseText.trim();
    // Strip markdown code fences if present
    if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson
        .replace(/^```(?:json)?\s*\n?/, "")
        .replace(/\n?```\s*$/, "");
    }

    const careers = JSON.parse(cleanJson);

    if (!Array.isArray(careers)) {
      throw new Error("Invalid response format from AI");
    }

    return Response.json({ careers });
  } catch (error) {
    console.error("Career generation error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to generate career paths";

    console.warn("API failed, falling back to mock data. Error:", message);

    // Fallback to mock data to ensure the app stays usable during the hackathon
    const MOCK_CAREERS = [
      {
        title: "Software Engineer",
        matchPercentage: 95,
        description: "A great fit based on your technical skills and problem-solving abilities. (Mock fallback due to API quota)",
        requiredSkills: ["JavaScript", "React", "Node.js", "System Design"],
        salaryRange: "$90,000 - $140,000",
        growthOutlook: "Very High",
        roadmap: [
          "Master core web technologies",
          "Build full-stack side projects",
          "Contribute to open source",
          "Practice data structures and algorithms"
        ]
      },
      {
        title: "Data Analyst",
        matchPercentage: 88,
        description: "Your analytical strength makes you well-suited for extracting insights from complex data. (Mock fallback)",
        requiredSkills: ["SQL", "Python", "Data Visualization", "Communication"],
        salaryRange: "$70,000 - $110,000",
        growthOutlook: "High",
        roadmap: [
          "Learn advanced SQL",
          "Master Pandas and NumPy",
          "Build a portfolio of data projects",
          "Learn a BI tool like Tableau or PowerBI"
        ]
      },
      {
        title: "Product Manager",
        matchPercentage: 82,
        description: "Your combination of technical understanding and leadership strengths points towards product management. (Mock fallback)",
        requiredSkills: ["Agile/Scrum", "User Empathy", "Strategic Planning", "Communication"],
        salaryRange: "$100,000 - $160,000",
        growthOutlook: "High",
        roadmap: [
          "Gain experience coordinating technical teams",
          "Study product lifecycle management",
          "Take a Scrum Master or Product Owner certification",
          "Transition internally to a PM role"
        ]
      }
    ];

    return Response.json({ careers: MOCK_CAREERS });
  }
}
