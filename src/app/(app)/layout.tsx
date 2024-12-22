import './globals.scss';

export const metadata = {
  title: 'Seeded Random Order',
  description: 'Randomly sort a list of items with a seed',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="tw h-dvh">{children}</body>
    </html>
  );
}
