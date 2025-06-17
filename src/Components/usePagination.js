import React, { useState, useEffect, useMemo } from 'react';
import { Edit, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
function usePagination(data, initialItemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Calculate pagination
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Get paginated data using useMemo for performance
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    // Reset to first page when changing items per page
    setCurrentPage(1);
  };

  // adjust current page when data changes
  useEffect(() => {
    if (data.length > 0) {
      const maxPage = Math.ceil(data.length / itemsPerPage);
      if (currentPage > maxPage) {
        setCurrentPage(maxPage);
      }
    }
  }, [data.length, itemsPerPage, currentPage]);

  // Reset to first page when data source changes significantly
  const resetPagination = () => {
    setCurrentPage(1);
  };

  return {
    // Data
    paginatedData,
    
    // Pagination state
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    startItem,
    endItem,
    
    // Handlers
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination,
    
    // Utilities
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    isEmpty: data.length === 0
  };
}
function Pagination({ 
  pagination,
  showItemsPerPageSelector = true,
  showPageInfo = true,
  showFirstLastButtons = true,
  maxVisiblePages = 5,
  itemsPerPageOptions = [5, 10, 25, 50, 100]
}) {
  const {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    startItem,
    endItem,
    handlePageChange,
    handleItemsPerPageChange
  } = pagination;

  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const visiblePages = getVisiblePages();
  
  // Don't render if no items or only one page and no options to change
  if (totalItems === 0 || (totalPages <= 1 && !showItemsPerPageSelector)) {
    return null;
  }
  
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 border-top bg-light">
      {showItemsPerPageSelector && (
        <div className="d-flex align-items-center gap-2 mb-2 mb-md-0">
          <span className="text-muted small fw-medium">Show:</span>
          <select
            className="form-select form-select-sm border-0 bg-white shadow-sm"
            style={{ width: 'auto', minWidth: '80px' }}
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          >
            {itemsPerPageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="text-muted small fw-medium">per page</span>
        </div>
      )}
      {showPageInfo && totalItems > 0 && (
        <div className="text-muted small fw-medium order-md-first">
          Showing <span className="fw-bold text-dark">{startItem}</span> to <span className="fw-bold text-dark">{endItem}</span> of <span className="fw-bold text-dark">{totalItems}</span> entries
        </div>
      )}
      {totalPages > 1 && (
        <nav aria-label="Pagination Navigation">
          <ul className="pagination pagination-sm mb-0 shadow-sm">
            {showFirstLastButtons && (
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link border-0 bg-white text-primary hover-bg-primary hover-text-white transition-all"
                  style={{
                    borderRadius: '8px 0 0 8px',
                    padding: '8px 12px',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  title="First page"
                >
                  <ChevronsLeft size={16} />
                </button>
              </li>
            )}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link border-0 bg-white text-primary hover-bg-primary hover-text-white transition-all"
                style={{
                  borderRadius: showFirstLastButtons ? '0' : '8px 0 0 8px',
                  padding: '8px 12px',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                title="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
            </li>
            {visiblePages.map((page, index) => (
              <li
                key={`page-${page}-${index}`}
                className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
              >
                {page === '...' ? (
                  <span 
                    className="page-link border-0 bg-white text-muted"
                    style={{ padding: '8px 12px' }}
                  >
                    ...
                  </span>
                ) : (
                  <button
                    className={`page-link border-0 transition-all ${
                      page === currentPage 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'bg-white text-primary hover-bg-primary hover-text-white'
                    }`}
                    style={{
                      padding: '8px 12px',
                      minWidth: '40px',
                      fontWeight: page === currentPage ? '600' : '500',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => handlePageChange(page)}
                    disabled={page === currentPage}
                  >
                    {page}
                  </button>
                )}
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link border-0 bg-white text-primary hover-bg-primary hover-text-white transition-all"
                style={{
                  borderRadius: showFirstLastButtons ? '0' : '0 8px 8px 0',
                  padding: '8px 12px',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                title="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </li>
            {showFirstLastButtons && (
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link border-0 bg-white text-primary hover-bg-primary hover-text-white transition-all"
                  style={{
                    borderRadius: '0 8px 8px 0',
                    padding: '8px 12px',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  title="Last page"
                >
                  <ChevronsRight size={16} />
                </button>
              </li>
            )}
          </ul>
          <style jsx>{`
            .hover-bg-primary:hover:not(:disabled) {
              background-color: #0d6efd !important;
              color: white !important;
              transform: translateY(-1px);
              box-shadow: 0 2px 4px rgba(13, 110, 253, 0.2);
            }
            
            .transition-all {
              transition: all 0.2s ease;
            }
            
            .pagination .page-link:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
            
            .pagination {
              gap: 2px;
            }
            
            .pagination .page-item:not(:last-child) .page-link {
              margin-right: 2px;
              border-radius: 6px;
            }
            
            .pagination .page-item:last-child .page-link {
              border-radius: 6px;
            }
          `}</style>
        </nav>
      )}
    </div>
  );
}
export default usePagination;
export { Pagination };