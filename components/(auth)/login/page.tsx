"use client"; // Important: Add "use client" if you're using client-side hooks

import LoginForm from "@/components/LoginForm";
import { useState } from "react";

function LoginPage() {
  const [fieldsSatisfied, setFieldsSatisfied] = useState(false); // Add state for fieldsSatisfied

  return (
    <div>
      <LoginForm fieldsSatisfied={fieldsSatisfied} setFieldsSatisfied={setFieldsSatisfied} /> {/* Pass the prop */}
    </div>
  );
}

export default LoginPage;