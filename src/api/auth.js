const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const apiRequest = async (endpoint = "/", method = "GET", body = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API Request Error:", error.message);
    throw error;
  }
};

export const verifyUser = (token) => apiRequest("/auth/verify", "GET", null, token);

export const registerUser = (payload) => apiRequest("/auth/register", "POST", payload);
export const loginUser = (payload) => apiRequest("/auth/login", "POST", payload);

export const getPlans = () => apiRequest("/plans");
export const getPlanById = (planId) => apiRequest(`/plans/${planId}`);

export const purchaseSubscription = (payload, token) => apiRequest("/subscription/purchase", "POST", payload, token);
export const getUserSubscription = (token) => apiRequest("/subscription/my-subscription", "GET", null, token);
export const renewSubscription = (payload, token) => apiRequest("/subscription/renew", "POST", payload, token);

export const getAllSubscriptions = (token) => apiRequest("/subscription", "GET", null, token);

export default apiRequest;
