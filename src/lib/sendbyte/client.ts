const baseUrl = process.env.SENDBYTE_BASE_URL;
const apiKey = process.env.SENDBYTE_API_KEY;

if (!apiKey) {
  console.warn("SENDBYTE_API_KEY is not set. Emails will not be sent.");
}

interface SendEmailInput {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (input: SendEmailInput): Promise<void> => {
  if (!apiKey) return;

  try {
    const response = await fetch(`${baseUrl}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`SendByte request failed (${response.status}): ${body}`);
    }
  } catch (error) {
    console.error("SendByte request error:", error);
  }
};
