export interface UserResponse {
  message: string;
  data: {
    userId: {
      id: number;
      name: string;
      email: string;
    };
  };
}