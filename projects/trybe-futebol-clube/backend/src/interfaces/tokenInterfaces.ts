export interface IToken {
  email: string;
  role: string;
}

// Tipo de retorno jwt.verify: https://stackoverflow.com/questions/68024844/how-can-get-the-property-from-result-of-jwt-verify-method-that-was-already-cre
export interface IAuth {
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
