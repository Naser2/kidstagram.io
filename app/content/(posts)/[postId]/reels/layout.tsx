const  Layout = ({ children }: { children: React.ReactNode }) => {
    console.log(`ReelsPage Layout`);
  return (
    <div lang="en" className="dark" suppressHydrationWarning>
      <div className="h-screen flex flex-col">
        
            {children}
           
      </div>
    </div>
  );
}

export default Layout