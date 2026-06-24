import React, { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import axios from "../../../utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
// import API_URL from "@/config";
import { SiZalo } from "react-icons/si";
import { toast } from "react-toastify";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const fetchContactInfo = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BACKEND}/api/info`);
    return res.data;
  };

  const { data: contactInfo } = useQuery({
    queryKey: ["contactInfo"],
    queryFn: fetchContactInfo,
  });

  const { mutate: submitContact, isPending } = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BACKEND}/api/messages`,
        formData,
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Cảm ơn bạn đã gửi yêu cầu");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.phone
    ) {
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }
    submitContact(formData);
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl px-6 py-12 mx-auto lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs tracking-wider text-gray-500 uppercase">
              Liên hệ
            </p>
            <h1 className="mb-4 text-4xl font-light tracking-tight text-gray-900 lg:text-5xl">
              Hãy nói chuyện với chúng tôi
            </h1>
            <p className="text-base leading-relaxed text-gray-600">
              Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn với bất kỳ câu hỏi
              hoặc thắc mắc nào.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-16">
          {/* Contact Info - 2 cols */}
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="mb-6 text-xs tracking-wider text-gray-500 uppercase">
                Thông tin
              </h2>
              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <MapPin className="w-5 h-5 text-gray-400 transition-colors group-hover:text-gray-900" />
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-gray-500">Địa chỉ</p>
                      <p className="leading-relaxed text-gray-900">Hà Nội</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Phone className="w-5 h-5 text-gray-400 transition-colors group-hover:text-gray-900" />
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-gray-500">Điện thoại</p>
                      <a
                        href="tel:0123456789"
                        className="text-gray-900 hover:underline"
                      >
                        0123456789
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Mail className="w-5 h-5 text-gray-400 transition-colors group-hover:text-gray-900" />
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-gray-500">Email</p>
                      <a
                        href="mailto:contact@ssstutter.com"
                        className="text-gray-900 hover:underline"
                      >
                        NguyenHuu05122004@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Hours */}
            <div className="pt-6 border-t border-gray-200">
              <p className="mb-1 text-sm text-gray-500">Giờ mở cửa</p>
              <p className="text-gray-900">Thứ 2 - Chủ nhật: 9:00 - 22:00</p>
            </div>

            {/* Social Media */}
            <div className="pt-6 border-t border-gray-200">
              <p className="mb-4 text-sm text-gray-500">Mạng xã hội</p>
              <div className="flex gap-3">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-300 bg-gray-100 rounded-full w-11 h-11 hover:bg-black hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={"#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-300 bg-gray-100 rounded-full w-11 h-11 hover:bg-black hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={"#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-300 bg-gray-100 rounded-full w-11 h-11 hover:bg-black hover:text-white"
                  aria-label="Twitter"
                >
                  <SiZalo className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden bg-gray-100 border border-gray-200 aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d782.5947820413423!2d105.78023493145396!3d21.085879282833105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1761198806117!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Contact Form - 3 cols */}
          <div className="lg:col-span-3">
            <div className="p-4 bg-white border border-gray-200 sm:p-6 lg:p-10">
              <h2 className="mb-6 text-xs tracking-wider text-gray-500 uppercase">
                Gửi tin nhắn
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 text-sm transition-colors bg-transparent border-0 border-b border-gray-300 outline-none focus:border-black focus:ring-0 placeholder:text-gray-400"
                      placeholder="Họ và tên *"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 text-sm transition-colors bg-transparent border-0 border-b border-gray-300 outline-none focus:border-black focus:ring-0 placeholder:text-gray-400"
                      placeholder="Email *"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-0 py-3 text-sm transition-colors bg-transparent border-0 border-b border-gray-300 outline-none focus:border-black focus:ring-0 placeholder:text-gray-400"
                    placeholder="Số điện thoại"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-0 py-3 text-sm transition-colors bg-transparent border-0 border-b border-gray-300 outline-none resize-none focus:border-black focus:ring-0 placeholder:text-gray-400"
                    placeholder="Nội dung *"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-black text-white px-8 sm:px-10 py-3.5 rounded-full hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs tracking-wider font-medium"
                  >
                    {isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent" />
                        <span>Đang gửi</span>
                      </>
                    ) : (
                      <>
                        <span>Gửi tin nhắn</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
