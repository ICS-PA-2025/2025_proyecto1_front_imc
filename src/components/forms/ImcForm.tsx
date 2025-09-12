import React, {useState} from "react";
import "./ImcForm.css";
import imcService from "../../services/imcService.ts";
import {ImcResult} from "../../dto/imc-result.dto.ts";


function ImcForm() {
    const [altura, setAltura] = useState("");
    const [peso, setPeso] = useState("");
    const [resultado, setResultado] = useState<ImcResult | null>(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const alturaNum = parseFloat(altura);
        const pesoNum = parseFloat(peso);

        if (isNaN(alturaNum) || isNaN(pesoNum) || alturaNum <= 0 || pesoNum <= 0) {
            setError("Por favor, ingresa valores válidos (positivos y numéricos).");
            setResultado(null);
            return;
        }

        try {

            const response = await imcService.calcularImc({
                altura: alturaNum,
                peso: pesoNum,
            });

            setResultado(response);
            setError("");
        } catch (err) {
            setError(
                "Error al calcular el IMC. Verifica si el backend está corriendo."
            );
            setResultado(null);
        }
    };

    return (
        <div className="imc-form-container">
            <h1>Calculadora de IMC</h1>
            <form className="imc-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="altura">Altura (m):</label>
                    <input
                        id="altura"
                        type="number"
                        value={altura}
                        onChange={(e) => setAltura(e.target.value)}
                        step="0.01"
                        min="0.1"
                    />
                </div>
                <div>
                    <label htmlFor="peso">Peso (kg):</label>
                    <input
                        id="peso"
                        type="number"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                        min="1"
                    />
                </div>
                <button type="submit">Calcular</button>
            </form>

            {resultado && (
                <div className="imc-result">
                    <p>IMC: {resultado.imc.toFixed(2)}</p>
                    <p>Categoría: {resultado.categoria}</p>
                </div>
            )}

            {error && (
                <div className="imc-error">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}

export default ImcForm;
