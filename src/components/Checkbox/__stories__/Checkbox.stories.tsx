import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Checkbox, CheckboxProps} from '../Checkbox';
import {CheckboxShowcase} from './CheckboxShowcase';

export default {
    title: 'Components/Checkbox',
    component: Checkbox,
} as Meta;

const DefaultTemplate: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
export const Default = DefaultTemplate.bind({});

const SizeTemplate: Story<CheckboxProps> = (args) => (
    <>
        m: <Checkbox {...args} size="m" />
        <span style={{margin: '16px'}} />
        l: <Checkbox {...args} size="l" />
    </>
);
export const Size = SizeTemplate.bind({});

const DisabledTemplate: Story<CheckboxProps> = (args) => (
    <>
        <Checkbox {...args} defaultChecked disabled content="Disabled checked" />
        <span style={{margin: '16px'}} />
        <Checkbox disabled content="Disabled" />
    </>
);
export const Disabled = DisabledTemplate.bind({});

const IndeterminateTemplate: Story<CheckboxProps> = (args) => <Checkbox {...args} indeterminate />;
export const Indeterminate = IndeterminateTemplate.bind({});

const LabelTemplate: Story<CheckboxProps> = (args) => (
    <>
        <Checkbox {...args} size="m" content="content m" />
        <span style={{margin: '16px'}} />
        <Checkbox {...args} size="l" content="content l" />
        <div style={{width: 200, marginTop: 10}}>
            <Checkbox {...args} size="m" style={{width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>Full</span>
                    <span>width</span>
                    <span>content</span>
                </div>
            </Checkbox>
        </div>
    </>
);
export const Label = LabelTemplate.bind({});

const ControlledTemplate: Story<CheckboxProps> = (args) => (
    <>
        <Checkbox {...args} content="Controlled checked" checked />
        <span style={{margin: '16px'}} />
        <Checkbox {...args} content="Controlled unchecked" checked={false} />
    </>
);
export const Controlled = ControlledTemplate.bind({});

const ShowcaseTemplate: Story = () => <CheckboxShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
