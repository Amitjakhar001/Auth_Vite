// // import React from 'react';
// // import AppBar from "@mui/material/AppBar";
// // import Toolbar from "@mui/material/Toolbar";
// // import Logo from './shared/Logo';
// // import { useAuth } from '../context/AuthContext';
// // import NavigationLink from './shared/NavigationLink';

// // const Header = () => {

// //   const auth = useAuth();


// //   return (
// //     <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
// //       <Toolbar sx={{ display: "flex" }}>
// //         <Logo />
// //         <div>
// //           {auth?.isLoggedIn ? (
// //           <>
// //             <NavigationLink bg="#00fffc" to="/createuser" text="Create User"  textColor="black" />
// //             <NavigationLink bg="#00fffc" to="/chat" text="Go To DashBoard"  textColor="black" />
// //             <NavigationLink bg="#51538f" textColor="white" to="/" text="logout" onClick={auth.logout} />
// //           </>
// //         ) : (
// //         <>
// //             <NavigationLink bg="#00fffc" to="/login" text="Login"  textColor="black" />
// //         </>)
// //          }
// //         </div>
// //       </Toolbar>
// //     </AppBar>
// //   )
// // }

// // export default Header



// import React from 'react';
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Logo from './shared/Logo';
// import { useAuth } from '../context/AuthContext';
// import NavigationLink from './shared/NavigationLink';

// const Header = () => {
//   const auth = useAuth();

//   // Determine which dashboard to link to based on the user's role
//   const dashboardLink = () => {
//     if (!auth.user) return '/login'; // Default to login if no user is logged in
//     switch (auth.user.role) {
//       case 'admin':
//         return '/admindashboard';
//       case 'poweruser':
//         return '/puserdashboard';
//       case 'normaluser':
//         return '/nuserdashboard';
//       default:
//         return '/'; // Default redirect, perhaps to a generic page or home
//     }
//   };

//   return (
//     <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
//       <Toolbar sx={{ display: "flex" }}>
//         <Logo />
//         <div>
//           {auth?.isLoggedIn ? (
//           <>
//             {/* <NavigationLink bg="#00fffc" to="/createuser" text="Create User"  textColor="black" /> */}

//             <NavigationLink bg="#00fffc" to={dashboardLink()} text="Go To Dashboard"  textColor="black" />
//             <NavigationLink bg="#51538f" textColor="white" to="/" text="logout" onClick={auth.logout} />
//           </>
//         ) : (
//           <>
//             <NavigationLink bg="#00fffc" to="/login" text="Login"  textColor="black" />
//           </>)
//         }
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;







import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
  const auth = useAuth();

  // Determine which dashboard to link to based on the user's role
  const dashboardLink = () => {
    if (!auth.user) return '/login'; // Default to login if no user is logged in
    switch (auth.user.role) {
      case 'admin':
        return '/admindashboard';
      case 'poweruser':
        return '/puserdashboard';
      case 'normaluser':
        return '/nuserdashboard';
      default:
        return '/'; // Default redirect, perhaps to a generic page or home
    }
  };

  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
          <>
            <NavigationLink bg="#00fffc" to={dashboardLink()} text="Go To Dashboard" textColor="black" />
            {/* Add User Management link for admin */}
            {auth.user?.role === 'admin' && (
              <NavigationLink bg="#00fffc" to="/admindashboard/usermanagement" text="User Management" textColor="Black" />
            )}
            <NavigationLink bg="#51538f" textColor="white" to="/" text="Logout" onClick={auth.logout} />
          </>
          ) : (
          <>
            <NavigationLink bg="#00fffc" to="/login" text="Login" textColor="black" />
          </>)
          }
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
