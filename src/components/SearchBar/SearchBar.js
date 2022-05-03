import './searchBar.css';

const SearchBar = ({ keyword, search }) => {
    return (
        <section className="search-bar">
            <label 
                htmlFor="searchBar" 
                className="search-bar__label"
            >
                Search post or comment:
            </label>
            
            <input
                id="searchBar"
                className="search-bar__input"
                value={keyword}
                onChange={search}
            />
        </section>
    );
}

export default SearchBar;