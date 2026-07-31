import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function PageForm({
    form,
    setForm,
    menus,
    errors = {},
    loading = false,
    onSubmit,
    onCancel,
    submitText = "Save Page",
}) {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (form.cover_image instanceof File) {
            const objectUrl = URL.createObjectURL(form.cover_image);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [form.cover_image]);

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
    }

    return (
        <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-8">

            <div className="mb-8">
                <h1 className="text-3xl font-bold">{submitText}</h1>
            </div>

            <form onSubmit={onSubmit}>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Side */}

                    <div className="lg:col-span-2 space-y-6">

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

                    </div>

                    {/* Right Side */}

                    <div className="space-y-6">

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
                                <option value="">Select Menu</option>

                                {menus.map((menu) => (
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
                                Status
                            </label>

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

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
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="mt-4 rounded-lg border shadow w-full h-52 object-cover"
                                />
                            )}
                        </div>

                    </div>

                </div>

                <div className="flex justify-end gap-3 mt-10">

                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Saving..." : submitText}
                    </button>

                </div>

            </form>

        </div>
    );
}