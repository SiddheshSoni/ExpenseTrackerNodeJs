const Authenticate = async (userData, authMode) => {
    const authEndPoint = authMode ? "Signup" : "Login";

    try {
        const res = await fetch(`http://localhost:3000/${authEndPoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                ok: false,
                error: data.message || "Authentication failed!",
            };
        }

        return {
            ok: true,
            data,
        };
    } catch (error) {
        return {
            ok: false,
            error: error.message || "Unable to connect to server.",
        };
    }
};

export default Authenticate;