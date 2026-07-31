export default function MenuForm({
    form,
    setForm,
    menus,
    errors,
    loading,
    onSubmit,
    onCancel,
    submitText,
}) {
    return (
        <form
            onSubmit={onSubmit}
            className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto"
        >
            <h2 className="text-2xl font-bold mb-6">
                {submitText}
            </h2>

            {/* Title */}

            <div className="mb-5">

                <label className="block mb-2 font-medium">
                    Title
                </label>

                <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            title: e.target.value,
                        })
                    }
                    className="w-full border rounded px-3 py-2"
                />

                {errors.title && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.title[0]}
                    </p>
                )}

            </div>

            {/* Parent Menu */}

            <div className="mb-5">

                <label className="block mb-2 font-medium">
                    Parent Menu
                </label>

                <select
                    value={form.parent_id}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            parent_id: e.target.value,
                        })
                    }
                    className="w-full border rounded px-3 py-2"
                >

                    <option value="">
                        None
                    </option>

                    {menus.map((menu) => (
                        <option
                            key={menu.id}
                            value={menu.id}
                        >
                            {menu.title}
                        </option>
                    ))}

                </select>

                {errors.parent_id && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.parent_id[0]}
                    </p>
                )}

            </div>

            {/* Sort Order */}

            <div className="mb-6">

                <label className="block mb-2 font-medium">
                    Sort Order
                </label>

                <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            sort_order: e.target.value,
                        })
                    }
                    className="w-full border rounded px-3 py-2"
                />

                {errors.sort_order && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.sort_order[0]}
                    </p>
                )}

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3">

                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border rounded"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : submitText}
                </button>

            </div>

        </form>
    );
}