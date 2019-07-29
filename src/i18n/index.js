import Vue from 'vue'
import locale from 'element-ui/lib/locale';
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zh from '@/assets/languages/zh.json'
import en from '@/assets/languages/en.json'
import VueI18n from 'vue-i18n'
import { getCookie } from '@/utils/cookie'
console.log('cookie', getCookie('PLAY_LANG'))

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: getCookie('PLAY_LANG', 'zh'),
  messages: {
    en: Object.assign(en, enLocale),
    zh: Object.assign(zh, zhLocale)
  }
})

// 为了实现element插件的多语言切换
locale.i18n((key, value) => i18n.t(key, value))


export default i18n
