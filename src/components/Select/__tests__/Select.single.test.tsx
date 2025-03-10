import {cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    TEST_QA,
    SELECT_CONTROL_OPEN_CLASS,
    DEFAULT_OPTIONS,
    GROUPED_OPTIONS,
    OptionsListType,
    setup,
} from './utils';

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

const onUpdate = jest.fn();
const onOpenChange = jest.fn();
const SELECTED_OPTION = DEFAULT_OPTIONS[0];

describe('Select single mode actions', () => {
    describe('select option by click in', () => {
        test.each([
            [OptionsListType.FLAT, SELECTED_OPTION],
            [OptionsListType.GROUPED, SELECTED_OPTION],
        ])('%s list', async (type, selectedOption) => {
            const options = type === 'grouped' ? GROUPED_OPTIONS : DEFAULT_OPTIONS;
            const {getByTestId, getByText} = setup({options, onUpdate, onOpenChange});
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            // open select popup
            await user.click(selectControl);
            expect(selectControl).toHaveClass(SELECT_CONTROL_OPEN_CLASS);
            const option = getByText(selectedOption.content as string);
            // select option
            await user.click(option);
            expect(onUpdate).toHaveBeenCalledWith([selectedOption.value]);
            expect(selectControl).not.toHaveClass(SELECT_CONTROL_OPEN_CLASS);
        });
    });

    describe('select option by', () => {
        test.each([
            ['Enter', OptionsListType.FLAT, SELECTED_OPTION],
            ['Enter', OptionsListType.GROUPED, SELECTED_OPTION],
            ['Space', OptionsListType.FLAT, SELECTED_OPTION],
            ['Space', OptionsListType.GROUPED, SELECTED_OPTION],
        ])('%s in %s list', async (key, type, selectedOption) => {
            const options = type === 'grouped' ? GROUPED_OPTIONS : DEFAULT_OPTIONS;
            const {getByTestId} = setup({options, onUpdate, onOpenChange});
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            await user.keyboard('[Tab]');
            // open select popup
            await user.keyboard(`[${key}]`);
            expect(selectControl).toHaveClass(SELECT_CONTROL_OPEN_CLASS);
            // select active option (first option by default)
            await user.keyboard(`[${key}]`);
            expect(onUpdate).toHaveBeenCalledWith([selectedOption.value]);
            expect(selectControl).not.toHaveClass(SELECT_CONTROL_OPEN_CLASS);
        });
    });

    describe('ignore disabled element selection by clicking in', () => {
        test('flat list', async () => {
            const searchText = 'Disabled option';
            const options = [{content: searchText, value: '1', disabled: true}];
            const {getByTestId, getByText} = setup({options, onUpdate, onOpenChange});
            const user = userEvent.setup();
            const selectControl = getByTestId(TEST_QA);
            // open select popup
            await user.click(selectControl);
            expect(selectControl).toHaveClass(SELECT_CONTROL_OPEN_CLASS);
            const option = getByText(searchText);
            // select option
            await user.click(option);
            expect(onUpdate).not.toBeCalled();
            expect(selectControl).toHaveClass(SELECT_CONTROL_OPEN_CLASS);
        });
    });
});
