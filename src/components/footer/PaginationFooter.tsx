import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import useEntityStore from '../../stores/entityStore';

const PaginationFooter: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    entityCount,
    setSkip
  } = useEntityStore();

  const itemsPerPage = 9;

  useEffect(() => {
    const newSkip = (currentPage - 1) * itemsPerPage;
    console.log(newSkip);
    setSkip(newSkip);
  }, [currentPage, setSkip]);

  const totalPages = Math.ceil((entityCount / itemsPerPage));

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        position: 'static',
        bottom: '5vh'
      }}
      count={totalPages}
      shape="rounded"
      page={currentPage}
      onChange={handlePageChange}
    />
  );
};

export default PaginationFooter;
