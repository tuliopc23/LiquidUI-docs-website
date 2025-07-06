import '@testing-library/jest-dom'

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />
  },
}))

// Mock GSAP for testing
jest.mock('gsap', () => ({
  gsap: {
    to: jest.fn().mockReturnValue({ kill: jest.fn() }),
    from: jest.fn().mockReturnValue({ kill: jest.fn() }),
    set: jest.fn(),
    timeline: jest.fn().mockReturnValue({
      to: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      play: jest.fn().mockReturnThis(),
      pause: jest.fn().mockReturnThis(),
      kill: jest.fn().mockReturnThis(),
    }),
    registerPlugin: jest.fn(),
    killTweensOf: jest.fn(),
  },
  default: {
    to: jest.fn().mockReturnValue({ kill: jest.fn() }),
    from: jest.fn().mockReturnValue({ kill: jest.fn() }),
    set: jest.fn(),
    timeline: jest.fn().mockReturnValue({
      to: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      play: jest.fn().mockReturnThis(),
      pause: jest.fn().mockReturnThis(),
      kill: jest.fn().mockReturnThis(),
    }),
    registerPlugin: jest.fn(),
    killTweensOf: jest.fn(),
  },
}))

// Mock utils/gsap
jest.mock('./utils/gsap', () => ({
  gsap: {
    to: jest.fn().mockReturnValue({ kill: jest.fn() }),
    from: jest.fn().mockReturnValue({ kill: jest.fn() }),
    set: jest.fn(),
    timeline: jest.fn().mockReturnValue({
      to: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      play: jest.fn().mockReturnThis(),
      pause: jest.fn().mockReturnThis(),
      kill: jest.fn().mockReturnThis(),
    }),
    registerPlugin: jest.fn(),
    killTweensOf: jest.fn(),
  },
}))

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
    readText: jest.fn(() => Promise.resolve('')),
  },
})

// Console error/warning suppression for tests
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
  
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('componentWillReceiveProps') || 
       args[0].includes('componentWillMount'))
    ) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})