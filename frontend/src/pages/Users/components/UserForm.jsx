export default function UserForm({
    form,
    setForm,
    roles,
    errors,
    loading,
    onSubmit,
    onCancel,
    submitText,
}) {

    function handleRoleChange(roleId) {

        const exists = form.roles.includes(roleId);

        if (exists) {

            setForm({
                ...form,
                roles: form.roles.filter(id => id !== roleId),
            });

        } else {

            setForm({
                ...form,
                roles: [...form.roles, roleId],
            });

        }

    }

    return (

        <form
            onSubmit={onSubmit}
            className="bg-white shadow rounded p-6"
        >

            <h1 className="text-3xl font-bold mb-6">
                {submitText}
            </h1>

            {/* Name */}

            <div className="mb-5">

                <label className="block mb-2 font-medium">
                    Name
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
                    <p className="text-red-600 text-sm mt-1">
                        {errors.name[0]}
                    </p>
                )}

            </div>

            {/* Email */}

            <div className="mb-5">

                <label className="block mb-2 font-medium">
                    Email
                </label>

                <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value,
                        })
                    }
                    className="w-full border rounded px-3 py-2"
                />

                {errors.email && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.email[0]}
                    </p>
                )}

            </div>

            {/* Password */}

            <div className="mb-5">

                <label className="block mb-2 font-medium">
                    Password
                </label>

                <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value,
                        })
                    }
                    className="w-full border rounded px-3 py-2"
                />

                {errors.password && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.password[0]}
                    </p>
                )}

            </div>

            {/* Confirm Password */}

            <div className="mb-5">

                <label className="block mb-2 font-medium">
                    Confirm Password
                </label>

                <input
                    type="password"
                    value={form.password_confirmation}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password_confirmation: e.target.value,
                        })
                    }
                    className="w-full border rounded px-3 py-2"
                />

            </div>

            {/* Roles */}

            <div className="mb-6">

                <label className="block mb-3 font-medium">
                    Roles
                </label>

                <div className="grid grid-cols-2 gap-3">

                    {roles.map((role) => (

                        <label
                            key={role.id}
                            className="flex items-center gap-2"
                        >

                            <input
                                type="checkbox"
                                checked={form.roles.includes(role.id)}
                                onChange={() =>
                                    handleRoleChange(role.id)
                                }
                            />

                            {role.name}

                        </label>

                    ))}

                </div>

                {errors.roles && (
                    <p className="text-red-600 text-sm mt-2">
                        {errors.roles[0]}
                    </p>
                )}

            </div>

            <div className="flex gap-3">

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : submitText}
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