# KeyGuard AI Vault 🔑

**A super secure application for storing and managing your API keys.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![GitHub issues](https://img.shields.io/github/issues/lalomorales22/keyguard-ai-vault)](https://github.com/lalomorales22/keyguard-ai-vault/issues) [![GitHub forks](https://img.shields.io/github/forks/lalomorales22/keyguard-ai-vault)](https://github.com/lalomorales22/keyguard-ai-vault/network) [![GitHub stars](https://img.shields.io/github/stars/lalomorales22/keyguard-ai-vault)](https://github.com/lalomorales22/keyguard-ai-vault/stargazers)

KeyGuard AI Vault is designed to provide a robust and secure environment for developers and teams to store, manage, and access their sensitive API keys.

## 🌟 Overview

In the world of AI and interconnected services, managing API keys securely is paramount. Leaked API keys can lead to significant security breaches, unauthorized data access, and financial loss. KeyGuard AI Vault offers a centralized and fortified solution to this critical problem, built with a modern and robust tech stack.

## ✨ Features

* **🔒 Secure Storage:** Utilizes strong encryption mechanisms to protect your API keys.
* **🔑 Access Control:** Granular control over who can access which keys, managed via an authentication system.
* **📝 Easy Management:** Intuitive interface for adding, viewing, updating, and revoking API keys, leveraging a rich set of UI components.
* **📊 Data Visualization (Potentially):** May include dashboards or charts for key usage insights (inferred from `recharts`).
* **🔔 Notifications:** User feedback through toast notifications (using `Sonner` and shadcn/ui `Toaster`).
* **📱 Responsive Design:** Built with Tailwind CSS for adaptability across devices.
* **🎨 Theming:** Supports light/dark modes (via `next-themes`).
* **📋 Audit Trails (Planned/Implemented):** Logs all access and modifications to keys for security auditing.
* **🚀 Quick Integration:** Designed for easy integration with your development workflows.
* **🛡️ Environment Variable Management:** Helps manage keys for different environments.
* **👥 Team Collaboration (If applicable):** Securely share keys among team members.
* **🔐 OTP Input (Potentially):** May support One-Time Password input for enhanced security (inferred from `input-otp`).

## 🛠️ Technology Stack

This project is built with a modern frontend stack:

* **Core Framework:** React `18.3.1`
* **Build Tool:** Vite `5.4.1`
* **Language:** TypeScript `5.5.3`
* **UI Components:**
    * shadcn-ui (built on Radix UI primitives like `@radix-ui/react-accordion`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, etc.)
    * `lucide-react` for icons.
* **Styling:**
    * Tailwind CSS `3.4.11`
    * `tailwindcss-animate`
* **Routing:** React Router DOM `6.26.2`
* **State Management/Data Fetching:**
    * React Context (`AppContext`)
    * TanStack Query (`@tanstack/react-query 5.56.2`) for server state management.
* **Forms:**
    * React Hook Form `7.53.0`
    * `zod` for schema validation.
* **Theming:** `next-themes`
* **Notifications:** `Sonner` and shadcn/ui `Toaster`
* **Utility Libraries:**
    * `class-variance-authority`, `clsx`, `tailwind-merge`
    * `date-fns` for date utilities.
* **Additional UI/UX:**
    * `cmdk` (Command palette)
    * `embla-carousel-react` (Carousel)
    * `input-otp` (OTP Input)
    * `recharts` (Charting library)
    * `react-resizable-panels` (Resizable panels)
    * `vaul` (Drawer component)
* **Linting/Formatting:** ESLint

*(Note: You will need to define and manage your own backend services, database, and core encryption mechanisms.)*

## ⚙️ Installation & Development

You can edit and run the code using several methods:

1.  **Local Development (Using your preferred IDE):**
    * **Prerequisites:**
        * Node.js & npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
        * Git
    * **Steps:**
        ```bash
        # 1. Clone the repository:
        git clone [https://github.com/lalomorales22/keyguard-ai-vault.git](https://github.com/lalomorales22/keyguard-ai-vault.git)
        # 2. Navigate to the project directory:
        cd keyguard-ai-vault
        # 3. Install dependencies:
        npm i
        # 4. Start the development server:
        npm run dev
        ```
        This will start the Vite development server (typically on `http://localhost:5173` or the next available port), with hot module replacement for an instant preview.
    * **Other available scripts (from `package.json`):**
        * `npm run build`: Builds the application for production.
        * `npm run build:dev`: Builds the application in development mode.
        * `npm run lint`: Lints the codebase using ESLint.
        * `npm run preview`: Serves the production build locally for preview.

2.  **Directly in GitHub:**
    * Navigate to the desired file(s) in the repository.
    * Click the "Edit" button (pencil icon).
    * Make your changes and commit them.

3.  **Using GitHub Codespaces:**
    * Navigate to the main page of your repository.
    * Click "Code" -> "Codespaces" tab -> "New codespace".
    * Edit files within the Codespace, then commit and push.

**Environment Variables (for Local Development):**
* This project uses Vite. Client-side environment variables must be prefixed with `VITE_`.
* Create a `.env.local` file in the project root for local overrides (this file should be in `.gitignore`).
* Example:
    ```env
    VITE_APP_TITLE="KeyGuard AI Vault (Local)"
    VITE_API_ENDPOINT_EXAMPLE="/api/v1"
    ```
* **Server-side secrets** (like a master `ENCRYPTION_KEY` for the vault, database credentials, etc.) will need to be managed according to your chosen deployment strategy and backend setup.

## 🚀 Deployment

Deployment of this project will depend on your chosen hosting provider and backend infrastructure. You can build the static assets using `npm run build` and then deploy them to any static hosting service or integrate them with your backend server.

Consider platforms like:
* Vercel
* Netlify
* AWS Amplify
* Google Firebase Hosting
* Railway
* Or your own server infrastructure.

## 🚀 Usage

*(This section should describe how a user interacts with the KeyGuard AI Vault application itself, once it's running.)*

1.  Navigate to the application URL (once deployed).
2.  The application will present a **Login Screen**. Register a new user account or log in if you have existing credentials.
3.  Upon successful authentication, you will be directed to the **Dashboard**.
4.  Use the dashboard to:
    * Add new API keys, providing a name, the key itself, and any relevant notes.
    * View existing keys (with appropriate masking or permissions).
    * Edit or delete keys.
    * (If applicable) Manage user access or team settings.
5.  The application uses `react-router-dom` for navigation. If you attempt to access a non-existent path, a **Not Found** page will be displayed.

## 🛡️ Security Considerations

Security is the cornerstone of KeyGuard AI Vault.

* **Strong Encryption:** API keys must be encrypted at rest (in your database) and in transit (using HTTPS). You will need to implement the encryption logic in your backend.
* **Input Validation:** All user inputs must be validated (likely using `zod` with `react-hook-form` on the frontend, and corresponding validation on the backend) to prevent common web vulnerabilities.
* **Environment Variables:** Never hardcode secrets in your frontend code. Use `VITE_` prefixed variables for client-side configuration and manage backend secrets securely in your deployment environment.
* **HTTPS:** Ensure your application is always served over HTTPS in production.
* **Dependency Management:** Keep dependencies up-to-date via `npm update` and review them for vulnerabilities.
* **Authentication:** The application has a clear authentication flow (`LoginScreen` vs. `Dashboard` based on `isAuthenticated` state from `AppContext`). Ensure your backend authentication and authorization logic is robust.

**IMPORTANT:** If your application design involves a master encryption key, that key is critical. **Losing it could mean losing access to all stored API keys.** Store it securely (e.g., using a secrets manager service) and back it up in a safe, offline location.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to KeyGuard AI Vault:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature` or `bugfix/YourBugfix`).
3.  Make your changes (you can use any of the development methods described above).
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request against the `main` branch of `lalomorales22/keyguard-ai-vault`.

Please write clear commit messages and provide a detailed description of your changes in the Pull Request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
*(Ensure you have a LICENSE file in your repository. If not, you can easily add one; MIT is a good default.)*

## 📞 Contact

Lalo Morales - [@lalomorales22](https://twitter.com/lalomorales22)
Project Link: [https://github.com/lalomorales22/keyguard-ai-vault](https://github.com/lalomorales22/keyguard-ai-vault)

---

*Please review and customize this README further as needed for your project.*
