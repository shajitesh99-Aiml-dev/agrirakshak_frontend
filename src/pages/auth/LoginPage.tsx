import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LogIn, User, Sparkles } from 'lucide-react';
import { useAuth } from '../../features/auth';
import { AUTH_VALIDATION_RULES } from '../../features/auth/authValidation';
import { devAuth, DEV_MOCK_USERS } from '../../features/auth/devAuth';
import AuthLayout from '../../features/auth/components/AuthLayout';
import PasswordField from '../../features/auth/components/PasswordField';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Checkbox from '../../components/ui/Checkbox';
import Alert from '../../components/ui/Alert';
import { ROUTES } from '../../routes/routeConfig';
import { UserRole } from '../../types';
import { useI18n } from '../../i18n';

interface LoginFormData {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
}

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, role, error, clearError, sessionExpired } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Determine redirect target after login
  const fromLocation = (location.state as { from?: { pathname: string } })?.from?.pathname;
  const isExpiredQuery = new URLSearchParams(location.search).get('expired') === '1';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      emailOrPhone: '',
      password: '',
      rememberMe: true,
    },
    mode: 'onTouched',
  });

  const getDashboardForRole = (userRole: UserRole): string => {
    switch (userRole) {
      case 'officer':
        return ROUTES.OFFICER_DASHBOARD;
      case 'admin':
        return ROUTES.ADMIN_DASHBOARD;
      case 'farmer':
      default:
        return ROUTES.FARMER_DASHBOARD;
    }
  };

  useEffect(() => {
    if (isAuthenticated && role) {
      const destination = fromLocation || getDashboardForRole(role);
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, role, navigate, fromLocation]);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setFormError(null);
      setIsSubmitting(true);
      const user = await login({
        emailOrPhone: data.emailOrPhone,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      const destination = fromLocation || getDashboardForRole(user.role);
      navigate(destination, { replace: true });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : t('errors.general');
      setFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = (identifier: string) => {
    const mockUser = DEV_MOCK_USERS[identifier];
    if (mockUser) {
      setValue('emailOrPhone', identifier, { shouldValidate: true });
      setValue('password', mockUser.password, { shouldValidate: true });
      setFormError(null);
    }
  };

  return (
    <AuthLayout
      title={t('auth.loginTitle')}
      subtitle={t('auth.loginSubtitle')}
    >
      <div className="space-y-5">
        {/* Session expired notice */}
        {(sessionExpired || isExpiredQuery) && (
          <Alert variant="warning" title={t('errors.sessionExpired')}>
            {t('errors.sessionExpired')}
          </Alert>
        )}

        {/* Server or form error alert */}
        {(formError || error) && (
          <Alert variant="error" title={t('common.error')}>
            {formError || error}
          </Alert>
        )}

        {/* Development Mode Quick-Fill Helper */}
        {devAuth.isEnabled() && (
          <div className="p-4 bg-[#FAFDF9] rounded-md border-2 border-[#172117] shadow-neo space-y-2.5 select-none">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-[#172117] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
                {t('auth.demoAccountsTitle')}
              </span>
              <span className="text-[10px] text-[#496274] font-mono font-bold">Mock Auth Adapter</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('kisan@agrirakshak.in')}
                className="px-2 py-2 text-xs font-black rounded-md bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#1B5E20] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all text-center cursor-pointer"
              >
                {t('auth.demoFarmer')}
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('officer@agrirakshak.in')}
                className="px-2 py-2 text-xs font-black rounded-md bg-[#E1F5FE] hover:bg-[#B3E5FC] text-[#0277BD] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all text-center cursor-pointer"
              >
                {t('auth.demoOfficer')}
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin@agrirakshak.in')}
                className="px-2 py-2 text-xs font-black rounded-md bg-[#FFF3E0] hover:bg-[#FFE0B2] text-[#8D5B00] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all text-center cursor-pointer"
              >
                {t('auth.demoAdmin')}
              </button>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Email or Mobile Number */}
          <Input
            label={`${t('auth.phone')} / ${t('auth.email')}`}
            id="login-identifier"
            type="text"
            required
            autoComplete="username"
            placeholder="e.g. 9876543210 or kisan@agrirakshak.in"
            helperText={`${t('auth.phone')} / ${t('auth.email')}`}
            leadingIcon={<User className="w-4 h-4 text-text-muted" />}
            errorMessage={errors.emailOrPhone?.message}
            {...register('emailOrPhone', AUTH_VALIDATION_RULES.EMAIL_OR_PHONE)}
          />

          {/* Password with Show/Hide toggle */}
          <div>
            <PasswordField
              label={t('auth.password')}
              id="login-password"
              required
              autoComplete="current-password"
              placeholder={t('auth.passwordPlaceholder')}
              errorMessage={errors.password?.message}
              {...register('password', AUTH_VALIDATION_RULES.PASSWORD)}
            />
            <div className="flex justify-end mt-1">
              <Link
                to={ROUTES.HELP}
                className="text-xs font-serif text-text-muted hover:text-primary transition-colors"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>
          </div>

          {/* Remember me toggle */}
          <div className="pt-1">
            <Checkbox
              label="Remember this device for 30 days"
              id="remember-me"
              {...register('rememberMe')}
            />
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              leftIcon={<LogIn className="w-4 h-4" />}
            >
              {t('auth.signInBtn')}
            </Button>
          </div>
        </form>

        {/* Sign up prompt for new farmers */}
        <div className="pt-4 border-t border-[#EAEFE9] text-center">
          <p className="text-xs sm:text-sm text-text-muted font-serif">
            {t('auth.createAccount').split('?')[0]}?{' '}
            <Link
              to={ROUTES.REGISTER}
              className="font-bold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
            >
              {t('auth.registerBtn')}
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
