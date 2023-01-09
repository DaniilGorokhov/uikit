import React from 'react';
import {Icon} from '../../../Icon/Icon';
import {MediaRenderer} from '../../../Stories/components';

import type {StoriesGroupItem} from '../../types';
import {Chevron} from '../../../icons/Chevron';
import {Button, ButtonProps} from '../../../Button';

import {block} from '../../../utils/cn';
import './StoriesPreview.scss';
import type {ModalCloseReason} from '../../../Modal';
import type {StoriesItemMedia} from '../../../Stories/types';

const PREVIEW_ITEM_SIZE = 40;
const PREVIEW_LIST_GAP = 8;

const b = block('stories-group-preview');

type PreviewItemProps = {
    groupIndex: number;

    active: boolean;
    disabled: boolean;

    media?: StoriesItemMedia;
    onSelectGroup?: (groupIndex: number) => void;
};
const PreviewItem = ({active, disabled, groupIndex, media, onSelectGroup}: PreviewItemProps) => {
    const onClick = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(
        (event) => {
            event.preventDefault();
            event.stopPropagation();

            onSelectGroup?.(groupIndex);
        },
        [onSelectGroup, groupIndex],
    );

    return (
        <div
            className={b('stories-preview-item', {
                active,
                disabled,
            })}
            onClick={onClick}
        >
            {media && <MediaRenderer media={media} />}
        </div>
    );
};

type StoriesPreviewListProps = {
    groups: StoriesGroupItem[];
    groupIndex: number;
    onGroupSelect: (groupIndex: number) => void;
    offset?: number;
};
const StoriesPreviewList = ({
    groupIndex,
    groups,
    onGroupSelect,
    offset = 0,
}: StoriesPreviewListProps) => {
    return (
        <React.Fragment>
            {groups.map(({thumbnailMedia, items}, i) => {
                const media = thumbnailMedia || items[0]?.media;
                const currentGroupIndex = offset + i;

                return (
                    <PreviewItem
                        key={i}
                        groupIndex={currentGroupIndex}
                        active={currentGroupIndex === groupIndex}
                        disabled={items.length === 0}
                        media={media}
                        onSelectGroup={onGroupSelect}
                    />
                );
            })}
        </React.Fragment>
    );
};

type StoriesPreviewListWithSliderProps = {
    groups: StoriesGroupItem[];
    groupIndex: number;
    onGroupSelect: (groupIndex: number) => void;
    maxSliderItemsCount: number;
};
const StoriesPreviewListWithSlider = ({
    groupIndex,
    groups,
    onGroupSelect,
    maxSliderItemsCount,
}: StoriesPreviewListWithSliderProps) => {
    const [offset, setOffset] = React.useState(0);

    React.useEffect(() => {
        const currentOffset = maxSliderItemsCount * Math.floor(groupIndex / maxSliderItemsCount);
        setOffset(currentOffset);
    }, [groupIndex, maxSliderItemsCount]);

    const setPreviewOffset = React.useCallback<NonNullable<ButtonProps['onClick']>>(
        (event) => {
            event.preventDefault();
            event.stopPropagation();

            setOffset((currentOffset) => {
                return currentOffset - maxSliderItemsCount;
            });
        },
        [maxSliderItemsCount],
    );

    const setNextOffset = React.useCallback<NonNullable<ButtonProps['onClick']>>(
        (event) => {
            event.preventDefault();
            event.stopPropagation();

            setOffset((currentOffset) => {
                return currentOffset + maxSliderItemsCount;
            });
        },
        [maxSliderItemsCount],
    );

    return (
        <React.Fragment>
            {groups.length > maxSliderItemsCount && (
                <div className={b('slider-button-wrapper')}>
                    {offset !== 0 && (
                        <Button view="raised" pin="circle-circle" onClick={setPreviewOffset}>
                            <Icon className={b('Icon', {left: true})} data={Chevron} />
                        </Button>
                    )}
                </div>
            )}
            <div
                className={b('slider-preview-list-wrapper')}
                style={{
                    width: `${
                        PREVIEW_ITEM_SIZE * maxSliderItemsCount +
                        PREVIEW_LIST_GAP * (maxSliderItemsCount - 1)
                    }px`,
                }}
            >
                <StoriesPreviewList
                    groupIndex={groupIndex}
                    groups={groups.slice(offset, offset + maxSliderItemsCount)}
                    onGroupSelect={onGroupSelect}
                    offset={offset}
                />
            </div>
            {groups.length > maxSliderItemsCount && (
                <div className={b('slider-button-wrapper')}>
                    {offset < groups.length - maxSliderItemsCount && (
                        <Button view="raised" pin="circle-circle" onClick={setNextOffset}>
                            <Icon className={b('Icon', {right: true})} data={Chevron} />
                        </Button>
                    )}
                </div>
            )}
        </React.Fragment>
    );
};

export type StoriesPreviewProps = {
    groups: StoriesGroupItem[];
    groupIndex: number;
    onGroupSelect: (groupIndex: number) => void;
    maxSliderItemsCount: number;
    onClose?: (
        event: MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>,
        reason: ModalCloseReason,
    ) => void;
};

// all onClick handlers of StoriesPreview childrens should have preventDefault() and stopPropagation() callings

export const StoriesPreview = ({
    groups,
    groupIndex,
    onGroupSelect,
    maxSliderItemsCount,
    onClose,
}: StoriesPreviewProps) => {
    const handleClose = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(
        (event) => {
            onClose?.(event, 'outsideClick');
        },
        [onClose],
    );

    if (groups.length < maxSliderItemsCount) {
        return (
            <div className={b()} onClick={handleClose}>
                <StoriesPreviewList
                    groupIndex={groupIndex}
                    groups={groups}
                    onGroupSelect={onGroupSelect}
                />
            </div>
        );
    }

    return (
        <div className={b()} onClick={handleClose}>
            <StoriesPreviewListWithSlider
                maxSliderItemsCount={maxSliderItemsCount}
                groupIndex={groupIndex}
                groups={groups}
                onGroupSelect={onGroupSelect}
            />
        </div>
    );
};
