import React from 'react';
import {blockNew} from '../utils/cn';
import {PaginationProps} from './types';
import {
    PaginationPage,
    PaginationEllipsis,
    PaginationPageOf,
    PaginationButton,
    PaginationInput,
    PaginationPageSizer,
} from './components';
import {usePagination} from './hooks/usePagination';
import {useMobile} from '../mobile';

import './Pagination.scss';

const b = blockNew('pagination');

export const Pagination = ({
    page,
    pageSize,
    total,
    onUpdate,
    compact = true,
    pageSizeOptions,
    showPages = true,
    showInput = false,
}: PaginationProps) => {
    const [mobile] = useMobile();

    const size = mobile ? 'l' : 'm';

    const {items, numberOfPages} = usePagination({page, pageSize, total, mobile});

    const pagination = items
        .map((item) => {
            switch (item.type) {
                case 'page':
                    return (
                        showPages && (
                            <PaginationPage
                                key={item.page}
                                size={size}
                                pageSize={pageSize}
                                item={item}
                                onUpdate={onUpdate}
                                className={b('pagination-item')}
                            />
                        )
                    );
                case 'ellipsis':
                    return (
                        showPages && (
                            <PaginationEllipsis
                                key={item.type}
                                size={size}
                                className={b('pagination-item')}
                            />
                        )
                    );
                case 'pageOf':
                    return (
                        showPages && (
                            <PaginationPageOf className={b('pagination-item')} size={size} />
                        )
                    );
                case 'button':
                    return (
                        <PaginationButton
                            key={item.action}
                            size={size}
                            item={item}
                            page={page}
                            pageSize={pageSize}
                            onUpdate={onUpdate}
                            compact={compact}
                            className={b('pagination-item')}
                        />
                    );
                default:
                    return null;
            }
        })
        .filter(Boolean);

    return (
        <div className={b()}>
            {pagination}
            {showInput && (
                <PaginationInput
                    numberOfPages={numberOfPages}
                    pageSize={pageSize}
                    size={size}
                    onUpdate={onUpdate}
                    className={b('input')}
                />
            )}
            {pageSizeOptions && (
                <PaginationPageSizer
                    onUpdate={onUpdate}
                    page={page}
                    pageSize={pageSize}
                    pageSizeOptions={pageSizeOptions}
                    size={size}
                    total={total}
                    className={b('page-sizer')}
                />
            )}
        </div>
    );
};
