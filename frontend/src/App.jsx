import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoutes";
import GuestRoute from "./routes/GuestRoute";

import PageList from "./pages/Pages/PageList";
import CreatePage from "./pages/Pages/CreatePage";
import EditPage from "./pages/Pages/EditPage";
import TrashPage from "./pages/Pages/TrashPage";

import MenuList from "./pages/Menu/MenuList";
import CreateMenu from "./pages/Menu/CreateMenu";
import EditMenu from "./pages/Menu/EditMenu";

import UserList from "./pages/Users/UserList";
import CreateUser from "./pages/Users/CreateUser";
import EditUser from "./pages/Users/EditUser";

import RoleList from "./pages/Roles/RoleList";
import CreateRole from "./pages/Roles/CreateRole";
import EditRole from "./pages/Roles/EditRole";

import PrivilegeList from "./pages/Privileges/PrivilegeList";
import CreatePrivilege from "./pages/Privileges/CreatePrivilege";
import EditPrivilege from "./pages/Privileges/EditPrivilege";

import NotFound from "./pages/Error/NotFound";

function App() {
    return (
        <Routes>

            {/* Guest */}
            <Route
                path="/"
                element={
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                }
            />

           
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Pages */}
            <Route
                path="/pages"
                element={
                    <ProtectedRoute>
                       
                            <PageList />
                        
                    </ProtectedRoute>
                }
            />

            <Route
                path="/pages/create"
                element={
                    <ProtectedRoute>
                        
                            <CreatePage />
                      
                    </ProtectedRoute>
                }
            />

            <Route
                path="/pages/:id/edit"
                element={
                    <ProtectedRoute>
                        
                            <EditPage />
                        
                    </ProtectedRoute>
                }
            />

            <Route
                path="/pages/trash"
                element={
                    <ProtectedRoute>
                       
                            <TrashPage />
                        
                    </ProtectedRoute>
                }
            />

            {/* Menus */}
            <Route
                path="/menus"
                element={
                    <ProtectedRoute>
                       
                            <MenuList />
                        
                    </ProtectedRoute>
                }
            />

            <Route
                path="/menus/create"
                element={
                    <ProtectedRoute>
                        
                            <CreateMenu />
                      
                    </ProtectedRoute>
                }
            />

            <Route
                path="/menus/:id/edit"
                element={
                    <ProtectedRoute>
                       
                            <EditMenu />
                        
                    </ProtectedRoute>
                }
            />

            {/* Users */}
            <Route
                path="/users"
                element={
                    <ProtectedRoute>
                        
                            <UserList />
                       
                    </ProtectedRoute>
                }
            />

            <Route
                path="/users/create"
                element={
                    <ProtectedRoute>
                       
                            <CreateUser />
                        
                    </ProtectedRoute>
                }
            />

            <Route
                path="/users/:id/edit"
                element={
                    <ProtectedRoute>
                        
                            <EditUser />
                      
                    </ProtectedRoute>
                }
            />

            {/* Roles */}
            <Route
                path="/roles"
                element={
                    <ProtectedRoute>
                       
                            <RoleList />
                        
                    </ProtectedRoute>
                }
            />

            <Route
                path="/roles/create"
                element={
                    <ProtectedRoute>
                        
                            <CreateRole />
                        
                    </ProtectedRoute>
                }
            />

            <Route
                path="/roles/:id/edit"
                element={
                    <ProtectedRoute>
                      
                            <EditRole />
                       
                    </ProtectedRoute>
                }
            />

            {/* Privileges */}
            <Route
                path="/privileges"
                element={
                    <ProtectedRoute>
                       
                            <PrivilegeList />
                       
                    </ProtectedRoute>
                }
            />

            <Route
                path="/privileges/create"
                element={
                    <ProtectedRoute>
                       
                            <CreatePrivilege />
                       
                    </ProtectedRoute>
                }
            />

            <Route
                path="/privileges/:id/edit"
                element={
                    <ProtectedRoute>
                        
                            <EditPrivilege />
                       
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}

export default App;