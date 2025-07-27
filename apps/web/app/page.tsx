import { client } from "@repo/db/client";

async function getuser() {
  try {
    const response = await client.user.findMany({});
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const response = await getuser();
  console.log(response);
  return (
    <div>
      <button>Get Users</button>
    </div>
  );
}