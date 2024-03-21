import type { Meta, StoryObj } from '@storybook/react'
import Table from '../components/table'
import mockUsers from '../../prisma/mock/user.json'

const meta = {
  title: 'Docs/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    data: { control: 'object', description: 'The data of the table' },
    columns: { control: 'object', description: 'The columns of the table' },
    showColumnsFilter: {
      control: 'boolean',
      description: 'Show the columns filter',
    },
    rowsPagination: { control: 'array', description: 'The rows pagination' },
    loading: { control: 'boolean' },
  },
  args: {
    data: [],
    columns: [],
    showColumnsFilter: true,
    rowsPagination: [5, 10, 15, 20, 50, 100],
    loading: false,
  },
} as Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: mockUsers.map((user, index) => ({
      ...user,
      age: Math.floor(Math.random() * 100),
      id: index + 1,
    })),
    columns: [
      {
        uid: 'name',
        label: 'Name',
        sortable: true,
        filterable: true,
      },
      {
        uid: 'email',
        label: 'E-mail',
        sortable: true,
        filterable: true,
      },
      {
        uid: 'age',
        label: 'Age',
        sortable: true,
        filterable: true,
      },
    ],
  },
}
