import React, { useState } from "react";
import Title from "../component/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../component/NewsletterBox";

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: "", msg: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const closeToast = () => setToast({ type: "", msg: "" });

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    closeToast();
    try {
      const res = await fetch(
        import.meta.env.VITE_API_BASE
          ? `${import.meta.env.VITE_API_BASE}/api/contact`
          : "/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send");
      setToast({ type: "success", msg: "Message sent successfully." });
      setForm({ name: "", email: "", phone: "", message: "" });
      setOpen(false);
    } catch (err) {
      setToast({ type: "error", msg: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-10">
      {/* Toast */}
      {toast.msg && (
        <div
          className={`mx-auto my-4 w-[95%] max-w-xl rounded-md p-3 text-sm ${
            toast.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
          role="status"
        >
          <div className="flex items-start justify-between gap-3">
            <span>{toast.msg}</span>
            <button
              className="px-2 text-xs text-gray-600 hover:text-gray-900"
              onClick={closeToast}
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="text-center text-3xl sm:text-4xl font-bold text-blue-600 pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col items-center md:flex-row gap-10 mb-28 px-4 sm:px-8 lg:px-40">
        <img
          className="w-full max-w-xs sm:max-w-sm md:max-w-[480px] rounded-lg shadow-lg transition-transform transform hover:scale-105"
          src={assets.contact_img}
          alt="Contact Us"
        />
        <div className="flex flex-col justify-center items-start gap-4 sm:gap-6 text-gray-800">
          <p className="font-semibold text-lg sm:text-xl text-gray-700">
            Our Store
          </p>
          <p className="text-gray-600 text-base sm:text-lg">
            Shop No. 16/17 Rooprajat Park, Bldg. No. 3 Sector No. 1 Near HDFC
            Bank Opp. <br />
            Tata Housing Boisar(E) Palghar - 401501
          </p>
          <p className="text-gray-600 text-base sm:text-lg">
            Tel: +91 8652352328 / +91 8369472977 / +91 9702398437 <br />
            Email: rs.enterprisesrosystem2014@gmail.com
          </p>
          <button
            className="bg-[#23066d] text-white px-6 py-3 mt-4 text-sm sm:text-base hover:bg-blue-700 transition duration-300 rounded"
            onClick={() => setOpen(true)}
          >
            Get In Touch
          </button>
        </div>
      </div>

      <NewsletterBox />

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => !loading && setOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Contact Form
              </h3>
              <button
                className="rounded p-1 text-gray-500 hover:bg-gray-100"
                onClick={() => setOpen(false)}
                disabled={loading}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form className="grid gap-4" onSubmit={submitForm}>
              <div className="grid gap-1">
                <label className="text-sm text-gray-700" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Full name"
                />
              </div>

              <div className="grid gap-1">
                <label className="text-sm text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="name@example.com"
                />
              </div>

              <div className="grid gap-1">
                <label className="text-sm text-gray-700" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>

              <div className="grid gap-1">
                <label className="text-sm text-gray-700" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  required
                  className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Type the message..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
