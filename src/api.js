export async function generatePlan(userData) {
  const response = await fetch("https://training-bot-backend-a619.onrender.com/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch training plan");
  }

  const data = await response.json();
  return data.plan;
}
