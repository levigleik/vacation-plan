export const menuItems = [
  {
    name: 'Home',
    path: '/',
    icon: 'home',
    dropdown: null,
  },
  {
    name: 'Rol',
    path: '/rol',
    icon: 'rol',
    dropdown: null,
  },
  {
    name: 'Acompanhamento',
    path: '/monitoring',
    icon: 'monitoring',
    dropdown: null,
  },
  {
    name: 'Configurações',
    dropdown: [
      {
        name: 'Usuários',
        path: '/user',
        icon: 'user',
      },
      {
        name: 'Clientes',
        path: '/client',
        icon: 'client',
      },
      {
        name: 'Setores',
        path: '/sector',
        icon: 'sector',
      },
      {
        name: 'Empregados',
        path: '/employee',
        icon: 'employee',
      },
    ],
    path: '#settings',
    icon: 'settings',
  },
] as const
