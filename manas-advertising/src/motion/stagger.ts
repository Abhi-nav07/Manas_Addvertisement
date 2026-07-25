export const delays = {
  tiny: 0.03,
  small: 0.05,
  medium: 0.1,
  large: 0.2,
  stagger: (index: number, amount: number = 0.05) => index * amount,
};
