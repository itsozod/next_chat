type Access = {
  [key: number]: {
    read: boolean;
  };
};
export const accesses: Access = {
  1: {
    read: true,
  },
  2: {
    read: false,
  },
};
