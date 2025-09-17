import {
    Copyright,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  PhoneCall,
  Twitter,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <div className="bg-[#232f3e] p-8 mt-8 fixed-bottom bottom-0 right-0 left-0">
      <div className="container mx-auto text-slate-50 text-sm flex flex-col md:flex-row px-4 lg:px-10 gap-6 justify-between ">
        <div >
          <h2 className="text-2xl font-bold text-white"><span  className="text-red-500">Super</span>Shop</h2>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg lg:text-xl text-white font-semibold">Information</h2>
          <p>About Us</p>
          <p>More Search</p>
          <p>Blog</p>
          <p>Testimonials</p>
          <p>Events</p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg lg:text-xl text-white font-semibold">Helpful Links</h2>
          <p>Services</p>
          <p>Supports</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg lg:text-xl text-white font-semibold">Our Services</h2>
          <p>Brands list</p>
          <p>Order</p>
          <p>Return & Exchange</p>
          <p>Fashion list</p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-lg lg:text-xl text-white font-semibold">Contact Us</h2>
          <p>
            <PhoneCall className="inline" /> +01 1234567890
          </p>
          <p>
            {" "}
            <Mail className="inline" /> supershop@gmail.com
          </p>
          
        </div>
      </div>
      <div className="flex gap-3 justify-center mt-3">
            <Button className="rounded-full hover:text-red-500 cursor-pointer">
              <Facebook />
            </Button>
            <Button className="rounded-full hover:text-red-500 cursor-pointer">
              <Twitter />
            </Button>
            <Button className="rounded-full hover:text-red-500 cursor-pointer">
              <Instagram />
            </Button>
            <Button className="rounded-full hover:text-red-500 cursor-pointer">
              <Linkedin />
            </Button>
          </div>
      <hr className="my-5 border-gray-300 w-[75%] mx-auto" />
      <p className="text-center text-white text-sm">Copyright <Copyright className="inline" size={15} /> SuperShop, Inc.</p>
    </div>
  );
}
