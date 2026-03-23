import Groq from 'groq-sdk';

export const generateScenario = async (gameState) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const model = 'llama-3.3-70b-versatile';

  const prompt = `
You are a startup simulation engine. Respond ONLY in strictly valid JSON format, with no markdown code blocks or extra text.
Do not include \`\`\`json or \`\`\` in the output.

User Startup State:
Idea: ${gameState.startupIdea}
Money: $${gameState.currentMoney}
Source: ${gameState.moneySource}
Growth: ${gameState.growth}/100
Stress: ${gameState.stress}/100
Stage: Month ${gameState.stage}
Past Decisions:
${gameState.history.map(h => `- Month ${h.stage}: Chose "${h.decision}"`).join('\n')}

Context & Goal22: Carefully analyze the specific "Idea" and "Industry/Type" provided above. You must generate a scenario and choices that are HIGHLY TAILORED and UNIQUE to this exact product, industry, or service (${gameState.startupType}). Do NOT just give generic business problems (like "hire a freelancer" or "launch ads"). Give specific problems related to ${gameState.startupIdea} and its niche in ${gameState.startupType}.

CRITICAL RULE: If an option's "money" impact is negative (costs money), its "growth" impact MUST ALSO be negative or zero. Growth cannot increase if money decreases.

Generate:
- 1 realistic, engaging, and short scenario happening this month, continuing from the past decisions.
- 3 options to respond. Make them deeply relevant to the specific product/service.
- Provide clear descriptions and a numerical impact array for each option.
- The tone should be realistic, slightly ruthless, and dramatic.

OUTPUT STRUCTURE MUST BE:
{
  "scenario": "Your startup just launched its MVP, but...",
  "options": [
    {
      "id": 1,
      "title": "Launch paid ads",
      "desc": "Spend $2000 on Facebook ads but it was poorly optimized",
      "impactHint": "high cost, loss of momentum",
      "impact": { "money": -2000, "growth": -5, "stress": 5 }
    }
  ]
}
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: model,
      response_format: { type: "json_object" },
    });

    let text = chatCompletion.choices[0]?.message?.content || "";
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const parsed = JSON.parse(text);
    if (!parsed.scenario || !parsed.options || parsed.options.length !== 3) {
      throw new Error("Invalid AI response structure");
    }

    return parsed;
  } catch (error) {
    console.error('LLM generation failed, using fallback:', error);
    const fallback = getFallbackScenario(gameState);
    fallback.scenario = `[DEBUG ERROR: ${error.message}] ` + fallback.scenario;
    return fallback;
  }
};

const getFallbackScenario = (gameState) => {
  return {
    scenario: "You face a standard operational challenge this month. Bugs are piling up and team morale is dipping.",
    options: [
      {
        id: 1,
        title: "Work Overtime",
        desc: "Push the team to work late to fix everything.",
        impactHint: "Low cost, increases stress.",
        impact: { money: 0, growth: 5, stress: 15 }
      },
      {
        id: 2,
        title: "Hire a Freelancer",
        desc: "Bring in temporary help.",
        impactHint: "High cost, lowers stress.",
        impact: { money: -2000, growth: 2, stress: -10 }
      },
      {
        id: 3,
        title: "Ignore Bugs",
        desc: "Focus on sales instead of bugs.",
        impactHint: "No cost, risks growth.",
        impact: { money: +1000, growth: -5, stress: 5 }
      }
    ]
  };
};

export const generateCustomScenario = async (gameState, customText) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const model = 'llama-3.3-70b-versatile';

  const prompt = `
You are a startup simulation engine. Respond ONLY in strictly valid JSON format, with no markdown code blocks or extra text.

User Startup State:
Idea: ${gameState.startupIdea}
Money: $${gameState.currentMoney}
Source: ${gameState.moneySource}
Growth: ${gameState.growth}/100
Stress: ${gameState.stress}/100
Recent Scenario: ${gameState.lastScenario?.scenario}
Past Decisions:
${gameState.history.map(h => `- Month ${h.stage}: Chose "${h.decision}"`).join('\n')}

