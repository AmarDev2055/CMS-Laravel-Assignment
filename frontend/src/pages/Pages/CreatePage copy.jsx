import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import * as pageApi from "../../api/pages";
import * as menuApi from "../../api/menus";

import PageForm from "../Pages/components/PageForm";

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

    // const [preview, setPreview] = useState(null);

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

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleImage(e) {
        const file = e.target.files[0];

        if (!file) return;

        setForm((prev) => ({
            ...prev,
            cover_image: file,
        }));

        setPreview(URL.createObjectURL(file));
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
            <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Create Page
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create a new website page.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Title */}

                    <div>
                        <label className="block font-medium mb-2">
                            Title *
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        />

                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title[0]}
                            </p>
                        )}
                    </div>

                    {/* Menu + Status */}

                    <div className="grid grid-cols-2 gap-6">

                        <div>

                            <label className="block font-medium mb-2">
                                Menu *
                            </label>

                            <select
                                name="menu_id"
                                value={form.menu_id}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            >
                                <option value="">
                                    Select Menu
                                </option>

                                {menus.map(menu => (
                                    <option
                                        key={menu.id}
                                        value={menu.id}
                                    >
                                        {menu.title}
                                    </option>
                                ))}
                            </select>

                            {errors.menu_id && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.menu_id[0]}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="block font-medium mb-2">
                                Status *
                            </label>

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            >
                                <option value="draft">
                                    Draft
                                </option>

                                <option value="published">
                                    Published
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* Publish Date */}

                    <div>

                        <label className="block font-medium mb-2">
                            Publish Date
                        </label>

                        <input
                            type="datetime-local"
                            name="publish_date"
                            value={form.publish_date}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>

                    {/* Cover Image */}

                    <div>

                        <label className="block font-medium mb-2">
                            Cover Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="w-full"
                        />

                        {errors.cover_image && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.cover_image[0]}
                            </p>
                        )}

                        {preview && (
                            <div className="mt-4">
                                <img
                                    src={preview}
                                    alt="Cover Preview"
                                    className="w-full max-w-md h-64 object-cover rounded-lg border shadow"
                                />
                            </div>
                        )}

                    </div>

                    {/* Body */}

                    <div>
                        <label className="block font-medium mb-2">
                            Body *
                        </label>

                        <CKEditor
                            editor={ClassicEditor}
                            data={form.body}
                            onChange={(event, editor) => {
                                const data = editor.getData();

                                setForm((prev) => ({
                                    ...prev,
                                    body: data,
                                }));
                            }}
                        />

                        {errors.body && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.body[0]}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-4 pt-6">

                        <button
                            type="button"
                            onClick={() => navigate("/pages")}
                            className="px-6 py-3 rounded border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Page"}
                        </button>

                    </div>

                </form>

            </div>
        </Layout>
    );
}