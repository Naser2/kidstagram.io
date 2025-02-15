"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import  Login  from "@/components/authentication/Login";
import SignUpForm from "@/components/authentication/SignUpForm";
interface AuthenticationResponse {
    error?: string;
    success?: boolean;
}

interface SignInOptions {
    redirect: boolean;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}
    export default function AuthenticationModal() {
    const [isOpen, setIsOpen] = useState(true);   
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [newUser, setNewUser] = useState(false); // ✅ Track if the user is new
    const router = useRouter();
    const [fieldsSatisfied, setFieldsSatisfied] = useState(false);
   
    useEffect(() => {
      if (isSignUp) {
        setFieldsSatisfied(!!email && !!password && !!firstName && !!lastName);
      } else {
        setFieldsSatisfied(!!email && !!password);
      }
    }, [email, password, firstName, lastName, isSignUp]);
  

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //       e.preventDefault()
  //   const action = isSignUp ? "signUp" : "signIn";

  //   try {
  //       const response = await signIn("credentials", {
  //           redirect: false,
  //           email,
  //           password,
  //           ...(isSignUp && { firstName, lastName }) 
  //           // as SignInOptions,
  //       } );

  //       if (response?.error) {
  //           console.log("AUTH_ERROR", response.error);
  //           setError(response.error);
  //       } else {
  //           router.push("/user");
  //       }

  //   } catch (error) {
  //     console.error("Authentication error:", error);
  //     setError("An unexpected error occurred.");
  //   }
  // };
    // Function to handle successful signup
    const handleSignupSuccess = () => {
      setNewUser(true);  // ✅ Mark user as new
      setIsSignUp(false); // ✅ Switch to Login form
    };
 const onClose = () => {
    setIsOpen(false)
 }
 const socialButtons = [
    {
      className: " social-auth-btn btn-filled btn-neutral hover:!bg-white !py-1 lg:!py-2",
      imgSrc: "https://img.clerk.com/static/google.svg?width=160",
      alt: "Sign in with Google",
      onClick: () => signIn("google", { callbackUrl: "/" }),
    },
    {
      className: "social-auth-btn btn-filled-light btn-neutral hover:!bg-[var(--gray-100)]  !py-1 lg:!py-2",
      imgSrc: "https://img.clerk.com/static/metamask.svg?width=160",
      alt: "Sign in with MetaMask",
      onClick: () => signIn("google", { callbackUrl: "/" }),
    },
    {
      className: "social-auth-btn hover:!bg-[var(--gray-100)] btn-neutral border  border-[#35374096]  !py-1 lg:!py-2",
      imgSrc: "https://img.clerk.com/static/coinbase_wallet.svg?width=160",
      alt: "Sign in with Coinbase Wallet",
      onClick: () => signIn("google", { callbackUrl: "/" }),
    },
  ];

  return (
    <div lang="en" className="dark" data-theme="dark" >
    <div className="output-container" data-theme="dark">
      <div className="output-sizer">
      <div className="result_div">
      <div className="root">
        <div className="rl7uK">
        <div className="unjkE">
        <div data-focus-lock-disabled="false">
        <div className="modal-root modal-is-open modal-with-close-icon billing-setup-modal">
         <AnimatePresence>
          {isOpen && (
            <motion.div
              className="modal-backdrop backdrop-blur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // onClick={onClose}
            >
              <motion.div
                className="modal-dialog"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}>
           <div className="modal-dialog-container">
           <div className="modal-dialog modal-size-medium" aria-modal="true" role="dialog">
          <div className="group">
            <div className="modal-header">
              {isSignUp ? 
              <div className="heading-medium">Sign Up</div>
               : <span className="heading-medium">Log In</span>
              }
            </div>
            <div>
              <div className="modal-body ">
              <div className="billing-form-grid">
                <div className="social-buttons-grid">
                   {socialButtons.map((button, index) => (
                    <button onClick={button.onClick}
                      key={index}
                      type="button"
                      className={button.className}>
                      <img
                        src={button.imgSrc}
                        alt={button.alt}
                        className="cl-socialButtonsProviderIcon"
                      />
                    </button>
                  ))}
                </div>
                  <div className="nas-studios-dvdr-row">
                      <div className="nas-studios-dvdr-line-l"/>
                        <p className="nas-studios-dvdr-txt 🔒️ cl-internal-xexz24" data-localization-key="dividerText">
                          or
                        </p>
                      <div className="nas-studios-dvdr-line-l cl-dividerLine 🔒️ cl-internal-1ftpdtb"/>
                  </div>
                {isSignUp ? (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}>
                   <div className="billing-form-grid">  
                    <SignUpForm onSignupSuccess={handleSignupSuccess} />
                   </div>
                </motion.div>
                ): (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}>
                  <div className="billing-form-grid">
                    <Login newUser={newUser}/>
                    </div>
                  </motion.div>
                )}
                {error && <div className="error-message">{error}</div>}
               </div>
              </div>
             </div>
            <div className="switch-auth notice-neutral">
                 <div className="cl-footer 🔒️ cl-internal-4x6jej">
             {isSignUp ?
                  (<div className="cl-footerAction cl-footerAction__signIn 🔒️ cl-internal-1rpdi70 space-x-2">
                      <span className="cl-footerActionText 🔒️ cl-internal-kyvqj0 ">
                        Already have an account?
                      </span>
                      <button type="button" className="cl-internal-27wqok" onClick={() => setIsSignUp(false)}>
                          Login
                      </button>
                    </div>
                 ) : (<div className="cl-footerAction cl-footerAction__signIn 🔒️ cl-internal-1rpdi70 space-x-3">
                       <span className="cl-footerActionText 🔒️ cl-internal-kyvqj0 ">
                          Don&apos;t have an account?
                       </span>
                        <button type="button" className="cl-internal-27wqok" onClick={() => setIsSignUp(true)}>
                          Sign Up
                         </button>
                       </div>
                   )}
                    <div className="cl-internal-1dauvpw ">
                      <div className="cl-internal-df7v37">
                       <div className="cl-internal-y44tp9 ">
                        <div className="cl-internal-16mc20d inline-flex space-x-4"><p className="cl-internal-wf8x4b">Secured by</p>
                            <a aria-label="Clerk logo" 
                            className="cl-internal-1fcj7sw"> NasStudios</a>
                         </div>
                        </div>
                      </div>
                   </div>
                </div>   
              </div>
          </div>
          <button type="button" 
                  // onClick={onClose} 
                  className="btn group-hover:bg-black 
                          btn-md-default 
                          btn-minimal 
                          !bg-[#35374096]
                          hover:!bg-[var(--gray-100)]
                          btn-neutral 
                          modal-close 
                          rounded-full py-6" 
                  aria-label="Close">
                  <span className="btn-label-wrap">
                      <span className="btn-label-inner">
                          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                      </span>
                  </span>
              </button>
          </div>
          </div>
          </motion.div>
        </motion.div> )}
        </AnimatePresence>
      </div>
      </div>   
    </div>
    </div>
   </div>
  </div>
 </div>  
 </div>
</div>
)}