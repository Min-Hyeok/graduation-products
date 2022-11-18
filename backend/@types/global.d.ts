declare interface JwtToken {
  access_token: string;
  refresh_token?: string;
  SSID?: string;
}

declare interface JwtTokenInfo {
  userName: string;
  phoneNumber: string;
  email: string;
  id: number;
}
