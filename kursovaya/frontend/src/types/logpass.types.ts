export interface RegisterState {
        log1n: User | null;
        isRegistered: boolean;
      }
      
      export interface User {
        id: string;
        email: string;
        password: string;
      }
      
      export interface RegisterFormData {
        email: string;
        password: string;
      }