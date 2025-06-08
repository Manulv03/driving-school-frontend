import { jwtDecode } from "jwt-decode";
import type { User, AuthResponse, BackendRole, Role } from "@/types/auth/auth-types";
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
      role: mapBackendRole(response.roles[0]),
    },
  };
}

export const authService = {

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
      `http://localhost:8080/api/auth/register`,
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
    localStorage.setItem("token", data.token);
    return transformAuthResponse(data);
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/auth/login`,
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
    localStorage.setItem("token", data.token);
    return transformAuthResponse(data);
  },

  async logout() {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  },

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
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
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = jwtDecode<JWTPayload>(token);
      return {
        id: payload.sub,
        name: payload.username,
        userName: payload.username,
        email: payload.email,
        role: mapBackendRole(payload.roles[0]),
        avatar: undefined,
      };
    } catch {
      return null;
    }
  },
};
