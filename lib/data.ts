import { unstable_noStore as noStore } from "next/cache";
import prisma from "./prisma";
import { PostWithExtras } from "@/lib/definitions"; // Import the correct type

export async function fetchPosts(): Promise<PostWithExtras[]> {
  noStore();

  try {
    const data = await prisma.post.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        caption: true,
        fileUrl: true,
        location: true, // ✅ Added location field
        userId: true,
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
        user: {
          include: {
            followedBy: {
              select: { 
                followerId: true, 
                followingId: true  // ✅ Ensure both IDs are selected
              }, 
            },
            following: {
              select: { 
                followerId: true,  // ✅ Fix: Ensure `followerId` is included
                followingId: true 
              }, 
            },
          },
        },
        shares: {  
          include: {
            user: true,
            post: true, // ✅ Ensure `post` is included in shares
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data; // ✅ Now `post.user` includes both `followedBy` & `following`
  } catch (error) {
    console.error("fetchPosts -> Prisma error:", error);
    return []; // ✅ Handle errors gracefully
  }
}



export async function  fetchPostById(id: string) {
  noStore();


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
        user: {
          include: {
            followedBy: { 
              take: 100,
              select: { followerId: true }, // ✅ Fetch only follower IDs
            },
            following: { 
              take: 100,
              select: { followingId: true }, // ✅ Fetch only following IDs
            },
          },
        },
        shares: {
          include: {
            user: true,
            post: {
              include: {
                user: true,
                comments: { include: { user: true } },
                likes: { include: { user: true } },
              },
            },
          },
        },
      },
    });

    return data; // ✅ Now post.user includes both followedBy & following
  } catch (error) {
    console.error("Error fetching post data:", error);
    return null;
  }

}
// export async function fetchPostById(id: string) {
//   noStore();
//   // console.log("fetchPostById_Action -> id", id);

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
//         user: {
//           include: {
//             followedBy: { 
//               take: 100, // ✅ Limit to 100 followers
//               include: { followerId: true } // ✅ Include followers of the post's author
//             },
//           },
//         },
//         shares: {
//           include: {
//             user: true,
//             post: { // ✅ Only include minimal data for shared post to avoid deep nesting
//               include: {
//                 user: true,
//                 comments: { include: { user: true } },
//                 likes: { include: { user: true } },
//               },
//             },
//           },
//         },
//       },
//     });
//     return data; // Make sure to return the fetched data
//   } catch (error) {
//     console.error("Error fetching post data:", error);
//     return null; // Handle errors appropriately
//   }
  
// }
    // const data = await prisma.post.findUnique({
    //   where: {
    //     id,
    //   },
    //   include: {
    //     comments: {
    //       include: {
    //         user: true,
    //       },
    //       orderBy: {
    //         createdAt: "desc",
    //       },
    //     },
    //     likes: {
    //       include: {
    //         user: true,
    //       },
    //     },
    //     savedBy: true,
    //     // user: true,
    //     user: {
    //       include: {
    //         followedBy: { 
    //           include: { follower: true } // ✅ Correct way to include followers of the post's author
    //         },
    //       },
    //     },
    //     shares: {
    //       include: {
    //         user: true,
    //         post: { //  <-- Crucial addition: Include the 'post' within 'shares'
    //           include: { // If your Post model has relations, include them here as well
    //             user: true,
    //             comments: {
    //               include: {
    //                 user: true,
    //               },
    //             },
    //             likes: {
    //               include: {
    //                 user: true,
    //               },
    //             },
    //             shares: {
    //               include: {
    //                 user: true,
    //                 post: true,
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
  
  

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

export async function fetchPostsByUserID(id: string, postId?: string): Promise<PostWithExtras[]> {
  noStore();

  try {
    const data = await prisma.post.findMany({
      where: {
        user: {
          id,
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
        user: {
          include: {
            followedBy: {
              take: 100,
              select: { 
                followerId: true, 
                followingId: true  // ✅ Ensure `followingId` is also fetched
              },
            },
            following: {  // ✅ FIX: Include `following` to match `UserWithFollows`
              take: 100,
              select: { 
                followerId: true, 
                followingId: true 
              },
            },
          },
        },
        shares: {
          include: {
            user: true,
            post: {
              include: {
                user: {
                  include: {
                    followedBy: {
                      take: 100,
                      select: { followerId: true }, // ✅ Fetch only follower IDs
                    },
                    following: { // ✅ FIX: Include `following` inside shares.user
                      take: 100,
                      select: { 
                        followerId: true, 
                        followingId: true 
                      },
                    },
                  },
                },
                comments: { include: { user: true } },
                likes: { include: { user: true } },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    console.error("fetchPostsByUserID -> Prisma error:", error);
    return [];
  }
}


// export async function fetchPostsByUserID(id: string, postId?: string): Promise<PostWithExtras[]> {
//   noStore();

//   try {
//     const data = await prisma.post.findMany({
//       where: {
//         user: {
//           id,
//         },
//         NOT: postId ? { id: postId } : undefined,
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
//         user: {
//           include: {
//             followedBy: {
//               take: 100,
//               select: { followerId: true }, // ✅ Fetch only follower IDs, not full user objects
//             },
//           },
//         },
//         shares: {
//           include: {
//             user: true,
//             post: {
//               include: {
//                 user: {
//                   include: {
//                     followedBy: {
//                       take: 100,
//                       select: { followerId: true }, // ✅ Fetch only follower IDs
//                     },
//                   },
//                 },
//                 comments: { include: { user: true } },
//                 likes: { include: { user: true } },
//               },
//             },
//           },
//         },
//       },
      
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return data as PostWithExtras[];
//   } catch (error) {
//     console.error("fetchPostsByUserID -> Prisma error:", error);
//     return [];
//   }
// }

// With Shares 
// export async function fetchPostsByUserID(id: string, postId?: string): Promise<PostWithExtras[]> { // Return PostWithExtras[]
//   noStore();

//   try {
//     const data = await prisma.post.findMany({
//       where: {
//         user: {
//           id,
//         },
//         NOT: postId ? { id: postId } : undefined,
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
//         shares: {
//           include: {
//             user: true,
//             post: { //  <-- Crucial: Include the 'post' information here
//               include: { // Include any related data for the nested 'post' if needed
//                 user: true,
//                 comments: {
//                   include: {
//                     user: true,
//                   },
//                 },
//                 likes: {
//                   include: {
//                     user: true,
//                   },
//                 },
//                 shares: {
//                   include: {
//                     user: true,
//                     post: true,
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return data as PostWithExtras[]; // Type assertion to ensure correct type
//   } catch (error) {
//     console.error("fetchPostsByUserID -> Prisma error:", error);
//     return [];
//   }
// }
// export async function fetchPostsByUserID(id: string, postId?: string) {
//   noStore();

//   try {
//     const data = await prisma.post.findMany({
//       where: {
//         user: {
//           id,
//         },
//         NOT: postId ? { id: postId } : undefined,
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
//         shares: {  // ✅ Added shares
//           include: {
//             user: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     // console.log("fetchPostsByUsername -> data", data);
//     return data;
//   } catch (error) {
//     console.error("fetchPostsByUsername -> Prisma error:", error);
//     return [];
//   }
// }
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

export async function fetchProfileByID(id: string) {
  noStore();
    // console.log("fetchProfileByID profile for", id);
  try {
    const data = await prisma.user.findUnique({
      where: {
        id,
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

export async function fetchSavedPostsByUserId(id: string) {
  noStore();

  try {
    const data = await prisma.savedPost.findMany({
      where: {
        user: {
          id,
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
