// src/pages/404.tsx
import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}
