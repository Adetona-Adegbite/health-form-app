import { NavLink, Outlet } from "react-router-dom";

export default function Base() {
  return (
    <div id="detail">
      <header>
        <nav>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
