interface FormElement {
  type: string;
  title: string;
  name: string;
}

export const registerEle: FormElement[] = [
  {
    type: "text",
    title: "username",
    name: "username",
  },
  {
    type: "email",
    title: "email",
    name: "email",
  },
  {
    type: "password",
    title: "password",
    name: "password",
  },
  {
    type: "password",
    title: "confirm password",
    name: "cPassword",
  },
];

export const loginEle: FormElement[] = [
  {
    type: "email",
    title: "email",
    name: "email",
  },
  {
    type: "password",
    title: "password",
    name: "password",
  },
];
