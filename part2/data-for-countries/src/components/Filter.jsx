const Filter = ({ onSearch, filterValue, handleFilterChange }) => {
    return (
        <form>
            Find countries: <input value={filterValue} onChange={handleFilterChange}/>
        </form>        
    )
}

export default Filter