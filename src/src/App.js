import React, { useState } from "react";
import { generatePlan } from "./api";

function App() {
  const [formData, setFormData] = useState({
    age: 28,
    training_age: 3,
    goals: "hypertrophy, gymnastics skill, half marathon",
    availability: {
      Monday: "available",
      Tuesday: "available",
      Wednesday: "available",
      Thursday: "available",
      Friday: "available",
      Saturday: "available",
      Sunday: "available",
    },
    equipment: "barbell, dumbbells, pull-up bar, treadmill",
    max_pullup: 8,
    max_hspu: 5,
    week: 1,
    feedback: {},
  });
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const generatedPlan = await generatePlan(formData);
      setPlan(generatedPlan);
    } catch (error) {
      setPlan("Error generating plan.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>Hybrid Training AI Coach</h1>
      <label>
        Age:{" "}
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Training Age (years):{" "}
        <input
          type="number"
          name="training_age"
          value={formData.training_age}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Goals:{" "}
        <input
          type="text"
          name="goals"
          value={formData.goals}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </label>
      <br />
      <label>
        Equipment:{" "}
        <input
          type="text"
          name="equipment"
          value={formData.equipment}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </label>
      <br />
      <label>
        Max Pull-Up Reps:{" "}
        <input
          type="number"
          name="max_pullup"
          value={formData.max_pullup}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Max HSPU Reps:{" "}
        <input
          type="number"
          name="max_hspu"
          value={formData.max_hspu}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Current Week:{" "}
        <input
          type="number"
          name="week"
          value={formData.week}
          onChange={handleChange}
        />
      </label>
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Plan"}
      </button>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          background: "#eee",
          padding: 10,
          marginTop: 20,
          maxHeight: 400,
          overflowY: "auto",
        }}
      >
        {plan}
      </pre>
    </div>
  );
}

export default App;
