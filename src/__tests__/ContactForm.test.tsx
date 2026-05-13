import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '@/components/ContactForm/ContactForm'

const mockFetch = jest.fn()
global.fetch = mockFetch

describe('ContactForm', () => {
  beforeEach(() => { mockFetch.mockReset() })

  it('renders the submit button', () => {
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /send inquiry/i })).toBeInTheDocument()
  })

  it('shows Sending… and disables button while submitting', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) })
    render(<ContactForm />)
    fireEvent.submit(screen.getByTestId('inquiry-form'))
    expect(screen.getByRole('button')).toHaveTextContent('Sending…')
    expect(screen.getByRole('button')).toBeDisabled()
    await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled())
  })

  it('shows success message after successful submit', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) })
    render(<ContactForm />)
    fireEvent.submit(screen.getByTestId('inquiry-form'))
    await waitFor(() => expect(screen.getByText(/message sent/i)).toBeInTheDocument())
  })

  it('shows error message after failed submit', async () => {
    mockFetch.mockResolvedValue({ ok: false, json: async () => ({}) })
    render(<ContactForm />)
    fireEvent.submit(screen.getByTestId('inquiry-form'))
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument())
  })
})
