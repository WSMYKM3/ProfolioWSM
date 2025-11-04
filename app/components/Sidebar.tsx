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

