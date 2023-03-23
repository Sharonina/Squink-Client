export async function verifyLogin(email: string, password: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    return {
      token: data.token,
      exp: data.expireDate,
    };
  } else {
    throw new Error("Invalid email or password");
  }
}

export async function createUser(userDetails: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });

  if (response.ok) {
    const data = await response.json();
    return {
      token: data.token,
      expireDate: data.expireDate,
    };
  } else {
    throw new Error("Failed to create a new user");
  }
}
