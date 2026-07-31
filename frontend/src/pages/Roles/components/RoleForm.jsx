import { Link } from "react-router-dom";

export default function RoleForm({
    form,
    setForm,
    privileges,
    errors,
    loading,
    onSubmit,
    submitText,
}) {

    function togglePrivilege(id) {

        const exists = form.privileges.includes(id);

        if (exists) {

            setForm({
                ...form,
                privileges: form.privileges.filter(p => p !== id),
            });

        } else {

            setForm({
                ...form,
                privileges: [...form.privileges, id],
            });

        }
    }

    return (

        <form
            onSubmit={onSubmit}
            className="bg-white shadow rounded p-6"
        >

            <h2 className="text-2xl font-bold mb-6">
                {submitText}
            </h2>

            {/* Name */}

            <div className="mb-5">

                <label className="block mb-2 font-medium">
                    Role Name
                </label>

                <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                />

                {errors.name && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.name[0]}
                    </p>
                )}

            </div>

            {/* Description */}

            <div className="mb-6">

                <label className="block mb-2 font-medium">
                    Description
                </label>

                <textarea
                    rows={4}
                    className="w-full border rounded px-3 py-2"
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value,
                        })
                    }
                />

                {errors.description && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.description[0]}
                    </p>
                )}

            </div>

            {/* Privileges */}

            <div className="mb-6">

                <label className="block mb-3 font-medium">
                    Privileges
                </label>

                <div className="grid grid-cols-2 gap-3">

                    {privileges.map((privilege) => (

                        <label
                            key={privilege.id}
                            className="flex items-center gap-2 border rounded p-2 cursor-pointer hover:bg-gray-50"
                        >

                            <input
                                type="checkbox"
                                checked={form.privileges.includes(privilege.id)}
                                onChange={() => togglePrivilege(privilege.id)}
                            />

                            <span>
                                {privilege.name}
                            </span>

                        </label>

                    ))}

                </div>

                {errors.privileges && (
                    <p className="text-red-600 text-sm mt-2">
                        {errors.privileges[0]}
                    </p>
                )}

            </div>

            {/* Buttons */}

            <div className="flex gap-3">

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                >
                    {loading ? "Saving..." : submitText}
                </button>

                <Link
                    to="/roles"
                    className="px-5 py-2 border rounded hover:bg-gray-100"
                >
                    Cancel
                </Link>

            </div>

        </form>

    );

}