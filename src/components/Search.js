import React, { useState } from "react";

const Search = props => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = e => setSearchValue(e.target.value);
  const resetInput = () => setSearchValue("");
  const doSearch = e => {
    e.preventDefault();
    props.search(searchValue);
    resetInput();
  };

  return (
    <form className="search">
      <input value={searchValue} onChange={handleChange} type="text" />
      <input onClick={doSearch} type="submit" value="검색" />
    </form>
  );
};

export default Search;
