
export const routesFront: {
  path: string
  permissions: UserProps['role'][]
  private: boolean
}[] = [
  // private routes
  {
    path: '/',
    permissions: ['admin', 'manager', 'worker'],
    private: true,
  },
  {
    path: '/user',
    permissions: ['admin', 'manager'],
    private: true,
  },
  {
    path: '/client',
    permissions: ['admin', 'manager'],
    private: true,
  },
  {
    path: '/rol',
    permissions: ['admin', 'manager', 'worker'],
    private: true,
  },
  {
    path: '/priceList',
    permissions: ['admin', 'manager'],
    private: true,
  },
  {
    path: '/monitoring',
    permissions: ['admin', 'manager', 'worker'],
    private: true,
  },
  {
    path: '/employee',
    permissions: ['admin', 'manager'],
    private: true,
  },
  {
    path: '/sector',
    permissions: ['admin', 'manager'],
    private: true,
  },
  {
    path: '/sector-select',
    permissions: ['manager', 'worker'],
    private: true,
  },
  {
    path: '/product',
    permissions: ['admin', 'manager'],
    private: true,
  },
  {
    path: '/group',
    permissions: ['admin', 'manager'],
    private: true,
  },
  {
    path: '/priceList',
    permissions: ['admin', 'manager'],
    private: true,
  },
  {
    path: '/record',
    permissions: ['admin', 'manager'],
    private: true,
  },

  {
    path: '/log',
    permissions: ['admin', 'manager'],
    private: true,
  },

  {
    path: '/washControlEmployee',
    permissions: ['admin', 'manager'],
    private: true,
  },

  // public routes
  {
    path: '/login',
    permissions: [],
    private: false,
  },
  {
    path: '/tinturaria',
    permissions: [],
    private: false,
  },
  {
    path: '/reset-password',
    permissions: [],
    private: false,
  },
  {
    path: '/change-password',
    permissions: [],
    private: false,
  },
  {
    path: '/version',
    permissions: [],
    private: false,
  },
]

export const cookiesSettings = {
  // expires in 1 week
  expires: 7,
  // secure: true,
}