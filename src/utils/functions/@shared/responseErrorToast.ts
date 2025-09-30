import { IResponseError, Message } from "@/@types/erro/IResponseError";
import { IResponseNewError, NewMessage } from "@/@types/erro/IResponseNewError";
import toast from "react-hot-toast";

function responseErrorToast(error: IResponseError): void {
  toast.dismiss();

  if (error.statusCode && error?.message?.length) {
    error.message.forEach((msg: Message) => {
      if (msg?.message) {
        toast.error(msg.message, {
          id: "error-" + msg.error,
        });
      }
    });
    return;
  }

  toast.error("Algo deu errado, tente novamente!", {
    id: "error-default",
  });
}

function responseNewErrorToast(error: IResponseNewError): void {
  toast.dismiss();
  if (error.statusCode) {
    error?.message?.forEach((msg: NewMessage) => {
      if (msg?.message) {
        toast.error(msg?.message, {
          id: "error-" + msg?.error,
        });
      }
    });
  } else {
    toast.error("Algo deu errado, tente novamente!", {
      id: "error-default",
    });
  }
}

export { responseErrorToast, responseNewErrorToast };
