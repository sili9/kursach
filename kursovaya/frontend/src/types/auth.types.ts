export interface AuthState {
        isAuthenticated: boolean;
        user: User | null;
      }
      
      export interface User {
        id: string;
        email: string;
      }
      
      export interface LoginFormData {
        email: string;
        password: string;
      }