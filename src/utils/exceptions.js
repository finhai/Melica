export function newException(message) {
  this.message = message;
  this.name = 'NewException';
}
export function errorVerify(error) {
  if (error instanceof TypeError) {
    return `erro de typagem de código linha:${error.line}, coluna:${error.column}`;
  }
  if (error instanceof RangeError) {
    return `erro no tipo de variavel de código linha:${error.line}, coluna:${error.column}`;
  }
  return error.message;
}
