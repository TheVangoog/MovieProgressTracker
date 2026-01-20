<template>
  <div>
    <label class="block text-slate-300 text-sm font-semibold mb-2">{{ label }}</label>
    <textarea
      :rows="rows"
      :placeholder="placeholder"
      class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'TextArea',
  props: {
    label: {
      type: String,
      required: true
    },
    rows: {
      type: Number,
      default: 6
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>
