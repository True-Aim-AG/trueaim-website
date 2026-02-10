export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>Page not found</p>
            <a href="/" style={{ color: '#0066cc', textDecoration: 'underline' }}>
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
