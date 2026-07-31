import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import PrivilegeForm from "./components/PrivilegeForm";

import * as privilegeApi from "../../api/privileges";

export default function CreatePrivilege() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: "",
        slug: "",
    });

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);
        setErrors({});

        try {

            await privilegeApi.createPrivilege(form);

            alert("Privilege created successfully.");

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

    return (

        <Layout>

            <h1 className="text-3xl font-bold mb-6">
                Create Privilege
            </h1>

            <PrivilegeForm
                form={form}
                setForm={setForm}
                errors={errors}
                loading={loading}
                onSubmit={handleSubmit}
                onCancel={() => navigate("/privileges")}
                submitText="Create Privilege"
            />

        </Layout>

    );

}