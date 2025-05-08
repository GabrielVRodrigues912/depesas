import React from 'react';

function ResumoDespesas({ resumo }) {
  return (
    <div className="resumo">
      <h2>Resumo de Despesas</h2>
      <p><strong>Total Geral:</strong> R$ {resumo.total_geral?.toFixed(2)}</p>
      <ul>
        {resumo.por_categoria &&
          Object.entries(resumo.por_categoria).map(([categoria, total]) => (
            <li key={categoria}>
              {categoria}: R$ {total.toFixed(2)}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ResumoDespesas;
