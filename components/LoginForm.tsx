

// // import { calSans } from "@/app/fonts";
// import { signIn } from "next-auth/react";
// import { useFormStatus } from "react-dom";
// import { Button } from "./ui/button";
// import { calSans } from "@/app/fonts";

// export default function LoginForm() {
//   return (
//     <div className="space-y-3">
//       <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
//         <h1 className={`${calSans.className} mb-3 text-2xl dark:text-black`}>
//           Please log in to continue.
//         </h1>

//         <LoginButton />
//       </div>
//     </div>
//   );
// }

// function LoginButton() {
//   const { pending } = useFormStatus();

//   return (
//     <Button
//       className="mt-4 w-full"
//       variant={"secondary"}
//       aria-disabled={pending}
//       onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
//     >
//       Log in with Google
//     </Button>
//   );
// }

"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login({ fieldsSatisfied }: { fieldsSatisfied: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    // console.log("LOGIN Failed", formData.get("email"), formData.get("password"));
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
   
    if (res?.error) {
      // console.log("LOGIN Failed", res.error);
      setError("Invalid email or password");
    } 
    else {
      router.push("/user"); // No need for `isMounted`
    }
  };


  return (
    <div className="container">
      <div className="form-container">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
        <input onChange={(e) => setEmail(e.target.value)}
                     value={email}
                    className="text-input text-input-sm text-input-full" 
                   type="email" name="email" 
                   placeholder="Email"
                    />

                <input onChange={(e) => setPassword(e.target.value)}
                       className="text-input text-input-sm text-input-full"
                       type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={password}/>
          {/* <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div> */}
                     <div className="modal-footer">
<button type="button"  className="btn btn-md-default rounded-full min-w-[100px] btn-filled btn-neutral modal-button">
<span className="btn-label-wrap"><span className="btn-label-inner">Cancel</span></span>
</button>
<button type="submit"
 className={`${fieldsSatisfied ? "btn btn-sm btn-filled btn-primary modal-button btn-filled rounded-full" : "btn-neutral btn-disabled !px-6 !ml-2"} ${!fieldsSatisfied && "group-hover:bg-[var(--button-primary-data-not-filled)]  "} !px-6 rounded-full`}
 >
  {/* ["btn btn-md-default btn-sm btn-filled btn-primary modal-button rounded-full min-w-[100px]] */}
<span className="btn-label-wrap"><span className="btn-label-inner">Continue</span></span>
</button></div>
        </form>
        <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="google-button">
          Sign in with Google
        </button>
      </div>
      {/* // display: flex; */}
      <style jsx>{`
        .container {
    
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f5f5f5; /* Light grey background */
        }
        .form-container {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          max-width: 1000px;
          min-width: 230px;
          max-width: 360px;
          text-align: center;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #000;
        }
        .login-form {
          display: flex;
          flex-direction: column;
        }
        .input-group {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 1rem;
          color: #000;
        }
        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #000;
          border-radius: 4px;
          font-size: 1rem;
          background-color: #fff;
          color: #000;
        }
        input:focus {
          border-color: #000;
          outline: none;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
        }
        .login-button, .google-button {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #000;
          border-radius: 4px;
          margin-bottom: 1rem;
          cursor: pointer;
          background-color: #000;
          color: #fff;
        }
        .login-button:hover, .google-button:hover {
          background-color: #fff;
          color: #000;
          border: 1px solid #000;
        }
        .google-button {
          background-color: #fff;
          color: #000;
        }
        .error {
          color: red;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}