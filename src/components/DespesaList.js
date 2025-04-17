import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DespesaList = ({ despesas }) => {
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/despesas/${id}`);
      alert('Despesa removida com sucesso!');
    } catch (error) {
      console.error("Erro ao remover despesa:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleLimparFiltros = () => {
    setFiltroCategoria('');
    setDataInicio('');
    setDataFim('');
  };

  const formatarData = (dataStr) => {
    const data = new Date(dataStr);
    return data.toLocaleDateString('pt-BR'); // Formato dd/mm/yyyy
  };

  const despesasFiltradas = despesas.filter((despesa) => {
    const categoriaMatch = despesa.categoria
      .toLowerCase()
      .includes(filtroCategoria.toLowerCase());

    const dataDespesa = new Date(despesa.data);
    const dataInicioDate = dataInicio ? new Date(dataInicio) : null;
    const dataFimDate = dataFim ? new Date(dataFim) : null;

    const dataDentroIntervalo =
      (!dataInicioDate || dataDespesa >= dataInicioDate) &&
      (!dataFimDate || dataDespesa <= dataFimDate);

    return categoriaMatch && dataDentroIntervalo;
  });

  return (
    <div className="container">
      <h2>Lista de Despesas</h2>

      <div className="filtros">
        <div className="filtro-categoria">
          <label htmlFor="filtroCategoria">Filtrar por categoria:</label>
          <select
            id="filtroCategoria"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todas</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-data">
          <label>Data Início:</label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
          <label>Data Fim:</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>

        <div className="limpar-filtros">
          <button onClick={handleLimparFiltros}>Limpar Filtros</button>
        </div>
      </div>

      {despesasFiltradas.length === 0 ? (
        <p>Nenhuma despesa encontrada com os filtros selecionados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {despesasFiltradas.map((despesa) => (
              <tr key={despesa.id}>
                <td>{despesa.categoria}</td>
                <td>{despesa.valor}</td>
                <td>{formatarData(despesa.data)}</td>
                <td>{despesa.descricao}</td>
                <td>
                  <button onClick={() => handleDelete(despesa.id)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DespesaList;
