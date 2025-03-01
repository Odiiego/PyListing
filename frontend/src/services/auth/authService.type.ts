export interface IToken {
  access_token: string;
  token_type: string;
}

export interface IDecodedToken {
  exp: string;
  id: number;
  sub: number;
}
