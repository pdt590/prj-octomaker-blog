export default {
  // layouts/default.vue
  // layouts/error.vue
  error: {
    page_not_found: "Page Not Found",
    home_link: "Home Page",
    head: {
      title: "Error"
    }
  },

  // components/CardPost.vue
  // components/CardPostHorizontal.vue
  card_post_horizontal: {
    edit_btn: "Edit",
    delete_btn: "Delete",
    dialog: {
      title: "Deleting Post",
      message:
        "Are you sure you want to <b>delete</b> your post? This action cannot be undone.",
      confirm_text: "Delete",
      cancel_text: "Cancel"
    }
  },

  // components/CardPostRecommend.vue
  // components/Editor.vue
  // components/Footer.vue
  // components/Loading.vue
  // components/ModalConfirm.vue
  modal_confirm: {
    title: "Deleting",
    cancel_btn: "Cancel",
    delete_btn: "Delete"
  },

  // components/ModalEmbed.vue
  modal_embed: {
    title: "Insert Link",
    link_message:
      "Invalid URL - Accept Youtube, Vimeo, Slideshare, Codepen, Gist, JsFiddle, GoogleSlide, Soundcloud",
    close_btn: "Close",
    insert_btn: "Insert"
  },

  // components/ModalImage.vue
  modal_image: {
    title: "Upload Image",
    placeholder: "Drop your files here or click to upload",
    close_btn: "Close"
  },

  // components/ModalJoin.vue
  modal_join: {
    login: {
      title: "Login",
      email_message: "Invalid email",
      password_message: "At least 6 characters",
      forget_password_link: "Forget password?",
      close_btn: "Close",
      login_btn: "Login",
      login_text: "Login?"
    },
    signup: {
      title: "Signup",
      username_message: "At least 6 characters",
      email_message: "Invalid email",
      password_message: "At least 6 characters",
      close_btn: "Close",
      signup_btn: "Signup",
      signup_text: "Signup?",
      toast: {
        message: "Check inbox to activate your account"
      }
    }
  },

  // components/ModalLink.vue
  modal_link: {
    title: "Insert Link",
    link_message: "Invalid URL",
    close_btn: "Close",
    insert_btn: "Insert"
  },

  // components/ModalLogin.vue
  modal_login: {
    title: "Login",
    email_message: "Invalid email",
    password_message: "At least 6 characters",
    forget_password_link: "Forget password?",
    close_btn: "Close",
    login_btn: "Login"
  },

  // components/ModalSignup.vue
  modal_signup: {
    title: "Signup",
    username_message: "At least 6 characters",
    email_message: "Invalid email",
    password_message: "At least 6 characters",
    close_btn: "Close",
    signup_btn: "Signup",
    toast: {
      message: "Check inbox to activate your account"
    }
  },

  // components/Navbar.vue
  navbar: {
    search_placeholder: "Search...",
    search_btn: "Search",
    new_post_btn: "New post",
    login_btn: "Login",
    warning_message: "Inactive account",
    profile_link: "Profile",
    mgmt_link: "Management",
    signout_link: "Sign Out",
    category_link: "Category"
  },

  // pages/index.vue
  home: {
    posts_text: "Posts",
    more_btn: "View more",
    head: {
      title: "OctoMaker",
      content: "We make what you need"
    }
  },
  // pages/about/index.vue
  // pages/posts/index.vue
  // pages/posts/_postUrl/index.vue
  // pages/posts/_postUrl/edit-post/index.vue
  edit_post: {
    title_placeholder: "Title",
    category_placeholder: "Category",
    tag_placeholder: "Add a tag",
    public_radio: "Public",
    private_radio: "Private",
    update_btn: "Update",
    delete_btn: "Delete",
    dialog: {
      title: "Deleting Post",
      message:
        "Are you sure you want to <b>delete</b> your post? This action cannot be undone.",
      confirm_text: "Delete",
      cancel_text: "Cancel"
    },
    head: {
      title: "Edit post"
    }
  },

  // pages/posts/new-post/index.vue
  new_post: {
    title_placeholder: "Title",
    category_placeholder: "Category",
    tag_placeholder: "Add a tag",
    public_radio: "Public",
    private_radio: "Private",
    publish_btn: "Publish",
    delete_btn: "Delete",
    dialog: {
      title: "Deleting Post",
      message:
        "Are you sure you want to <b>delete</b> your post? This action cannot be undone.",
      confirm_text: "Delete",
      cancel_text: "Cancel"
    },
    head: {
      title: "New post"
    }
  },

  // pages/query/author/_authorId/index.vue
  author: {
    home_link: "Home"
  },

  // pages/query/category/_categoryId/index.vue
  category: {
    home_link: "Home"
  },

  // pages/search/index.vue
  search: {
    home_link: "Home",
    search_text: "Search",
    head: {
      title: "Search results"
    }
  },

  // pages/user/index.vue
  // pages/user/action/index.vue
  action: {
    reset_password: {
      title: "Change Password",
      new_password: {
        label: "New password",
        message: "At least 6 characters"
      },
      confirm_new_password: {
        label: "Confirm new password",
        message: "At least 6 characters",
        error_message: "Password is not fit"
      },
      send_btn: "Send",
      toast: {
        message: "Password is changed successfully"
      }
    },
    verify_email: {
      success_message: "Activate successfully",
      error_message: "Activated code is wrong",
      home_link: "Home Page"
    },
    recover_email: {
      success_message: "Recover successfully",
      announce_message: "Check inbox to change password",
      error_message: "Activated code is wrong",
      home_link: "Home Page"
    },
    head: {
      title: "Activation"
    }
  },

  // pages/user/join/index.vue
  join: {
    login: {
      title: "Login",
      email_message: "Invalid email",
      password_message: "At least 6 characters",
      forget_password_link: "Forget password?",
      close_btn: "Close",
      login_btn: "Login",
      login_text: "Login?"
    },
    signup: {
      title: "Signup",
      username_message: "At least 6 characters",
      email_message: "Invalid email",
      password_message: "At least 6 characters",
      close_btn: "Close",
      signup_btn: "Signup",
      signup_text: "Signup?",
      toast: {
        message: "Check inbox to activate your account"
      }
    },
    head: {
      title: "Join us",
      content: "Join us"
    }
  },

  // pages/user/mgmt/index.vue
  mgmt: {
    posts_label: "Posts",
    head: {
      title: "Management"
    }
  },

  // pages/user/profile/index.vue
  profile: {
    info: {
      title: "Information",
      username_label: "Username",
      username_message: "At least 6 characters",
      fullname_label: "Full Name",
      website_label: "Website",
      website_message: "Invalid URL",
      phone_label: "Phone",
      phone_message: "Invalid phone number",
      address_label: "Address",
      province_label: "Province",
      save_btn: "Save",
      success_message: "Update successfully"
    },
    email: {
      title: "Change Email",
      new_email_label: "New email",
      new_email_message: "Invalid email",
      warning_email_message: "Enter new email",
      confirm_password_label: "Confirm password",
      confirm_password_message: "At least 6 characters",
      save_btn: "Save",
      announce_message: "Check inbox to activate your email"
    },
    password: {
      title: "Change Password",
      password_label: "Password",
      password_message: "At least 6 characters",
      new_password_label: "New password",
      new_password_message: "At least 6 characters",
      confirm_new_password_label: "Confirm new password",
      confirm_new_password_error_message: "Password isn't same",
      save_btn: "Save",
      success_message: "Update successfully"
    },
    avatar: {
      title: "Avatar",
      avatar_label: "Upload image",
      placeholder: "Drop your file here or click to upload",
      save_btn: "Save",
      success_message: "Update successfully"
    },
    delete: {
      title: "Delete account",
      confirm_password_label: "Confirm password",
      confirm_password_message: "At least 6 characters",
      delete_btn: "Delete",
      dialog: {
        title: "Deleting Account",
        message:
          "Are you sure you want to <b>delete</b> your account? This action cannot be undone.",
        confirm_text: "Delete",
        cancel_text: "Cancel"
      },
    },
    head: {
      title: "Profile"
    }
  },

  // pages/user/resetpassword/index.vue
  resetpassword: {
    title: "Change Password",
    email_message: "Invalid email",
    email_placeholder: "Enter registered email",
    send_btn: "Send",
    toast: {
      message: "Check inbox to change your password"
    },
    head: {
      title: "Reset password"
    }
  }
};
