<template>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <div style="position: sticky; top: 8rem;">
          <div class="card">
            <div class="card-content">
              <div class="level">
                <div class="level-item">
                  <figure>
                    <client-only>
                      <img
                        class="_profile-avatar"
                        v-lazy="userAvatarUrl"
                        style="display: none"
                        onload="this.style.display = 'block'"
                        alt="user_avatar"
                      />
                    </client-only>
                  </figure>
                </div>
              </div>
              <div class="has-text-centered">
                <h5 class="title is-size-5">{{ userName }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-9">
        <div class="card">
          <div class="card-content">
            <b-tabs type="is-boxed">
              <b-tab-item label="Thông tin">
                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                  <b-field
                    label="Username"
                    :type="$v.userContent.username.$error ? `is-danger` : ``"
                    :message="
                      !$v.userContent.username.minLen
                        ? `At least 6 characters`
                        : ``
                    "
                  >
                    <b-input
                      v-model="userContent.username"
                      @blur="$v.userContent.username.$touch()"
                      icon="account"
                    ></b-input>
                  </b-field>
                  <b-field label="Họ và tên">
                    <b-input v-model.trim="userContent.fullname" icon="account-card-details"></b-input>
                  </b-field>

                  <b-field
                    label="Số điện thoại"
                    :type="$v.userContent.phone.$error ? `is-danger` : ``"
                    :message="
                      !$v.userContent.phone.numeric
                        ? `Invalid phone number`
                        : ``
                    "
                  >
                    <b-input
                      type="tel"
                      v-model="userContent.phone"
                      @blur="$v.userContent.phone.$touch()"
                      icon="cellphone"
                    ></b-input>
                  </b-field>

                  <b-field grouped>
                    <b-field label="Địa chỉ" expanded>
                      <b-input v-model="userContent.address" icon="map-marker"></b-input>
                    </b-field>
                    <b-field label="Tỉnh/Thành">
                      <b-select v-model="userContent.province">
                        <option v-for="(province, i) in provinces" :key="i">{{ province }}</option>
                      </b-select>
                    </b-field>
                  </b-field>
                </form>
                <div class="level is-mobile">
                  <div class="level-left"></div>
                  <div class="level-right">
                    <button
                      class="button is-info"
                      :class="{ 'is-loading': authLoading }"
                      :disabled="$v.userContent.$invalid"
                      type="submit"
                      @click.prevent="onUpdateContent"
                    >Lưu thay đổi</button>
                  </div>
                </div>
              </b-tab-item>

              <b-tab-item label="Email">
                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                  <b-field
                    label="Thay đổi Email"
                    :type="$v.userEmail.$error ? `is-danger` : ``"
                    :message="!$v.userEmail.email ? `Invalid email` : ``"
                  >
                    <b-input
                      type="email"
                      v-model.trim="userEmail"
                      @blur="$v.userEmail.$touch()"
                      icon="email"
                    ></b-input>
                  </b-field>
                  <b-field
                    label="Xác nhận mật khẩu"
                    :type="
                      $v.confirmPasswordForNewEmail.$error ? `is-danger` : ``
                    "
                    :message="
                      !$v.confirmPasswordForNewEmail.minLen
                        ? `At least 6 characters`
                        : ``
                    "
                  >
                    <b-input
                      type="password"
                      v-model.trim="confirmPasswordForNewEmail"
                      @blur="$v.confirmPasswordForNewEmail.$touch()"
                      password-reveal
                    ></b-input>
                  </b-field>
                </form>
                <div class="level is-mobile">
                  <div class="level-left"></div>
                  <div class="level-right">
                    <button
                      class="button is-info"
                      :class="{ 'is-loading': authLoading }"
                      :disabled="
                        $v.userEmail.$invalid ||
                          $v.confirmPasswordForNewEmail.$invalid
                      "
                      type="submit"
                      @click.prevent="onUpdateEmail"
                    >Lưu thay đổi</button>
                  </div>
                </div>
              </b-tab-item>

              <b-tab-item label="Mật khẩu">
                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                  <b-field
                    label="Mật khẩu cũ"
                    :type="
                      $v.confirmPasswordForNewPassword.$error ? `is-danger` : ``
                    "
                    :message="
                      !$v.confirmPasswordForNewPassword.minLen
                        ? `At least 6 characters`
                        : ``
                    "
                  >
                    <b-input
                      type="password"
                      v-model.trim="confirmPasswordForNewPassword"
                      @blur="$v.confirmPasswordForNewPassword.$touch()"
                      password-reveal
                    ></b-input>
                  </b-field>
                  <b-field
                    label="Mật khẩu mới"
                    :type="$v.userPassword.$error ? `is-danger` : ``"
                    :message="
                      !$v.userPassword.minLen ? `At least 6 characters` : ``
                    "
                  >
                    <b-input
                      type="password"
                      v-model.trim="userPassword"
                      @blur="$v.userPassword.$touch()"
                      password-reveal
                    ></b-input>
                  </b-field>
                  <b-field
                    label="Xác nhận mật khẩu mới"
                    :type="$v.confirmUserPassword.$error ? `is-danger` : ``"
                    :message="
                      $v.confirmUserPassword.$error ? `Password isn't same` : ``
                    "
                  >
                    <b-input
                      type="password"
                      v-model.trim="confirmUserPassword"
                      @blur="$v.confirmUserPassword.$touch()"
                      password-reveal
                    ></b-input>
                  </b-field>
                </form>
                <div class="level is-mobile">
                  <div class="level-left"></div>
                  <div class="level-right">
                    <button
                      class="button is-info"
                      :class="{ 'is-loading': authLoading }"
                      :disabled="
                        $v.confirmPasswordForNewPassword.$invalid ||
                          $v.userPassword.$invalid ||
                          $v.confirmUserPassword.$invalid
                      "
                      type="submit"
                      @click.prevent="onUpdatePassword"
                    >Lưu thay đổi</button>
                  </div>
                </div>
              </b-tab-item>

              <b-tab-item label="Avatar">
                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                  <b-field label="Avatar">
                    <div class="level">
                      <div class="level-item">
                        <b-upload
                          v-model="userNewAvatar"
                          @input="onAvatarChange"
                          drag-drop
                          :accept="acceptedImages"
                        >
                          <section class="section">
                            <div class="content has-text-centered">
                              <p>
                                <b-icon icon="upload" size="is-large"></b-icon>
                              </p>
                              <p>Upload avatar cho tài khoản</p>
                            </div>
                          </section>
                        </b-upload>
                      </div>
                    </div>
                  </b-field>
                  <div class="level">
                    <div class="level-item" v-if="userOldAvatar">
                      <figure class="image is-128x128 _image-frame">
                        <client-only>
                          <img
                            class="_image-preview"
                            v-lazy="userOldAvatar.url"
                            style="display: none"
                            onload="this.style.display = 'block'"
                            alt="user_avatar"
                          />
                        </client-only>
                        <span class="_image-size">{{ userOldAvatar.metadata.size | fmBytes }}</span>
                        <a class="delete _image-button-delete" @click="userOldAvatar = null"></a>
                      </figure>
                    </div>
                    <div class="level-item" v-if="userNewAvatar">
                      <figure class="image is-128x128 _image-frame">
                        <client-only>
                          <img
                            class="_image-preview"
                            v-lazy="userPreviewAvatar.url"
                            style="display: none"
                            onload="this.style.display = 'block'"
                            alt="preview_avatar"
                          />
                        </client-only>
                        <span class="_image-size">{{ userPreviewAvatar.size | fmBytes }}</span>
                        <a
                          class="delete _image-button-delete"
                          @click="
                            userPreviewAvatar = null;
                            userNewAvatar = null;
                          "
                        ></a>
                      </figure>
                    </div>
                  </div>
                </form>
                <div class="level is-mobile">
                  <div class="level-left"></div>
                  <div class="level-right">
                    <button
                      class="button is-info"
                      :class="{ 'is-loading': authLoading }"
                      type="submit"
                      :disabled="!isAvatarChanged"
                      @click.prevent="onUpdateAvatar"
                    >Lưu thay đổi</button>
                  </div>
                </div>
              </b-tab-item>

              <b-tab-item label="Xóa tài khoản">
                <form style="padding-top: 1rem; padding-bottom: 2rem;">
                  <b-field
                    label="Xác nhận mật khẩu"
                    :type="
                      $v.confirmPasswordForDeleting.$error ? `is-danger` : ``
                    "
                    :message="
                      !$v.confirmPasswordForDeleting.minLen
                        ? `At least 6 characters`
                        : ``
                    "
                  >
                    <b-input
                      type="password"
                      v-model.trim="confirmPasswordForDeleting"
                      @blur="$v.confirmPasswordForDeleting.$touch()"
                      password-reveal
                    ></b-input>
                  </b-field>
                </form>
                <div class="level is-mobile">
                  <div class="level-left"></div>
                  <div class="level-right">
                    <button
                      class="button is-danger"
                      :class="{ 'is-loading': authLoading }"
                      :disabled="$v.confirmPasswordForDeleting.$invalid"
                      type="submit"
                      @click.prevent="onDelete"
                    >Xóa tài khoản</button>
                  </div>
                </div>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deepCopy, acceptedImages, authMessage } from "~/libs/helpers";
