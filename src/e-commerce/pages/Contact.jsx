import React from "react";
import Header from "../components/Header";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { SlPhone } from "react-icons/sl";

const Contact = () => {
  return (
    <>
      <Header />
      <section className="bg-white ">
        <div className="container px-6 py-12 mx-auto">
          <div>
            <p className="font-medium text-blue-500 ">Contact us</p>

            <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl ">
              Get in touch
            </h1>

            <p className="mt-3 text-gray-500 ">
              Our friendly team would love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 ">
                  <MdOutlineEmail size={20} />
                </span>

                <h2 className="mt-4 text-base font-medium text-gray-800 ">
                  Email
                </h2>
                <p className="mt-2 text-sm text-gray-500 ">
                  Our friendly team is here to help.
                </p>
                <p className="mt-2 text-sm text-blue-500">hello@merakiui.com</p>
              </div>

              <div>
                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 ">
                  <CiLocationOn size={20} fill="red" />
                </span>

                <h2 className="mt-4 text-base font-medium text-gray-800 ">
                  Office
                </h2>
                <p className="mt-2 text-sm text-gray-500 ">
                  Come say hello at our office HQ.
                </p>
                <p className="mt-2 text-sm text-blue-500 ">
                  100 Smith Street Collingwood VIC 3066 AU
                </p>
              </div>

              <div>
                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 ">
                  <SlPhone size={20} />
                </span>

                <h2 className="mt-4 text-base font-medium text-gray-800 ">
                  Phone
                </h2>
                <p className="mt-2 text-sm text-gray-500 ">
                  This phone number is Active
                </p>
                <p className="mt-2 text-sm text-blue-500 ">+94 55-000-000</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto">
              <iframe
                width="100%"
                height="100%"
                title="map"
                src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
