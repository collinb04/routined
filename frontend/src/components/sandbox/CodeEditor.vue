<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { EditorView, lineNumbers, highlightActiveLine, keymap } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { python } from '@codemirror/lang-python'
import { HighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [v: string] }>()

const containerRef = ref<HTMLElement | null>(null)
let view: EditorView | null = null

const vscodeDark = EditorView.theme({
  '&': {
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4',
    fontSize: '13px',
    fontFamily: '"Cascadia Code", "Fira Code", Consolas, "Courier New", monospace',
  },
  '.cm-scroller': { lineHeight: '1.75', overflow: 'auto' },
  '.cm-content': { caretColor: '#aeafad', padding: '16px 16px 16px 0' },
  '.cm-cursor': { borderLeftColor: '#aeafad', borderLeftWidth: '2px' },
  '.cm-activeLine': { backgroundColor: 'rgba(255,255,255,0.04)' },
  '.cm-selectionBackground': { backgroundColor: '#264f78 !important' },
  '&.cm-focused .cm-selectionBackground': { backgroundColor: '#264f78 !important' },
  '.cm-gutters': {
    backgroundColor: '#1e1e1e',
    color: '#858585',
    border: 'none',
    minWidth: '48px',
    userSelect: 'none',
  },
  '.cm-lineNumbers .cm-gutterElement': { padding: '0 12px 0 8px', textAlign: 'right' },
  '.cm-focused': { outline: 'none' },
  '.cm-placeholder': { color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' },
}, { dark: true })

const vscodeDarkHighlight = HighlightStyle.define([
  { tag: t.keyword,                                               color: '#569cd6' },
  { tag: [t.controlKeyword, t.moduleKeyword],                    color: '#c586c0' },
  { tag: [t.number, t.integer, t.float],                        color: '#b5cea8' },
  { tag: [t.string, t.special(t.string)],                       color: '#ce9178' },
  { tag: t.comment,                                              color: '#6a9955', fontStyle: 'italic' },
  { tag: [t.function(t.variableName), t.function(t.definition(t.variableName))], color: '#dcdcaa' },
  { tag: t.definition(t.variableName),                          color: '#9cdcfe' },
  { tag: t.variableName,                                        color: '#9cdcfe' },
  { tag: [t.typeName, t.className],                             color: '#4ec9b0' },
  { tag: t.bool,                                                color: '#569cd6' },
  { tag: t.self,                                                color: '#569cd6' },
  { tag: t.operator,                                            color: '#d4d4d4' },
  { tag: t.punctuation,                                         color: '#d4d4d4' },
  { tag: t.invalid,                                             color: '#f44747' },
])

onMounted(() => {
  if (!containerRef.value) return
  view = new EditorView({
    state: EditorState.create({
      doc: props.modelValue,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        indentOnInput(),
        bracketMatching(),
        python(),
        vscodeDark,
        syntaxHighlighting(vscodeDarkHighlight),
        keymap.of([...defaultKeymap, indentWithTab]),
        EditorView.updateListener.of(update => {
          if (update.docChanged) emit('update:modelValue', update.state.doc.toString())
        }),
        EditorView.theme({ '&': { height: '100%', minHeight: '220px' } }),
      ],
    }),
    parent: containerRef.value,
  })
})

onBeforeUnmount(() => view?.destroy())

watch(() => props.modelValue, val => {
  if (!view || view.state.doc.toString() === val) return
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: val } })
})
</script>

<template>
  <div ref="containerRef" class="cm-host" />
</template>

<style scoped>
.cm-host {
  height: 100%;
  min-height: 220px;
  display: flex;
  flex-direction: column;
}
.cm-host :deep(.cm-editor) {
  flex: 1;
  height: 100%;
  min-height: 220px;
}
</style>
