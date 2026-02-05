import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarSectionProps {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function SidebarSection({ title, children, action }: SidebarSectionProps) {
  return (
    <div className="mb-6 animate-in fade-in slide-in-from-left-2 duration-300">
      {title && (
        <div className="flex items-center justify-between mb-2 px-3">
          <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            {title}
          </h3>
          {action}
        </div>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

interface SidebarItemProps {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;           // Use for navigation
  onClick?: () => void;    // Use for actions
  badge?: React.ReactNode;
  active?: boolean;
  className?: string;
}

export function SidebarItem({ icon: Icon, label, href, onClick, badge, active, className }: SidebarItemProps) {
  const content = (
    <>
      {Icon && <Icon className={cn('w-4 h-4 shrink-0 transition-opacity', active ? 'text-blue-600 opacity-100' : 'text-gray-500 opacity-70 group-hover:opacity-100 group-hover:text-gray-700')} />}
      <span className="truncate flex-1">{label}</span>
      {badge && <span className={cn('text-xs', active ? 'text-blue-600 font-medium' : 'text-gray-400')}>{badge}</span>}
    </>
  );

  const baseClassName = cn(
    'flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-all duration-200 group select-none',
    active ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
    className
  );

  if (href) {
    return <Link href={href} className={baseClassName}>{content}</Link>;
  }

  return <div onClick={onClick} className={baseClassName}>{content}</div>;
}

interface SidebarButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
}

export function SidebarButton({ children, variant = 'primary', onClick, href }: SidebarButtonProps) {
  const variantClasses = variant === 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 shadow-sm'
    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50';

  const baseClassName = cn(
    'flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 mb-4 active:scale-[0.98]',
    variantClasses
  );

  if (href) {
    return <Link href={href} className={baseClassName}>{children}</Link>;
  }

  return (
    <button onClick={onClick} className={baseClassName}>
      {children}
    </button>
  );
}

export function ClientAvatar({ initials, name, color }: { initials: string, name: string, color: string }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer group">
      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-xs", color)}>
        {initials}
      </div>
      <span className="text-sm text-gray-600 group-hover:text-gray-900 truncate">{name}</span>
    </div>
  );
}
