import React, { useEffect, useMemo, useState } from 'react';
import { Column } from 'react-table';
import styles from './style/App.module.css';
import api from './services/api';
import TableT from './Table';
import Logo from './assets/qquant.png';

export interface DataProps {
  _id: string;
  title: string;
  year: string;
  doi: string;
  author: string;
  FIELD6: string[];
}

const App: React.FC = () => {
  const [apiData, setApiData] = useState<DataProps[]>([]);

  const columns = useMemo<Column<DataProps>[]>(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Year',
        accessor: 'year',
      },
      {
        Header: 'Doi',
        accessor: 'doi',
      },
      {
        Header: 'Author',
        accessor: 'author',
      },
    ],
    [],
  );

  const data = useMemo(() => apiData, [apiData]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(
        'qquant-group/candidatura-frontend/main/data.json',
      );
      setApiData(response.data);
    };
    fetchData();
  }, []);

  return (
    <section className={styles.container}>
      <div>
        <header>
          <img src={Logo} alt="Qquant" />
          <h1>Qquant Revisões Sistemáticas</h1>
        </header>
      </div>
      {data && <TableT columns={columns} data={data} />}
    </section>
  );
};

export default App;
