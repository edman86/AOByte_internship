import './Pagination.css';

const Pagination = ({ postsPerPage, totalPosts, currentPage, changePage }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination">
            {pageNumbers.map(number => {
                return (
                    <li key={number} className="pagination__item">
                        <button
                            type="button"
                            className={
                                number === currentPage ?
                                    ('pagination__btn current-page')
                                    :
                                    ('pagination__btn')
                            }
                            onClick={() => changePage(number)}
                        >
                            {number}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default Pagination;