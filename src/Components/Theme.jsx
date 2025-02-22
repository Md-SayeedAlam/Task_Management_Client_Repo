import React from 'react';
import { CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';

const Theme = () => {


    const [theme, setTheme] = React.useState(() => {
        return localStorage.getItem('theme') || 'light';
      });
    
      const changeTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      };
    
      React.useEffect(() => {
        
        document.querySelector('html').setAttribute('data-theme', theme);
      }, [theme]);



    return (
        <label className="swap swap-rotate">
       <input 
         onClick={changeTheme} 
         type="checkbox" 
         className=" theme-controller" 
         checked={theme === 'dark'} 
         readOnly 
       />
       <div className="swap-on my-anchor-element mr-2 border rounded-full">
       
       <MdDarkMode size={20}/>
         </div>
       <div className="swap-off my-anchor-element"><CiLight size={20}/></div>
     </label>
     );
};

export default Theme;

