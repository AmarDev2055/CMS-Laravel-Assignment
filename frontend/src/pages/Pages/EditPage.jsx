import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import PageForm from "./components/PageForm";

import * as pageApi from "../../api/pages";
import * as menuApi from "../../api/menus";

export default function EditPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [menus, setMenus] = useState([]);

    const [loading, setLoading] = useState(true);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        title: "",
        menu_id: "",
        body: "",
        status: "draft",
        publish_date: "",
        cover_image: null,
        existing_cover: "",
    });

    useEffect(() => {
        loadMenus();
        loadPage();
    }, []);

    async function loadMenus() {
        try {
            const response = await menuApi.getMenus();
            setMenus(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function loadPage() {

        try {

            const response = await pageApi.getPage(id);

            const page = response.data.data;

            setForm({
                title: page.title,
                menu_id: page.menu.id,
                body: page.body,
                status: page.status,
                publish_date: page.publish_date
                    ? page.publish_date.substring(0, 16)
                    : "",
                cover_image: null,
                existing_cover: page.cover_image,
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
        formData.append("_method", "PUT");
        try {
            await pageApi.updatePage(id, formData);
            alert("Page updated successfully.");
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

    if (loading) {
        return (
            <Layout>
                <div className="p-6">Loading page...</div>
            </Layout>
        );
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
                submitText="Update Page"
            />
        </Layout>
    );
}