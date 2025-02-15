import { unstable_noStore as noStore } from "next/cache";
import prisma from "./prisma";
import { PostWithExtras } from "@/lib/definitions"; // Import the correct type

export async function fetchPosts(): Promise<{ posts: PostWithExtras[]; error?: string }> {
  noStore();

  try {
    const data = await prisma.post.findMany({
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
        shares: {  // ✅ Added shares
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!data) {
      // console.error("Post not found");
      return { error: "Post not found", posts: [] };
    }

    // console.log("fetchPosts -> data", data);
    return { posts: data };
  } catch (error) {
    // console.error("fetchPosts -> Prisma error:", error);
    return { error: "Failed to fetch posts", posts: [] };
  }
}

export async function fetchPostById(id: string) {
  noStore();
  // console.log("fetchPostById_Action -> id", id);

  try {
    const data = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
        shares: {  // ✅ Added shares
          include: {
            user: true,
          },
        },
      },
    });

    // console.log("fetchPostById -> data", data);
    return data;
  } catch (error) {
    console.error("fetchPostById -> Prisma error:", error);
    return null;
  }
}

export async function fetchPostsByUsername(username: string, postId?: string) {
  noStore();

  try {
    const data = await prisma.post.findMany({
      where: {
        user: {
          username,
        },
        NOT: postId ? { id: postId } : undefined,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
        shares: {  // ✅ Added shares
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // console.log("fetchPostsByUsername -> data", data);
    return data;
  } catch (error) {
    console.error("fetchPostsByUsername -> Prisma error:", error);
    return [];
  }
}
// export async function fetchPosts() {
//   // equivalent to doing fetch, cache: no-store
//   noStore();

//   try {
//     const data = await prisma.post.findMany({
//       include: {
//         comments: {
//           include: {
//             user: true,
//           },
//           orderBy: {
//             createdAt: "desc",
//           },
//         },
//         likes: {
//           include: {
//             user: true,
//           },
//         },
//         savedBy: true,
//         user: true,
//       },
      
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     if (!data) {
//       console.error("Post not found");
//       return { error: "Post not found", posts: [] };
//     }
//     console.log("fetchPosts -> data", data);
//     return { posts: data };
//   } catch (error) {
//     return { error: "Failed to fetch post", post: null };
//   }
// }

// export async function fetchPostById(id: string) {
//   noStore();
//   console.log("fetchPostById_Action -> id", id);

//   try {
//     const data = await prisma.post.findUnique({
//       where: {
//         id,
//       },
//       include: {
//         comments: {
//           include: {
//             user: true,
//           },
//           orderBy: {
//             createdAt: "desc",
//           },
//         },
//         likes: {
//           include: {
//             user: true,
//           },
//         },
//         savedBy: true,
//         user: true,
//       },
//     });
//     console.log("fetchPostById -> data", data);
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch post");
//     // throw new Error("Failed to fetch post");
//   }
// }

// export async function fetchPostsByUsername(username: string, postId?: string) {
//   noStore();

//   try {
//     const data = await prisma.post.findMany({
//       where: {
//         user: {
//           username,
//         },
//         NOT: {
//           id: postId,
//         },
//       },
//       include: {
//         comments: {
//           include: {
//             user: true,
//           },
//           orderBy: {
//             createdAt: "desc",
//           },
//         },
//         likes: {
//           include: {
//             user: true,
//           },
//         },
//         savedBy: true,
//         user: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
// console.log("fetchPostsByUsername -> data", data);
//     return data;
//   } catch (error) {
//     console.log("Database -> data", error);
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch posts");
//   }
// }

export async function fetchProfile(username: string) {
  noStore();
    console.log("Fetching profile for", username);
  try {
    const data = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
        saved: {
          orderBy: {
            createdAt: "desc",
          },
        },
        followedBy: {
          include: {
            follower: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
        following: {
          include: {
            following: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
      }
    });
  // console.log("fetchProfile-->", data);
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch profile");
  }
}

export async function fetchSavedPostsByUsername(username: string) {
  noStore();

  try {
    const data = await prisma.savedPost.findMany({
      where: {
        user: {
          username,
        },
      },
      include: {
        post: {
          include: {
            comments: {
              include: {
                user: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
            likes: {
              include: {
                user: true,
              },
            },
            savedBy: true,
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // console.log("fetchSavedPostsByUsername -> data", data);

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch saved posts");
  }
}
