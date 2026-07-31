import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import * as pageApi from "../../api/pages";
import * as menuApi from "../../api/menus";
import PageForm from "./components/PageForm";

export default function CreatePage() {
    const navigate = useNavigate();

    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        title: "",
        menu_id: "",
        body: "",
        status: "draft",
        publish_date: "",
        cover_image: null,
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

        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("menu_id", form.menu_id);
        formData.append("body", form.body);
        formData.append("status", form.status);

        if (form.publish_date) {
            formData.append("publish_date", form.publish_date);
        }

        if (form.cover_image) {
            formData.append("cover_image", form.cover_image);
        }

        try {
            await pageApi.createPage(formData);

            alert("Page created successfully.");

            navigate("/pages");
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
            <PageForm
                form={form}
                setForm={setForm}
                menus={menus}
                errors={errors}
                loading={loading}
                onSubmit={handleSubmit}
                onCancel={() => navigate("/pages")}
                submitText="Create Page"
            />
        </Layout>
    );
}