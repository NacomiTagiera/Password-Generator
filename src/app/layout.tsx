import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';

import './globals.css';

const roboto = Roboto_Flex({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Password Generator',
  description:
    'This is a simple web application built with Next.js that generates random passwords. It allows you to customize the password length and choose whether to include digits, lowercase letters, uppercase letters, and symbols.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
