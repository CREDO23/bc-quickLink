declare global {
  interface IClientResponse {
    message: string;
    data: unknown;
    error: unknown;
    success: boolean;
  }

  interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
  }
}

export {};
