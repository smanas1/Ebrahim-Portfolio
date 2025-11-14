import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

// Reusable Button Component
const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "red";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const baseClasses =
    "font-medium rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-500",
    outline:
      "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white focus:ring-emerald-500 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-white",
    red: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg hover:shadow-xl",
  };
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

const Contact = () => {
  const { theme } = useTheme();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Contact Form Message",
    message: "",
  });

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Send the data to the backend API
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/contact/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "Contact Form Message",
          message: "",
        });
      } else {
        setSubmitError(
          result.message || "Failed to send message. Please try again later."
        );
      }
    } catch (error) {
      setSubmitError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className={`py-20 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-900 text-white"
      }`}
      id="contact"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 rounded-2xl overflow-hidden shadow-xl">
            <div
              className={`lg:w-1/2 p-8 md:p-12 ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <span
                className={`inline-block px-4 py-1 text-xs font-semibold ${
                  theme === "dark"
                    ? "bg-emerald-900 text-emerald-200"
                    : "bg-emerald-100 text-emerald-700"
                } rounded-full uppercase tracking-wider mb-4`}
              >
                GET IN TOUCH
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Freight Isn’t Just About Shipping.
                <br />
                <span
                  className={
                    theme === "dark" ? "text-emerald-400" : "text-emerald-600"
                  }
                >
                  It’s About Growth.
                </span>
              </h2>

              {/* Show success message if submission was successful */}
              {submitSuccess && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    theme === "dark"
                      ? "bg-emerald-900/30 text-emerald-300"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  Thank you for your message! I'll get back to you as soon as
                  possible.
                </div>
              )}

              {/* Show error message if submission failed */}
              {submitError && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    theme === "dark"
                      ? "bg-red-900/30 text-red-300"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    className={`block text-xs font-medium ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    } mb-2`}
                  >
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 ${
                      theme === "dark"
                        ? "bg-gray-700 text-white border-gray-600 focus:ring-emerald-500"
                        : "border-gray-300 focus:ring-emerald-500"
                    } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition`}
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    } mb-2`}
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@mail.com"
                    className={`w-full px-4 py-3 ${
                      theme === "dark"
                        ? "bg-gray-700 text-white border-gray-600 focus:ring-emerald-500"
                        : "border-gray-300 focus:ring-emerald-500"
                    } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition`}
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    } mb-2`}
                  >
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject of your message"
                    className={`w-full px-4 py-3 ${
                      theme === "dark"
                        ? "bg-gray-700 text-white border-gray-600 focus:ring-emerald-500"
                        : "border-gray-300 focus:ring-emerald-500"
                    } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition`}
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    } mb-2`}
                  >
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    rows={4}
                    className={`w-full px-4 py-3 ${
                      theme === "dark"
                        ? "bg-gray-700 text-white border-gray-600 focus:ring-emerald-500"
                        : "border-gray-300 focus:ring-emerald-500"
                    } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition resize-none`}
                    required
                  ></textarea>
                </div>
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>
            <div
              className={`lg:w-1/2 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-800"
              } flex items-center justify-center p-8`}
            >
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dtyqscfja/image/upload/v1761153159/Ebrahim/IMG_9765_lkkcjh.jpg"
                  alt="Ebrahim Kamal"
                  className="rounded-xl w-full max-w-sm h-auto object-cover shadow-lg border-4 border-white/20"
                />
                <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium">
                  Based in Bangladesh
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
