export default function PrivilegeForm({
    form,
    setForm,
    errors,
    loading,
    onSubmit,
    onCancel,
    submitText,
}) {

    return (

        <form
            onSubmit={onSubmit}
            className="bg-white shadow rounded p-6 space-y-6"
        >

            <div>

                <label className="block mb-2 font-medium">
                    Privilege Name
                </label>

                <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                    className="w-full border rounded px-3 py-2"
                />

                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.name[0]}
                    </p>
                )}

            </div>

            <div>

                <label className="block mb-2 font-medium">
                    Slug
                </label>

                <input
                    type="text"
                    value={form.slug}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            slug: e.target.value,
                        })
                    }
                    className="w-full border rounded px-3 py-2"
                />

                {errors.slug && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.slug[0]}
                    </p>
                )}

            </div>

            <div className="flex gap-3">

                <button
                    disabled={loading}
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                >
                    {submitText}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="border px-5 py-2 rounded"
                >
                    Cancel
                </button>

            </div>

        </form>

    );

}