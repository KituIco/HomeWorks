import { useState } from 'react';

export default () => {
  const [search, setSearch] = useState();
  const [value, setValue] = useState();

  return { 
    search, setSearch,
    value, setValue
  }
}