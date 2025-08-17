// RandomUser API Response Types
export interface RandomUser {
  gender: string;
  login: {
    uuid: string
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    city: string;
    country: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export interface RandomUserApiResponse {
  results: RandomUser[];
}

// Application User Types
export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  country: string;
}

// Generic API Response
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string,
    status?: number,
    code?: string,
  };
  success: boolean;
}