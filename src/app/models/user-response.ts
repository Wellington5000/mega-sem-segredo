export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    phone_number: string;
    uuid: string;
    provider: string | null;
    provider_id: string | null;
    provider_token: string | null;
    notification_token: string | null;
    mercado_pago_user_id: string | null;
    created_at: string;
    updated_at: string;
  }
  
  export interface UserResponse {
    user?: User;
    token?: string;
    token_type?: string;
    assinatura?: string;
  }
  