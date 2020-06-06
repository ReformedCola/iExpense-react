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
    iconName: 'rmb'
  },
  {
    id: '1',
    name: 'Clothes',
    iconName: 'clothes'
  },
  {
    id: '2',
    name: 'Shop',
    iconName: 'bag'
  },
  {
    id: '3',
    name: 'Transport',
    iconName: 'bus'
  },
  {
    id: '4',
    name: 'Dining',
    iconName: 'rice'
  },
  {
    id: '5',
    name: 'Travel',
    iconName: 'luggage'
  },
  {
    id: '6',
    name: 'Stock',
    iconName: 'stock'
  },
  {
    id: '7',
    name: 'Water Fee',
    iconName: 'water-drop'
  },
  {
    id: '8',
    name: 'Credit Card',
    iconName: 'card'
  },
  {
    id: '9',
    name: 'Salary',
    iconName: 'salary'
  },
  {
    id: '10',
    name: 'Transfer',
    iconName: 'transfer'
  }
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

