import './globals.css';

export const metadata = {
  metadataBase: new URL('https://landing-pages-armazem-diesel.vercel.app'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
