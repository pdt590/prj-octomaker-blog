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
              <!-- Start new content -->
              <b-tab-item :label="$t('profile.info.title')">
                <form>
                  <div style="padding-top: 1rem; padding-bottom: 2rem;">
                    <b-field
                      :label="$t('profile.info.username_label')"
                      :type="
                        $v.newUserContent.username.$error ? `is-danger` : ``
                      "
                      :message="
                        !$v.newUserContent.username.minLen
                          ? $t('profile.info.username_message')
                          : ``
                      "
                    >
                      <b-input
                        v-model.trim="newUserContent.username"
                        @blur="$v.newUserContent.username.$touch()"
                        icon="user-circle"
                      ></b-input>
                    </b-field>

                    <b-field
                      :label="$t('profile.info.fullname_label')"
                      :type="
                        $v.newUserContent.fullname.$error ? `is-danger` : ``
                      "
                    >
                      <b-input
                        v-model.trim="newUserContent.fullname"
                        @blur="$v.newUserContent.fullname.$touch()"
                        icon="id-card"
                      ></b-input>
                    </b-field>

                    <b-field
                      :label="$t('profile.info.website_label')"
                      :type="
                        $v.newUserContent.website.$error ? `is-danger` : ``
                      "
                      :message="
                        !$v.newUserContent.website.url
                          ? $t('profile.info.website_message')
                          : ``
                      "
                    >
                      <b-input
                        v-model.trim="newUserContent.website"
                        @blur="$v.newUserContent.website.$touch()"
                        icon="link"
                      ></b-input>
                    </b-field>

                    <b-field
                      :label="$t('profile.info.phone_label')"
                      :type="$v.newUserContent.phone.$error ? `is-danger` : ``"
                      :message="
                        !$v.newUserContent.phone.numeric
                          ? $t('profile.info.phone_message')
                          : ``
                      "
                    >
                      <b-input
                        type="tel"
                        v-model.trim="newUserContent.phone"
                        @blur="$v.newUserContent.phone.$touch()"
                        icon="phone-square-alt"
                      ></b-input>
                    </b-field>

                    <b-field grouped>
                      <b-field
                        :label="$t('profile.info.address_label')"
                        :type="
                          $v.newUserContent.address.$error ? `is-danger` : ``
                        "
                        expanded
                      >
                        <b-input
                          v-model.trim="newUserContent.address"
                          @blur="$v.newUserContent.address.$touch()"
                          icon="map-marker-alt"
                        ></b-input>
                      </b-field>
                      <b-field :label="$t('profile.info.province_label')">
                        <b-select v-model="newUserContent.province">
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
                        :disabled="$v.newUserContent.$invalid"
                        @click.prevent="onUpdateContent"
                      >
                        {{ $t("profile.info.save_btn") }}
                      </button>
                    </div>
                  </div>
                </form>
              </b-tab-item>
              <!-- End new content -->
              <!-- Start new email -->
              <b-tab-item :label="$t('profile.email.title')">
                <form>
                  <div style="padding-top: 1rem; padding-bottom: 2rem;">
                    <b-field :label="$t('profile.email.old_email_label')">
                      <b-input
                        type="email"
                        :value="oldEmail"
                        disabled
                        icon="envelope"
                      ></b-input>
                    </b-field>
                    <b-field
                      :label="$t('profile.email.new_email_label')"
                      :type="$v.newEmail.$error ? `is-danger` : ``"
                      :message="
                        !$v.newEmail.email
                          ? $t('profile.email.new_email_message')
                          : !$v.newEmail.isChanged
                          ? $t('profile.email.warning_email_message')
                          : ``
                      "
                    >
                      <b-input
                        type="email"
                        v-model.trim="newEmail"
                        @blur="$v.newEmail.$touch()"
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
                          $v.newEmail.$invalid ||
                            $v.confirmPasswordForNewEmail.$invalid
                        "
                        @click.prevent="onUpdateEmail"
                      >
                        {{ $t("profile.email.save_btn") }}
                      </button>
                    </div>
                  </div>
                </form>
              </b-tab-item>
              <!-- End new email -->
              <!-- Start new password -->
              <b-tab-item :label="$t('profile.password.title')">
                <form>
                  <div style="padding-top: 1rem; padding-bottom: 2rem;">
                    <b-field
                      :label="$t('profile.password.password_label')"
                      :type="
                        $v.confirmPasswordForNewPassword.$error
                          ? `is-danger`
                          : ``
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
                      :type="$v.newPassword.$error ? `is-danger` : ``"
                      :message="
                        !$v.newPassword.minLen
                          ? $t('profile.password.new_password_message')
                          : ``
                      "
                    >
                      <b-input
                        type="password"
                        v-model.trim="newPassword"
                        @blur="$v.newPassword.$touch()"
                        password-reveal
                        icon="key"
                      ></b-input>
                    </b-field>
                    <b-field
                      :label="$t('profile.password.confirm_new_password_label')"
                      :type="$v.confirmNewPassword.$error ? `is-danger` : ``"
                      :message="
                        $v.confirmNewPassword.$error
                          ? $t(
                              'profile.password.confirm_new_password_error_message'
                            )
                          : ``
                      "
                    >
                      <b-input
                        type="password"
                        v-model.trim="confirmNewPassword"
                        @blur="$v.confirmNewPassword.$touch()"
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
                            $v.newPassword.$invalid ||
                            $v.confirmNewPassword.$invalid
                        "
                        @click.prevent="onUpdatePassword"
                      >
                        {{ $t("profile.password.save_btn") }}
                      </button>
                    </div>
                  </div>
                </form>
              </b-tab-item>
              <!-- End new password -->
              <!-- Start new avatar -->
              <b-tab-item :label="$t('profile.avatar.title')">
                <form>
                  <div style="padding-top: 1rem; padding-bottom: 2rem;">
                    <!-- Start image upload -->
                    <b-field :label="$t('profile.avatar.avatar_label')">
                      <div class="level">
                        <div class="level-item">
                          <b-upload
                            v-model="newAvatar"
                            @input="onAvatarChange"
                            drag-drop
                            :accept="acceptedImages"
                          >
                            <section class="section">
                              <div class="content has-text-centered">
                                <p>
                                  <b-icon icon="upload"></b-icon>
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
                      <div class="level-item" v-if="oldAvatar">
                        <figure class="image is-128x128 _image-avatar-frame">
                          <client-only>
                            <img
                              class="_image-avatar-preview"
                              v-lazy="oldAvatar.url"
                              style="display: none"
                              onload="this.style.display = 'block'"
                              alt="user_avatar"
                            />
                          </client-only>
                          <span class="_image-avatar-size">{{
                            oldAvatar.metadata.size | fmBytes
                          }}</span>
                          <a
                            class="delete _image-avatar-button-delete"
                            @click.prevent="oldAvatar = null"
                          ></a>
                        </figure>
                      </div>
                      <div class="level-item" v-else-if="newAvatar">
                        <figure class="image is-128x128 _image-avatar-frame">
                          <client-only>
                            <img
                              class="_image-avatar-preview"
                              v-lazy="previewAvatar.url"
                              style="display: none"
                              onload="this.style.display = 'block'"
                              alt="preview_avatar"
                            />
                          </client-only>
                          <span class="_image-avatar-size">{{
                            previewAvatar.size | fmBytes
                          }}</span>
                          <a
                            class="delete _image-avatar-button-delete"
                            @click.prevent="
                              previewAvatar = null;
                              newAvatar = null;
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
                        @click.prevent="onUpdateAvatar"
                      >
                        {{ $t("profile.avatar.save_btn") }}
                      </button>
                    </div>
                  </div>
                </form>
              </b-tab-item>
              <!-- End new avatar -->
              <!-- Start delete account -->
              <b-tab-item :label="$t('profile.delete.title')">
                <form>
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
                        @click.prevent="onDelete"
                      >
                        {{ $t("profile.delete.delete_btn") }}
                      </button>
                    </div>
                  </div>
                </form>
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
  minLength,
  url
} from "vuelidate/lib/validators";

