import React, { useState, useEffect } from 'react'
import { Edit, Trash2 } from 'lucide-react'
// Import custom pagination hook and component
import usePagination, { Pagination } from './usePagination'

function BrandManagement() {
  const [brands, setBrands] = useState([]);
  const [selectedItems, setSelectedItems] = useState([])
  // This hook will handle all pagination logic automatically
  const pagination = usePagination(brands, 10)

  useEffect(() => {
    fetch('http://localhost:3000/brands')
      .then(response => response.json())
      .then(data => {
        setBrands(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
        setBrands([]);
      });
  }, []);
  const handleCheckboxChange = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  const handleSelectAll = () => {
    const currentPageIds = pagination.paginatedData.map(brand => brand.id);
    const allCurrentPageSelected = currentPageIds.every(id => selectedItems.includes(id));
    
    if (allCurrentPageSelected) {
      // Deselect all items from current page
      setSelectedItems(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      // Select all items from current page
      setSelectedItems(prev => [...new Set([...prev, ...currentPageIds])]);
    }
  }
  const handleEdit = (id) => {
    console.log('Edit brand with ID:', id);
  }
  const handleDelete = (id) => {
    setBrands(prev => prev.filter(brand => brand.id !== id));
    setSelectedItems(prev => prev.filter(item => item !== id));
  };
  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} selected items?`)) {
      setBrands(prev => prev.filter(brand => !selectedItems.includes(brand.id)));
      setSelectedItems([]);
    }
  };
  // Checking  if all items on current page are selected
  const currentPageIds = pagination.paginatedData.map(brand => brand.id);
  const allCurrentPageSelected = currentPageIds.length > 0 && 
    currentPageIds.every(id => selectedItems.includes(id));
  return (
    <div className="container-fluid mt-1">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            {selectedItems.length > 0 && (
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={handleBulkDelete}
              >
                Delete Selected ({selectedItems.length})
              </button>
            )}
          </div>

          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="d-flex justify-content-end align-items-center p-3 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">Show:</span>
                  <select
                    className="form-select form-select-sm"
                    style={{ width: 'auto', minWidth: '80px' }}
                    value={pagination.itemsPerPage}
                    onChange={(e) => pagination.handleItemsPerPageChange(Number(e.target.value))}
                  >
                    {[5, 10, 25, 50, 100].map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="text-muted small">per page</span>
                </div>
              </div>
              
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" style={{ width: '50px' }}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="selectAll"
                            checked={allCurrentPageSelected}
                            onChange={handleSelectAll}
                            title="Select all on current page"
                          />
                        </div>
                      </th>
                      <th scope="col" style={{ width: '80px' }}>ID</th>
                      <th scope="col" style={{ width: '200px' }}>Brand Name</th>
                      <th scope="col" style={{ width: '100px' }}>Founded</th>
                      <th scope="col" style={{ width: '100px' }}>Country</th>
                      <th scope="col">Category</th>
                      <th scope="col">Key Products</th>
                      <th scope="col" style={{ width: '120px' }}>Operate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagination.paginatedData.map((brand, index) => (
                      <tr key={brand.id || index} className="align-middle">
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`check-${brand.id || index}`}
                              checked={selectedItems.includes(brand.id || index)}
                              onChange={() => handleCheckboxChange(brand.id || index)}
                            />
                          </div>
                        </td>
                        
                        <td className="fw-medium">
                          {brand.id || index + 1}
                        </td>
                        
                        <td className="fw-medium">
                          <a 
                            href={brand.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                          >
                            {brand.name}
                          </a>
                        </td>
                        
                        <td className="text-muted">
                          {brand.founded}
                        </td>
                        
                        <td className="text-muted">
                          {brand.country}
                        </td>
                        
                        <td className="text-muted">
                          {brand.category}
                        </td>
                        <td className="text-muted">
                          {brand.keyProducts && Array.isArray(brand.keyProducts) 
                            ? brand.keyProducts.slice(0, 3).join(', ') + (brand.keyProducts.length > 3 ? '...' : '')
                            : 'N/A'
                          }
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleEdit(brand.id || index)}
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(brand.id || index)}
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {pagination.isEmpty && (
                  <div className="text-center py-4">
                    <p className="text-muted">No brands found</p>
                  </div>
                )}
              </div>
              <Pagination 
                pagination={pagination}
                showItemsPerPageSelector={false}
                showPageInfo={true}
                showFirstLastButtons={true}
                maxVisiblePages={5}
                itemsPerPageOptions={[5, 10, 25, 50, 100]}
              />
            </div>
          </div>
          {selectedItems.length > 0 && (
            <div className="mt-3">
              <div className="alert alert-info">
                <strong>{selectedItems.length}</strong> item(s) selected across all pages
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrandManagement;