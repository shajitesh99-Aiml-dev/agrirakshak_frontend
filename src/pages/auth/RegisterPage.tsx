import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserPlus, User, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../features/auth';
import { AUTH_VALIDATION_RULES } from '../../features/auth/authValidation';
import AuthLayout from '../../features/auth/components/AuthLayout';
import PasswordField from '../../features/auth/components/PasswordField';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Checkbox from '../../components/ui/Checkbox';
import Alert from '../../components/ui/Alert';
import { ROUTES } from '../../routes/routeConfig';

interface RegisterFormData {
  name: string;
  emailOrPhone: string;
  village?: string;
  district?: string;
  state?: string;
  password: string;
  confirmPassword: string;
  consent: boolean;
}

export const RegisterPage: React.FC = () => {
  const { register: registerAuth, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      emailOrPhone: '',
      village: '',
      district: '',
      state: 'Maharashtra',
      password: '',
      confirmPassword: '',
      consent: false,
    },
    mode: 'onTouched',
  });

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'officer') navigate(ROUTES.OFFICER_DASHBOARD, { replace: true });
      else if (role === 'admin') navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
      else navigate(ROUTES.FARMER_DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  const onSubmit = async (data: RegisterFormData) => {
    setFormError(null);
    setIsSubmitting(true);

    try {
      await registerAuth({
        name: data.name,
        emailOrPhone: data.emailOrPhone,
        village: data.village,
        district: data.district,
        state: data.state,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: 'farmer',
        consent: data.consent,
      });

      // Redirect newly enrolled farmer to farmer dashboard
      navigate(ROUTES.FARMER_DASHBOARD, { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('Registration could not be completed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create Farmer Account"
      subtitle="Register your farm for free AI crop disease diagnosis and Krishi officer support."
      alternateAction={{
        text: 'Already have an Agri Rakshak account?',
        linkText: 'Sign In here',
        to: ROUTES.LOGIN,
      }}
    >
      <div className="space-y-5">
        {/* Error notification */}
        {formError && (
          <Alert variant="error" title="Registration Failed">
            {formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Full Name */}
          <Input
            label="Full Name / Kisan Name"
            id="register-name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Ramesh Patel"
            helperText="Enter your name as per Aadhaar or Kisan Credit Card"
            leadingIcon={<User className="w-4 h-4 text-text-muted" />}
            errorMessage={errors.name?.message}
            {...register('name', AUTH_VALIDATION_RULES.NAME)}
          />

          {/* Mobile Number or Email */}
          <Input
            label="Mobile Number or Email"
            id="register-identifier"
            type="text"
            required
            autoComplete="username"
            placeholder="e.g. 9876543210 or kisan@agrirakshak.in"
            helperText="Used for login and SMS case escalation alerts"
            leadingIcon={<Phone className="w-4 h-4 text-text-muted" />}
            errorMessage={errors.emailOrPhone?.message}
            {...register('emailOrPhone', AUTH_VALIDATION_RULES.EMAIL_OR_PHONE)}
          />

          {/* Location fields (2 columns on tablet/desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Village / Taluk (Optional)"
              id="register-village"
              type="text"
              placeholder="e.g. Niphad"
              leadingIcon={<MapPin className="w-4 h-4 text-text-muted" />}
              {...register('village')}
            />

            <Input
              label="District (Optional)"
              id="register-district"
              type="text"
              placeholder="e.g. Nashik"
              leadingIcon={<MapPin className="w-4 h-4 text-text-muted" />}
              {...register('district')}
            />
          </div>

          {/* Password */}
          <PasswordField
            label="Create Password"
            id="register-password"
            required
            autoComplete="new-password"
            placeholder="Minimum 6 characters"
            helperText="Choose a password you can easily remember"
            errorMessage={errors.password?.message}
            {...register('password', AUTH_VALIDATION_RULES.PASSWORD)}
          />

          {/* Confirm Password */}
          <PasswordField
            label="Confirm Password"
            id="register-confirm-password"
            required
            autoComplete="new-password"
            placeholder="Re-enter password"
            errorMessage={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (val) =>
                val === getValues('password') || 'Passwords do not match',
            })}
          />

          {/* Data stewardship and consent */}
          <Checkbox
            label={
              <span>
                I agree to the{' '}
                <Link
                  to={ROUTES.PRIVACY}
                  target="_blank"
                  className="text-primary font-semibold underline hover:text-primary-dark"
                >
                  Privacy Policy &amp; Terms
                </Link>{' '}
                for crop surveillance assistance
              </span>
            }
            id="register-consent"
            errorMessage={errors.consent?.message}
            {...register('consent', AUTH_VALIDATION_RULES.CONSENT)}
          />

          {/* Submit button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full justify-center min-h-[46px] text-base font-semibold"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            leftIcon={!isSubmitting ? <UserPlus className="w-4 h-4" /> : undefined}
          >
            {isSubmitting ? 'Registering Farm Account...' : 'Enroll as Farmer'}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-xs text-text-muted select-none">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
          <span>Government of India SIH26131 Standards • Free Public Service</span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