export default {
  middleware: "server-client-auth",
  created() {
    this.oldAvatar = this.user.avatar;
    this.oldEmail = this.user.email;
    this.oldUserContent = {
      username: this.user.username,
      fullname: this.user.fullname ? this.user.fullname : null,
      website: this.user.website ? this.user.website : null,
      phone: this.user.phone ? this.user.phone : null,
      address: this.user.address ? this.user.address : null,
      province: this.user.province ? this.user.province : "Hà Nội"
    };
    this.newUserContent = this.oldUserContent;
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
        return "";
      }
    },
    userName() {
      if (this.user) {
        return this.user.username;
      } else {
        // Check if logout happens
        return "";
      }
    },
    isAvatarChanged() {
      if (this.user) {
        if (this.user.avatar) {
          if (this.oldAvatar) {
            return false;
          } else {
            return true;
          }
        } else {
          if (this.newAvatar) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        // Check if logout happens
        return false;
      }
    }
  },
  data() {
    return {
      // New content
      oldUserContent: {},
      newUserContent: {},
      provinces: provinces,

      // New email
      oldEmail: null,
      newEmail: null,
      confirmPasswordForNewEmail: null,

      // New password
      newPassword: null,
      confirmNewPassword: null,
      confirmPasswordForNewPassword: null,

      // New avatar
      oldAvatar: null,
      newAvatar: null,
      previewAvatar: null,
      acceptedImages: acceptedImages,

      // Delete account
      confirmPasswordForDeleting: null
    };
  },
  validations: {
    newUserContent: {
      // TODO
      /* 
      isChanged: not(
        sameAs(function() {
          return this.oldUserContent;
        })
      ), 
      */
      username: {
        required,
        minLen: minLength(6)
      },
      fullname: {},
      website: {
        url
      },
      phone: {
        numeric
      },
      address: {}
    },

    newEmail: {
      required,
      email,
      isChanged: not(
        sameAs(function() {
          return this.oldEmail;
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
    newPassword: {
      required,
      minLen: minLength(6)
    },
    confirmNewPassword: {
      isValidPassword: sameAs("newPassword")
    },

    confirmPasswordForDeleting: {
      required,
      minLen: minLength(6)
    }
  },
  methods: {
    async onUpdateContent() {
      await this.$store.dispatch("updateUserContent", this.newUserContent);
      if (this.authLoading) {
        this.$store.commit("setAuthLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "onUpdateContent() Error",
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: this.$t("profile.info.success_message"),
          type: "is-success"
        });
      }
    },
    async onUpdateEmail() {
      await this.$store.dispatch("updateUserEmail", {
        confirmPassword: this.confirmPasswordForNewEmail,
        newEmail: this.newEmail
      });
      if (this.authLoading) {
        this.$store.commit("setAuthLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: authMessage(this.authError),
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: this.$t("profile.email.announce_message"),
          type: "is-warning"
        });
      }
    },
    async onUpdatePassword() {
      await this.$store.dispatch("updateUserPassword", {
        confirmPassword: this.confirmPasswordForNewPassword,
        newPassword: this.newPassword
      });
      if (this.authLoading) {
        this.$store.commit("setAuthLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: authMessage(this.authError),
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: this.$t("profile.password.success_message"),
          type: "is-success"
        });
      }
    },
    async onUpdateAvatar() {
      await this.$store.dispatch("updateUserAvatar", this.newAvatar);
      if (this.authLoading) {
        this.$store.commit("setAuthLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "onUpdateAvatar() Error",
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: this.$t("profile.avatar.success_message"),
          type: "is-success"
        });
      }
    },
    onDelete() {
      this.$buefy.dialog.confirm({
        title: this.$t("profile.delete.dialog.title"),
        message: this.$t("profile.delete.dialog.message"),
        confirmText: this.$t("profile.delete.dialog.confirm_text"),
        cancelText: this.$t("profile.delete.dialog.cancel_text"),
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          await this.$store.dispatch(
            "deleteUser",
            this.confirmPasswordForDeleting
          );
          if (this.authLoading) {
            this.$store.commit("setAuthLoading", false);
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
      this.previewAvatar = null;
      this.previewAvatar = {
        url: URL.createObjectURL(this.newAvatar),
        size: this.newAvatar.size
      };
    }
  },
  head() {
    return {
      title: this.$t("profile.head.title")
    };
  }
};
</script>
