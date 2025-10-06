export interface NewMessage {
  context: string;
  error: string;
  message: string;
}

export interface IResponseNewError {
  error: string;
  message: NewMessage[];
  path: string;
  statusCode: number;
  timestamp: string;
}
