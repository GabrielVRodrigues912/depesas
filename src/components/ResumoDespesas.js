import React, { useState } from 'react';

function ResumoDespesas({ resumo }) {
  const [ordenacao, setOrdenacao] = useState('valor_desc'); // valor_desc, valor_asc, alfabetica

  const ordenar = (dados) => {
    const lista = Object.entries(dados);

    switch (ordenacao) {
      case 'valor_asc':
        return lista.sort((a, b) => a[1] - b[1]);
      case 'valor_desc':
        return lista.sort((a, b) => b[1] - a[1]);
      case 'alfabetica':
        return lista.sort((a, b) => a[0].localeCompare(b[0]));
      default:
        return lista;
    }
  };

  const categoriasOrdenadas = resumo.por_categoria
    ? ordenar(resumo.por_categoria)
    : [];

  return (
    <div className="resumo">
      <h2>Resumo de Despesas</h2>
      <p><strong>Total Geral:</strong> R$ {resumo.total_geral?.toFixed(2)}</p>

      <label htmlFor="ordenacao">Ordenar por: </label>
      <select
        id="ordenacao"
        value={ordenacao}
        onChange={(e) => setOrdenacao(e.target.value)}
      >
        <option value="valor_desc">Valor (decrescente)</option>
        <option value="valor_asc">Valor (crescente)</option>
        <option value="alfabetica">Categoria (A-Z)</option>
      </select>

      <ul>
        {categoriasOrdenadas.map(([categoria, total]) => (
          <li key={categoria}>
            {categoria}: R$ {total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResumoDespesas;
