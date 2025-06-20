import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function BrandManagement() {
  const [brands, setBrands] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/brands')
      .then(res => res.json())
      .then(data => setBrands(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching brands:', err);
        setBrands([]);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-brand/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this brand?")) {
      setBrands(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedRows.length} brands?`)) {
      const idsToDelete = selectedRows.map(row => row.id);
      setBrands(prev => prev.filter(brand => !idsToDelete.includes(brand.id)));
      setSelectedRows([]);
    }
  };

  const columns = [
    {
      name: <input
        type="checkbox"
        onChange={() => {}}
        disabled
      />,
      cell: row => <input
        type="checkbox"
        checked={selectedRows.some(r => r.id === row.id)}
        onChange={() => {}}
        disabled
      />,
      ignoreRowClick: true,
      allowOverflow: true,
      width: '56px'
    },
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '70px'
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Founded',
      selector: row => row.founded,
      sortable: true
    },
    {
      name: 'Country',
      selector: row => row.country
    },
    {
      name: 'Category',
      selector: row => row.category
    },
    {
      name: 'Key Products',
      selector: row => Array.isArray(row.keyProducts)
        ? row.keyProducts.slice(0, 3).join(', ') + (row.keyProducts.length > 3 ? '...' : '')
        : 'N/A'
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="btn-group" role="group">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => handleEdit(row.id)}
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDelete(row.id)}
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4>Brand Management</h4>
        {selectedRows.length > 0 && (
          <button className="btn btn-danger btn-sm" onClick={handleBulkDelete}>
            🗑 Delete Selected ({selectedRows.length})
          </button>
        )}
      </div>
      <DataTable
        columns={columns}
        data={brands}
        pagination
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
}

export default BrandManagement;