The user chose to provide a CUSTOM response to the Recent Scenario instead of a pre-set option:
"${customText}"

Task 1: Evaluate this custom decision. How realistic is it? What are the consequences? Generate an impact object for this decision. Money impact (number), Growth (-20 to 30), Stress (-30 to +40).
Task 2: Assume those consequences are immediately applied. Generate the NEXT realistic, engaging scenario happening this month, along with 3 standard options.

CRITICAL RULE: If any impact's "money" value is negative (costs money), its "growth" value MUST ALSO be negative or zero. Growth cannot increase if money decreases.

OUTPUT STRUCTURE MUST BE:
{
  "customImpact": {
    "title": "Custom Action",
    "desc": "Short description of the consequence of their custom action.",
    "impactHint": "Brief hint like 'High cost, negative growth'",
    "impact": { "money": -500, "growth": -5, "stress": 10 }
  },
  "nextScenario": {
    "scenario": "Your next challenge...",
    "options": [
      {
        "id": 1,
        "title": "Option 1",
        "desc": "Option description",
        "impactHint": "Low cost",
        "impact": { "money": 0, "growth": 5, "stress": 5 }
      },
      {
        "id": 2,
        "title": "Option 2",
        "desc": "Option description",
        "impactHint": "High cost, loss of momentum",
        "impact": { "money": -1000, "growth": -10, "stress": 0 }
      },
      {
        "id": 3,
        "title": "Option 3",
        "desc": "Option description",
        "impactHint": "Risky",
        "impact": { "money": 0, "growth": -5, "stress": -5 }
      }
    ]
  }
}
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: model,
      response_format: { type: "json_object" },
    });

    let text = chatCompletion.choices[0]?.message?.content || "";
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(text);
    if (!parsed.customImpact || !parsed.nextScenario) {
      throw new Error("Invalid format");
    }
    return parsed;
  } catch (error) {
    console.error('LLM custom scenario failed:', error);
    return {
      customImpact: {
        title: "Custom Approach",
        desc: "You improvised a solution.",
        impactHint: "Unpredictable results",
        impact: { money: -500, growth: 5, stress: 5 }
      },
      nextScenario: getFallbackScenario(gameState)
    };
  }
};

export const generateGameSummary = async (gameState) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const model = 'llama-3.3-70b-versatile';

  const prompt = `
You are an expert startup advisor analyzing a founder's journey. Respond ONLY in strictly valid JSON format, with no markdown code blocks or extra text.

User Startup State:
Idea: ${gameState.startupIdea}
Final Money: $${gameState.currentMoney}
Final Growth: ${gameState.growth}/100
Final Stress: ${gameState.stress}/100
Game Status: ${gameState.gameStatus}

Past Decisions Log:
${gameState.history.map(h => `- Month ${h.stage}: ${h.decision}`).join('\n')}

Task: Generate a detailed and dramatic post-game summary.
If the status is 'lost', evaluate WHY they failed based on their specific decisions. Suggest what they should have done instead.
If the status is 'won', evaluate their successful choices and provide actionable next steps to scale the startup globally.

OUTPUT STRUCTURE MUST BE:
{
  "summary": "Detailed summary explaining the outcome based on the decisions made, why they succeeded or failed, and what to do next."
}
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: model,
      response_format: { type: "json_object" },
    });

    let text = chatCompletion.choices[0]?.message?.content || "";
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(text);
    return parsed.summary;
  } catch (error) {
    console.error('LLM summary generation failed:', error);
    return gameState.gameStatus === 'won' 
      ? 'You managed to build a successful startup, but the final analytical records were lost in the chaos.'
      : 'Your startup failed. The market is unforgiving, but you can always try again.';
  }
};

