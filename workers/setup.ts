import { MutableRefObject, Dispatch as ReactDispatch } from "react";

export const setupWorker = (
  callback: CallableFunction,
  setIsLoading: ReactDispatch<boolean>,
  skipEffect: MutableRefObject<boolean>,
  workerRef: MutableRefObject<Worker | null>
) => {
  workerRef.current = new Worker(new URL("./", import.meta.url));
  workerRef.current.onmessage = (event) => {
    const { type, data, error } = event.data;
    if (type === "success") {
      callback(data);
    } else if (type === "error") {
      console.error("Worker error:", error);
    }
    skipEffect.current = true;
    setIsLoading(false);
  };
  workerRef.current.onerror = (error) => {
    console.error("Worker error:", error);
    setIsLoading(false);
  };
  return () => {
    workerRef.current?.terminate();
  };
};
