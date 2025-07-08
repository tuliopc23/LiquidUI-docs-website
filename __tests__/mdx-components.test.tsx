import { render, screen } from '@testing-library/react'

describe('Basic rendering', () => {
  test('renders simple component', () => {
    render(<div>Hello World</div>)
    expect(screen.getByText('Hello World')).toBeDefined()
  })
})