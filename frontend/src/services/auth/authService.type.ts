export interface IToken {
  access_token: string;
  token_type: string;
}

export interface IDecodedToken {
  exp: number;
  id: number;
  sub: number;
}
