import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import UserForm from "./components/UserForm";

import * as userApi from "../../api/users";
import * as roleApi from "../../api/roles";

export default function EditUser() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({

        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: [],
    });

    useEffect(() => {
        loadRoles();
        loadUser();
    }, []);

    async function loadRoles() {
        try {
            const response = await roleApi.getRoles();
            setRoles(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function loadUser() {
        try {
            const response = await userApi.getUser(id);
            const user = response.data.data;
            setForm({
                name: user.name,
                email: user.email,
                password: "",
                password_confirmation: "",
                roles: user.roles.map(role => role.id),
            });

        } catch (error) {
            console.error(error);
            alert("Unable to load user.");
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            await userApi.updateUser(id, form);
            alert("User updated successfully.");
            navigate("/users");
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error(error);
                alert("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Layout>
                Loading...
            </Layout>
        );
    }

    return (
        <Layout>
            <UserForm
                form={form}
                setForm={setForm}
                roles={roles}
                errors={errors}
                loading={loading}
                onSubmit={handleSubmit}
                onCancel={() => navigate("/users")}
                submitText="Update User"
            />
        </Layout>
    );
}