import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import MenuForm from "./components/MenuForm";

import * as menuApi from "../../api/menus";

export default function CreateMenu() {

    const navigate = useNavigate();

    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        title: "",
        parent_id: "",
        sort_order: 1,
    });

    useEffect(() => {
        loadMenus();
    }, []);

    async function loadMenus() {

        try {

            const response = await menuApi.getMenus();

            setMenus(response.data.data);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);
        setErrors({});

        try {

            await menuApi.createMenu(form);

            alert("Menu created successfully.");

            navigate("/menus");

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

            <MenuForm
                form={form}
                setForm={setForm}
                menus={menus}
                errors={errors}
                loading={loading}
                onSubmit={handleSubmit}
                onCancel={() => navigate("/menus")}
                submitText="Create Menu"
            />

        </Layout>

    );

}