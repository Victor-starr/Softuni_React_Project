export interface UserDataFormType {
  profilePicture?: string | null | File;
  _id: string;
  username: string;
  email: string;
  password: string;
  rePassword?: string;
}

export interface ProductType {
  _id: string;
  title: string;
  ingredients: string;
  instructions: string;
  description: string;
  recommendList: string[];
  image: string;
}
export type FullProductType = ProductType & {
  recommendList: string[];
  owner: string;
};
export type ServerErrorMessage = {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
};
export type ServerResponde = {
  data: {
    message: string;
  };
  status: number;
};
export type CustomNotification = {
  message: string;
  status: number;
};
