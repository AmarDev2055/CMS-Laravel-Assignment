import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import PrivilegeForm from "./components/PrivilegeForm";

import * as privilegeApi from "../../api/privileges";

export default function EditPrivilege() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: "",
        slug: "",
    });

    useEffect(() => {

        loadPrivilege();

    }, []);

    async function loadPrivilege() {

        try {

            const response = await privilegeApi.getPrivilege(id);

            const privilege = response.data.data;

            setForm({

                name: privilege.name,

                slug: privilege.slug,

            });

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        setErrors({});

        try {

            await privilegeApi.updatePrivilege(id, form);

            alert("Privilege updated successfully.");

            navigate("/privileges");

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

            <h1 className="text-3xl font-bold mb-6">
                Edit Privilege
            </h1>

            <PrivilegeForm
                form={form}
                setForm={setForm}
                errors={errors}
                loading={loading}
                onSubmit={handleSubmit}
                onCancel={() => navigate("/privileges")}
                submitText="Update Privilege"
            />

        </Layout>

    );

}