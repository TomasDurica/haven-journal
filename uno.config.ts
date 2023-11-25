import {defineConfig, presetUno} from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetIcons from '@unocss/preset-icons'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        fh: FileSystemIconLoader(
          './icons'
        )
      }
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ]
})