export interface Message {
  context: string;
  error: string;
  message: string;
  statusCode: number;
}

export interface IResponseError {
  error: string;
  message: Message[];
  statusCode: number;
}
