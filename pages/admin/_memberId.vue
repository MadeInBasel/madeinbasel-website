<template>
  <component-member :memberId=$route.params.memberId></component-member>
</template>

<script>
  import member from '~/components/member.vue'

  export default {
    components: {
      'component-member': member
    }
  }
</script>
