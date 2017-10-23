<template>
<div class="component-uploadcare">
  <div v-show="statePreview" class="preview">
    <img class="image" :src="imageUrl" alt="Logo">
    <v-btn small round @click="discardImage">
      {{ $t('buttons.change') }}
    </v-btn>
  </div>
  <div v-show="stateUpload">
    <v-btn primary class="btn-upload" :loading="stateLoading" :disabled="stateLoading" @click="uploadImage">
      <v-icon>cloud_upload</v-icon>
      {{ $t('buttons.upload') }}*
    </v-btn>
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
    }
  },
  data() {
    return {
      stateLoading: false,
      stateError: false,
      stateUpload: true,
      statePreview: false,
      imageUrl: ''
    }
  },
  methods: {
    uploadImage() {
      var self = this
      uploadcare.openDialog(null, {
        imagesOnly: true,
        imageShrink: '1024x1024'
      }).done(function (file) {
        self.stateLoading = true
        file.promise().done(function (fileInfo) {
          self.stateLoading = false
          self.stateUpload = false
          self.statePreview = true
          self.imageUrl = fileInfo.cdnUrl
          self.$emit('success', fileInfo)
        }).catch(function (error, fileInfo) {
          self.stateLoading = false
          self.stateError = true
          console.log(error)
        })
      })
    },
    discardImage() {
      this.stateUpload = true
      this.statePreview = false
      this.$emit('discard')
    }
  },
  i18n: {
    messages: {
      en: {
        buttons: {
          upload: 'Upload Logo'
        },
        error: {
          upload: 'Upload Error. Try using PNG or JPG.'
        }
      },
      de: {
        buttons: {
          upload: 'Logo Hochladen'
        },
        error: {
          upload: 'Hochladen fehlgeschlagen. Bitte PNG oder JPG verwenden.'
        }
      }
    }
  }
}
</script>
