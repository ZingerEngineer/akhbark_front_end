import { ToastOptions, toast } from 'react-toastify'

export const notifyMessage = (
  message: String,
  toastStyleConfig: ToastOptions<{}>
) => toast(message, toastStyleConfig)
export const notifySuccess = (
  message: String,
  successStyleConfig: ToastOptions<{}>
) => toast.success(message, successStyleConfig)
export const notifyPromise = async (
  prom: Promise<unknown> | (() => Promise<unknown>),
  pendingMessage: string,
  successMessage: string,
  errorMessage: string,
  promiseStyleConfig?: ToastOptions<{}>
) =>
  toast.promise(
    prom,
    {
      pending: pendingMessage,
      success: successMessage,
      error: errorMessage
    },
    promiseStyleConfig
  )
