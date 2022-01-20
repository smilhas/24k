/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog {
    onCreateBlog {
      id
      name
      posts {
        items {
          id
          title
          description
          price
          imagepath
          createdAt
          updatedAt
          blogPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog {
    onUpdateBlog {
      id
      name
      posts {
        items {
          id
          title
          description
          price
          imagepath
          createdAt
          updatedAt
          blogPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog {
    onDeleteBlog {
      id
      name
      posts {
        items {
          id
          title
          description
          price
          imagepath
          createdAt
          updatedAt
          blogPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      title
      description
      price
      imagepath
      blog {
        id
        name
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          name
          email
          content
          check
          createdAt
          updatedAt
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      blogPostsId
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      title
      description
      price
      imagepath
      blog {
        id
        name
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          name
          email
          content
          check
          createdAt
          updatedAt
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      blogPostsId
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      title
      description
      price
      imagepath
      blog {
        id
        name
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          name
          email
          content
          check
          createdAt
          updatedAt
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      blogPostsId
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      post {
        id
        title
        description
        price
        imagepath
        blog {
          id
          name
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        blogPostsId
      }
      name
      email
      content
      check
      createdAt
      updatedAt
      postCommentsId
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      post {
        id
        title
        description
        price
        imagepath
        blog {
          id
          name
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        blogPostsId
      }
      name
      email
      content
      check
      createdAt
      updatedAt
      postCommentsId
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      post {
        id
        title
        description
        price
        imagepath
        blog {
          id
          name
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        blogPostsId
      }
      name
      email
      content
      check
      createdAt
      updatedAt
      postCommentsId
    }
  }
`;
export const onCreateGuest = /* GraphQL */ `
  subscription OnCreateGuest {
    onCreateGuest {
      id
      name
      plusone
      phone
      email
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGuest = /* GraphQL */ `
  subscription OnUpdateGuest {
    onUpdateGuest {
      id
      name
      plusone
      phone
      email
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGuest = /* GraphQL */ `
  subscription OnDeleteGuest {
    onDeleteGuest {
      id
      name
      plusone
      phone
      email
      createdAt
      updatedAt
    }
  }
`;
