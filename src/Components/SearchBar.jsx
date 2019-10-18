import React, { useEffect, useRef, useState } from 'react';

const SearchBar = ({ onSubmit }) => {
    const [value, setValue] = useState('')
    const onChange = e => setValue(e.target.value)
    const onClick = () => onSubmit(value)
    const myInput = useRef()
    
    useEffect(() => {
        myInput.current.focus()
    }, [])
    
  return (
    <div className="SearchBar">
      <input type="text" name="search" onChange={onChange} value={value} ref={myInput} />
      <button onClick={onClick}>SEARCH</button>
    </div>
  );
}

export default SearchBar;
