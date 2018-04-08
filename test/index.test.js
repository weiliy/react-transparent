import React from 'react';
import T from '../src';
import renderer from 'react-test-renderer';

const Link = ({ children, page }) => (
  <a>{children}</a>
);

describe('T transparent a Component by a prop name', () => {
  let LinkWrapper;

  beforeEach(() => {
    LinkWrapper = T(Link)('page');
  });

  afterEach(() => {
    LinkWrapper = undefined;
  });

  test('prop name is defined, the Component will be render', () => {
    const component = renderer.create(
      <LinkWrapper page="https://github.com/weiliy/react-transparent">
        react-transparent
      </LinkWrapper>
    );
    const tree = component.toJSON();
    expect(tree).toEqual({ type: 'a', props: {}, children: [ 'react-transparent' ] });
  });

  test('prop name is undefined, will omit the Component only render the it\'s children', () => {
    const component = renderer.create(
      <LinkWrapper>
        react-transparent
      </LinkWrapper>
    );
    const tree = component.toJSON();
    expect(tree).toBe('react-transparent');
  });

});

describe('T transparent a Component by func(props)', () => {
  let LinkWrapper;
  let spy;

  beforeEach(() => {
    spy = jest.fn();
    LinkWrapper = T(Link)(spy);
  });

  afterEach(() => {
    LinkWrapper = undefined;
  });

  test('func recived props', () => {
    expect(spy.mock.calls.length).toBe(0);
    const props = { page: 'demo page' };
    const children = 'react-transparent';

    const component = renderer.create(
      <LinkWrapper {...props}>
        {children}
      </LinkWrapper>
    );

    const tree = component.toJSON();
    expect(spy.mock.calls.length).toBe(1);
    expect(spy).lastCalledWith({
      ...props,
      children,
    });
  });

  test('func return true, render the component', () => {
    spy.mockReturnValue(true);
    expect(spy.mock.calls.length).toBe(0);

    const component = renderer.create(
      <LinkWrapper>
        react-transparent
      </LinkWrapper>
    );

    const tree = component.toJSON();
    expect(spy.mock.calls.length).toBe(1);
    expect(tree).toEqual({ type: 'a', props: {}, children: [ 'react-transparent' ] });
  });

  test('func return false, omit the component', () => {
    spy.mockReturnValue(false);
    expect(spy.mock.calls.length).toBe(0);

    const component = renderer.create(
      <LinkWrapper>
        react-transparent
      </LinkWrapper>
    );

    const tree = component.toJSON();
    expect(spy.mock.calls.length).toBe(1);
    expect(tree).toBe('react-transparent');
  });

});
