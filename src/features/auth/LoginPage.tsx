type Props = {
  onLogin: () => void
}

export function LoginPage({ onLogin }: Props) {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Alma Business Hub</h1>
        <p>Manage Alianza and Petra Insurance from one secure dashboard.</p>

        <label>Email</label>
        <input placeholder="alma@example.com" />

        <label>Password</label>
        <input type="password" placeholder="password" />

        <button className="primary-button" onClick={onLogin}>
          Demo Login
        </button>

        <small>Supabase Auth will be connected after the layout is approved.</small>
      </div>
    </div>
  )
}
