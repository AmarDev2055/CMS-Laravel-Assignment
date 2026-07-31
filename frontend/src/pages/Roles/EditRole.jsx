import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import RoleForm from "./components/RoleForm";

import * as roleApi from "../../api/roles";
import * as privilegeApi from "../../api/privileges";

export default function EditRole() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [errors, setErrors] = useState({});

    const [privileges, setPrivileges] = useState([]);

    const [form, setForm] = useState({
        name: "",
        description: "",
        privileges: [],
    });

    useEffect(() => {
        loadPrivileges();
        loadRole();
    }, []);

    async function loadPrivileges() {

        try {

            const response = await privilegeApi.getPrivileges();

            setPrivileges(response.data.data);

        } catch (error) {

            console.error(error);

        }

    }

    async function loadRole() {

        try {

            const response = await roleApi.getRole(id);

            const role = response.data.data;

            setForm({
                name: role.name,
                description: role.description || "",
                privileges: role.privileges.map(p => p.id),
            });

        } catch (error) {

            console.error(error);

            alert("Unable to load role.");

            navigate("/roles");

        } finally {

            setLoading(false);

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        setErrors({});

        try {

            await roleApi.updateRole(id, form);

            alert("Role updated successfully.");

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

    if (loading) {
        return (
            <Layout>
                Loading...
            </Layout>
        );
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
                submitText="Update Role"
            />

        </Layout>

    );

}