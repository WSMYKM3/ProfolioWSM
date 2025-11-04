export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h2>Lorem Ipsum</h2>
        <nav className="sidebar-nav">
          <ol>
            <li><a href="#">Aenean Facili</a></li>
            <li><a href="#">Mauris Lan</a></li>
            <li><a href="#">Quisque Vita Est</a></li>
            <li><a href="#">Sed Eget Metus</a></li>
            <li><a href="#">Vestibulum Ante</a></li>
            <li><a href="#">Primis In Faucibus</a></li>
            <li><a href="#">Orci Luctus</a></li>
            <li><a href="#">Ultrices Posuere</a></li>
            <li><a href="#">Cubilia Curae</a></li>
          </ol>
        </nav>
      </div>
      <div className="sidebar-section">
        <h2>Information</h2>
        <ul className="sidebar-info">
          <li><a href="mailto:your@email.com">Email</a></li>
          <li><a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </div>
    </aside>
  );
}

