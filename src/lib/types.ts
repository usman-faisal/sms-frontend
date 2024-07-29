export interface User {
  username: string;
  role: "admin" | "user";
}

export interface Shop {
  _id: string;
  name: string;
  description: string;
}

export interface Area {
  _id: string;
  name: string;
  description: string;
  shops: Shop[];
}

export interface Salesman {
  _id: string;
  user: {
    username: string;
    _id: string;
  };
  areas: Area[];
}
