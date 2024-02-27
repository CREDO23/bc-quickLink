declare global {
  interface IClientResponse {
    message: string;
    data: unknown;
    error: unknown;
    success: boolean;
  }

  interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
  }

  interface ILink {
    id : string
    long_form : string
    maker : string
    visit_times : number
  }
}

export {};
