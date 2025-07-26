import { useLoginForm } from '@/app/(public)/(auth)/login/hooks/useLoginForm'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import FormLogin from '../FormLogin'

jest.mock('@/app/(public)/(auth)/login/hooks/useLoginForm')
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('FormLogin', () => {
  beforeEach(() => {
    jest.mocked(useLoginForm).mockReturnValue({
      login: jest.fn(),
      isPending: false,
    })
  })

  it('should render login form correctly', () => {
    render(<FormLogin />)

    expect(screen.getByTestId('login-form')).toBeInTheDocument()
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByTestId('password-input')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  it('should show validation errors for invalid inputs', async () => {
    render(<FormLogin />)

    const submitButton = screen.getByTestId('submit-button')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Email is invalid')).toBeInTheDocument()
      expect(
        screen.getByText('Password must be at least 6 characters'),
      ).toBeInTheDocument()
    })
  })

  it('should call login function with valid data', async () => {
    const mockLogin = jest.fn()
    jest.mocked(useLoginForm).mockReturnValue({
      login: mockLogin,
      isPending: false,
    })

    render(<FormLogin />)

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })
})
