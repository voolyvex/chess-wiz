import React, { useState } from 'react';


const SearchForm = ({ handleSearch }) => {
  const [username, setUsername] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSearch( username, year, month );
  };

  const handleYearChange = (e) => {
    const yearValue = e.target.value;
    const formattedYear = yearValue.replace(/\D/g, '').slice(0, 4);
    setYear(formattedYear);
  };

  const handleMonthChange = (e) => {
    const monthValue = e.target.value;
    const formattedMonth = monthValue.replace(/\D/g, '').slice(0, 2).padStart(2, '0');
    setMonth(formattedMonth);
  };

  return (
    <div className='search-form'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={handleYearChange}
        />

        <label htmlFor="month">Month:</label>
        <input
          type="number"
          id="month"
          value={month}
          onChange={handleMonthChange}
        />

        <button type="submit">Search</button>
      </form>

    </div>
  );
};

export default SearchForm;

