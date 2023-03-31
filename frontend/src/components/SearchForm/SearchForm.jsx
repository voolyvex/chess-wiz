import React from 'react';
import './search-form.css'


const SearchForm = ({ handleSearch, username, setUsername, year, setYear, month, setMonth }) => {


  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSearch(username, year, month);
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
    <div className='search-form-container'>
      <b className='search-form-title'>Chess.com Player Archive</b>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='search-input-user'>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='search-input-date'>
          <div className='input-year'>
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={handleYearChange}
            />
          </div>
          <div className='input-month'>

            <label htmlFor="month">Month:</label>
            <input
              type="number"
              id="month"
              value={month}
              onChange={handleMonthChange}
            />
          </div>

        </div>

        <button className='search-button' type="submit">Search!</button>
      </form>

    </div>
  );
};

export default SearchForm;

