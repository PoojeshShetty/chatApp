import './Search.css'

function Search({query, setQuery}) {

    return (
        <div className='Search'>
            <form className="search__form">
                <input 
                type="text"
                value={query}
                onChange={({target}) => setQuery(target.value.trim())} 
                placeholder='Search'
                />
            </form>
        </div>
    )
}

export default Search
