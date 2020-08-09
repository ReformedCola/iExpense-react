import theme from 'theme';

export const CATEGORY_COLOR = {
  none: {
    background: '#ECECEC',
    fill: '#C7C7C7'
  },
  expense: {
    background: theme.$success,
    fill: 'white'
  },
  income: {
    background: theme.$warning,
    fill: 'white'
  }
};

export const ALL_TYPE = '-1';
export const OTHER_TYPE = '0';

export const ALL_CATEGORIES = [
  {
    id: '0',
    name: 'Other',
    iconName: 'others'
  },
  {
    id: '1',
    name: 'Clothes',
    iconName: 'clothing'
  },
  {
    id: '2',
    name: 'Shop',
    iconName: 'shopping'
  },
  {
    id: '3',
    name: 'Bus',
    iconName: 'bus'
  },
  {
    id: '4',
    name: 'Dining',
    iconName: 'dining'
  },
  {
    id: '5',
    name: 'Travel',
    iconName: 'travel'
  },
  {
    id: '6',
    name: 'Stock',
    iconName: 'stock'
  },
  {
    id: '7',
    name: 'Utility',
    iconName: 'utility'
  },
  {
    id: '8',
    name: 'Card',
    iconName: 'card'
  },
  {
    id: '9',
    name: 'Salary',
    iconName: 'salaryBag'
  },
];

const [
  other, clothes, shopping,
  traffic, eat, travel, stock,
  living, salary, transfer
] = ALL_CATEGORIES;

export const DEFAULT_INCOME_CATEGORIES = [
  salary, transfer, stock, other
];

export const DEFAULT_EXPENSE_CATEGORIES = [
  clothes, shopping, traffic, eat, travel, stock, living, transfer, other
];

