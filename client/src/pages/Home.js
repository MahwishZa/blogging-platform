import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import img from "../assets/img.jpeg";
import Blog_Card from "../components/Blog_Card";

const Home = () => {

  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div id="blog" className="py-16">
      <motion.div
        className="container rounded mx-auto p-6 text-center text-white h-screen flex flex-col justify-center items-center relative"
        style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.h1
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.95 }}
          className="image-heading">
          Unleashing Creativity Through Art: A Community of Expression
        </motion.h1>
        <motion.span
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.95 }}
          className="text-bold text-white relative">
          Showcase your artistic vision, connect with like-minded creators, and discover inspiring stories that bring the art world to life
        </motion.span>
      </motion.div>
      <div id="all-blogs" className="container mx-auto px-4 py-6">
        <motion.h2
          className="mt-6 px-6 py-2 text-5xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Recent Posts
        </motion.h2>
        <div className="grid grid-cols-1 gap-8">
          {blogs &&
            blogs.map((blog) => (
              <Blog_Card
                id={blog?._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={blog.createdAt}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home
