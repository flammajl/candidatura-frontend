import React, { useState } from 'react';
import { FilterValue, useAsyncDebounce } from 'react-table';
import styles from '../style/Filter.module.css';

interface GlobalFilterProps {
  filter: string;
  setFilter(filterValue: FilterValue): void;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const handleChange = useAsyncDebounce(changeValue => {
    setFilter(changeValue || undefined);
  }, 100);

  return (
    <div className={styles.filter}>
      <input
        type="text"
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          handleChange(e.target.value);
        }}
        placeholder="Search on table..."
      />
    </div>
  );
};

export default GlobalFilter;
