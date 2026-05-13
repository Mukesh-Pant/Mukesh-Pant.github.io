import { render, screen, fireEvent, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/context/ThemeContext'

function ThemeDisplay() {
  const { theme, toggle } = useTheme()
  return <button onClick={toggle}>{theme}</button>
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to light theme', () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    )
    expect(screen.getByRole('button')).toHaveTextContent('light')
  })

  it('toggles to dark and sets data-theme attribute', () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    )
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveTextContent('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('persists theme choice to localStorage', () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    )
    fireEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('reads saved theme from localStorage on mount', async () => {
    localStorage.setItem('theme', 'dark')
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    )
    await act(async () => {})
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
