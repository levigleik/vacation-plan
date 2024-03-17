import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import { Providers } from './providers'

import './globals.css'

const font = Montserrat({ weight: '400', subsets: ['latin'] })

const APP_NAME = 'Vacation Planner'
const APP_TITLE_TEMPLATE = 'Vacation Planner | %s'
const APP_DESCRIPTION = 'Vacation Planner | Weekends and Holidays'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DESCRIPTION,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
}

export const viewport: Viewport = {
  themeColor: '#222',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={font.className}>
        <Providers>
          {/*<Suspense fallback={<Loading />}>*/}
          <main className="bg-background text-foreground ">
            {children}
            {/*</Suspense>*/}
          </main>
        </Providers>
      </body>
    </html>
  )
}
