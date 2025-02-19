

"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login({newUser}:{newUser:boolean}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
   const [fieldsSatisfied, setFieldsSatisfied] = useState(false);
   
    useEffect(() => {
        setFieldsSatisfied(!!email && !!password);
    }, [email, password]);
  
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
      newUser && router.push("/onboarding"); // No need for `isMounted`
      router.push("/"); // No need for `isMounted`
    }
  };


  return (
   <>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form ">
        <div className="billing-form-grid">

        
        <input onChange={(e) => setEmail(e.target.value)}
            value={email}
              className="text-input text-input-sm text-input-full" 
              type="email" name="email" 
              placeholder="Email"
              />

                <input id="passwordSection"  onChange={(e) => setPassword(e.target.value)}
                       className="text-input text-input-sm text-input-full"
                       type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={password}/>
        </div>
      <div className="modal-footer">
          <button type="button"  className="btn btn-md-default rounded-full min-w-[100px] btn-filled btn-neutral modal-button ">
          <span className="btn-label-wrap"><span className="btn-label-inner">Cancel</span></span>
          </button>
          <button type="submit"
          className={`${fieldsSatisfied ? "auth_btn-filled btn btn-sm btn-filled btn-primary modal-button btn-filled rounded-full" : "btn-neutral btn-disabled !px-6 !ml-2"} ${!fieldsSatisfied && "group-hover:bg-[var(--button-primary-data-not-filled)]  "} !px-6 rounded-full`}>

<span className="btn-label-wrap"><span className="btn-label-inner">Continue</span></span>
</button></div>
        </form>
        {/* <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="google-button">
          Sign in with Google
        </button>
      */}
     </>
  );
}