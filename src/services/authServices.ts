// const ENDPOINT = "http://13.124.154.53:80/api/auth/login";
const ENDPOINT = "https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/auth/login/success";

export async function login(id: string, pw: string) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: id,
      password: pw,
    }),
  });

  return await response.json();
}
