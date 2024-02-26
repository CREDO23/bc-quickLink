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

  interface ILink {
    id : string
    long_form : string
    short_form : string
    visit_times : number
  }
}

export {};
