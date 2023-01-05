const Filter = (props) => {
    function onFilterValueChanged(e) {
        props.filterValueSelected(e.target.value)
    }

    return (
        <div className="filter-area">
            <p>Filter by university:</p>
            <select name="university-filter" onChange={onFilterValueChanged}>
                <option value="All"> All </option>
                <option value="Guelph"> Guelph </option>
                <option value="Laurier"> Laurier </option>
                <option value="Western"> Western </option>
                <option value="Waterloo"> Waterloo </option>
                <option value="Mac"> Mac </option>
            </select>
        </div>
    )
}

export default Filter