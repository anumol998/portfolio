export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>© {year} Anumol T Regi. All rights reserved.</p>
    </footer>
  );
}