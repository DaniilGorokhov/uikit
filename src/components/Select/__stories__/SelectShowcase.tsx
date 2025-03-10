import React from 'react';
import range from 'lodash/range';
import {block} from '../../utils/cn';
import {ClipboardButton} from '../../ClipboardButton';
import {RadioButton, RadioButtonOption} from '../../RadioButton';
import {Tooltip} from '../../Tooltip';
import {Button} from '../../Button';
import {TextInput} from '../../TextInput';
import {Select, SelectProps, SelectOption} from '..';
import {
    EXAMPLE_JSON_OPTIONS,
    EXAMPLE_CHILDREN_OPTIONS,
    EXAMPLE_GROUP_JSON_OPTIONS,
    EXAMPLE_GROUP_CHILDREN_OPTIONS,
    EXAMPLE_DISABLED_OPTIONS,
    EXAMPLE_USER_OPTIONS,
    EXAMPLE_USER_CONTROL,
    EXAMPLE_CUSTOM_RENDERER_WITH_DISABLED_ITEM,
    EXAMPLE_CUSTOM_FILTER_SECTION,
} from './constants';

import './SelectShowcase.scss';

const b = block('select-showcase');
const Mode = {
    CODE: 'code',
    VIEW: 'view',
};

const generateItems = (count: number): SelectOption[] => {
    return range(0, count).map((i) => ({
        value: `val${i + 1}`,
        content: `Value ${i + 1}`,
    }));
};

const getEscapedString = (str: string) => {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
};

const radioButtonOptions: RadioButtonOption[] = [
    {value: Mode.VIEW, content: 'View'},
    {value: Mode.CODE, content: 'Code'},
];

const ExampleItem = (props: {
    title: string;
    selectProps: SelectProps;
    code?: string[];
    children?: SelectProps['children'];
}) => {
    const {title, selectProps, children, code = []} = props;
    const multiple = props.selectProps.multiple;
    const [mode, setMode] = React.useState(Mode.VIEW);
    const [value, setValue] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (!multiple) {
            setValue([]);
        }
    }, [multiple]);

    return (
        <div className={b('example-item')}>
            <h3>
                {title}
                {Boolean(code.length) && (
                    <RadioButton
                        className={b('example-item-radio')}
                        size="s"
                        value={mode}
                        onUpdate={(nextMode) => setMode(nextMode)}
                    >
                        <RadioButton.Option {...radioButtonOptions[0]} />
                        <RadioButton.Option {...radioButtonOptions[1]} />
                    </RadioButton>
                )}
            </h3>
            {mode === Mode.VIEW ? (
                <Select
                    {...selectProps}
                    value={value}
                    onUpdate={(nextValue) => setValue(nextValue)}
                >
                    {children}
                </Select>
            ) : (
                code.map((codeItem, i) => {
                    return (
                        <React.Fragment key={`${title}-${i}`}>
                            <pre>
                                {codeItem}
                                <ClipboardButton
                                    className={b('copy-button')}
                                    size={16}
                                    text={codeItem}
                                />
                            </pre>
                        </React.Fragment>
                    );
                })
            )}
        </div>
    );
};