import { provinces } from "~/libs/lists";
import {
  required,
  email,
  numeric,
  sameAs,
  not,
  minLength
} from "vuelidate/lib/validators";

export default {
  middleware: "server-client-auth",
  created() {
    this.userEmail = this.user.email;
    this.userOldAvatar = this.user.avatar;
    this.userContent = {
      username: this.user.username,
      fullname: this.user.fullname,
      phone: this.user.phone,
      address: this.user.address,
      province: this.user.province ? this.user.province : "Hà Nội"
    };
  },
  computed: {
    ...mapGetters(["user", "authError", "authLoading"]),
    userAvatarUrl() {
      if (this.user) {
        if (this.user.avatar) {
          return this.user.avatar.url;
        } else {
          return "/icon-user.png";
        }
      } else {
        // Check if logout happens
        return;
      }
    },
    userName() {
      if (this.user) {
        return this.user.username;
      } else {
        // Check if logout happens
        return;
      }
    },
    isAvatarChanged() {
      if (this.user) {
        if (this.user.avatar) {
          if (!this.userOldAvatar) {
            return true;
          } else {
            return false;
          }
        } else {
          if (this.userNewAvatar) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        // Check if logout happens
        return;
      }
    }
  },
  data() {
    return {
      provinces: provinces,
      userContent: {},

      userEmail: null,
      confirmPasswordForNewEmail: null,

      userPassword: null,
      confirmUserPassword: null,
      confirmPasswordForNewPassword: null,

      acceptedImages: acceptedImages,
      userNewAvatar: null,
      userPreviewAvatar: null,
      userOldAvatar: null,

      confirmPasswordForDeleting: null
    };
  },
  validations: {
    userContent: {
      username: {
        required,
        minLen: minLength(6)
        // isValidUsername: not(sameAs(function() { return this.user.username }))
      },
      phone: {
        numeric
      }
    },

    userEmail: {
      required,
      email,
      isValidEmail: not(
        sameAs(function() {
          if (this.user) {
            return this.user.email;
          }
        })
      )
    },
    confirmPasswordForNewEmail: {
      required,
      minLen: minLength(6)
      /* async isPassword(value) {
        if (!value) return true;
        const response = await this.$store.dispatch("isCorrectPassword", value);
        return response;
      } */
    },

    confirmPasswordForNewPassword: {
      required,
      minLen: minLength(6)
    },
    userPassword: {
      required,
      minLen: minLength(6)
    },
    confirmUserPassword: {
      isValidPassword: sameAs("userPassword")
    },

    confirmPasswordForDeleting: {
      required,
      minLen: minLength(6)
    }
  },
  methods: {
    async onUpdateContent() {
      await this.$store.dispatch("updateUserContent", this.userContent);
      if (this.authLoading) {
        this.$buefy.toast.open({
          duration: 3000,
          message: "onUpdateContent() Error",
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: "Cập nhật thành công",
          type: "is-success"
        });
      }
    },
    async onUpdateEmail() {
      await this.$store.dispatch("updateUserEmail", {
        confirmPassword: this.confirmPasswordForNewEmail,
        newEmail: this.userEmail
      });
      if (this.authLoading) {
        this.$buefy.toast.open({
          duration: 3000,
          message: authMessage(this.authError),
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: "Kiểm tra hộp thư mới để kích hoạt tài khoản",
          type: "is-warning"
        });
      }
    },
    async onUpdatePassword() {
      await this.$store.dispatch("updateUserPassword", {
        confirmPassword: this.confirmPasswordForNewPassword,
        newPassword: this.userPassword
      });
      if (this.authLoading) {
        this.$buefy.toast.open({
          duration: 3000,
          message: authMessage(this.authError),
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: "Cập nhật thành công",
          type: "is-success"
        });
      }
    },
    async onUpdateAvatar() {
      await this.$store.dispatch("updateUserAvatar", this.userNewAvatar);
      if (this.authLoading) {
        this.$buefy.toast.open({
          duration: 3000,
          message: "onUpdateAvatar() Error",
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: "Cập nhật thành công",
          type: "is-success"
        });
      }
    },
    async onDelete() {
      await this.$store.dispatch("deleteUser", this.confirmPasswordForDeleting);
      if (this.authLoading) {
        this.$buefy.toast.open({
          duration: 3000,
          message: authMessage(this.authError),
          type: "is-danger"
        });
      } else {
        this.$router.push("/");
      }
    },
    onAvatarChange() {
      this.userPreviewAvatar = null;
      this.userPreviewAvatar = {
        url: URL.createObjectURL(this.userNewAvatar),
        size: this.userNewAvatar.size
      };
    }
  }
};
</script>
