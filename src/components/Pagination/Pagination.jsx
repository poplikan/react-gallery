// src/components/Pagination/Pagination.jsx
import './Pagination.scss';

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Если страниц меньше 2, не показываем пагинацию
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      // Показываем все страницы
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Показываем с троеточием
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageClick = (page, e) => {
    e.preventDefault();
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item pagination__item--arrow pagination__item--prev">
          <a href="#" onClick={handlePrev} style={{ opacity: currentPage === 1 ? 0.5 : 1, pointerEvents: currentPage === 1 ? 'none' : 'auto' }}>
            <svg width="7.6" height="11.8" viewBox="0 0 7.6 11.8" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.48657 0.183396C7.31171 -0.0303263 6.9967 -0.0618274 6.78298 0.113036L0.182975 5.51304C0.0669069 5.608 -0.000406265 5.75005 -0.000406265 5.90002C-0.000406265 6.04998 0.0669069 6.19203 0.182975 6.28699L6.78298 11.687C6.9967 11.8619 7.31171 11.8304 7.48657 11.6166C7.66144 11.4029 7.62994 11.0879 7.41621 10.913L1.28919 5.90002L7.41621 0.886994C7.62994 0.71213 7.66144 0.397119 7.48657 0.183396Z" fill="currentColor"/>
            </svg>
          </a>
        </li>
        
        {getPageNumbers().map((page, index) => (
          <li 
            key={index}
            className={`pagination__item ${page === currentPage ? 'pagination__item--active' : ''} ${page === '...' ? 'pagination__item--dots' : ''}`}
          >
            {page === '...' ? (
              <span>...</span>
            ) : (
              <a href="#" onClick={(e) => handlePageClick(page, e)}>{page}</a>
            )}
          </li>
        ))}
        
        <li className="pagination__item pagination__item--arrow pagination__item--next">
          <a href="#" onClick={handleNext} style={{ opacity: currentPage === totalPages ? 0.5 : 1, pointerEvents: currentPage === totalPages ? 'none' : 'auto' }}>
            <svg width="7.6" height="11.8" viewBox="0 0 7.6 11.8" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.113036 0.183396C0.2879 -0.0303263 0.602912 -0.0618274 0.816634 0.113036L7.41663 5.51304C7.5327 5.608 7.60002 5.75005 7.60002 5.90002C7.60002 6.04998 7.5327 6.19203 7.41663 6.28699L0.816634 11.687C0.602911 11.8619 0.2879 11.8304 0.113036 11.6166C-0.0618274 11.4029 -0.0303262 11.0879 0.183396 10.913L6.31042 5.90002L0.183396 0.886994C-0.0303263 0.71213 -0.0618274 0.397119 0.113036 0.183396Z" fill="currentColor"/>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;