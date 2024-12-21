/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errors/AppError";
import { IBlog } from "./blog.interface";
import { blogModel } from "./blog.model";

///Create Blog
const createBlogIntoDB = async (payload: IBlog) => {
  const result = await blogModel.create(payload);
  return result;
};

//Get All Blog New
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const { search, sortBy, sortOrder, filter } = query;

  // Build DB Query for search if provided
  const dbQuery: any = {};
  if (search && typeof search === "string") {
    dbQuery.$or = [
      { title: { $regex: search, $options: "i" } }, // Search in title
      { content: { $regex: search, $options: "i" } }, // Search in content
    ];
  }

  //Filtering
  if (filter && typeof filter === "string") {
    //  dbQuery.author = dbQuery.author || {};
    dbQuery.author = filter; // Filter by author ID
  }

  //Sorting
  const sortOptions: any = {};
  if (sortBy === "createdAt" || sortBy === "title") {
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1; // Sort in descending or ascending order
  }

  // Fetch blogs from DB with search query and populate author
  const result = await blogModel
    .find(dbQuery)
    .sort(sortOptions)
    .populate("author");
  // .populate("author");
  return result;
};

//Get Single Blog
const getSingleBlogFromDB = async (id: string) => {
  const result = await blogModel.findById(id).populate("author");
  return result;
};

//Delete Blog
const deleteBlogFromDB = async (id: string, loggedUserId: string) => {
  console.log("Logged User id: ", loggedUserId);

  ///Check author of blog
  const targetBlog = await blogModel.findById(id);
  console.log("Target Blog: ", targetBlog);
  if (!targetBlog) {
    throw new AppError(404, "This blog not exists");
  }
  const blogAuthorId = targetBlog?.author;
  console.log("Author id of Target Blog: ", blogAuthorId);

  if (loggedUserId !== blogAuthorId?.toString()) {
    throw new AppError(404, "Blog ref id and user is not same");
  }

  const result = await blogModel.findByIdAndDelete(id);
  return result;
};

//update Blog
const updateBlogIntoDB = async (
  id: string,
  payload: Partial<IBlog>,
  loggedUserId: string
) => {
  //   console.log("Logged User id: ", loggedUserId);
  //   console.log("Here");

  ///Check author of blog
  const targetBlog = await blogModel.findById(id);
  console.log("Target Blog: ", targetBlog);
  if (!targetBlog) {
    throw new AppError(404, "This blog not exists");
  }

  const blogAuthorId = targetBlog?.author;
  console.log("Author id of Target Blog: ", blogAuthorId);

  if (loggedUserId !== blogAuthorId?.toString()) {
    throw new AppError(404, "Blog ref id and user is not same");
  }

  const result = await blogModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  deleteBlogFromDB,
  updateBlogIntoDB,
};