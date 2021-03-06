
export default {
  mode: 'universal',
  target: 'static',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/v-hotkeys',
    '~/plugins/v-embed',
    '~/plugins/v-youtube',
    {src: '~/plugins/draggabilly', mode: 'client'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    'nuxt-composition-api'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit',
    'nuxt-simple-line-icons',
    '@nuxt/components',
    '@nuxt/content'
  ],
  auth: {
    // strategies: {
    //   social: {
    //     _scheme: 'oauth2',
    //     authorization_endpoint: 'https://api.gfycat.com/v1/oauth/token',
    //     userinfo_endpoint: false,
    //     scope: 'all',
    //     access_type:
    //   }
    // }
  },
  components: [
    {
      path: '~/components/global',
      global: true
    }
  ],
  content: {
    dir: 'assets/content'
  },
  markdownit: {
    injected: true,
    html: true,
    linkify: true
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  publicRuntimeConfig: {
    client_id: process.env.CLIENT_ID
  },
  privateRuntimeConfig: {
    client_secret: process.env.CLIENT_SECRET
  },
  generate: {
    interval: 2000
  },
  // generate: {
  //   routes: function () {
  //     const fs = require('fs')
  //     const path = require('path')
  //     return fs.readdirSync('./assets/content/blog').map(file => {
  //       return {
  //         route: `/blog/${path.parse(file).name}`,
  //         payload: require(`./assets/content/blog/${file}`)
  //       }
  //     })
  //   }
  // },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
