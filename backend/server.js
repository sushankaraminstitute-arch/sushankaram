import http from "node:http";
import { siteData } from "./data/siteData.js";

const PORT = process.env.PORT || 4000;

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(payload));
};

const readJsonBody = (req) => new Promise((resolve, reject) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;

    if (body.length > 1_000_000) {
      req.destroy();
      reject(new Error("Request body is too large"));
    }
  });

  req.on("end", () => {
    if (!body) {
      resolve({});
      return;
    }

    try {
      resolve(JSON.parse(body));
    } catch {
      reject(new Error("Invalid JSON body"));
    }
  });

  req.on("error", reject);
});

const buildInquiryRedirect = (payload) => {
  const fields = {
    Name: payload.name,
    Email: payload.email,
    Phone: payload.phone,
    "Interested Course": payload.course,
    Message: payload.message
  };

  const message = [
    "Hello, I would like to inquire about:",
    "",
    ...Object.entries(fields).map(([label, value]) => `${label}: ${value || "Not provided"}`)
  ].join("\n");

  return `https://wa.me/${siteData.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

const getRoutes = {
  "/api/health": () => ({ status: "ok" }),
  "/api/ui": () => siteData.ui,
  "/api/navigation": () => siteData.ui.navigation,
  "/api/redirects": () => siteData.ui.actions,
  "/api/home": () => siteData.home,
  "/api/courses": () => siteData.courses,
  "/api/about": () => siteData.about,
  "/api/contact": () => siteData.contact,
  "/api/site": () => siteData
};

const postRoutes = {
  "/api/contact/inquiry": async (req) => {
    const payload = await readJsonBody(req);
    const requiredFields = ["name", "email", "phone", "message"];
    const missingFields = requiredFields.filter((field) => !String(payload[field] || "").trim());

    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        body: {
          error: "Missing required fields",
          missingFields
        }
      };
    }

    return {
      statusCode: 200,
      body: {
        redirectUrl: buildInquiryRedirect(payload),
        target: "whatsapp"
      }
    };
  }
};

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const handler = req.method === "GET" ? getRoutes[url.pathname] : postRoutes[url.pathname];

  if (!handler) {
    const knownPath = getRoutes[url.pathname] || postRoutes[url.pathname];
    sendJson(res, knownPath ? 405 : 404, { error: knownPath ? "Method not allowed" : "Route not found" });
    return;
  }

  try {
    const result = await handler(req);

    if (result && typeof result === "object" && "statusCode" in result) {
      sendJson(res, result.statusCode, result.body);
      return;
    }

    sendJson(res, 200, result);
  } catch (error) {
    sendJson(res, 400, { error: error.message || "Unable to process request" });
  }
});

server.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});