export const SelectShowcase = (props: SelectProps) => {
    const [matchCase, setMatchCase] = React.useState(false);
    const [matchWholeWord, setMatchWholeWord] = React.useState(false);

    const renderFilter: SelectProps['renderFilter'] = ({value, ref, onChange, onKeyDown}) => {
        return (
            <div style={{display: 'flex', flexDirection: 'column', rowGap: 4}}>
                <TextInput
                    controlRef={ref}
                    controlProps={{size: 1}}
                    value={value}
                    onUpdate={onChange}
                    onKeyDown={onKeyDown}
                />
                <div style={{display: 'flex', columnGap: 2}}>
                    <Button selected={matchCase} onClick={() => setMatchCase(!matchCase)}>
                        Ab
                    </Button>
                    <Button
                        selected={matchWholeWord}
                        onClick={() => setMatchWholeWord(!matchWholeWord)}
                    >
                        <span style={{textDecoration: 'underline'}}>ab</span>
                    </Button>
                </div>
            </div>
        );
    };

    const getFilterOption = (): SelectProps['filterOption'] | undefined => {
        if (matchCase || matchWholeWord) {
            return (option, filter) => {
                const flags = matchCase ? '' : 'i';
                const escapedFilter = getEscapedString(filter);
                const resultFilter = matchWholeWord ? `\\b${escapedFilter}\\b` : escapedFilter;
                const regExp = new RegExp(resultFilter, flags);
                return regExp.test(option.content as string);
            };
        }

        return undefined;
    };

    return (
        <div className={b()}>
            <ExampleItem
                title="Simple select"
                code={[EXAMPLE_JSON_OPTIONS, EXAMPLE_CHILDREN_OPTIONS]}
                selectProps={props}
            >
                <Select.Option value="val1" content="Value1" />
                <Select.Option value="val2" content="Value2" />
                <Select.Option value="val3" content="Value3" />
                <Select.Option value="val4" content="Value4" />
            </ExampleItem>
            <ExampleItem
                title="Select with groups"
                code={[EXAMPLE_GROUP_JSON_OPTIONS, EXAMPLE_GROUP_CHILDREN_OPTIONS]}
                selectProps={props}
            >
                <Select.OptionGroup label="Group 1">
                    <Select.Option value="val1" content="Value1" />
                    <Select.Option value="val2" content="Value2" />
                </Select.OptionGroup>
                <Select.OptionGroup label="Group 2">
                    <Select.Option value="val3" content="Value3" />
                    <Select.Option value="val4" content="Value4" />
                </Select.OptionGroup>
            </ExampleItem>
            <ExampleItem
                title="Select with disabled options"
                code={[EXAMPLE_DISABLED_OPTIONS]}
                selectProps={props}
            >
                <Select.Option value="val1" content="Value1" />
                <Select.Option value="val2" content="Value2" disabled />
                <Select.Option value="val3" content="Value3" disabled />
                <Select.Option value="val4" content="Value4" />
            </ExampleItem>
            <ExampleItem
                title="Select with user options"
                code={[EXAMPLE_USER_OPTIONS]}
                selectProps={{
                    ...props,
                    renderOption: (option) => {
                        return (
                            <div
                                style={{color: option.data?.color, height: 22, lineHeight: '22px'}}
                            >
                                {option.content}
                            </div>
                        );
                    },
                    getOptionHeight: () => 22,
                }}
            >
                <Select.Option value="val1" content="Value1" data={{color: 'green'}} />
                <Select.Option value="val2" content="Value2" data={{color: 'red'}} />
                <Select.Option value="val3" content="Value3" data={{color: 'pink'}} />
                <Select.Option value="val4" content="Value4" data={{color: 'purple'}} />
            </ExampleItem>
            <ExampleItem
                title="Select with user selected options"
                code={[EXAMPLE_USER_OPTIONS]}
                selectProps={{
                    ...props,
                    renderOption: (option) => {
                        return (
                            <div
                                style={{color: option.data?.color, height: 22, lineHeight: '22px'}}
                            >
                                {option.content}
                            </div>
                        );
                    },
                    renderSelectedOption: (option) => {
                        return (
                            <span
                                style={{
                                    color: option.data?.color,
                                    height: 22,
                                    lineHeight: '22px',
                                    marginRight: '6px',
                                }}
                            >
                                {option.content}
                            </span>
                        );
                    },
                    getOptionHeight: () => 22,
                }}
            >
                <Select.Option value="val1" content="Value1" data={{color: 'green'}} />
                <Select.Option value="val2" content="Value2" data={{color: 'red'}} />
                <Select.Option value="val3" content="Value3" data={{color: 'pink'}} />
                <Select.Option value="val4" content="Value4" data={{color: 'purple'}} />
            </ExampleItem>
            <ExampleItem
                title="Select with user control"
                code={[EXAMPLE_USER_CONTROL]}
                selectProps={{
                    ...props,
                    className: b('user-control'),
                    renderControl: ({onClick, onKeyDown, ref}) => {
                        return (
                            <Button
                                ref={ref}
                                view="action"
                                onClick={onClick}
                                extraProps={{
                                    onKeyDown,
                                }}
                            >
                                User control
                            </Button>
                        );
                    },
                }}
            >
                <Select.Option value="val1" content="Value1" />
                <Select.Option value="val2" content="Value2" />
                <Select.Option value="val3" content="\" />
                <Select.Option value="val4" content="Value4" />
            </ExampleItem>
            <ExampleItem
                title="Select with virtualized list"
                selectProps={{
                    ...props,
                    options: generateItems(1000),
                }}
            />
            <ExampleItem
                title="Select with custom renderer & tooltip at disabled item"
                code={[EXAMPLE_CUSTOM_RENDERER_WITH_DISABLED_ITEM]}
                selectProps={{
                    ...props,
                    renderOption: (option) => {
                        return option.disabled ? (
                            <Tooltip content="Tooltip">
                                <span style={{color: option.disabled ? 'gray' : 'inherit'}}>
                                    Hover here
                                </span>
                            </Tooltip>
                        ) : (
                            <span>{option.content}</span>
                        );
                    },
                }}
            >
                <Select.Option value="1" content="1" />
                <Select.Option value="2" content="2" text={'Hover here'} disabled />
            </ExampleItem>
            <ExampleItem
                title="Select with custom filter section"
                code={[EXAMPLE_CUSTOM_FILTER_SECTION]}
                selectProps={{
                    ...props,
                    renderFilter,
                    filterOption: getFilterOption(),
                }}
            >
                <Select.Option value="val1" content="Value 1" />
                <Select.Option value="val2" content="val" />
                <Select.Option value="val3" content="Value" />
                <Select.Option value="val4" content="value" />
            </ExampleItem>
            <ExampleItem
                title="Select with custom popup"
                code={[EXAMPLE_JSON_OPTIONS, EXAMPLE_CHILDREN_OPTIONS]}
                selectProps={{
                    ...props,
                    popupClassName: b('custom-popup'),
                }}
            >
                <Select.Option value="val1" content="Value1" />
                <Select.Option value="val2" content="Value2" />
                <Select.Option value="val3" content="Value3" />
                <Select.Option value="val4" content="Value4" />
            </ExampleItem>
        </div>
    );
};
