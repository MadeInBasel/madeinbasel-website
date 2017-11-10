<template>
<div class="component-uploadcare">
  <div v-show="fileGroupInfo.uuid" class="preview" :class="{ multiple: multiple}">
    <v-layout v-if="fileGroupInfo.hasOwnProperty('count')" wrap class="gallery">
      <v-flex class="gallery-item" xs6 sm4 md3 v-for="(item, i) in fileGroupInfo.count" :key="i">
        <img :src="fileGroupInfo.cdnUrl + 'nth/' + i + '/-/scale_crop/300x300/center/-/progressive/yes/'" alt="Photo">
        <div v-if="i == 0" class="indication">Cover</div>
      </v-flex>
    </v-layout>
    <img v-else class="standalone" :src="fileGroupInfo.cdnUrl" alt="Logo">
    <v-btn small round @click="discardImage">
      {{ $t('buttons.changeSelection') }}
    </v-btn>
  </div>
  <div v-show="stateUpload">
    <div class="upload">
      <div v-if="!multiple" class="placeholder" @click="uploadImage">
        <v-icon>face</v-icon>
        <small class="ratio"><strong>1:1</strong></small>
      </div>
      <v-btn color="primary" class="btn-upload" :loading="stateLoading" :disabled="stateLoading" @click="uploadImage">
        <v-icon>cloud_upload</v-icon>{{ label }}
        <template v-if="required">*</template>
      </v-btn>
    </div>
  </div>
  <div class="stateError">
    <small v-show="stateError">{{ $t('error.upload') }}</small>
  </div>
</div>
</template>

<script>
import uploadcare from 'uploadcare-widget'
export default {
  head() {
    return {
      script: [
        { src: this.$i18n.locale === 'de' ? '/js/uploadcare-de.js' : '' }
      ]
    }
  },
  props: {
    stateErrorRequired: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default () {
        return this.$t('buttons.uploadPhotos')
      }
    },
    required: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    crop: {
      type: String,
      default: 'disabled'
    }
  },
  data() {
    return {
      stateLoading: false,
      stateError: false,
      stateUpload: true,
      fileGroupInfo: {},
      fileGroup: null
    }
  },
  methods: {
    uploadImage() {
      var self = this
      var dialog = uploadcare.openDialog(this.fileGroup, {
        imagesOnly: true,
        multiple: this.multiple,
        crop: this.crop
      })
      dialog.done(function (result) {
        self.handleUpload(result)
      })
      dialog.fail(function (result) {
        self.handleUpload(result)
      })
    },
    handleUpload(result) {
      var self = this
      if (result) {
        this.stateLoading = true
        result.promise().done(function (fileInfo) {
          self.stateError = false
          self.stateLoading = false
          self.stateUpload = false
          self.fileGroupInfo = fileInfo
          self.$emit('success', fileInfo)

          if (self.fileGroupInfo.count) {
            uploadcare.loadFileGroup(fileInfo.uuid)
              .done(function (fileGroup) {
                self.fileGroup = fileGroup
              })
          }
        }).catch(function (error, fileInfo) {
          if (!self.fileGroup) {
            self.stateError = true
          }
          self.stateLoading = false
          self.fileGroupInfo = {}
          self.fileGroup = null
          console.log('upload error', error)
        })
      }
    },
    discardImage() {
      this.stateUpload = true
      if (!this.fileGroupInfo.count) {
        this.fileGroupInfo = {}
      }
      this.uploadImage()
      this.$emit('discard')
    }
  },
  i18n: {
    messages: {
      en: {
        error: {
          upload: 'Upload Error. Try using PNG or JPG.'
        }
      },
      de: {
        error: {
          upload: 'Hochladen fehlgeschlagen. Bitte PNG oder JPG verwenden.'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "uploadcare.scss";
</style>
