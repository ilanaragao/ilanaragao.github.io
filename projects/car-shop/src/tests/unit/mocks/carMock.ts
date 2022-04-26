export const mockCar = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
};

export const mockWithError = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 1,
  doorsQty: 1,
};

export const mockZodError = {
  error: {
    issues: [
      {
        code: 'invalid_type',
        expected: 'number',
        received: 'undefined',
        path: ['year'],
        message: 'Required',
      },
      {
        code: 'too_small',
        minimum: 2,
        type: 'number',
        inclusive: true,
        message: 'Value should be greater than or equal to 2',
        path: ['doorsQty'],
      },
    ],
    name: 'ZodError',
  },
};

export const mockWithId = [
  {
    _id: '4edd40c86762e0fb12000003',
    model: 'Ferrari Maranello',
    year: 1963,
    color: 'red',
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2,
  },
];
