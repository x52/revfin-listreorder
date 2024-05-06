import React from 'react';

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} placeholder="Search..." />
    </div>
  );
};

export default SearchBar;
