import * as R from 'ramda';
import Yoga from '@react-pdf/yoga';

import getPadding from '../../src/node/getPadding';

const getComputedPadding = R.cond([
  [R.equals(Yoga.EDGE_TOP), R.always(1)],
  [R.equals(Yoga.EDGE_RIGHT), R.always(2)],
  [R.equals(Yoga.EDGE_BOTTOM), R.always(3)],
  [R.equals(Yoga.EDGE_LEFT), R.always(4)],
]);

describe('node getPadding', () => {
  test('Should return 0 by default if no yoga node available', () => {
    const result = getPadding({});

    expect(result).toHaveProperty('paddingTop', 0);
    expect(result).toHaveProperty('paddingRight', 0);
    expect(result).toHaveProperty('paddingBottom', 0);
    expect(result).toHaveProperty('paddingLeft', 0);
  });

  test('Should return yoga values if node available', () => {
    const _yogaNode = { getComputedPadding };
    const result = getPadding({ _yogaNode });

    expect(result).toHaveProperty('paddingTop', 1);
    expect(result).toHaveProperty('paddingRight', 2);
    expect(result).toHaveProperty('paddingBottom', 3);
    expect(result).toHaveProperty('paddingLeft', 4);
  });

  test('Should return box specific values if available', () => {
    const result = getPadding({
      box: {
        paddingTop: 1,
        paddingRight: 2,
        paddingBottom: 3,
        paddingLeft: 4,
      },
    });

    expect(result).toHaveProperty('paddingTop', 1);
    expect(result).toHaveProperty('paddingRight', 2);
    expect(result).toHaveProperty('paddingBottom', 3);
    expect(result).toHaveProperty('paddingLeft', 4);
  });

  test('Should return style specific values if available', () => {
    const result = getPadding({
      style: {
        paddingTop: 1,
        paddingRight: 2,
        paddingBottom: 3,
        paddingLeft: 4,
        paddingVertical: 5,
        paddingHorizontal: 6,
        padding: 7,
      },
    });

    expect(result).toHaveProperty('paddingTop', 1);
    expect(result).toHaveProperty('paddingRight', 2);
    expect(result).toHaveProperty('paddingBottom', 3);
    expect(result).toHaveProperty('paddingLeft', 4);
  });

  test('Should return style axis values if available', () => {
    const result = getPadding({
      style: {
        paddingVertical: 1,
        paddingHorizontal: 2,
        padding: 3,
      },
    });

    expect(result).toHaveProperty('paddingTop', 1);
    expect(result).toHaveProperty('paddingRight', 2);
    expect(result).toHaveProperty('paddingBottom', 1);
    expect(result).toHaveProperty('paddingLeft', 2);
  });

  test('Should return generic padding value if available', () => {
    const result = getPadding({
      style: {
        padding: 1,
      },
    });

    expect(result).toHaveProperty('paddingTop', 1);
    expect(result).toHaveProperty('paddingRight', 1);
    expect(result).toHaveProperty('paddingBottom', 1);
    expect(result).toHaveProperty('paddingLeft', 1);
  });
});
