// Local preview over plain HTTP: the normal config without the
// self-signed HTTPS plugin, so the in-app browser can open it.
import base from './vite.config'
import type { PluginOption, UserConfig } from 'vite'

const config = base as UserConfig
const keep = (p: PluginOption): boolean =>
  !(p && typeof p === 'object' && 'name' in p && p.name === 'vite:basic-ssl')

export default { ...config, plugins: (config.plugins ?? []).flat().filter(keep) } satisfies UserConfig
