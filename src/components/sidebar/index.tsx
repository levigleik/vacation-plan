import { Card } from '@nextui-org/card'
import { Listbox, ListboxSection, ListboxItem, Chip } from '@nextui-org/react'

export function Sidebar() {
  return (
    <Card className="shadow-blue-gray-900/5 h-[calc(100vh-2rem)] w-full max-w-[20rem] rounded-l-none p-4 shadow-xl">
      <div className="mb-2 p-4">Sidebar</div>
      <Listbox>
        <ListboxItem key="Dashboard">Dashboard</ListboxItem>
        <ListboxItem key="E">E-Commerce</ListboxItem>
        <ListboxItem key="Inbox">Inbox</ListboxItem>
        <ListboxItem key="Profile">Profile</ListboxItem>
        <ListboxItem key="Settings">Settings</ListboxItem>
        <ListboxItem key="Log">Log Out</ListboxItem>
      </Listbox>
    </Card>
  )
}
