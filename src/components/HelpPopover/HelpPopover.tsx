import React from 'react';

import {block} from '../utils/cn';
import {Popover, PopoverProps} from '../Popover';
import {Icon} from '../Icon';
import {QuestionMarkIcon} from '../icons/QuestionMarkIcon';
import type {QAProps} from '../types';

import './HelpPopover.scss';

const b = block('help-popover');

/**
 * @see {@link https://github.com/microsoft/TypeScript/issues/28339}
 */
type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

export type HelpPopoverProps = DistributiveOmit<PopoverProps, 'children'> & QAProps;

export function HelpPopover(props: HelpPopoverProps) {
    return (
        <Popover offset={{left: 4}} {...props} className={b(null, props.className)}>
            <Icon data={QuestionMarkIcon} size={16} />
        </Popover>
    );
}
