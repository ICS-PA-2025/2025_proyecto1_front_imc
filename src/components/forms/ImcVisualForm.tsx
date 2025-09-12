import React, { useState } from "react";
import "./ImcVisualForm.css";
import imcService from "../../services/imcService";

const imcCategories = [
  { min: 0, max: 18, label: "Bajo peso", color: "#dbeafe" },
  { min: 18, max: 25, label: "Peso normal", color: "#b4e197" },
  { min: 25, max: 30, label: "Exceso de peso", color: "#ffe29a" },
  { min: 30, max: 35, label: "Obesidad Grado I", color: "#ffc94a" },
  { min: 35, max: 40, label: "Obesidad Grado II", color: "#ffa600" },
  { min: 40, max: 45, label: "Obesidad Grado III", color: "#f44336" },
];

function getImcCategory(imc: number) {
  for (const cat of imcCategories) {
    if (imc >= cat.min && imc < cat.max) return cat;
  }
  if (imc >= 45) return { label: "Obesidad extrema", color: "#b71c1c" };
  return { label: "No clasificado", color: "#ccc" };
}

const ImcVisualForm: React.FC = () => {
  const [altura, setAltura] = useState(0);
  const [peso, setPeso] = useState(0);
  const [imc, setImc] = useState<number | null>(null);
  const [categoria, setCategoria] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (altura > 0 && peso > 0) {
      setLoading(true);
      try {
        const response = await imcService.calcularImc({ altura, peso });
        setImc(response.imc);
        setCategoria(response.categoria);
      } catch (err: any) {
        setError(err.message || "Error al consultar el backend");
        setImc(null);
        setCategoria("");
      } finally {
        setLoading(false);
      }
    } else {
      setImc(null);
      setCategoria("");
      setError("Por favor, ingresa valores válidos");
    }
  };

  return (
    <div className="imc-visual-container">
      <form className="imc-visual-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="altura">Tu altura</label>
          <input
            id="altura"
            type="number"
            min="0.5"
            max="2.5"
            step="0.01"
            value={altura || ""}
            onChange={e => setAltura(Number(e.target.value))}
            placeholder="m"
          />
        </div>
        <div>
          <label htmlFor="peso">Tu peso</label>
          <input
            id="peso"
            type="number"
            min="10"
            max="300"
            value={peso || ""}
            onChange={e => setPeso(Number(e.target.value))}
            placeholder="kg"
          />
        </div>
        <button type="submit">Calcular IMC</button>
      </form>
      <div className="imc-visual-result">
        {loading && <p>Calculando...</p>}
        {error && <p style={{ color: "#d32f2f" }}>{error}</p>}
        {imc !== null && !loading && !error && (
          <>
            <h2>Tu IMC es</h2>
            <div className="imc-visual-value">
              {imc.toFixed(1)}
            </div>
            <div className="imc-visual-category">
              Clasificación: <strong>{categoria}</strong>
            </div>
          </>
        )}
      </div>
      <div className="imc-visual-table">
        <h3>Tu clasificación de IMC</h3>
        <div className="imc-table-row">
          {imcCategories.map(cat => (
            <div
              key={cat.label}
              className={`imc-table-cell${categoria === cat.label ? " selected" : ""}`}
              style={{ background: cat.color }}
            >
              <div>{cat.min} - {cat.max}</div>
              <div>{cat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImcVisualForm;
