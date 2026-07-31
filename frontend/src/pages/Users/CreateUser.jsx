import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import UserForm from "./components/UserForm";

import * as userApi from "../../api/users";
import * as roleApi from "../../api/roles";

export default function CreateUser() {

    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);

    const [loading, setLoading] = useState(false);

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

    }, []);

    async function loadRoles() {

        try {

            const response = await roleApi.getRoles();

            setRoles(response.data.data);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        setErrors({});

        try {

            await userApi.createUser(form);

            alert("User created successfully.");

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

                submitText="Create User"

            />

        </Layout>

    );

}