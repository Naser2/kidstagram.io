"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // Adjust the import based on your prisma setup

// Define the schema for user signup validation
const CreateUser = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function createUser(values: z.infer<typeof CreateUser>) {
  // Validate input fields
  const validatedFields = CreateUser.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  const { name, email, password } = validatedFields.data;

  // console.log("CREATING IUSER  VALUES", name, email, password);
  // Check for existing user
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { message: "User already exists." };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Set default profile image for manually registered users
  const defaultAvatar = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(name)}`;

  try {
    // Create new user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Save the hashed password
        username: name.split(" ").join("").toLowerCase(), // Generate username from name
        image: defaultAvatar, // Assign default avatar
      },
    });
    //  console.log("CREATED_USER", user);
    return { message: "User created successfully.", data: user };
  } catch (error) {
    // console.log("ERROR_CREATING_USER", error)
    console.error("Database Error: ", error);
    return { message: "Database Error: Failed to Create User.", error };
  }
}

// Function to create a user
// export async function createUser(values: z.infer<typeof CreateUser>) {
//   // Validate input fields
//   const validatedFields = CreateUser.safeParse(values);

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Create User.",
//     };
//   }

//   const { name, email, password } = validatedFields.data;

//   // Check for existing user
//   const existingUser = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (existingUser) {
//     return {
//       message: "User already exists.",
//     };
//   }

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     // Create new user in the database
//    const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword, // Save the hashed password
//         username: name.split(" ").join("").toLowerCase(), // Generate username from the name
//         image: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${name}`, // Default profile image
//       },
//     });
    
//     return { message: "User created successfully.", data:user};
//   } catch (error) {
//     console.error("Database Error: ", error);
//     return { message: "Database Error: Failed to Create User.", error };
//   }
// }
