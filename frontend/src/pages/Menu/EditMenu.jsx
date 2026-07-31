import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import MenuForm from "./components/MenuForm";

import * as menuApi from "../../api/menus";

export default function EditMenu() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        title: "",
        parent_id: "",
        sort_order: 1,
    });

    useEffect(() => {
        loadMenus();
        loadMenu();
    }, []);

    async function loadMenus() {

        try {

            const response = await menuApi.getMenus();

            // Prevent selecting itself as parent
            setMenus(
                response.data.data.filter(menu => menu.id !== Number(id))
            );

        } catch (error) {

            console.error(error);

        }

    }

    async function loadMenu() {

        try {

            const response = await menuApi.getMenu(id);

            const menu = response.data.data;

            setForm({
                title: menu.title,
                parent_id: menu.parent_id ?? "",
                sort_order: menu.sort_order,
            });

        } catch (error) {

            console.error(error);

            alert("Unable to load menu.");

            navigate("/menus");

        } finally {

            setLoading(false);

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        setErrors({});

        try {

            await menuApi.updateMenu(id, form);

            alert("Menu updated successfully.");

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

    if (loading) {

        return (
            <Layout>
                Loading...
            </Layout>
        );

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
                submitText="Update Menu"
            />

        </Layout>

    );

}