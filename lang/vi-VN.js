export default {
  // layouts/default.vue
  // layouts/error.vue
  error: {
    page_not_found: "Không tìm thấy trang",
    home_link: "Trang chủ",
    head: {
      title: "Lỗi"
    }
  },

  // components/CardPost.vue
  // components/CardPostHorizontal.vue
  card_post_horizontal: {
    edit_btn: "Sửa",
    delete_btn: "Xóa",
    dialog: {
      title: "Xóa Bài",
      message: "Bạn có chắc chắn muốn <b>xóa</b>? Đối tượng  bị xóa sẽ không thể phục hồi",
      confirm_text: "Xóa",
      cancel_text: "Hủy"
    }
  },

  // components/CardPostRecommend.vue
  // components/Editor.vue
  // components/Footer.vue
  // components/Loading.vue
  // components/ModalConfirm.vue
  modal_confirm: {
    title: "Xóa",
    cancel_btn: "Hủy",
    delete_btn: "Xóa"
  },

  // components/ModalEmbed.vue
  modal_embed: {
    title: "Thêm Link",
    link_message:
      "Link không hợp lệ - Chỉ chấp nhận Youtube, Vimeo, Slideshare, Codepen, Gist, JsFiddle, GoogleSlide, Soundcloud",
    close_btn: "Đóng",
    insert_btn: "Thêm"
  },

  // components/ModalImage.vue
  modal_image: {
    title: "Upload Ảnh",
    placeholder: "Kéo thả ảnh vào đây hoặc click để upload",
    close_btn: "Đóng"
  },

  // components/ModalJoin.vue
  modal_join: {
    login: {
      title: "Đăng Nhập",
      email_message: "Email không hợp lệ",
      password_message: "Ít nhất 6 ký tự",
      forget_password_link: "Quên mật khẩu?",
      close_btn: "Đóng",
      login_btn: "Đăng nhập",
      login_text: "Đăng nhập?"
    },
    signup: {
      title: "Đăng Ký",
      username_message: "Ít nhất 6 ký tự",
      email_message: "Email không hợp lệ",
      password_message: "Ít nhất 6 ký tự",
      close_btn: "Đóng",
      signup_btn: "Đăng ký",
      signup_text: "Đăng ký?",
      toast: {
        message: "Kiểm tra hộp thư để kích hoạt tài khoản"
      }
    }
  },

  // components/ModalLink.vue
  modal_link: {
    title: "Thêm Link",
    link_message: "Link không hợp lệ",
    close_btn: "Đóng",
    insert_btn: "Thêm"
  },

  // components/ModalLogin.vue
  modal_login: {
    title: "Đăng Nhập",
    email_message: "Email không hợp lệ",
    password_message: "Ít nhất 6 ký tự",
    forget_password_link: "Quên mật khẩu?",
    close_btn: "Đóng",
    login_btn: "Đăng nhập"
  },

  // components/ModalSignup.vue
  modal_signup: {
    title: "Đăng Ký",
    username_message: "Ít nhất 6 ký tự",
    email_message: "Email không hợp lệ",
    password_message: "Ít nhất 6 ký tự",
    close_btn: "Đóng",
    signup_btn: "Đăng ký",
    toast: {
      message: "Kiểm tra hộp thư để kích hoạt tài khoản"
    }
  },

  // components/Navbar.vue
  navbar: {
    search_placeholder: "Tìm kiếm...",
    search_btn: "Tìm kiếm",
    new_post_btn: "Viết bài",
    login_btn: "Đăng nhập",
    warning_message: "Tài khoản chưa kích hoạt",
    profile_link: "Cá nhân",
    mgmt_link: "Quản lý",
    signout_link: "Đăng xuất",
    category_link: "Danh mục"
  },

  // pages/index.vue
  home: {
    posts_text: "Bài viết",
    more_btn: "Xem thêm",
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
    title_placeholder: "Tên bài",
    category_placeholder: "Dang mục",
    tag_placeholder: "Thêm một tag",
    public_radio: "Công khai",
    private_radio: "Riêng tư",
    update_btn: "Cập nhật",
    delete_btn: "Xóa",
    dialog: {
      title: "Xóa Bài",
      message: "Bạn có chắc chắn muốn <b>xóa</b>? Đối tượng  bị xóa sẽ không thể phục hồi",
      confirm_text: "Xóa",
      cancel_text: "Hủy"
    },
    head: {
      title: "Chỉnh sửa"
    }
  },

  // pages/posts/new-post/index.vue
  new_post: {
    title_placeholder: "Tên bài",
    category_placeholder: "Danh mục",
    tag_placeholder: "Thêm một tag",
    public_radio: "Công khai",
    private_radio: "Riêng tư",
    publish_btn: "Đăng bài",
    delete_btn: "Xóa",
    dialog: {
      title: "Xóa Bài",
      message: "Bạn có chắc chắn muốn <b>xóa</b>? Đối tượng  bị xóa sẽ không thể phục hồi",
      confirm_text: "Xóa",
      cancel_text: "Hủy"
    },
    head: {
      title: "Viết bài"
    }
  },

  // pages/query/author/_authorId/index.vue
  author: {
    home_link: "Trang chủ"
  },

  // pages/query/category/_categoryId/index.vue
  category: {
    home_link: "Trang chủ"
  },

  // pages/search/index.vue
  search: {
    home_link: "Trang chủ",
    search_text: "Tìm kiếm",
    head: {
      title: "Kết quả tìm kiếm"
    }
  },

  // pages/user/index.vue
  // pages/user/action/index.vue
  action: {
    reset_password: {
      title: "Thay Mật Khẩu",
      new_password: {
        label: "Mật khẩu mới",
        message: "Ít nhất 6 ký tự"
      },
      confirm_new_password: {
        label: "Xác nhận mật khẩu mới",
        message: "Ít nhất 6 ký tự",
        error_message: "Mật khẩu không trùng nhau"
      },
      send_btn: "Gửi",
      toast: {
        message: "Đổi mật khẩu thành công"
      }
    },
    verify_email: {
      success_message: "Kích hoạt thành công",
      error_message: "Sai mã kích hoạt",
      home_link: "Trang chủ"
    },
    recover_email: {
      success_message: "Khôi phục thành công",
      announce_message: "Kiểm tra hộp thư để đổi mật khẩu",
      error_message: "Sai mã kích hoạt",
      home_link: "Trang chủ"
    },
    head: {
      title: "Kích hoạt tài khoản"
    }
  },

  // pages/user/join/index.vue
  join: {
    login: {
      title: "Đăng Nhập",
      email_message: "Email không hợp lệ",
      password_message: "Ít nhất 6 ký tự",
      forget_password_link: "Quên mật khẩu?",
      close_btn: "Đóng",
      login_btn: "Đăng nhập",
      login_text: "Đăng nhập?"
    },
    signup: {
      title: "Đăng Ký",
      username_message: "Ít nhất 6 ký tự",
      email_message: "Email không hợp lệ",
      password_message: "Ít nhất 6 ký tự",
      close_btn: "Đóng",
      signup_btn: "Đăng ký",
      signup_text: "Đăng ký?",
      toast: {
        message: "Kiếm tra hộp thư để kích hoạt tài khoản"
      }
    },
    head: {
      title: "Tham gia",
      content: "Tham gia cùng chúng tôi"
    }
  },

  // pages/user/mgmt/index.vue
  mgmt: {
    posts_label: "Bài viết",
    head: {
      title: "Quản lý"
    }
  },

  // pages/user/profile/index.vue
  profile: {
    info: {
      title: "Thông Tin",
      username_label: "Username",
      username_message: "Ít nhất 6 ký tự",
      fullname_label: "Họ và tên",
      website_label: "Website",
      website_message: "Link không hợp lệ",
      phone_label: "Điện thoại",
      phone_message: "Số điện thoại không hợp lệ",
      address_label: "Địa chỉ",
      province_label: "Tỉnh/Thành phố",
      save_btn: "Lưu",
      success_message: "Cập nhật thành công"
    },
    email: {
      title: "Đổi Email",
      new_email_label: "Email mới",
      new_email_message: "Email không hợp lệ",
      warning_email_message: "Nhập email mới",
      confirm_password_label: "Xác nhận mật khẩu",
      confirm_password_message: "Ít nhất 6 ký tự",
      save_btn: "Lưu",
      announce_message: "Kiểm tra hộp thư để kích hoạt email"
    },
    password: {
      title: "Đổi Mật Khẩu",
      password_label: "Mật khẩu",
      password_message: "Ít nhất 6 ký tự",
      new_password_label: "Mật khẩu mới",
      new_password_message: "Ít nhất 6 ký tự",
      confirm_new_password_label: "Xác nhận mật khẩu mới",
      confirm_new_password_error_message: "Mật khẩu không giống nhau",
      save_btn: "Lưu",
      success_message: "Cập nhật thành công"
    },
    avatar: {
      title: "Avatar",
      avatar_label: "Upload ảnh",
      placeholder: "Kéo thả ảnh vào đây hoặc click để upload",
      save_btn: "Lưu",
      success_message: "Cập nhật thành công"
    },
    delete: {
      title: "Xóa Tài Khoản",
      confirm_password_label: "Xác nhận mật khẩu",
      confirm_password_message: "Ít nhất 6 ký tự",
      delete_btn: "Xóa",
      dialog: {
        title: "Xóa Tài Khoản",
        message: "Bạn có chắc chắn muốn <b>xóa</b>? Đối tượng  bị xóa sẽ không thể phục hồi",
        confirm_text: "Xóa",
        cancel_text: "Hủy"
      }
    },
    head: {
      title: "Cá nhân"
    }
  },

  // pages/user/resetpassword/index.vue
  resetpassword: {
    title: "Đổi Mật Khẩu",
    email_message: "Email không hợp lệ",
    email_placeholder: "Nhập email đã đăng ký",
    send_btn: "Gửi",
    toast: {
      message: "Kiểm tra hộp thư để đổi mật khẩu"
    },
    head: {
      title: "Đổi mật khẩu"
    }
  }
};
