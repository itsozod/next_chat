export type LoginData = {
  data: {
    access_token: {
      token: string;
    };
    refresh_token: {
      token: string;
    };
  };
};

export type FormData = {
  username: string;
  password: string;
};
