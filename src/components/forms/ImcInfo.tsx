import React from "react";
import "./ImcInfo.css";

const ImcInfo: React.FC = () => (
  <aside className="imc-info">
    <h2>¿Qué es el IMC?</h2>
    <p>
      El Índice de Masa Corporal (IMC) es una medida que relaciona tu peso y altura para determinar si tienes un peso saludable. Se calcula dividiendo el peso en kilogramos por el cuadrado de la altura en metros.
    </p>
    <table>
      <thead>
        <tr>
          <th>Categoría</th>
          <th>IMC</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bajo peso</td>
          <td>&lt; 18.5</td>
        </tr>
        <tr>
          <td>Normal</td>
          <td>18.5 - 24.9</td>
        </tr>
        <tr>
          <td>Sobrepeso</td>
          <td>25 - 29.9</td>
        </tr>
        <tr>
          <td>Obesidad</td>
          <td>&ge; 30</td>
        </tr>
      </tbody>
    </table>
  </aside>
);

export default ImcInfo;
