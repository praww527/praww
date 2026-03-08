import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { BookOpen, MessageCircle, BookmarkCheck, PenLine, ShoppingBag, User, Menu, X, LogOut, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");

  async function handleLogout() {
    await logout();
    navigate("/");
    setDropdownOpen(false);
  }

  const displayName = user?.first_name && user?.last_name
    ? `${user.first_name} ${user.last_name}`
    : user?.username || user?.email || "Account";

  const navLinks = [
    { to: "/", label: "Home", icon: BookOpen },
    { to: "/marketplace", label: "Marketplace", icon: ShoppingBag },
    { to: "/write", label: "Write", icon: PenLine, auth: true },
    { to: "/favorites", label: "Favorites", icon: BookmarkCheck, auth: true },
    { to: "/inbox", label: "Inbox", icon: MessageCircle, auth: true },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <BookOpen className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-serif text-xl font-bold tracking-tight">PRaww<span className="text-primary">Reads</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.filter(l => !l.auth || isAuthenticated).map(l => (
              <Link key={l.to} to={l.to} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(l.to) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                <l.icon className="h-4 w-4" />
                {l.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="relative hidden md:block">
                <button
                  data-testid="user-menu-btn"
                  onClick={() => setDropdownOpen(d => !d)}
                  className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  {user?.profile_image_url ? (
                    <img src={user.profile_image_url} alt={displayName} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {displayName[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                  <span className="max-w-[120px] truncate">{displayName}</span>
                  <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-background rounded-xl border border-border shadow-xl z-50 overflow-hidden" onClick={() => setDropdownOpen(false)}>
                    <Link to="/profile/me" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors">
                      <User className="h-4 w-4 text-muted-foreground" /> My Profile
                    </Link>
                    <div className="border-t border-border" />
                    <button onClick={handleLogout} data-testid="logout-btn"
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-destructive hover:bg-destructive/5 transition-colors">
                      <LogOut className="h-4 w-4" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" data-testid="login-nav-btn" className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors">
                Log In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button data-testid="mobile-menu-btn" onClick={() => setMobileOpen(v => !v)} className="md:hidden p-2 rounded-lg border border-border hover:bg-muted transition-colors">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/98 px-4 pb-4 pt-2" onClick={() => setMobileOpen(false)}>
          <div className="space-y-1 mb-3">
            {navLinks.filter(l => !l.auth || isAuthenticated).map(l => (
              <Link key={l.to} to={l.to} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(l.to) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                <l.icon className="h-4 w-4" /> {l.label}
              </Link>
            ))}
          </div>
          {isAuthenticated ? (
            <div className="border-t border-border pt-3 space-y-1">
              <Link to="/profile/me" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
                <User className="h-4 w-4" /> Profile
              </Link>
              <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/5">
                <LogOut className="h-4 w-4" /> Log Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center justify-center gap-2 mt-3 rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary/90">
              Log In / Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
