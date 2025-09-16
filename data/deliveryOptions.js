export const deliveryOptions = [
  {
    id: 1,
    deliveryDateDays: 7,
    priceCents: 0,
  },
  {
    id: 2,
    deliveryDateDays: 3,
    priceCents: 499,
  },
  {
    id: 3,
    deliveryDateDays: 1,
    priceCents: 999,
  },
];

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export function getDeliveryOption(deliveryOptionsId){
  let matchingOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionsId) {
      matchingOption = option;
    }
  });

  return matchingOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOptionsId, startDate) {
  const option = getDeliveryOption(deliveryOptionsId);
  let remainingDaysToAdd = option.deliveryDateDays;

  // Allow tests to provide a fixed start date; default to today
  let date = startDate ? dayjs(startDate) : dayjs();
  while (remainingDaysToAdd > 0) {
    date = date.add(1, 'day');
    const dayOfWeek = date.day(); // 0 = Sunday, 6 = Saturday
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      continue; // skip weekends; do not decrement remaining days
    }
    remainingDaysToAdd -= 1;
  }

  const deliveryDateFormatted = date.format('dddd, MMMM D');
  return `Delivery date: ${deliveryDateFormatted}`;
}
