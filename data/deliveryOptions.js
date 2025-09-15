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


export function getDeliveryOption(deliveryOptionsId){
  let matchingOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionsId) {
      matchingOption = option;
    }
  });

  return matchingOption || deliveryOptions[0];
}