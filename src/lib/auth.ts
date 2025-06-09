import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import type {
  User,
  AuthResponse,
  BackendRole,
} from "@/types/auth/auth-types";
import { mapBackendRole } from "@/types/auth/auth-types";

interface LoginResponse {
  token: string;
  user: User;
}

interface JWTPayload {
  sub: string;
  username: string;
  email: string;
  roles: BackendRole[];
  exp: number;
  iat: number;
}

function transformAuthResponse(response: AuthResponse): LoginResponse {
  return {
    token: response.token,
    user: {
      id: response.username,
      name: response.username,
      userName: response.username,
      email: response.email,
      role: response.roles?.length ? mapBackendRole(response.roles[0]) : 'alumno', // default role
    },
  };
}

export const authService = {
  saveUserData(userData: User) {
    localStorage.setItem('userData', JSON.stringify(userData));
    Cookies.set('userData', JSON.stringify(userData), { expires: 1 }); // expires in 1 day
  },

  getUserData(): User | null {
    if (typeof window === 'undefined') return null;
    
    const localData = localStorage.getItem('userData');
    const cookieData = Cookies.get('userData');
    
    try {
      return localData ? JSON.parse(localData) : cookieData ? JSON.parse(cookieData) : null;
    } catch {
      return null;
    }
  },

  /**
   * Registers a new user with the provided username, email, and password.
   * @param username - The username of the new user.
   * @param email - The email address of the new user.
   * @param password - The password for the new user.
   * @returns A promise that resolves to a LoginResponse containing the token and user information.
   */
  async register(
    user: string,
    email: string,
    password: string
  ): Promise<LoginResponse> {
    const response = await fetch(
      `http://44.212.19.44:8080/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, email, password }),
      }
    );

    if (!response.ok) {
      console.error("Registration error:", response.statusText);
      throw new Error("Registration failed");
    }

    const data: AuthResponse = await response.json();
    const transformedResponse = transformAuthResponse(data);
    
    localStorage.setItem("token", data.token);
    Cookies.set("token", data.token, { expires: 1 }); // expires in 1 day
    this.saveUserData(transformedResponse.user);
    
    return transformedResponse;
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(
      `http://44.212.19.44:8080/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data: AuthResponse = await response.json();
    const transformedResponse = transformAuthResponse(data);
    
    localStorage.setItem("token", data.token);
    Cookies.set("token", data.token, { expires: 1 }); // expires in 1 day
    this.saveUserData(transformedResponse.user);
    
    return transformedResponse;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    Cookies.remove("token");
    Cookies.remove("userData");
    window.location.href = "/auth/login";
  },

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || Cookies.get("token") || null;
    }
    return null;
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decodedToken = jwtDecode<JWTPayload>(token);
      return decodedToken.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  getUserFromToken(): User | null {
    const savedUser = this.getUserData();
    if (savedUser) return savedUser;

    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = jwtDecode<JWTPayload>(token);
      const user = {
        id: payload.sub,
        name: payload.username,
        userName: payload.username,
        email: payload.email,
        role: mapBackendRole(payload.roles[0]),
        avatar: undefined,
      };
      this.saveUserData(user);
      return user;
    } catch {
      return null;
    }
  },
};
