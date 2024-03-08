export const generateUrlMaker = (): string => {
  let maker = '';

  const chars_amount = Math.floor(Math.random() * 2 + 2); // Should return a random number between 2 and 4

  const characters =
    'qbcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY0123456789';

  for (let i = 1; i <= chars_amount; i++) {
    /**
     *
     * Loop and create a random string from characters
     * of 2 or 3 or 4 characters (see chars_amount)
     *
     * */

    const index = Math.floor(Math.random() * characters.length);

    maker += characters[index];
  }

  return maker;
};
