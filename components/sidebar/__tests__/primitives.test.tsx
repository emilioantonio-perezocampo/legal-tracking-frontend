import { render, screen, fireEvent } from '@testing-library/react'
import { SidebarItem, SidebarButton, SidebarSection } from '../primitives'

// Mock icons
const MockIcon = ({ className }: { className?: string }) => <div data-testid="mock-icon" className={className} />

describe('Sidebar Primitives', () => {
  describe('SidebarItem', () => {
    it('renders as a link when href is provided', () => {
      render(<SidebarItem label="Test Item" href="/test" icon={MockIcon} />)
      const link = screen.getByRole('link', { name: /test item/i })
      expect(link).toHaveAttribute('href', '/test')
    })

    it('renders as a clickable div when onClick is provided', () => {
      const handleClick = jest.fn()
      render(<SidebarItem label="Click Me" onClick={handleClick} />)
      
      const item = screen.getByText('Click Me')
      fireEvent.click(item)
      expect(handleClick).toHaveBeenCalled()
    })

    it('applies active styles correctly', () => {
      render(<SidebarItem label="Active Item" active />)
      // Check for blue text/bg class presence (tailwind classes)
      const item = screen.getByText('Active Item').closest('div')
      expect(item).toHaveClass('bg-blue-50')
      expect(item).toHaveClass('text-blue-700')
    })

    it('displays badge content', () => {
      render(<SidebarItem label="Badged Item" badge="123" />)
      expect(screen.getByText('123')).toBeInTheDocument()
    })
  })

  describe('SidebarSection', () => {
    it('renders title and children', () => {
      render(
        <SidebarSection title="My Section">
          <div>Child Content</div>
        </SidebarSection>
      )
      expect(screen.getByText('My Section')).toBeInTheDocument()
      expect(screen.getByText('Child Content')).toBeInTheDocument()
    })

    it('renders action element if provided', () => {
      render(
        <SidebarSection title="Section" action={<button>Action</button>}>
          <div />
        </SidebarSection>
      )
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
    })
  })
})
