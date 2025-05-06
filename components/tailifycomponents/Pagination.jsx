import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import React, { useState } from 'react';

function Pagination({ total, currentPage, onPageChange }) {
    const [activePage, setActivePage] = useState(currentPage || 1);

    const handlePageChange = (page) => {
        if (page < 1 || page > total) return;
        setActivePage(page);
        onPageChange && onPageChange(page);
    };

    const getVisiblePages = () => {
        const visiblePages = [];
        const totalVisible = 6;

        if (total <= totalVisible) {
            for (let i = 1; i <= total; i++) {
                visiblePages.push(i);
            }
        } else {
            const start = Math.max(1, activePage - Math.floor(totalVisible / 2));
            const end = Math.min(total, start + totalVisible - 1);

            for (let i = start; i <= end; i++) {
                visiblePages.push(i);
            }

            // Adjust for scenarios where active page is near the start or end
            if (start > 1) visiblePages.unshift('...');
            if (end < total) visiblePages.push('...');
        }

        return visiblePages;
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-4">
            {/* Previous button */}
            <button
                className={`px-2 py-[4px] border border-[#000] font-semibold rounded ${activePage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'
                    }`}
                disabled={activePage === 1}
                onClick={() => handlePageChange(activePage - 1)}
            >
                <IconChevronLeft size={15} />
            </button>

            {/* Page numbers */}
            {getVisiblePages().map((page, index) =>
                page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-[4px]">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        className={`px-3 py-[4px] border rounded text-xs font-semibold border-[#000000] ${activePage === page ? 'bg-[#1D3A76] text-white' : 'hover:bg-gray-200'
                            }`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next button */}
            <button
                className={`px-2 py-[4px] border border-[#000] font-semibold rounded ${activePage === total ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'
                    }`}
                disabled={activePage === total}
                onClick={() => handlePageChange(activePage + 1)}
            >
                <IconChevronRight size={15} />
            </button>
        </div>
    );
}

export default Pagination;

