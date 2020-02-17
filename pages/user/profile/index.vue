<template>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <!-- Start avatar card -->
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
        <!-- End avatar card -->
      </div>
      <div class="column is-9">
        <!-- Start user profile -->
        <div class="card">
          <div class="card-content">
            <b-tabs type="is-boxed">
              <!-- Start info -->
              <b-tab-item :label="$t('profile.info.title')">
                <div style="padding-top: 1rem; padding-bottom: 2rem;">
                  <b-field
                    :label="$t('profile.info.username_label')"
                    :type="$v.userContent.username.$error ? `is-danger` : ``"
                    :message="
                      !$v.userContent.username.minLen
                        ? $t('profile.info.username_message')
                        : ``
                    "
                  >
                    <b-input
                      v-model="userContent.username"
                      @blur="$v.userContent.username.$touch()"
                      icon="user-circle"
                    ></b-input>
                  </b-field>
                  <b-field :label="$t('profile.info.fullname_label')">
                    <b-input
                      v-model.trim="userContent.fullname"
                      icon="id-card"
                    ></b-input>
                  </b-field>

                  <b-field
                    :label="$t('profile.info.phone_label')"
                    :type="$v.userContent.phone.$error ? `is-danger` : ``"
                    :message="
                      !$v.userContent.phone.numeric
                        ? $t('profile.info.phone_message')
                        : ``
                    "
                  >
                    <b-input
                      type="tel"
                      v-model="userContent.phone"
                      @blur="$v.userContent.phone.$touch()"
                      icon="phone-square-alt"
                    ></b-input>
                  </b-field>

                  <b-field grouped>
                    <b-field :label="$t('profile.info.address_label')" expanded>
                      <b-input
                        v-model="userContent.address"
                        icon="map-marker-alt"
                      ></b-input>
                    </b-field>
                    <b-field :label="$t('profile.info.province_label')">
                      <b-select v-model="userContent.province">
                        <option v-for="(province, i) in provinces" :key="i">{{
                          province
                        }}</option>
                      </b-select>
                    </b-field>
                  </b-field>
                </div>
                <div class="level">
                  <div class="level-left"></div>
                  <div class="level-right">
                    <button
                      class="button is-info is-outlined"
                      :class="{ 'is-loading': authLoading }"
                      :disabled="$v.userContent.$invalid"
                      @click="onUpdateContent"
                    >
                      {{ $t("profile.info.save_btn") }}
                    </button>
                  </div>
                </div>
              </b-tab-item>
              <!-- End info -->
              <!-- Start email -->
              <b-tab-item :label="$t('profile.email.title')">
                <div style="padding-top: 1rem; padding-bottom: 2rem;">
                  <b-field
                    :label="$t('profile.email.new_email_label')"
                    :type="$v.userEmail.$error ? `is-danger` : ``"
                    :message="
                      !$v.userEmail.email
                        ? $t('profile.email.new_email_message')
                        : ``
                    "
                  >
                    <b-input
                      type="email"
                      v-model.trim="userEmail"
                      @blur="$v.userEmail.$touch()"
                      icon="envelope"
                    ></b-input>
                  </b-field>
                  <b-field
                    :label="$t('profile.email.confirm_password_label')"
                    :type="
                      $v.confirmPasswordForNewEmail.$error ? `is-danger` : ``
                    "
                    :message="
                      !$v.confirmPasswordForNewEmail.minLen
                        ? $t('profile.email.confirm_password_message')
                        : ``
                    "
                  >
                    <b-input
                      type="password"
                      v-model.trim="confirmPasswordForNewEmail"
                      @blur="$v.confirmPasswordForNewEmail.$touch()"
                      password-reveal
                      icon="unlock-alt"
                    ></b-input>
                  </b-field>
                </div>
                <div class="level">
                  <div class="level-left"></div>
                  <div class="level-right">
                    <button
                      class="button is-info is-outlined"
                      :class="{ 'is-loading': authLoading }"
                      :disabled="
                        $v.userEmail.$invalid ||
                          $v.confirmPasswordForNewEmail.$invalid
                      "
                      @click="onUpdateEmail"
                    >
                      {{ $t("profile.email.save_btn") }}
                    </button>
                  </div>
                </div>
              </b-tab-item>
              <!-- End email -->
              <!-- Start password -->
              <b-tab-item :label="$t('profile.password.title')">
                <div style="padding-top: 1rem; padding-bottom: 2rem;">
                  <b-field
                    :label="$t('profile.password.password_label')"
                    :type="
                      $v.confirmPasswordForNewPassword.$error ? `is-danger` : ``
                    "
                    :message="
                      !$v.confirmPasswordForNewPassword.minLen
                        ? $t('profile.password.password_message')
                        : ``
                    "
                  >
                    <b-input
                      type="password"
                      v-model.trim="confirmPasswordForNewPassword"
                      @blur="$v.confirmPasswordForNewPassword.$touch()"
                      password-reveal
                      icon="unlock-alt"
                    ></b-input>
                  </b-field>
                  <b-field
                    :label="$t('profile.password.new_password_label')"
                    :type="$v.userPassword.$error ? `is-danger` : ``"
                    :message="
                      !$v.userPassword.minLen
                        ? $t('profile.password.new_password_message')
                        : ``
                    "
                  >
                    <b-input
                      type="password"
                      v-model.trim="userPassword"
                      @blur="$v.userPassword.$touch()"
                      password-reveal
                      icon="key"
                    ></b-input>
                  </b-field>
                  <b-field
                    :label="$t('profile.password.confirm_new_password_label')"
                    :type="$v.confirmUserPassword.$error ? `is-danger` : ``"
                    :message="
                      $v.confirmUserPassword.$error
                        ? $t(
                            'profile.password.confirm_new_password_error_message'
                          )
                        : ``
                    "
                  >
                    <b-input
                      type="password"
                      v-model.trim="confirmUserPassword"
                      @blur="$v.confirmUserPassword.$touch()"
                      password-reveal
                      icon="key"
                    ></b-input>
                  </b-field>
                </div>
                <div class="level">
                  <div class="level-left"></div>
                  <div class="level-right">
                    <button
                      class="button is-info is-outlined"
                      :class="{ 'is-loading': authLoading }"
                      :disabled="
                        $v.confirmPasswordForNewPassword.$invalid ||
                          $v.userPassword.$invalid ||
                          $v.confirmUserPassword.$invalid
                      "
                      @click="onUpdatePassword"
                    >
                      {{ $t("profile.password.save_btn") }}
                    </button>
                  </div>
                </div>
              </b-tab-item>
              <!-- End password -->
              <!-- Start avatar -->
              <b-tab-item :label="$t('profile.avatar.title')">
                <div style="padding-top: 1rem; padding-bottom: 2rem;">
                  <!-- Start image upload -->
                  <b-field :label="$t('profile.avatar.avatar_label')">
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
                              <p>{{ $t("profile.avatar.placeholder") }}</p>
                            </div>
                          </section>
                        </b-upload>
                      </div>
                    </div>
                  </b-field>
                  <!-- End image upload -->
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
                        <span class="_image-size">{{
                          userOldAvatar.metadata.size | fmBytes
                        }}</span>
                        <a
                          class="delete _image-button-delete"
                          @click="userOldAvatar = null"
                        ></a>
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
                        <span class="_image-size">{{
                          userPreviewAvatar.size | fmBytes
                        }}</span>
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
                </div>
                <div class="level">
                  <div class="level-left"></div>
                  <div class="level-right">
                    <button
                      class="button is-info is-outlined"
                      :class="{ 'is-loading': authLoading }"
                      :disabled="!isAvatarChanged"
                      @click="onUpdateAvatar"
                    >
                      {{ $t("profile.avatar.save_btn") }}
                    </button>
                  </div>
                </div>
              </b-tab-item>
              <!-- End avatar -->
              <!-- Start delete account -->
              <b-tab-item :label="$t('profile.delete.title')">
                <div style="padding-top: 1rem; padding-bottom: 2rem;">
                  <b-field
                    :label="$t('profile.delete.confirm_password_label')"
                    :type="
                      $v.confirmPasswordForDeleting.$error ? `is-danger` : ``
                    "
                    :message="
                      !$v.confirmPasswordForDeleting.minLen
                        ? $t('profile.delete.confirm_password_message')
                        : ``
                    "
                  >
                    <b-input
                      type="password"
                      v-model.trim="confirmPasswordForDeleting"
                      @blur="$v.confirmPasswordForDeleting.$touch()"
                      password-reveal
                      icon="key"
                    ></b-input>
                  </b-field>
                </div>
                <div class="level">
                  <div class="level-left"></div>
                  <div class="level-right">
                    <button
                      class="button is-danger"
                      :class="{ 'is-loading': authLoading }"
                      :disabled="$v.confirmPasswordForDeleting.$invalid"
                      @click="onDelete"
                    >
                      {{ $t('profile.delete.delete_btn') }}
                    </button>
                  </div>
                </div>
              </b-tab-item>
              <!-- End delete account -->
            </b-tabs>
          </div>
        </div>
        <!-- End user profile -->
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
          message: this.$t('profile.info.success_message'),
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
          message: this.$t('profile.email.announce_message'),
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
          message: this.$t('profile.password.success_message'),
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
          message: this.$t('profile.avatar.success_message'),
          type: "is-success"
        });
      }
    },
    onDelete() {
      this.$buefy.dialog.confirm({
        title: this.$t('profile.delete.dialog.title'),
        message: this.$t('profile.delete.dialog.message'),
        confirmText: this.$t('profile.delete.dialog.confirm_text'),
        cancelText: this.$t('profile.delete.dialog.cancel_text'),
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          await this.$store.dispatch(
            "deleteUser",
            this.confirmPasswordForDeleting
          );
          if (this.authLoading) {
            this.$buefy.toast.open({
              duration: 3000,
              message: authMessage(this.authError),
              type: "is-danger"
            });
          } else {
            this.$router.push(this.localePath("/"));
          }
        }
      });
    },
    onAvatarChange() {
      this.userPreviewAvatar = null;
      this.userPreviewAvatar = {
        url: URL.createObjectURL(this.userNewAvatar),
        size: this.userNewAvatar.size
      };
    }
  },
  head() {
    return {
      title: this.$t('profile.head.title')
    }
  }
};
</script>
