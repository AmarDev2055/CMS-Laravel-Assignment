import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import RoleForm from "./components/RoleForm";

import * as roleApi from "../../api/roles";
import * as privilegeApi from "../../api/privileges";

export default function CreateRole() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const [privileges, setPrivileges] = useState([]);

    const [form, setForm] = useState({
        name: "",
        description: "",
        privileges: [],
    });

    useEffect(() => {
        loadPrivileges();
    }, []);

    async function loadPrivileges() {

        try {

            const response = await privilegeApi.getPrivileges();

            setPrivileges(response.data.data);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        setErrors({});

        try {

            await roleApi.createRole(form);

            alert("Role created successfully.");

            navigate("/roles");

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

            <RoleForm
                form={form}
                setForm={setForm}
                privileges={privileges}
                errors={errors}
                loading={loading}
                onSubmit={handleSubmit}
                submitText="Create Role"
            />

        </Layout>

    );

}