import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Column } from 'react-table';
import styles from './style/App.module.css';
import api from './services/api';
import TableT from './Table';

export interface DataProps {
  _id: string;
  title: string;
  year: string;
  doi: string;
  author: string;
}

const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<DataProps[]>([]);

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

  const handleChange = useCallback(() => {
    if (inputRef.current?.value) {
      // const reg = new RegExp(inputRef.current?.value, 'i');
      console.log('a');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(
        'qquant-group/candidatura-frontend/main/data.json',
      );
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.filter}>
        <label htmlFor="filter">Filter</label>
        <input
          ref={inputRef}
          type="text"
          id="filter"
          name="filter"
          onChange={handleChange}
        />
      </div>

      {data && <TableT columns={columns} data={data} />}
    </section>
  );
};

export default App;
