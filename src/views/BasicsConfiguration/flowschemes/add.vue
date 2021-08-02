<template>
<div>
  <h2>sa</h2>
  <flow-scheme-dtl :is-edit='false'></flow-scheme-dtl>
</div>
</template>

<script>
import flowSchemeDtl from './components/flowSchemeDtl.vue'

import { mapActions } from 'vuex'

export default {
  name: 'addFlowscheme',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.saveCurrentSelect('')
    })
  },
  components: { flowSchemeDtl },
  methods: {
    ...mapActions(['saveCurrentSelect'])
  }
}
</script>

