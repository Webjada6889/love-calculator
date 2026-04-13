const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Love logic (same as frontend but on server)
function calculateLove(name1, name2) {
    const combined = (name1 + name2).toLowerCase().replace(/\s+/g, '');

    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        hash += combined.charCodeAt(i);
    }

    return (hash % 61) + 40;
}

app.post("/calculate", (req, res) => {
    const { name1, name2 } = req.body;

    if (!name1 || !name2) {
        return res.json({ error: "Enter both names" });
    }

    const loveScore = calculateLove(name1, name2);

    let message = "";
    if (loveScore > 90) message = "A match made in heaven! 💍";
    else if (loveScore > 70) message = "Strong chemistry! 🔥";
    else if (loveScore > 50) message = "There's potential 😊";
    else message = "Maybe just friends ☕";

    res.json({ loveScore, message });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});