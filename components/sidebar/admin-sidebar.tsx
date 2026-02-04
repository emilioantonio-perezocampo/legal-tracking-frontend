import { SidebarSection, SidebarItem } from './primitives';
import { Users, Shield, Settings, FileText } from 'lucide-react';

export function AdminSidebar() {
  return (
    <>
      <SidebarSection title="User Management">
        <SidebarItem icon={Users} label="Users & Permissions" active />
        <SidebarItem icon={Shield} label="Roles" />
        <SidebarItem icon={Users} label="Teams" />
      </SidebarSection>

      <SidebarSection title="Firm Settings">
        <SidebarItem icon={Settings} label="Firm Profile" />
        <SidebarItem icon={Settings} label="Branding" />
        <SidebarItem icon={Settings} label="Integrations" />
      </SidebarSection>

      <SidebarSection title="Data & Security">
        <SidebarItem icon={Shield} label="Security Settings" />
        <SidebarItem icon={Settings} label="Data Sources" />
        <SidebarItem icon={FileText} label="Audit Trail" />
      </SidebarSection>

      <SidebarSection title="Billing">
        <SidebarItem icon={FileText} label="Subscription" />
        <SidebarItem icon={FileText} label="Invoices" />
      </SidebarSection>
    </>
  );
}
