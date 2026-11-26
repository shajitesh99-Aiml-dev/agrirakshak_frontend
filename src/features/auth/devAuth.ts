import { User, UserRole } from '../../types';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../types/auth';

/**
 * Isolated Development-Only Mock Auth Adapter
 * 
 * IMPORTANT:
 * - Only active in development mode (`import.meta.env.DEV === true`)
 * - Never runs in production (`import.meta.env.PROD`)
 * - Provides immediate developer & reviewer testing capabilities for all 3 portals:
 *   - Farmer (default self-service role)
 *   - Officer (agricultural extension officer)
 *   - Administrator (system supervisor)
 */

export const DEV_MOCK_USERS: Record<string, { user: User; password: string }> = {
  'kisan@agrirakshak.in': {
    password: 'password123',
    user: {
      id: 'usr-farmer-001',
      name: 'Ramesh Patel',
      email: 'kisan@agrirakshak.in',
      phone: '9876543210',
      role: 'farmer' as UserRole,
      village: 'Navsari',
      district: 'Navsari',
      state: 'Gujarat',
      avatarUrl: undefined,
      createdAt: '2026-01-15T08:30:00Z',
    },
  },
  'officer@agrirakshak.in': {
    password: 'password123',
    user: {
      id: 'usr-officer-001',
      name: 'Dr. Priya Sharma',
      email: 'officer@agrirakshak.in',
      phone: '9876543211',
      role: 'officer' as UserRole,
      district: 'Nashik',
      state: 'Maharashtra',
      avatarUrl: undefined,
      createdAt: '2026-01-10T09:00:00Z',
    },
  },
  'admin@agrirakshak.in': {
    password: 'password123',
    user: {
      id: 'usr-admin-001',
      name: 'Super Administrator',
      email: 'admin@agrirakshak.in',
      phone: '9876543212',
      role: 'admin' as UserRole,
      avatarUrl: undefined,
      createdAt: '2026-01-01T00:00:00Z',
    },
  },
};

export const devAuth = {
  isEnabled(): boolean {
    return import.meta.env.DEV === true;
  },

  async mockLogin(credentials: LoginRequest): Promise<AuthResponse | null> {
    if (!this.isEnabled()) return null;

    // Simulate network latency (250ms)
    await new Promise((resolve) => setTimeout(resolve, 250));

    const identifier = credentials.emailOrPhone.trim().toLowerCase();
    
    // Check direct email match or check phone match
    let match = DEV_MOCK_USERS[identifier];
    if (!match) {
      match = Object.values(DEV_MOCK_USERS).find(
        (entry) => entry.user.phone === identifier
      )!;
    }

    if (match && credentials.password === match.password) {
      return {
        user: match.user,
        token: `dev_token_${match.user.role}_${Date.now()}`,
        message: 'Development authentication successful',
      };
    }

    return null;
  },

  async mockRegister(data: RegisterRequest): Promise<AuthResponse | null> {
    if (!this.isEnabled()) return null;

    await new Promise((resolve) => setTimeout(resolve, 350));

    const newUser: User = {
      id: `usr-farmer-${Date.now()}`,
      name: data.name,
      email: data.emailOrPhone.includes('@') ? data.emailOrPhone : undefined,
      phone: !data.emailOrPhone.includes('@') ? data.emailOrPhone : undefined,
      role: (data.role || 'farmer') as UserRole,
      village: data.village || 'Demo Village',
      district: data.district || 'Demo District',
      state: data.state || 'Demo State',
      createdAt: new Date().toISOString(),
    };

    return {
      user: newUser,
      token: `dev_token_farmer_${Date.now()}`,
      message: 'Farmer registered successfully',
    };
  },

  async mockGetCurrentUser(token: string): Promise<User | null> {
    if (!this.isEnabled()) return null;

    if (token.includes('officer')) {
      return DEV_MOCK_USERS['officer@agrirakshak.in'].user;
    }
    if (token.includes('admin')) {
      return DEV_MOCK_USERS['admin@agrirakshak.in'].user;
    }
    // Default to farmer
    return DEV_MOCK_USERS['kisan@agrirakshak.in'].user;
  },
};
