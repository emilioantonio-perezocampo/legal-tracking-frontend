import '@testing-library/jest-dom'
import 'whatwg-fetch'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock
