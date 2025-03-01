export interface token {
  access_token: string;
  token_type: string;
}

export interface decodedToken {
  exp: string;
  id: number;
  sub: number;
}
