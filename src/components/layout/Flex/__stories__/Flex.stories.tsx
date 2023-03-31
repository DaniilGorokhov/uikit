import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Col} from '../../Col/Col';
import {Flex, FlexProps} from '../Flex';
import {Row} from '../../Row/Row';
import {Box, LayoutPresenter} from '../../demo';
import {Container} from '../..';
import {Text} from '../../../Text';
import {Button} from '../../../Button/Button';

export default {
    title: 'Layout (unstable)/Flex',
    component: Flex,
} as Meta;

const DefaultTemplate: Story<FlexProps<'div'>> = (args) => (
    <LayoutPresenter title="Change screen size to 's' to see result">
        <Row space="micro">
            <Col>
                <Flex direction={{s: 'column', m: 'row'}} space={{s: 'micro', m: 'l'}} {...args}>
                    <Box w={50} h={50}>
                        Box 1
                    </Box>

                    <Box w={100} h={70}>
                        Box 2
                    </Box>
                    <Box w={200} h={150}>
                        Box 3
                    </Box>
                    <Box w={100} h={40}>
                        Box 4
                    </Box>
                </Flex>
            </Col>
        </Row>
    </LayoutPresenter>
);

export const Default = DefaultTemplate.bind({});
Default.args = {
    alignItems: 'center',
    justifyContent: 'center',
};

const FlexGapTemplate: Story<FlexProps<'div'>> = (args) => (
    <LayoutPresenter title="Change screen size to 's' to see result">
        <Container>
            <Row>
                <Col>
                    <Flex {...args} wrap="wrap">
                        {new Array(20).fill('_').map((_, i) => (
                            <Box w={100} h={50} key={i}>
                                <Text color="secondary">Fixed size 100x50</Text>
                            </Box>
                        ))}
                    </Flex>
                </Col>
            </Row>
        </Container>
    </LayoutPresenter>
);

export const FlexGap = FlexGapTemplate.bind({});
FlexGap.args = {
    gap: {s: 'nano', m: 'xl'},
};

const GapAndRowGapTemplate: Story<FlexProps<'div'>> = (args) => (
    <LayoutPresenter title="Change screen size to 's' to see result">
        <Container>
            <Row>
                <Col>
                    <Flex {...args} wrap="wrap">
                        {new Array(20).fill('_').map((_, i) => (
                            <Box w={100} h={50} key={i}>
                                <Text color="secondary">Fixed size 100x50</Text>
                            </Box>
                        ))}
                    </Flex>
                </Col>
            </Row>
        </Container>
    </LayoutPresenter>
);

export const GapAndRowGap = GapAndRowGapTemplate.bind({});
GapAndRowGap.args = {
    gap: {s: 'nano', m: 'xl'},
    gapRow: {s: 'xl', m: 'nano'},
};

const ChildrenWithBgColorTemplate: Story<FlexProps<'div'>> = (args) => (
    <LayoutPresenter title="Change screen size to 's' to see result">
        <Container>
            <Row>
                <Col>
                    <Flex {...args} space="l" wrap>
                        <Button>Some element with background</Button>
                        <Button>Some element with background</Button>
                    </Flex>
                </Col>
            </Row>
        </Container>
    </LayoutPresenter>
);

export const ChildrenWithBgColor = ChildrenWithBgColorTemplate.bind({});
ChildrenWithBgColor.args = {};

const WithNullChildrenTemplate: Story<FlexProps<'div'>> = (args) => (
    <LayoutPresenter title="Change screen size to 's' to see result">
        <Container>
            <Row>
                <Col>
                    <Flex {...args} space="l" direction="column">
                        <Box />
                        {null}
                        {null}
                        <Box />
                        {null}
                        <Box />
                    </Flex>
                </Col>
            </Row>
        </Container>
    </LayoutPresenter>
);

export const WithNullChildren = WithNullChildrenTemplate.bind({});
WithNullChildren.args = {};
