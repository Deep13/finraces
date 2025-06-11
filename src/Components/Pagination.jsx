import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPaginationRange = () => {
        const range = [];
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        return range;
    };

    return (
        <nav aria-label="Pagination" className="flex items-center justify-center mt-8">
            <ul className="inline-flex items-center space-x-1">
                {/* Previous Button */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 text-sm font-medium ${currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-blue-600 hover:bg-blue-100 hover:text-blue-800'
                            } rounded`}
                    >
                        Previous
                    </button>
                </li>

                {/* Page Numbers */}
                {getPaginationRange().map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-2 text-sm font-medium ${page === currentPage
                                ? 'bg-blue-600 text-white'
                                : 'text-blue-600 hover:bg-blue-100 hover:text-blue-800'
                                } rounded`}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Next Button */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 text-sm font-medium ${currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-blue-600 hover:bg-blue-100 hover:text-blue-800'
                            } rounded`}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
