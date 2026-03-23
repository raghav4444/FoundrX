

(async () => {
    try {
        console.log("Starting a new game...");
        const startRes = await fetch("http://localhost:5000/api/start", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "TestUser",
                startupIdea: "AI startup",
                initialMoney: 10000,
                moneySource: "savings"
            })
        });
        const startData = await startRes.json();
        console.log("Start Response:", startData);
        
        if (!startData.success) {
            console.error("Failed to start game.");
            return;
        }
        
        const gameId = startData.gameId;
        console.log("Making a custom decision on game", gameId);
        
        const decRes = await fetch(`http://localhost:5000/api/decision/custom/${gameId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customAnswer: "I will partner with a leading tech firm."
            })
        });
        
        const decData = await decRes.json();
        const fs = require('fs');
        fs.writeFileSync('C:/Users/2023b/.gemini/antigravity/brain/8119cc0b-3442-49ff-bbd1-958837a8c492/test-out.json', JSON.stringify(decData, null, 2));
    } catch (e) {
        console.error("Test script failed:", e);
    }
})();
