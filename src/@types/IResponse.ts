export interface IResponse<T> {
  count: number;
  items: T[];
}

export interface IResponseObject<T> {
  count: number;
  items: T;
}
