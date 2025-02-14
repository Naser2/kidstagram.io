


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/user";

export default function SignupForm({onSignupSuccess}:{onSignupSuccess:()=>void}) {
//   const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
 const [fieldsSatisfied, setFieldsSatisfied] = useState(false);
   
    useEffect(() => {
        setFieldsSatisfied(!!email && !!password && !!firstName && !!lastName);
    }, [email, password, firstName, lastName]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
      
        const name = `${firstName} ${lastName}`;
      
        try {
          const res = await fetch("/api/users/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          });
      
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
      
          const data = await res.json();
          console.log("SIGNUP_RES_DATA", data);
      
          if (data?.message === "User created successfully.") {
            onSignupSuccess(); // 
          } else {
            setError(data.message);
          }
        } catch (error) {
          console.error("Signup error:", error);
          setError("Signup failed. Please try again.");
        }
      };
      
    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setError("");
      
    //     const name = `${firstName} ${lastName}`;
    //     const res = await createUser({ name, email, password });
      
    //     console.log("SIGNUP_RES", res); // Check if res is undefined
    //     if (!res) {
    //       setError("Unexpected error: No response from server.");
    //       return;
    //     }
      
    //     const data = res;
    //     console.log("SIGNUP_RES_DATA", data);
        
    //     if (data?.message) {
    //       if (data.message === "User created successfully.") {
    //         router.push("/"); // Redirect to a welcome screen
    //       } else {
    //         setError(data.message);
    //       }
    //     } else {
    //       setError("Signup failed. Please try again.");
    //     }
    //   };
      
  return (<>
    <form onSubmit={handleSubmit} className="login-form ">
        <div className="billing-form-grid">

   <div className="grid grid-cols-2 space-x-2">
       <input className="text-input text-input-sm text-input-full" 
            type="text" name="first-name" placeholder="First name" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
            <input className="text-input text-input-sm text-input-full" 
            type="text" name="lasrt-name" placeholder="Last  name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />

          </div>
      
          <div className="block space-y-4">
            <input onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="text-input text-input-sm text-input-full" 
            type="email" name="email" 
            placeholder="Email"
            />

            <input id="passwordSection" onChange={(e) => setPassword(e.target.value)}
            className="text-input text-input-sm text-input-full"
            type="password" 
                name="password" 
                placeholder="Password" 
                value={password}/>
                 <div className="modal-footer">
                <button type="button"  className="btn btn-md-default rounded-full min-w-[100px] btn-filled btn-neutral modal-button">
                <span className="btn-label-wrap"><span className="btn-label-inner">Cancel</span></span>
                </button>
                <button type="submit"
                className={`${fieldsSatisfied ? "btn btn-sm btn-filled btn-primary modal-button btn-filled rounded-full" : "btn-neutral btn-disabled !px-6 !ml-2"} ${!fieldsSatisfied && "group-hover:bg-[var(--button-primary-data-not-filled)]  "} !px-6 rounded-full`}>

                <span className="btn-label-wrap"><span className="btn-label-inner">Continue</span></span>
                </button>
         </div>
             
        </div>
        </div>
        </form>
    </>
   
  );
}






