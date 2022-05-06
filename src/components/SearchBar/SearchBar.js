import './SearchBar.css';

const SearchBar = ({ keyword, searchPost }) => {
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
                onChange={searchPost}
            />
        </section>
    );
}

export default SearchBar;