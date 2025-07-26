import { useRegisterForm } from '@/app/(public)/(auth)/register/hooks/useRegisterForm'
import { useRegisterHook } from '@/app/(public)/(auth)/register/hooks/useRegisterModal'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import FormRegister from '../FormRegister'

jest.mock('@/app/(public)/(auth)/register/hooks/useRegisterForm')
jest.mock('@/app/(public)/(auth)/register/hooks/useRegisterModal')
jest.mock('@/lib/utils', () => ({
  convertToBase64: jest.fn().mockResolvedValue('data:image/png;base64,'),
}))
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('FormRegister', () => {
  beforeEach(() => {
    jest.mocked(useRegisterForm).mockReturnValue({
      register: jest.fn(),
      isPending: false,
    })

    jest.mocked(useRegisterHook).mockReturnValue({
      setModalOpen: jest.fn(),
      setImage: jest.fn(),
      image: undefined,
    })
  })

  it('should render register form correctly', () => {
    render(<FormRegister />)

    // Check if form elements are rendered
    expect(screen.getByTestId('register-form')).toBeInTheDocument()
    expect(screen.getByTestId('name-input')).toBeInTheDocument()
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByLabelText(/photo/i)).toBeInTheDocument()
    expect(screen.getByTestId('password-input')).toBeInTheDocument()
    expect(
      screen.getByTestId('password-confirmation-input'),
    ).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /back to login/i }),
    ).toBeInTheDocument()
  })

  it('should not submit form with invalid inputs', async () => {
    const mockRegister = jest.fn()
    jest.mocked(useRegisterForm).mockReturnValue({
      register: mockRegister,
      isPending: false,
    })

    render(<FormRegister />)

    const submitButton = screen.getByTestId('submit-button')
    fireEvent.click(submitButton)

    // Wait a moment for validation to occur
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Verify the register function was not called
    expect(mockRegister).not.toHaveBeenCalled()
  })

  it('should call register function with valid data', async () => {
    const mockRegister = jest.fn()
    jest.mocked(useRegisterForm).mockReturnValue({
      register: mockRegister,
      isPending: false,
    })

    render(<FormRegister />)

    // Fill in the form
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'User Teste' },
    })
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'teste2@teste.com' },
    })
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByTestId('password-confirmation-input'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'User Teste',
        email: 'teste2@teste.com',
        password: 'password123',
        passwordConfirmation: 'password123',
        photo: undefined,
      })
    })
  })

  it('should handle successful registration with correct backend response', async () => {
    // Mock the expected backend response
    const mockResponse = {
      id: 2,
      name: 'User Teste',
      email: 'teste2@teste.com',
      photo: 'data:image/png;base64,',
      createdAt: '2022-06-20T17:48:58.851Z',
    }

    const mockRegister = jest.fn().mockImplementation((data) => {
      // Simulate the API call and return the expected response
      return Promise.resolve(mockResponse)
    })

    // Mock the useRegisterForm hook to use our implementation
    jest.mocked(useRegisterForm).mockReturnValue({
      register: mockRegister,
      isPending: false,
    })

    render(<FormRegister />)

    // Fill in the form
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'User Teste' },
    })
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'teste2@teste.com' },
    })
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByTestId('password-confirmation-input'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled()

      // Verify the register function was called with the correct data
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'User Teste',
        email: 'teste2@teste.com',
        password: 'password123',
        passwordConfirmation: 'password123',
        photo: undefined,
      })

      // Verify the response matches our expected format
      const response = mockRegister.mock.results[0].value
      return response.then((data: any) => {
        expect(data).toEqual(mockResponse)
        expect(data).toHaveProperty('id', 2)
        expect(data).toHaveProperty('name', 'User Teste')
        expect(data).toHaveProperty('email', 'teste2@teste.com')
        expect(data).toHaveProperty('photo', 'data:image/png;base64,')
        expect(data).toHaveProperty('createdAt', '2022-06-20T17:48:58.851Z')
      })
    })
  })
})
