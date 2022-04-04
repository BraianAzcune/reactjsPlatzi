
import React from 'react';

export default function Search({ search, searchInput, handleSearch }) {

  return (
    <div className="search">
      <input placeholder="search here" type="text" value={search} onChange={handleSearch} ref={searchInput} />
    </div>
  )
}