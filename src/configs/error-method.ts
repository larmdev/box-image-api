const methods = {
  ErrorNotModified(msg: string) {
    return { message: msg, status: 304 }
  },
  ErrorBadRequest(msg: string) {
    return { message: msg, status: 400 }
  },
  ErrorUnauthorized(msg: string) {
    return { message: msg, status: 401 }
  },
  ErrorPaymentRequired(msg: string) {
    return { message: msg, status: 402 }
  },
  ErrorForbidden(msg: string) {
    return { message: msg, status: 403 }
  },
  ErrorNotFound(msg: string) {
    return { message: msg, status: 400 }
  },
  ErrorMethodNotAllowed(msg: string) {
    return { message: msg, status: 405 }
  },
  ErrorUnprocessableEntity(msg: string) {
    return { message: msg, status: 422 }
  },
}

export default { ...methods }
