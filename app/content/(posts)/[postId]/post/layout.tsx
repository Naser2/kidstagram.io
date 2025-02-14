const  Layout = ({ children }: { children: React.ReactNode }) => {
    console.log(`USERNAME_POST_ID_layout`);
  return (
    <div lang="en" className="dark" suppressHydrationWarning>
      <div className="h-screen flex flex-col">
        
            {children}
           
      </div>
    </div>
  );
}

export default Layout