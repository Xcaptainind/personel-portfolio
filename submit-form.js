export default async (request, context) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const formData = await request.formData();
    const response = await fetch("https://getform.io/f/axoygzgb", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return new Response("Failed to submit form", { status: 500 });
    }

    return new Response("Form submitted successfully!", { status: 200 });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
};
